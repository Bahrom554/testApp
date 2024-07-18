const Models = require('../../../schema/main/models');
const Utils = require('../../../utils/utils');
const {Op} = require('sequelize');

exports.index = async function (options) {
    let query = {};

    if (options.search) {
        query.username = {
            [Op.like]: '%' + options.search + '%',
        };
    }

    return Utils.getPagination(Models.keyword, query, options, [], [])
}

exports.create = async function (data) {
    let key = await Models.keyword.findOne({ where: { name: data.name } });
    if (key) {
        let err = new Error('This keyword has been created!');
        err.statusCode = err.statusCode || 422;
        throw err;

    }

    return await Models.keyword.create(data);
}

exports.update = async function(id, data){
    let key = await Models.keyword.findOne({where: {name: data.name, id: {[Op.ne]: id}}});
     if(key){
        let err = new Error('This keyword has been created!');
        err.statusCode = err.statusCode || 422;
        throw err;
     }
      data.updated_at = Date.now();
     const [updated, keyword] = await Models.keyword.update(data, { where: { id: id }, returning: true });

     if (!updated) {
         let err = new Error('keyword not found');
         err.statusCode = 404;
         throw err;
     }
 
     return keyword[0];
}

exports.delete = async function (id) {
    let keyword = await Models.keyword.destroy({ where: { id: id } });

    if (!keyword) {
        let err = new Error('keyword not found');
        err.statusCode = 404;
        throw err;
    }

    return { message: 'keyword was deleted successfully.' };
};
