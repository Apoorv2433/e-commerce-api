const service = require('./product.service');

exports.create = async (req, res) => {
  res.status(201).json(await service.create(req.body));
};

exports.list = async (req, res) => {
  res.json(await service.list(req.query));
};
