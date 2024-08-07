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
    
            if(clientID){
                clients.set(clientID, socket.id);

                await this.sendQueuedCommands(clientID);

                console.log("Socket connected clients:", clients);
            }
            
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
        
        userIO.emit('notification', { eventName, client, ...data })
    }

     sendCommand(client_id, commandId, commandPayload, cb = () => {
    }) {
        if (clients.has(client_id)){
            clientIO.to(clients.get(client_id)).emit(commandId, commandPayload);
            console.log("soket requested");
            return cb(false, 'requested');
        }
        else{
            return cb('client is offline', undefined);
        }
        
    }

    async sendQueuedCommands(client_id) {

        console.log("QUEUE UPDATE");

        let activeJob = await Models.queue.findOne({where:{ client_id, status: 1 }});
        console.log(activeJob?.toJSON());

        if (!activeJob) {
            await sendNextJob(client_id);
        } else {
            await checkActiveJobIfOKSendItAgainOrSendNewJob(activeJob, client_id);
        }

    }
    
}
async function sendNextJob(client_id) {
    let nextJob = await Models.queue.findOne({where:{ client_id, status: 0 }})
    console.log("NEXT JOB IF NO ACTIVE JOB")
    console.log(nextJob?.toJSON())
    if (nextJob) {
        console.log("CLIENTS")
        console.log(clients)
        console.log(clients.has(client_id));
        if (clients.has(client_id)) {

            console.log("SOCKET CLIENT")
            console.log(clients.get(client_id))
            clientIO.to(clients.get(client_id)).emit(nextJob.commandID, nextJob.commandPayload)
            console.log("\n\n\nNEXT JOB COMMAND SENT TO CLIENT")
            console.log(nextJob?.toJSON())
            console.log("\n\n\n")
            nextJob.status = 1;
            nextJob.updated_at = new Date();
            await nextJob.save();

        }

    }
}



async function checkActiveJobIfOKSendItAgainOrSendNewJob(activeJob, client_id) {

    let timeDifferenceInMillis = new Date().getTime() - new Date(activeJob.created_at).getTime();
    console.log("time",new Date())
    console.log("time cre", new Date(activeJob.created_at))
    let timeDifferenceInMins = timeDifferenceInMillis / (60 * 1000);
    let lastTryDifferenceinMins = (new Date().getTime() - new Date(activeJob.updated_at).getTime()) / (60 * 1000);
    console.log("TIMES")
    console.log(timeDifferenceInMins)
    console.log(lastTryDifferenceinMins)

    if (timeDifferenceInMins > 2) {
        if (activeJob.try_count <= 3 && lastTryDifferenceinMins >= 2) {
            if (clients.has(client_id)) {
                clientIO.to(clients.get(client_id)).emit(activeJob.commandID, activeJob.commandPayload)
                console.log("\n\n\nOLD ACTIVE JOB SENT TO CLIENT")
                console.log(activeJob?.toJSON())
                activeJob.try_count = activeJob.try_count + 1;
                activeJob.updated_at = new Date();
                await activeJob.save();
            }
        } else {
            activeJob.status = 2;
            activeJob.description = "some error with client sending data";
            await activeJob.save();
            await sendNextJob(client_id);
        }


    }
    console.log("\n\n\n")
    console.log(activeJob?.toJSON())
}







module.exports = SocketManager;