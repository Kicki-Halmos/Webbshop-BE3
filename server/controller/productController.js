const Product = require('../models/ProductModel');
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

exports.findProduct = wrapAsync(async (req, res) => {
  const oneProduct = await Product.findOne({ _id: req.params.id });
  res.status(200).json({ data: oneProduct });
});

exports.allProducts = wrapAsync(async (req, res) => {
  const allProducts = await Product.find({});
  res.status(200).json({ data: allProducts });
});

exports.updateProduct = wrapAsync(async (req, res) => {
  const {
    title, price, description, brand, category, img,
  } = req.body;
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
    title, price, description, brand, category, img,
  }, { new: true });
  res.status(200).json({ data: updatedProduct });
});

exports.deleteProduct = wrapAsync(async (req, res) => {
  await Product.findOneAndDelete({ id: req.params.id });
  res.status(204);
});
