const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const AppError = require('../utils/AppError');

module.exports = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return next(new AppError('You must be logged in', 403));
      }
      const { userId } = decoded;

      const user = await User.findById(userId);

      req.user = user;

      return next();
    });
  }
  return next(new AppError('You must be logged in', 403));
};
