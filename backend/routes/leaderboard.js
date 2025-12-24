const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../controllers/leaderboardController');
const auth = require('../middleware/auth');

// @route   GET api/leaderboard
router.get('/', auth, getLeaderboard);

module.exports = router;
