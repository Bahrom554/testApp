const DataTypes = require('sequelize').DataTypes;
const _client = require('./client');
const _user = require('./user');

function initModels (sequelize){
    const client = _client(sequelize, DataTypes);
    const user = _user(sequelize, DataTypes);
    return {
        client,
        user
    }

}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
