// server/routes/api/auth.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const { 
  registerUser, 
  loginUser, 
  pictureLogin, 
  getCurrentUser 
} = require('../../controllers/authController');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('username', 'Username is required').notEmpty(),
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('role', 'Role is required').isIn(['student', 'teacher', 'parent', 'admin'])
  ],
  registerUser
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  loginUser
);

// @route   POST api/auth/picture-login
// @desc    Picture-based login for younger students
// @access  Public
router.post(
  '/picture-login',
  [
    check('username', 'Username is required').notEmpty(),
    check('picturePassword', 'Picture selection is required').isArray({ min: 1 })
  ],
  pictureLogin
);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, getCurrentUser);

module.exports = router;