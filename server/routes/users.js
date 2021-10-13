const express = require('express');
const userController = require('../userController');

const router = express.Router();

// get user info
router.get('/', userController.getUser);

// update user info
router.put('/:id', userController.update);

router.post('/login', userController.login);

router.post('/register', userController.register);

module.exports = router;
