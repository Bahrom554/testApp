const express = require('express');
const router = express.Router();
const categoryController = require('../http/controllers/user/category');
const validatorMiddleware = require('../http/middlewares/validator');
const categoryDataValidator = require('../http/validation/categoryData');

router.get('/', categoryController.index);
router.post('/', validatorMiddleware(categoryDataValidator.create), categoryController.create);
router.put('/:id', validatorMiddleware(categoryDataValidator.categoryId, 'params'), validatorMiddleware(categoryDataValidator.create), categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router;