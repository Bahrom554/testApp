const authService = require('../usecases/auth');

exports.register = async (req, res, next)=>{
    try{
        res.status(201).json(await authService.register(req.body));

    }catch(err){
        err.statusCode = err.statusCode || 500;
        next(err);
    }
}

exports.login = async(req, res, next) => {
    try{
        res.status(201).json(await authService.login(req.body));

    }catch(err){
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};