const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// Add new user (admin only)
router.post("/adduser", auth, admin, async (req, res) => {
  let success = false;
  try {
    const { name, email, password, role } = req.body;
    const x = await User.findOne({ email: email });
    if (x) {
      res.status(409).json({ success, message: "user already exists" });
      return;
    }
    const user = new User({ name, email, password, role });
    await user.save();
    success = true;
    user.password = password;
    res.status(201).json({ success, message: "User created successfully", user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all user (admin only)
router.get("/users", auth, admin, async (req, res) => {
  let success = false;
  try {
    const users = await User.find().select('-password'); // Exclude passwords from the result
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({success, error: error.message });
  }
});

// Update user (admin only)
router.put("/users-update/:id", auth, admin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, role },
      { new: true }
    );
    user.password = password;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
