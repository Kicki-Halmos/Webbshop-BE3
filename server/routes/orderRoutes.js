const express = require('express');
const {
  addNewOrder, getAllOrders, uppdateOrder, getSingleOrder, deleteOrder,
} = require('../controller/orderController');
const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', adminAuth, getAllOrders);
router.get('/:id', adminAuth, getSingleOrder);
router.post('/', auth, addNewOrder);
router.put('/:id', adminAuth, uppdateOrder);
router.delete('/:id', adminAuth, deleteOrder);

module.exports = router;
