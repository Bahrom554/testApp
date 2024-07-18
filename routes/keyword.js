const express = require('express');
const router = express.Router();
const keyWordController = require('../http/controllers/user/keyword');
const validatorMiddleware = require('../http/middlewares/validator');
const keyDataValidator = require('../http/validation/keyData');

router.get('/', keyWordController.index);
router.post('/', validatorMiddleware(keyDataValidator.create), keyWordController.create);
router.put('/:id',validatorMiddleware(keyDataValidator.keyId, 'params'),validatorMiddleware(keyDataValidator.create),keyWordController.update);
router.delete('/:id', keyWordController.delete);

module.exports = router;