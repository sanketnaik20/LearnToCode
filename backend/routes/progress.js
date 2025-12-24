const express = require('express');
const router = express.Router();
const { validateAnswer, completeLesson } = require('../controllers/progressController');
const auth = require('../middleware/auth');
const { submissionLimiter } = require('../middleware/rateLimiter');

// @route   POST api/progress/validate
router.post('/validate', [auth, submissionLimiter], validateAnswer);

// @route   POST api/progress/complete-lesson
router.post('/complete-lesson', auth, completeLesson);

module.exports = router;
