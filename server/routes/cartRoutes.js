const express = require('express');
const { getCart, addNewCart } = require('../controller/cartController');

const router = express.Router();

router.get('/', getCart);

router.post('/', addNewCart);

// router.put('/', updateCart;
// router.delete('/', deleteCart);

module.exports = router;
