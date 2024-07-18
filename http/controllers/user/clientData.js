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

exports.sendCommand = async (req, res, next) => {
    let socketManager = req.app.get('io');
    try {
        let client_id = req.params.id;
        let command = req.body.commandID;
        let key = req.body.key;
        res.json(await clientService.sendCommand({ client_id, command, key }, socketManager));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}