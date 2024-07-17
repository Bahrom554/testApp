const express = require('express');
const router = express.Router();
const clientController = require('../http/controllers/user/clientData');


router.get('/clients', clientController.index);
router.get('/clients/:id', clientController.getOne);


module.exports = router;