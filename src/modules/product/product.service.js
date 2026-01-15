const Product = require('./product.model');

exports.create = (data) => Product.create(data);
exports.list = (query) => Product.find(query);