const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,

  },
  sent: {
    type: String,
    default: 'registered',
  },
  totalCost: {
    type: Number,
  },
  deliveryCost: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

});

module.exports = mongoose.model('Order', OrderSchema);
