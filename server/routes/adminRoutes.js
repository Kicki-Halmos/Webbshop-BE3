const express = require('express');
const {
  getAllOrders, uppdateOrder, getSingleOrder, deleteOrder,
} = require('../controller/orderController');
const {
  allProducts, findProduct, addNewProduct, updateProduct, deleteProduct,
} = require('../controller/productController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();
// orders
router.get('/', adminAuth, getAllOrders);
router.get('/:id', adminAuth, getSingleOrder);
router.put('/:id', adminAuth, uppdateOrder);
router.delete('/:id', adminAuth, deleteOrder);

// products
router.get;

module.exports = router;
