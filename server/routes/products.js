const express = require('express');
const { addNewProduct, updateProduct, deleteProduct } = require('../controller/products');

const router = express.Router();

router.post('/', addNewProduct);
router.post('/update', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
