const express = require('express');
const router = express.Router();
const clientController = require('../http/controllers/client');
const isAuth = require('../http/middlewares/isAuth');
router.get('/clients', isAuth, clientController.index);
router.get('/clients/:id', isAuth, clientController.getOne);

module.exports = router;