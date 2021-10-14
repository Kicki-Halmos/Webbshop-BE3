const mongoose = require('mongoose');

const cartItem = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const cartSchema = new mongoose.Schema({
  products: {
    type: [cartItem],
    default: undefined,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

module.exports = mongoose.model('Cart', cartSchema);
