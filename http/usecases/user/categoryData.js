const Models = require('../../../schema/main/models');
const Utils = require('../../../utils/utils');
const { Op } = require('sequelize');

exports.index = async function (options) {
    let query = {};

    if (options.search) {
        query.name = {
            [Op.like]: '%' + options.search + '%',
        };
    }
    let include = [{model: Models.keyword, as:'keywords'}]

    return Utils.getPagination(Models.category, query, options, [], include)
}

exports.create = async function (data) {
    let category = await Models.category.findOne({ where: { name: data.name } });
    if (category) {
        let err = new Error('category has been created with this name!');
        err.statusCode = err.statusCode || 422;
        throw err;

    }
    category = await Models.category.create(data);
    if (data.keywords && data.keywords.length > 0) {
        let keywords = data.keywords;
        let _keywors = [];
        for (let i = 0; i < keywords.length; i++) {
            let name = keywords[i];
            let keyword = await Models.keyword.findOne({ where: { name } });
            if (!keyword) {
                keyword = await Models.keyword.create({ name });
            }
            _keywors.push(keyword);
        }
        await category.addKeywords(_keywors);
    }

    return await Models.category.findOne({ where: {id: category.id }, include: [{model: Models.keyword, as:'keywords'}] });
}

exports.update = async function (id, data) {
    let _category = await Models.category.findOne({ where: { name: data.name, id: { [Op.ne]: id } } });
    if (_category) {
        let err = new Error('category has been created with this name!');
        err.statusCode = err.statusCode || 422;
        throw err;
    }
    data.updated_at = Date.now();
    const [updated, category] = await Models.category.update(data, { where: { id: id }, returning: true });

    if (!updated) {
        let err = new Error('category not found');
        err.statusCode = 404;
        throw err;
    }

    return category[0];
}

exports.delete = async function (id) {
    let category = await Models.category.destroy({ where: { id: id } });

    if (!category) {
        let err = new Error('category not found');
        err.statusCode = 404;
        throw err;
    }

    return { message: 'category was deleted successfully.' };
};
