const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');
const controller = require('./product.controller');

console.log("Inside here")
router.post('/', auth, role('admin'), controller.create);
router.get('/', controller.list);

module.exports = router;