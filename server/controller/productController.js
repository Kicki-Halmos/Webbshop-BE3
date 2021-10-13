const Product = require('../models/ProductModel');

exports.addNewProduct = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

exports.findProduct = async (req, res) => {
  try {
    const oneProduct = await Product.findOne({ id: req.params.id });
    res.status(200).json({ data: oneProduct });
  } catch (error) {
    console.log(error);
  }
};

exports.allProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({ data: allProducts });
  } catch (error) {
    console.log(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      title, price, description, brand, category, img,
    } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      title, price, description, brand, category, img,
    }, { new: true });
    res.status(200).json({ data: updatedProduct });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.params.id });
    res.status(204);
  } catch (error) {
    console.log(error);
  }
};
