const Models = require('../../schema/main/models');
const Utils = require('../../util/utils');

exports.index = async(options)=> {
    let query = {};

    if (options.search) {
        query = {
            [Op.or]:[{username: {[Op.like]: '%' + options.search + '%'}}, {name: {[Op.like]: '%' + options.search + '%'}}]
            
        };
    }

    return Utils.getPagination(Models.client, query, options, [],[]);
};

exports.getOne = async function (telegram_id) {

    let client = await Models.client.findOne({
        where: { id: telegram_id },
    });
    if (!client) {
        let err = new Error('client not found');
        err.statusCode = 404;
        throw err;
    }

    return client;
};