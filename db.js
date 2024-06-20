const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { log } = require('debug');
const basename = path.basename(module.filename);
const MainDbConfig = require('./config/database')();
const db = {};

db['main'] = new Sequelize(MainDbConfig.dbName, MainDbConfig.dbUserName, MainDbConfig.dbPassword, {
    host: MainDbConfig.dbHost,
    port: MainDbConfig.dbPort,
    dialect: 'postgres',
    logging: false,
});

console.log(MainDbConfig);

// Add models from database2 folder


fs
  .readdirSync(__dirname + '/schema/main/models')
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
      const model = require(path.join(__dirname + '/schema/main/models', file))(db['main'], Sequelize.DataTypes);
      db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


module.exports = db;
