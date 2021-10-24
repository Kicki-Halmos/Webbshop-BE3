const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  products: { type: Array },
  status: {
    type: String,
    default: 'registered',
  },
  totalCost: {
    type: Number,
  },
  deliveryCost: {
    type: Number,
  },
  deliveryAddress: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

});

module.exports = mongoose.model('Order', OrderSchema);
