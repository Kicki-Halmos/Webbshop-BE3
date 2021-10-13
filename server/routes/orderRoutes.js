const express = require('express');
const { addNewOrder, getAllOrders, uppdateOrder } = require('../controller/orderController');

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', addNewOrder);
router.put('/:id', uppdateOrder);

module.exports = router;
