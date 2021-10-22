const express = require('express');
const {
  addNewOrder, getAllOrders, uppdateOrder, getSingleOrder, deleteOrder,
} = require('../controller/orderController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.get('/', adminAuth, getAllOrders);
router.get('/:id', getSingleOrder);
router.post('/', addNewOrder);
router.put('/:id', uppdateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
