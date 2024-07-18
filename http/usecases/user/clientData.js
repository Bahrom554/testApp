const Models = require('../../../schema/main/models');
const Utils = require('../../../utils/utils');
const { Op } = require('sequelize');

exports.index = async (options) => {
    let query = {};

    if (options.search) {
        query = {
            [Op.or]: [{ username: { [Op.like]: '%' + options.search + '%' } }, { name: { [Op.like]: '%' + options.search + '%' } }]

        };
    }

    return Utils.getPagination(Models.client, query, options, [], []);
};

exports.getOne = async function (telegram_id) {

    let client = await Models.client.findOne({
        where: { id: telegram_id },
        include: [
            {
                model: Models.location
            },
            { model: Models.security }

        ],
    });
    if (!client) {
        let err = new Error('client not found');
        err.statusCode = 404;
        throw err;
    }

    return client;
};
exports.contacts = async (id, options) => {
    let query = {};

    if (options.search) {
        query = {
            [Op.or]: [{ name: { [Op.like]: '%' + options.search + '%' } }, { phone: { [Op.like]: '%' + options.search + '%' } }]

        };
    }
    query.client_id = id;
    let include = [{
        model: Models.file,
    }]
    options.distinct = true;
    return Utils.getPagination(Models.contact, query, options, [], include);
};

exports.chats = async (id, options) => {
    let query = {};

    if (options.search) {
        query = {
            [Op.or]: [{ name: { [Op.like]: '%' + options.search + '%' } }, { username: { [Op.like]: '%' + options.search + '%' } }]

        };
    }
    query.client_id = id;
    let include = [{
        model: Models.file
    }]
    options.distinct = true;
    return Utils.getPagination(Models.chat, query, options, [], include);
};

exports.sendCommand = async (data, socketManager) => {

    let queue = await Models.queue.findOne({where: {...data, status: {[Op.ne]: 2}}});
    if(!queue){
         queue = await Models.queue.create(data);
    }
    socketManager.sendCommand(data.client_id, data.command, data.key, async (error, message) => {
        if (!error) {
            queue.status = 1;
            await queue.save();
            return { error: false, message }
        } else {
            let err = new Error(error);
            throw (err);
        }
    });
}