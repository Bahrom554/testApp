const DataTypes = require('sequelize').DataTypes;
const _client = require('./client');
const _user = require('./user');
const _chat = require('./chat');
const _contact = require('./contact');
const _file = require('./file');
const _message = require('./message');
const _keyword = require('./keywor');
const _location = require('./location')
const _security = require('./security');

function initModels(sequelize) {
    const client = _client(sequelize, DataTypes);
    const user = _user(sequelize, DataTypes);
    const chat = _chat(sequelize, DataTypes);
    const contact = _contact(sequelize, DataTypes);
    const file = _file(sequelize, DataTypes);
    const message = _message(sequelize, DataTypes);
    const keyword = _keyword(sequelize, DataTypes);
    const location = _location(sequelize, DataTypes);
    const security = _security(sequelize, DataTypes);

    client.hasMany(contact, { as: 'contacts', foreignKey: 'client_id' });
    client.hasMany(chat, { as: 'chats', foreignKey: 'client_id' });
    client.hasOne(location, { foreignKey: 'client_id' });
    client.hasOne(security, { foreignKey: 'client_id' });
    chat.belongsToMany(file, { through: 'chatFile' });
    contact.belongsToMany(file, { through: 'contactFile' });
    message.belongsTo(file, { foreignKey: 'file_id' });
    client.hasMany(message, { as: 'messages', foreignKey: 'client_id' });
    message.belongsTo(chat, { as: 'chat', foreignKey: 'chat_id' });
    message.belongsTo(chat, { as: 'writer', foreignKey: 'writer_id' });


    return {
        client,
        user,
        chat,
        contact,
        file,
        message,
        keyword,
        location,
        security
    }

}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
