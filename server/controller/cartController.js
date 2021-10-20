/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eol-last */
const Cart = require('../models/CartModel');
const wrapAsync = require('../utils/wrapAsync');

exports.getCart = wrapAsync(async (req, res) => {
  const cart = await Cart
    .findOne({ userId: req.user._id })
    .populate('products.product');

  res.status(200).json({ data: cart });
});

exports.addNewCart = wrapAsync(async (req, res) => {
  const { product, quantity } = req.body;
  console.log(req.body);
  await new Cart({ products: [{ product, quantity }], userId: req.user._id })
    .save();
  const cart = await Cart.findOne({ userId: req.user._id })
    .populate('products.product');
  res.status(200).json({ data: cart });
});

exports.updateCart = wrapAsync(async (req, res) => {
  const { product, quantity } = req.body;
  let updatedProducts = [];
  const cart = await Cart
    .findOne({ userId: req.user._id })
    .populate('products.product');
  const existingProduct = cart.products.map((item) => {
    if (item.product._id == product) {
      return true;
    }
    return false;
  });
  console.log(cart);
  if (existingProduct) {
    updatedProducts = cart.products.map((item) => {
      if (product == item.product._id) {
        // eslint-disable-next-line no-return-assign
        return { product: item.product._id, quantity: item.quantity + quantity };
      }
      return item;
    });
  } else {
    updatedProducts.push({ product, quantity });
  }
  console.log(updatedProducts);
  return res.status(200).end();
});

exports.deleteCart = wrapAsync(async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user._id });

  res.status(204).end();
});
