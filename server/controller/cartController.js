/* eslint-disable no-unused-expressions */
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

  await new Cart({ products: [{ product, quantity }], userId: req.user._id })
    .save();
  const cart = await Cart.findOne({ userId: req.user._id })
    .populate('products.product');
  res.status(200).json({ data: cart });
});

exports.updateCart = wrapAsync(async (req, res) => {
  let updatedProducts = [];
  const cart = await Cart
    .findOne({ userId: req.user._id });
  const existingProduct = cart.products.find(({ product }) => product == req.body.product);

  if (existingProduct) {
    updatedProducts = cart.products.map((item) => {
      if (req.body.product == item.product) {
        return { product: item.product, quantity: item.quantity + req.body.quantity };
      }
      return item;
    });
  } else {
    updatedProducts = cart.products;
    updatedProducts.push({ product: req.body.product, quantity: req.body.quantity });
  }

  const updatedCart = await Cart
    .findOneAndUpdate({ userId: req.user._id }, { products: updatedProducts }, { new: true })
    .populate('products.product');
  return res.status(200).json({ data: updatedCart });
});

exports.deleteCart = wrapAsync(async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user._id });

  res.status(204).end();
});
