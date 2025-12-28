const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
        return next(new ErrorResponse('User already exists', 400));
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorResponse('Identity not found. Please register.', 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new ErrorResponse('Security credentials invalid.', 401));
    }

    sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Update profile
// @route   PUT /api/auth/update-profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const { username, collegeName, leetcodeUsername } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }

    if (username && username !== user.username) {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return next(new ErrorResponse('Username already taken by another architect.', 400));
        }
        user.username = username;
    }

    if (collegeName !== undefined) user.collegeName = collegeName;
    if (leetcodeUsername !== undefined) user.leetcodeUsername = leetcodeUsername;

    await user.save();

    res.status(200).json({
        success: true,
        data: {
            id: user._id,
            username: user.username,
            email: user.email,
            collegeName: user.collegeName,
            leetcodeUsername: user.leetcodeUsername,
            xp: user.xp,
            streakCount: user.streakCount
        }
    });
});

// @desc    Google auth success callback
exports.googleCallback = asyncHandler(async (req, res, next) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '7d' });
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/oauth-success?token=${token}`);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '7d' });

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            collegeName: user.collegeName,
            leetcodeUsername: user.leetcodeUsername,
            xp: user.xp,
            streakCount: user.streakCount
        }
    });
};
