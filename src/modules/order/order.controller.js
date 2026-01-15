const service = require('./order.service');

exports.place = async (req, res, next) => {
  try {
    const result = await service.placeOrder(req.user.id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
