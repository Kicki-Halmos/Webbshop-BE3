const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,

  },
  sent: {
    type: Boolean,
  },

});

module.exports = mongoose.model('Order', OrderSchema);
