// server/routes/api/auth.js
const express = require('express');
const router = express.Router();

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', (req, res) => {
  res.json({ msg: 'Login route' });
});

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
  res.json({ msg: 'Register route' });
});

module.exports = router;