const Cart = require('../cart/cart.model');
const Order = require('./order.model');
const Product = require('../product/product.model');

exports.placeOrder = async (userId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  const fulfilledItems = [];
  const remainingItems = [];
  let totalPrice = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);

    if (!product) {
      continue;
    }

    const fulfillQuantity = Math.min(
      item.quantity,
      product.stockQuantity
    );

    if (fulfillQuantity > 0) {
      // Deduct stock
      product.stockQuantity -= fulfillQuantity;
      await product.save();

      fulfilledItems.push({
        productId: product._id,
        quantity: fulfillQuantity
      });

      totalPrice += product.price * fulfillQuantity;
    }

    const remainingQty = item.quantity - fulfillQuantity;
    if (remainingQty > 0) {
      remainingItems.push({
        productId: item.productId,
        quantity: remainingQty
      });
    }
  }

  if (fulfilledItems.length === 0) {
    throw new Error('No items could be fulfilled due to stock limits');
  }

  // Create order with fulfilled items only
  const order = await Order.create({
    userId,
    items: fulfilledItems,
    totalPrice
  });

  // Update cart
  if (remainingItems.length > 0) {
    cart.items = remainingItems;
    await cart.save();
  } else {
    await Cart.deleteOne({ userId });
  }

  return {
    order,
    partiallyFulfilled: remainingItems.length > 0,
    remainingItems
  };
};
