const User = require('../models/UserModel');
const Cart = require('../models/CartModel');
const wrapAsync = require('../utils/wrapAsync');

exports.getCart = wrapAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User
    .findOne({ email })
    .select('_id');

  const cart = await Cart
    .findOne({ userId: user.id })
    .populate('products.product');

  res.status(200).json({ data: cart });
});

exports.addNewCart = wrapAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User
    .findOne({ email })
    .select('_id');

  await Cart
    .findOneAndUpdate({ userId: user.id },
      { products: [], userId: user.id },
      { upsert: true });

  res.status(204).end();
});

exports.updateCart = wrapAsync(async (req, res) => {
  const { email, cart } = req.body;
  const cartData = JSON.parse(cart);
  const user = await User
    .findOne({ email })
    .select('_id');

  const updatedCart = await Cart
    .findOneAndUpdate({ userId: user.id },
      { products: cartData.products, userId: user.id });
  res.status(200).json({ data: updatedCart });
});

exports.deleteCart = wrapAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User
    .findOne({ email })
    .select('_id');

  await Cart.findOneAndDelete({ userId: user.id });

  res.status(204).end();
});
