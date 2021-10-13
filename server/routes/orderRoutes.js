const express = require('express');
const { addNewOrder, getAllOrders } = require('../controller/orderController');

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', addNewOrder);

module.exports = router;
