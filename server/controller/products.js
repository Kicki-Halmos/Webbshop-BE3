const Product = require('../models/Product');

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

    await product.save().then(res.status(200).json({ message: 'Product saved', data: product })).catch((error) => { console.log(error); });
  } catch (error) {
    console.log(error);
  }
};

exports.findProduct = async (req, res) => {
  try {
    const oneProduct = await Product.findOne({ id: req.params.id });
    res.status(200).json({ message: 'found', data: oneProduct });
  } catch (error) {
    console.log(error);
  }
};

exports.allProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({ message: 'found all', data: allProducts });
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
    res.status(200).json({ message: 'updated', data: updatedProduct });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.params.id });
    res.status(200).json({ message: 'deleted' });
  } catch (error) {
    console.log(error);
  }
};
