const clientService = require('../../usecases/user/clientData');

exports.index = async (req, res, next) => {
    try {
        const search = req.query.search || null;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        res.json(await clientService.index({ search, page, limit }));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        res.json(await clientService.getOne(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};

exports.contacts = async (req, res, next) => {
    try {
        const id = req.params.id;
        const search = req.query.search || null;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        res.json(await clientService.contacts(id, { search, page, limit }));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};

exports.chats = async (req, res, next) => {
    try {
        const id = req.params.id;
        const search = req.query.search || null;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        res.json(await clientService.chats(id, { search, page, limit }));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};


exports.chat = async (req, res, next) => {
    try {
        const client_id = req.params.clientId;
        const chat_id = req.params.chatId;
        const search = req.query.search || null;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        res.json(await clientService.chat(client_id, chat_id,{ search, page, limit }));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};


exports.sendCommand = async (req, res, next) => {
    let socketManager = req.app.get('io');
    try {
        let client_id = req.params.id ;
        let command = req.body.commandID;
        let commandPayload = req.body.commandPayload;
        res.json(await clientService.sendCommand({ client_id, command, commandPayload }, socketManager));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.saveQueue = async function (req, res, next) {
    let socketManager = req.app.get('io');

       try{

        let client_id = req.params.id;
         res.json(await clientService.saveQueue(client_id, socketManager, req.body))


       }catch(err){
        err.statusCode = err.statusCode || 500;
        next(err);
    
    }
    
}

exports.queueList = async function(req, res, next){
    try {
        const id = req.params.id;
        const search = req.query.search || null;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        res.json(await clientService.queueList(id, { search, page, limit }));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.deleteQueue = async function(req, res, next){

    const id = req.params.id;
    const queueId = req.params.queueId;

    try {
        res.json(await clientService.deleteQueue(id, queueId));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.notifications = async (req, res, next) => {
    try {
        const search = req.query.search || null;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        res.json(await clientService.notifications({ search, page, limit }));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};

exports.notification = async (req, res, next) => {
    const id = req.params.id;
    try {
        res.json(await clientService.notification(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};