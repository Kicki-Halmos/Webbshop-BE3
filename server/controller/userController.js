const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const AppError = require('../utils/AppError');
const wrapAsync = require('../utils/wrapAsync');

exports.getUser = wrapAsync(async (req, res) => {
  req.user.password = undefined;
  res.status(200).json({ data: req.user });
});

exports.update = wrapAsync(async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.body.id }, {
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  }, { new: true });
  return res.status(200).json({ data: user });
});

exports.register = wrapAsync(async (req, res) => {
  const {
    fullName, email, password, phoneNumber, address,
  } = req.body;
  const newUser = new User({
    fullName, email, password, phoneNumber, address,
  });
  await newUser.save();
  res.status(200).json({ data: newUser });
});

exports.login = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('need to fill in email and password', 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('email or password incorrect', 401));
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    user.password = undefined;
    return res.status(200).json({ token, data: { user } });
  }
  return next(new AppError('email or password incorrect', 401));
});
