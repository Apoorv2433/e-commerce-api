const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');
const controller = require('./cart.controller');

router.post('/add', auth, controller.add);
router.get('/', auth, controller.get);
module.exports = router;
