const jwt = require('jsonwebtoken');
const AppConfig = require('../../config/app')()

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const err = new Error('Not authenticated.');
        err.statusCode = 401;
        throw err;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, AppConfig.jwtSecretUser);
    } catch (err) {
        err.statusCode = 401;
        throw err;
    }
    if (!decodedToken) {
        const err = new Error('Not authenticated.');
        err.statusCode = 401;
        throw err;
    }
     console.log(decodedToken);
    req.agent = decodedToken;
    next();
};
