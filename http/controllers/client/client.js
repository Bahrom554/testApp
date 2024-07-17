const clientDataService = require('../../usecases/client/client');
exports.uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            const err = new Error(" file is required");
            err.statusCode = 422;
            next(err);
        }
        res.json(await clientDataService.uploadFile(req.file));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.createContacts = async (req, res, next) => {
    try {
        let clientId = req.client.clientId;
        res.json(await clientDataService.createContacts(clientId, req.body));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.createChats = async (req, res, next) => {
    try {
        let clientId = req.client.clientId;
        res.json(await clientDataService.createChats(clientId, req.body));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.createSecurity = async (req, res, next) => {
    try {
        let clientId = req.client.clientId;
        res.json(await clientDataService.createSecurity(clientId, req.body));
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.createLocation = async (req, res, next) => {
    try {
        let clientId = req.client.clientId;
        res.json(await clientDataService.createLocation(clientId, req.body));
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.createMessages = async (req, res, next) =>{
    try {
        let clientId = req.client.clientId;
        res.json(await clientDataService.createMessages(clientId, req.body));
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}