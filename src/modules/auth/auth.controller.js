const service = require('./auth.service');

exports.register = async (req, res) => {
  const user = await service.register(req.body);
  res.status(201).json(user);
};

exports.login = async (req, res) => {
  const token = await service.login(req.body);
  res.json({ token });
};