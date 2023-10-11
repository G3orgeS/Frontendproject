const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function generateToken(user) {
  const payload = {
    userId: user._id,
    username: user.username,
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
}

function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Åtkomst nekad. Ingen token tillhandahållen.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Åtkomst nekad. Ogiltig token.' });
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
