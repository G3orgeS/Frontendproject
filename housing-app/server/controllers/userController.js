const User = require('../models/User');
const express = require('express');
const router = express.Router();

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte hämta användare' });
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, username } = req.body;
    console.log('Registrerar en ny användare...');

    const newUser = new User({ firstname, lastname, email, username });
    await newUser.save();

    res.status(201).json({ message: 'Användaren har registrerats.' });
  } catch (error) {
    console.error('Fel vid registrering av användare:', error);
    res.status(500).json({ message: 'Ett fel inträffade vid registreringen.' });
  }
};

router.get('/', getAllUsers);
router.post('/register', registerUser);

module.exports = {
  getAllUsers,
  registerUser,
};
