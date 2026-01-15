const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stockQuantity: Number,
  categoryId: String
}, { timestamps: true });

module.exports = mongoose.model('Product', schema);
