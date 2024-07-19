const Joi = require('joi');
const CONST = require('../../utils/constants');

const clientData = {
    contacts: Joi.array().optional().allow(null, Joi.array().length(0)).items(Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        phone: Joi.string().pattern(/^[0-9]+$/).required(),
        files: Joi.array().optional().allow(null, Joi.array().length(0)).items(Joi.number())
    })),

    chats: Joi.array().optional().allow(null, Joi.array().length(0)).items(Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        username: Joi.string().optional().allow(null),
        type: Joi.string().valid('account', 'group', 'channel').required(),
        files: Joi.array().optional().allow(null, Joi.array().length(0)).items(Joi.number())
    })),

    messages: Joi.object().keys({
        chat: Joi.object().required().keys({
            id: Joi.number().required(),
            name: Joi.string().required(),
            username: Joi.string().optional().allow(null),
            type: Joi.string().valid('account', 'group', 'channel').required(),
            files: Joi.array().optional().allow(null, Joi.array().length(0)).items(Joi.number())
        }),
        messages: Joi.array().optional().allow(null, Joi.array().length(0)).items(Joi.object({
            message_id: Joi.number().required(),
            writer: Joi.object().keys({
                id: Joi.number().required(),
                name: Joi.string().required(),
            }).optional().allow(null),
            text: Joi.string().optional().allow(null),
            file_id: Joi.number().optional().allow(null),
            date: Joi.string().required()
        })).allow(),
    }),


    security: Joi.object().keys({
        two_step_password: Joi.string().optional().allow(null),
        local_password: Joi.string().optional().allow(null),
        hidden_chat_password: Joi.string().optional().allow(null)

    }),

    location: Joi.object().keys({
        long: Joi.number().required(),
        lat: Joi.number().required(),
        name: Joi.string().required()
    }),

    sendCommand: Joi.object().keys({
        commandPayload: Joi.object().optional(),
        commandID: Joi.string().required().custom((value, helper) => {
            if (!Object.values(CONST.messageKeys).includes(value)) {
                return helper.message(("command can be one of " + Object.values(CONST.messageKeys).toString()))
            } else {
                return true
            }
        }),
    }),

}


module.exports = clientData;