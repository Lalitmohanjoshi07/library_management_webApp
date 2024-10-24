const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_secret = require('../keys.js')


const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
    // console.log(email, password)
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // console.log(user, JWT_secret)

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_secret, // Secret key for JWT
    );

    // Send the token and user info
    res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
