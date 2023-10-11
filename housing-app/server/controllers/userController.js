const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  try {
  } catch (error) {
    console.error('Fel vid registrering av användare:', error);
    res.status(500).json({ message: 'Ett fel inträffade vid registreringen.' });
  }
};
const loginUser = async (req, res) => {
  try {
  } catch (error) {
    console.error('Fel vid inloggning:', error);
    res.status(500).json({ message: 'Ett fel inträffade vid inloggningen.' });
  }
};
// const getSingleUserById = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const user = await User.findById(userId).select('-password');

//     if (!user) {
//       return res.status(404).json({ message: 'Användaren hittades inte.' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Fel vid hämtning av användarinformation:', error);
//     res.status(500).json({ message: 'Ett fel inträffade vid hämtning av användarinformation.' });
//   }
// };
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte hämta användare' });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  // getSingleUserById,
};
