const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const AppError = require('../utils/AppError');

exports.getUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    return res.status(200).json({ data: user });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      fullName, email, password, phoneNumber, address,
    } = req.body;
    const user = await User.findOneAndUpdate(req.params.id, {
      fullName, email, password, phoneNumber, address,
    }, { new: true });
    return res.status(200).json({ data: user });
  } catch (error) {
    return next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const {
      fullName, email, password, phoneNumber, address,
    } = req.body;
    const newUser = new User({
      fullName, email, password, phoneNumber, address,
    });
    await newUser.save();
    return res.status(200).json({ data: newUser });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new AppError('need to fill in email and password', 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
      next(new AppError('email or password incorrect', 401));
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      user.password = undefined;
      res.status(200).json({ token, data: { user } });
    } else {
      next(new AppError('email or password incorrect', 401));
    }
  } catch (error) {
    next(error);
  }
};
