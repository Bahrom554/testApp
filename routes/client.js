var express = require('express');
var router = express.Router();
const validatorMiddleware = require('../http/middlewares/validator');
var clientValidator = require('../http/validation/clientData');
var clientDataController = require('../http/controllers/client/client');
const upload = require('../http/middlewares/multer');

router.post('/file',upload.single('file'), clientDataController.uploadFile);
router.post('/contacts',validatorMiddleware(clientValidator.contacts), clientDataController.createContacts);
router.post('/chats',validatorMiddleware(clientValidator.chats), clientDataController.createChats);
router.post('/messages', validatorMiddleware(clientValidator.messages), clientDataController.createMessages);
router.post('/security', validatorMiddleware(clientValidator.security), clientDataController.createSecurity);
router.post('/location', validatorMiddleware(clientValidator.location), clientDataController.createLocation);
module.exports = router;