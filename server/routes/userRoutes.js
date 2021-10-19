const express = require('express');
const userController = require('../controller/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// get user info
router.get('/', auth, userController.getUser);

// update user info
router.put('/:id', auth, userController.update);

router.post('/login', userController.login);

router.post('/register', userController.register);

module.exports = router;
