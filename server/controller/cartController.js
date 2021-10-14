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
