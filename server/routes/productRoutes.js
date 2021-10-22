const express = require('express');
const {
  allProducts, findProduct, addNewProduct, updateProduct, deleteProduct,
} = require('../controller/productController');

const router = express.Router();

router.get('/', allProducts);
router.get('/:id', findProduct);
router.post('/', addNewProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
