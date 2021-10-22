const express = require('express');
const { getCart, addNewCart } = require('../controller/cartController');
const { updateCart, deleteCart } = require('../controller/cartController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getCart);

router.post('/', auth, addNewCart);

router.put('/', auth, updateCart);

router.delete('/', auth, deleteCart);

module.exports = router;
