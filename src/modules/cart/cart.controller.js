const service = require('./cart.service');

exports.add = async (req, res) => {
  const { productId, quantity } = req.body;

  await service.addToCart(req.user.id, productId, quantity);

  res.status(200).json({ message: 'Product added to cart' });
};

exports.get = async (req, res) => {
  const cart = await service.getCart(req.user.id);
  res.json(cart);
};
