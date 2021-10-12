const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

/* GET home page. */
router.post('/', async (req, res) => {
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
});

module.exports = router;
