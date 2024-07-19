let clientIO = null;
let userIO = null;
const AppConfig = require('../config/app')();
const HashMap = require('hashmap');
const clients = new HashMap();
const users = new HashMap();
const jwt = require('jsonwebtoken');
const Models = require('../schema/main/models');



class SocketManager {
    constructor(io) {
        clientIO = io;
        userIO = io.of('/user');
        clientIO.use(this.setClientMiddleware);
        userIO.use(this.setUserMiddleware);
        this.userEvents();
        this.clientEvents();


    }

    setClientMiddleware = (socket, next) => {
        const token = socket.handshake.query.token;
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, AppConfig.jwtSecretClient);
            if (!decodedToken) {
                const err = new Error('Not authenticated.');
                err.statusCode = 401;
                throw err;
            }

            let client = decodedToken;

            socket.handshake.query.client = client;
            next();
        } catch (err) {
            err.statusCode = 401;
            next(err);
        }

    }

    setUserMiddleware = (socket, next) => {
        const token = socket.handshake.query.token;
        // console.log(token)
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, AppConfig.jwtSecretUser);
            if (!decodedToken) {
                const err = new Error('Not authenticated.');
                err.statusCode = 401;
                throw err;
            }
            let user = decodedToken;
            socket.handshake.query.user = user;
            next();
        } catch (err) {
            err.statusCode = 401;
            next(err)
        }

    }


    userEvents() {
        userIO.on('connection', (socket) => {

            let userParams = socket.handshake.query.user;

            let userID = userParams.userId || null;

            users.set(userID, socket.id);

            console.log("socket connected users:", users);

            socket.on('disconnect', (socket) => {

                const key = users.search(socket.id);

                if (key) {
                    socket.leave(key, function (err) {
                        console.log("user disconnected", key)
                    })
                    users.remove(key);
                }

            })
        })

    }
   
    clientEvents() {
        clientIO.on('connection', async (socket) => {

            let clientParams = socket.handshake.query.client;
            // console.log(clientParams);

            let clientID = clientParams.clientId || null;
    
            clients.set(clientID, socket.id);


            console.log("Socket connected clients:", clients);


            socket.on('disconnect', async function () {

                const key = clients.search(socket.id);

                if (key) {
                    socket.leave(key, function (err) {
                        console.log("client disconnected", key);
                    });
                    clients.remove(key);
                }
            });

            socket.on("connect_error", (err) => {
                console.log(`connect_error due to ${err.message}`);
            });
        });
    }

    notifyAdmin(client, data, eventName) {
        
        userIO.emit('notification', { eventName, client, data })
    }

     sendCommand(client_id, command, key, cb = () => {
    }) {
        if (clients.has(client_id)){
            clientIO.to(clients.get(client_id)).emit(command, {key});
            return cb(false, 'requested');
        }
        else{
            return cb('client is offline', undefined);
        }
        
    }
    
}


module.exports = SocketManager;