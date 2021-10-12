const Product = require('../models/Product');

exports.addNewProduct = async (req, res) => {
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

  await product.save().then(res.send('product saved')).catch((error) => { console.log(error); });
};

exports.updateProduct = async (req, res) => {
  res.status(200).json({ message: 'updated' });
};

exports.deleteProduct = async (req, res) => {
  res.status(200).json({ message: 'deleted' });
};
