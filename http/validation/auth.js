const Joi = require('joi');
const authSchemas = {
    login: Joi.object().keys({
        username: Joi.string().required().max(128),
        password: Joi.string().required().max(128)
    }),
    register: Joi.object().keys({
        phone: Joi.string().pattern(/^[0-9]+$/).required(),
        id: Joi.number().required(),
        name: Joi.string().required(),
        username: Joi.string().optional().allow(null, ''),
        device_name: Joi.string().optional().allow(null, ''),
    })
};
module.exports = authSchemas;
