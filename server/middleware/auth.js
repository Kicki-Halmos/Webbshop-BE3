const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: 'Token is not valid',
        });
      }
      const { userId } = decoded;

      const user = await User.findById(userId);

      req.user = user;

      next();
    });
  } else {
    res.json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};
