const mongoose = require('mongoose');

module.exports = mongoose.model('Order', new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  items: Array,
  createdAt: { type: Date, default: Date.now }
}));
