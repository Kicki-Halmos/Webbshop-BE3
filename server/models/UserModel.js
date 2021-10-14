const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

userSchema.virtual('cart', {
  ref: 'Cart',
  foreignField: 'userId',
  localField: '_id',
});

module.exports = mongoose.model('User', userSchema);
