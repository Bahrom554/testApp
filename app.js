const express = require('express');
const path = require('path');
const cors = require('cors');
const AppConfiguration = require('./config/app')();
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const app = express();
const Util = require('./util/utils');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/user', userRouter);
app.use('/auth', authRouter);

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


const server = require('http').createServer(app);

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