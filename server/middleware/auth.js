const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new AppError('You must be logged in', 403));
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      next(new AppError('You must be logged in', 403));
    }
    const { userId } = decoded;

    const user = await User.findById(userId);

    req.user = user;
    next();
  });
};
