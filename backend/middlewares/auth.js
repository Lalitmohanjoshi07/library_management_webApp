const jwt = require('jsonwebtoken');
const JWT_secret = require('../keys.js')

// Middleware to verify JWT token
const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_secret); // Secret key
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
