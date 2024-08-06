const Joi = require('joi');

const category = {
    create: Joi.object().keys({
        name: Joi.string().required(),
    }),
    
    categoryId: Joi.object().keys({
        id: Joi.number().required().min(1),
    }),
   
}


module.exports = category;