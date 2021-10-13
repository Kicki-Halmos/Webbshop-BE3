const express = require('express');
const {
  addNewOrder, getAllOrders, uppdateOrder, getSingleOrder,
} = require('../controller/orderController');

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getSingleOrder);
router.post('/', addNewOrder);
router.put('/:id', uppdateOrder);

module.exports = router;
