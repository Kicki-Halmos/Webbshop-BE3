const express = require('express');
const {
  allProducts, findProduct,
} = require('../controller/productController');

const router = express.Router();

router.get('/', allProducts);
router.get('/:id', findProduct);

module.exports = router;
