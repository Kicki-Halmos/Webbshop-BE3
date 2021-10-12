const express = require('express');
const userController = require('../userController');

const router = express.Router();

router.get('/');

router.put('/');

router.post('/login');

router.post('/register', userController.register);

module.exports = router;
