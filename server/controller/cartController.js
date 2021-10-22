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
  const {
    product, quantity, val,
  } = req.body;
  console.log(req.body);
  const quantityNumber = Number(quantity);
  let updatedProducts = [];
  const cart = await Cart
    .findOne({ userId: req.user._id });

  const existingProduct = cart.products.find((item) => item.product == product);

  if (val === 'remove') {
    updatedProducts = cart.products.filter((item) => item.product != product);
    console.log(updatedProducts);
  }

  if (val !== 'remove') {
    if (existingProduct) {
      updatedProducts = cart.products.map((item) => {
        if (product == item.product) {
          if (val === 'plus') {
            return { product: item.product, quantity: item.quantity + quantityNumber };
          } return { product: item.product, quantity };
        }
        return item;
      });
    } else {
      console.log('hej');
      updatedProducts = cart.products;
      updatedProducts.push({ product, quantity });
    }
  }

  // console.log(updatedProducts);
  const updatedCart = await Cart
    .findOneAndUpdate({ userId: req.user._id }, { products: updatedProducts }, { new: true })
    .populate('products.product');
  return res.status(200).json({ data: updatedCart });
});

exports.deleteCart = wrapAsync(async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user._id });

  res.status(204).end();
});
