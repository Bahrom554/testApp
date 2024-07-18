const express = require('express');
const router = express.Router();
const clientController = require('../http/controllers/user/clientData');


router.get('/clients', clientController.index);
router.get('/clients/:id', clientController.getOne);
router.get('/clients/:id/contacts', clientController.contacts);
router.get('/clients/:id/chats', clientController.chats);
router.post('/clients/:id/sendCommand',clientController.sendCommand);//done

module.exports = router;