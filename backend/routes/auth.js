const express = require('express');
const router = express.Router();
const passport = require('passport');
const { 
    register, 
    login, 
    getProfile, 
    updateProfile, 
    googleCallback 
} = require('../controllers/authController');
const auth = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

// @route   GET api/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET api/auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { 
        failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login` 
    }),
    googleCallback
);

// @route   POST api/auth/register
router.post('/register', authLimiter, register);

// @route   POST api/auth/login
router.post('/login', authLimiter, login);

// @route   GET api/auth/profile
router.get('/profile', auth, getProfile);

// @route   PUT api/auth/update-profile
router.put('/update-profile', auth, updateProfile);

module.exports = router;
