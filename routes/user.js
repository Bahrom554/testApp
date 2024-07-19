const express = require('express');
const router = express.Router();
const clientController = require('../http/controllers/user/clientData');
const validatorMiddleware = require('../http/middlewares/validator');
const clientDataValidator = require('../http/validation/clientData');


router.get('/clients', clientController.index);
router.get('/clients/:id', clientController.getOne);
router.get('/clients/:id/contacts', clientController.contacts);
router.get('/clients/:id/chats', clientController.chats);
router.get('/clients/:clientId/chats/:chatId', clientController.chat);
router.post('/clients/:id/sendCommand', validatorMiddleware(clientDataValidator.sendCommand), clientController.sendCommand);//done
router.get('/clients/:id/queue', clientController.queueList)
router.post('/clients/:id/queue',validatorMiddleware(clientDataValidator.sendCommand),  clientController.saveQueue)
router.delete('/clients/:id/queue/:queueId',  clientController.deleteQueue)
router.get('/clients/notifications', clientController.notifications);
router.get('/clients/notifications/:id', clientController.notification);

module.exports = router;