const clientService = require('../../usecases/user/clientData');

exports.index = async (req, res, next)=>{
    try{
        const search = req.query.search || null;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        res.json(await clientService.index({ search, page, limit }));

    }catch(err){
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
