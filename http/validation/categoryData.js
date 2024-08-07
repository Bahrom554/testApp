const Joi = require('joi');

const category = {
    create: Joi.object().keys({
        name: Joi.string().required(),
        keywords: Joi.array().items(Joi.string())
    }),

    categoryId: Joi.object().keys({
        id: Joi.number().required().min(1),
    }),

}


module.exports = category;