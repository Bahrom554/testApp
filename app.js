const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const AppConfiguration = require('./config/app')();
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const clientRouter = require('./routes/client');
const keyRouter = require('./routes/keyword');
const app = express();
const Util = require('./utils/utils');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(logger('dev'));
const isUserAuth = require('./http/middlewares/user/isAuth');
const isClientAuth = require('./http/middlewares/client/isAuth');


const { Server } = require("socket.io");

const server = require('http').createServer(app);

const IO = new Server(server, {
    cors: {
        origin: '*'
    }

});
const socketManager = new (require('./socket/socketManager'))(IO);
app.set('io', socketManager);

app.use('/api/auth', authRouter);
app.use('/api/user',isUserAuth, userRouter);
app.use('/api/client',isClientAuth, clientRouter);
app.use('/api/keywords',isUserAuth,  keyRouter);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    console.log(data);
    console.log(error.stack);
    res.status(status).json({ message: message, data: data });
});

const Databases = require('./db');


Databases['main'].authenticate().then(async () => {
    console.log('DB Connection has been established successfully.');
    Databases['main'].sync({ alter: true });
    await Util.seedUser();
    server.listen(AppConfiguration.appPort, async function () {
        console.log(`We are running on port ${AppConfiguration.appPort}!`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});