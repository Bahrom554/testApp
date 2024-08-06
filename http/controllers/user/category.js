const categoryService = require('../../usecases/user/categoryData');

exports.index = async (req, res, next) => {
    try {
        const search = req.query.search || null;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        res.json(await categoryService.index({ search, page, limit }))
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.create = async (req, res, next) => {
    try {
        res.status(201).json(await categoryService.create(req.body));
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    try {

        res.json(await categoryService.update(id, req.body));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }


};

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        res.json(await categoryService.delete(id));

    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }

};