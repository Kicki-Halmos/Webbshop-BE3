/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  const adminToken = req.header('x-auth-token');
  if (!adminToken) {
    return next(new AppError('You must be logged in as admin', 403));
  }
  jwt.verify(adminToken, process.env.JWT_SECRET_ADMIN, async (err) => {
    if (err) {
      return next(new AppError('You must be logged in as admin', 403));
    }
    next();
  });
};
