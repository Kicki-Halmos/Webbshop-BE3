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
router.get('/orders', adminAuth, getAllOrders);
router.get('/orders/:id', adminAuth, getSingleOrder);
router.put('/orders/:id', adminAuth, uppdateOrder);
router.delete('/orders/:id', adminAuth, deleteOrder);

// products
router.get('/products', adminAuth, allProducts);
router.get('/products/:id', adminAuth, findProduct);
router.post('/products', adminAuth, addNewProduct);
router.put('/products/:id', adminAuth, updateProduct);
router.delete('/products/:id', adminAuth, deleteProduct);

module.exports = router;
