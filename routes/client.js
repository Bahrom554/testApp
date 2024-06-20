var express = require('express');
var router = express.Router();
const authValidator = require('../http/validation/auth');
const validatorMiddleware = require('../http/middlewares/validator');
var auth = require('../http/controllers/auth')
router.post('/register',validatorMiddleware(authValidator.register), auth.register)
module.exports = router;