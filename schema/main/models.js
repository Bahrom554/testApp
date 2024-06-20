const { initModels } = require('./models/init_models');

const Database = require('../../db');
const models = initModels(Database.main);

module.exports = models;