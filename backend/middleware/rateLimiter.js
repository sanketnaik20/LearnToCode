const rateLimit = require('express-rate-limit');

// General API rate limiter - Production Grade
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, 
    message: { message: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req, res) => process.env.NODE_ENV === 'development'
});

// Community specific rate limiter - Generous for active discussion
const communityLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // High limit for browsing posts/comments/voting
    message: { message: 'Community interaction limit reached, please slow down' },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req, res) => process.env.NODE_ENV === 'development'
});

// Stricter rate limiter for sensitive authentication routes
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, 
    message: { message: 'Too many authentication attempts, please try again after an hour' },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req, res) => process.env.NODE_ENV === 'development'
});

// Rate limiter for resource-intensive question submissions
const submissionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, 
    message: { message: 'Too many submissions, please slow down' },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req, res) => process.env.NODE_ENV === 'development'
});

module.exports = {
    apiLimiter,
    communityLimiter,
    authLimiter,
    submissionLimiter
};
