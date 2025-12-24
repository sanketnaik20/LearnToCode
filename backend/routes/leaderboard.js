const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/leaderboard
// @desc    Get top users and current user statistics
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const topUsers = await User.find({})
            .select('username xp streakCount collegeName')
            .sort({ xp: -1 })
            .limit(50)
            .lean();

        // Calculate rankings and add status
        const leaderboard = topUsers.map((u, index) => ({
            ...u,
            rank: index + 1,
            status: calculateStatus(u.xp),
            isCurrentUser: u._id.toString() === req.user.id
        }));

        // Get current user stats if not in top 50 (or even if they are, for the stats header)
        // Find user's rank
        const countHigher = await User.countDocuments({ xp: { $gt: (await User.findById(req.user.id)).xp } });
        const userRank = countHigher + 1;
        const totalUsers = await User.countDocuments();
        
        const percentile = Math.max(1, Math.ceil((userRank / totalUsers) * 100));
        
        // Define percentile string
        let percentileString = `Top ${percentile}%`;
        if (percentile > 50) percentileString = `Bottom ${100 - percentile}%`;
        
        res.json({
            users: leaderboard,
            userStats: {
                rank: userRank,
                percentile: percentileString,
                totalUsers
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

function calculateStatus(xp) {
    if (xp >= 5000) return 'PRO_LOGICIST';
    if (xp >= 1000) return 'KERNEL_CONTRIBUTOR';
    return 'JUNIOR_ARCHITECT';
}

module.exports = router;
