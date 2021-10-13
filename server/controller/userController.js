const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.getUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    return res.status(200).json({ data: user });
  } catch (error) {
    return console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    const {
      fullName, email, password, phoneNumber, address,
    } = req.body;
    const user = await User.findOneAndUpdate(req.params.id, {
      fullName, email, password, phoneNumber, address,
    }, { new: true });
    return res.status(200).json({ data: user });
  } catch (error) {
    return console.log(error);
  }
};

exports.register = async (req, res) => {
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
    return console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json('need to fill in email and password');
    }
    const user = await User.findOne({ email });
    if (user === null) {
      res.status(400).json('email or password incorrect');
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.status(200).json({ message: 'Succesfully loged in', data: token });
    }
  } catch (error) {
    console.log(error);
  }
};
