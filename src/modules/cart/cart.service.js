const Cart = require('./cart.model');

exports.addToCart = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ userId }) || await Cart.create({ userId, items: [] });

  const itemIndex = cart.items.findIndex(
    item => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  return cart;
};

exports.getCart = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate('items.productId');

  if (!cart) {
    return {
      items: [],
      totalPrice: 0
    };
  }

  let totalPrice = 0;

  const items = cart.items.map(item => {
    const price = item.productId.price;
    const subtotal = price * item.quantity;

    totalPrice += subtotal;

    return {
      product: item.productId,
      quantity: item.quantity,
      subtotal
    };
  });

  return {
    items,
    totalPrice
  };
};
