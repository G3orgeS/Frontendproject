const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, userName, password } = req.body;

    // Kontrollera om användaren redan existerar
    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return res.status(400).json({ message: 'Användarnamnet är redan upptaget.' });
    }

    // Skapa en hash av lösenordet
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Skapa en ny användare
    const newUser = new User({
      firstName,
      lastName,
      email,
      userName,
      passwordHash,
    });

    await newUser.save();

    res.status(201).json({ message: 'Användaren har registrerats.' });
  } catch (error) {
    console.error('Fel vid registrering av användare:', error);
    res.status(500).json({ message: 'Ett fel inträffade vid registreringen.' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Kontrollera om användaren existerar
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({ message: 'Användaren finns inte.' });
    }

    // Jämför inmatat lösenord med hashat lösenord
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Felaktigt lösenord.' });
    }

    const payload = {
      userId: user._id,
      username: user.userName,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Fel vid inloggning:', error);
    res.status(500).json({ message: 'Ett fel inträffade vid inloggningen.' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte hämta användare' });
  }
};

const getUserByToken = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      console.log('Ingen token tillhandahållen');
      return res.status(401).json({ message: 'Åtkomst nekad. Ingen token tillhandahållen.' });
    }

    const decoded = jwt.verify(token, secretKey);

    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      console.log('Användaren hittades inte');
      return res.status(404).json({ message: 'Användaren hittades inte.' });
    }

    return res.status(200).json({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.log('Fel vid verifiering av token:', error);
    return res.status(403).json({ message: 'Åtkomst nekad. Ogiltig token.' });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserByToken,
};