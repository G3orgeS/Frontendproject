const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

router.post('/register', userController.registerUser); // Uppdaterad

router.post('/login', async (req, res) => {
  try {
    console.log('Någon försöker logga in...');
  } catch (error) {
    console.error('Fel vid inloggning:', error);
  }
});

module.exports = router;

