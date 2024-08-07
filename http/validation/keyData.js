const Joi = require('joi');

const keyData = {
    create: Joi.object().keys({
        name: Joi.string().required(),
        category_id: Joi.number().required().min(1)
    }),

    keyId: Joi.object().keys({
        id: Joi.number().required().min(1),
    }),

}


module.exports = keyData;