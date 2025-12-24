const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Standardized Auth Middleware
 */
module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return next(new ErrorResponse('No authentication token, authorization denied', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        req.user = decoded;
        next();
    } catch (err) {
        return next(new ErrorResponse('Access denied. Authentication sequence invalid.', 401));
    }
};
