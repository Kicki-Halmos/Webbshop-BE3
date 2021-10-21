const Product = require('../models/ProductModel');
const AppError = require('../utils/AppError');
const wrapAsync = require('../utils/wrapAsync');

exports.addNewProduct = wrapAsync(async (req, res) => {
  const {
    title, price, description, brand, category, img,
  } = req.body;

  const product = new Product({
    title,
    price,
    description,
    brand,
    category,
    img,
  });

  await product.save();
  res.status(201).json({ data: product });
});

exports.findProduct = wrapAsync(async (req, res, next) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const oneProduct = await Product.findOne({ _id: req.params.id });
    if (!oneProduct) {
      return next(new AppError('the product does not exist', 404));
    }
    return res.status(200).json({ data: oneProduct });
  }
  return next(new AppError('the product does not exist', 404));
});

exports.allProducts = wrapAsync(async (req, res) => {
  const allProducts = await Product.find({});
  res.status(200).json({ data: allProducts });
});

exports.updateProduct = wrapAsync(async (req, res, next) => {
  const {
    title, price, description, brand, category, img,
  } = req.body;
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
    title, price, description, brand, category, img,
  }, { new: true });
  if (!updatedProduct) {
    return next(new AppError('the product does not exist', 404));
  }
  return res.status(200).json({ data: updatedProduct });
});

exports.deleteProduct = wrapAsync(async (req, res, next) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id });
  if (!product) {
    return next(new AppError('the product does not exist', 404));
  }
  return res.status(204).json({ data: null });
});
