const User = require('../models/User');
const asyncHandler = require('../middleware/async');

// @desc    Get top users and current user statistics
// @route   GET /api/leaderboard
// @access  Private
exports.getLeaderboard = asyncHandler(async (req, res, next) => {
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

    // Get current user stats
    const currentUser = await User.findById(req.user.id);
    const countHigher = await User.countDocuments({ xp: { $gt: currentUser.xp } });
    const userRank = countHigher + 1;
    const totalUsers = await User.countDocuments();
    
    const percentile = Math.max(1, Math.ceil((userRank / totalUsers) * 100));
    
    // Define percentile string
    let percentileString = `Top ${percentile}%`;
    if (percentile > 50) percentileString = `Bottom ${100 - percentile}%`;
    
    res.status(200).json({
        success: true,
        data: {
            users: leaderboard,
            userStats: {
                rank: userRank,
                percentile: percentileString,
                totalUsers
            }
        }
    });
});

/**
 * @desc Helper to calculate user status based on XP
 */
function calculateStatus(xp) {
    if (xp >= 5000) return 'PRO_LOGICIST';
    if (xp >= 1000) return 'KERNEL_CONTRIBUTOR';
    return 'JUNIOR_ARCHITECT';
}
