const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,

  },
  sent: {
    type: Boolean,
  },
  totalCost: {
    type: Number,
  },
  deliveryCost: {
    type: Number,
  },

});

module.exports = mongoose.model('Order', OrderSchema);
