const express = require('express');
const {
  allProducts, findProduct, addNewProduct, updateProduct, deleteProduct,
} = require('../controller/products');

const router = express.Router();

router.get('/all', allProducts);
router.get('/one', findProduct);
router.post('/new', addNewProduct);
router.post('/update', updateProduct);
router.delete('/delete', deleteProduct);

module.exports = router;
