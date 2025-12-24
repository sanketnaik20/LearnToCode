const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ username, email, password });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '7d' });
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                collegeName: user.collegeName,
                xp: user.xp,
                streakCount: user.streakCount
            } 
        });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: err.message || 'Initialization failed' });
    }
});

// @route   POST api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Identity not found. Please register.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Security credentials invalid.' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '7d' });
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                collegeName: user.collegeName,
                xp: user.xp,
                streakCount: user.streakCount
            } 
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Terminal access denied. Server error.' });
    }
});

const auth = require('../middleware/auth');

// @route   GET api/auth/profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/auth/update-profile
router.put('/update-profile', auth, async (req, res) => {
    try {
        const { username, collegeName } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (username && username !== user.username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already taken by another architect.' });
            }
            user.username = username;
        }
        
        if (collegeName !== undefined) user.collegeName = collegeName;

        await user.save();
        res.json({ 
            id: user._id, 
            username: user.username, 
            email: user.email, 
            collegeName: user.collegeName,
            xp: user.xp,
            streakCount: user.streakCount
        });
    } catch (err) {
        console.error('Update Profile Error:', err);
        res.status(500).json({ message: 'System failure during profile update.' });
    }
});

module.exports = router;
