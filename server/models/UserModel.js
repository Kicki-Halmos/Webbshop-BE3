const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
});

userSchema.pre('save', async function hashPass(next) {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// userSchema.methods.comparePassword = function(password, callback) {
//   bcrypt.compare(password, this.password, (error, isMatch) => {
//     if (error) {
//       return callback(error);
//     } else {
//       if (!isMatch) {
//         return callback(null, isMatch)
//       }
//     }
//   })
// }

module.exports = mongoose.model('User', userSchema);
