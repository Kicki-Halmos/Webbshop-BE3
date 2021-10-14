/* eslint-disable indent */
const User = require('../models/UserModel');
const Cart = require('../models/CartModel');

exports.getCart = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User
      .findOne({ email })
      .select('_id');

    const cart = await Cart
      .findOne({ userId: user.id })
      .populate('products.product');

    res.status(200).json({ data: cart });
  } catch (error) {
    console.log(error);
  }
};

exports.addNewCart = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User
      .findOne({ email })
      .select('_id');

    await Cart
      .findOneAndUpdate({ userId: user.id },
        { products: [], userId: user.id },
        { upsert: true });

    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
};
