const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);