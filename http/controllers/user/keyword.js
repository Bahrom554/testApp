const keyWordService = require('../../usecases/user/keywordData');

exports.index = async (req, res, next) => {
    try {
        const search = req.query.search || null;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        res.json(await keyWordService.index({ search, page, limit }))
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.create = async (req, res, next) => {
    try {
        res.status(201).json(await keyWordService.create(req.body));
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    try {

        res.json(await keyWordService.update(id, req.body));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }


};

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        res.json(await keyWordService.delete(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }

};