const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const controller = require('./order.controller');

router.post('/', auth, controller.place);
module.exports = router;
