const express = require('express');
const {
  allProducts, findProduct, addNewProduct, updateProduct, deleteProduct,
} = require('../controller/productController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.get('/', allProducts);
router.get('/:id', findProduct);
router.post('/', adminAuth, addNewProduct);
router.put('/:id', adminAuth, updateProduct);
router.delete('/:id', adminAuth, deleteProduct);

module.exports = router;
