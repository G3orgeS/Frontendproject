const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../auth/auth');

router.get('/', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/fetchToken', auth.verifyToken, userController.getUserByToken);

module.exports = router;