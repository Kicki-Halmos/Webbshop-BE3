/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/UserModel');
const AppError = require('../utils/AppError');
const wrapAsync = require('../utils/wrapAsync');
const Order = require('../models/OrderModel');

exports.getUser = wrapAsync(async (req, res) => {
  req.user.password = undefined;
  res.status(200).json({ data: req.user });
});

exports.update = wrapAsync(async (req, res, next) => {
  const {
    fullName, email, phoneNumber, address,
  } = req.body;
  if (!fullName || !email || !phoneNumber || !address) {
    return next(new AppError('need to fill in all forms', 400));
  }
  if (!validator.isEmail(email)) {
    return next(new AppError('the email field needs to be correct', 400));
  }
  // eslint-disable-next-line no-underscore-dangle
  const user = await User.findOneAndUpdate({ _id: req.user._id }, {
    fullName,
    email,
    phoneNumber,
    address,

  }, { new: true });
  return res.status(200).json({ data: user, message: 'Your information was updated', status: 'success' });
});

exports.register = wrapAsync(async (req, res, next) => {
  const {
    fullName, email, password, phoneNumber, address,
  } = req.body;
  if (!fullName || !email || !password || !phoneNumber || !address) {
    next(new AppError('need to fill in all forms', 400));
  }
  if (password.length < 5 || password.length > 100) {
    next(new AppError('password needs to be at least 5 characters (max 100)', 400));
  }
  if (!validator.isEmail(email)) {
    next(new AppError('the email field needs to be correct', 400));
  }
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
    if (user.isAdmin === true) {
      const adminToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_ADMIN);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      user.password = undefined;
      return res.status(200).json({ adminToken, token, data: { user } });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    user.password = undefined;
    return res.status(200).json({ token, data: { user } });
  }
  return next(new AppError('email or password incorrect', 401));
});

// get users orders
exports.getMyOrders = wrapAsync(async (req, res) => {
  const orders = await Order
    .find({ userId: req.user._id })
    .populate('products.product');

  res.status(200).json({ data: orders });
});

// add new order
exports.addNewOrder = wrapAsync(async (req, res) => {
  const {
    products, totalCost, deliveryCost,
  } = req.body;

  const userId = req.user.id;
  const deliveryAddress = req.user.address;

  const order = await new Order({
    products,
    totalCost,
    deliveryCost,
    deliveryAddress,
    userId,
  });

  order.save();
  res.status(201).json({ data: order });
});
