const Problem = require('../models/Problem');
const axios = require('axios');

// Get all problems
exports.getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().sort('order');
        res.json(problems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single problem by slug (Legacy, mainly for redirects if needed)
exports.getProblemBySlug = async (req, res) => {
    try {
        const problem = await Problem.findOne({ slug: req.params.slug });
        if (!problem) return res.status(404).json({ message: 'Problem not found' });
        res.json(problem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fetch LeetCode stats for a specific username
exports.getLeetCodeStats = async (req, res) => {
    const { username } = req.params;
    
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    // Try multiple APIs because these public stats APIs can be unstable
    const apis = [
        `https://leetcode-stats-api.herokuapp.com/${username}`,
        `https://alfa-leetcode-api.onrender.com/userProfile/${username}`
    ];

    for (const apiUrl of apis) {
        try {
            const response = await axios.get(apiUrl, { timeout: 5000 });
            
            // Normalize response based on which API succeeded
            let data = response.data;
            
            // If it's the herokuapp one
            if (apiUrl.includes('herokuapp')) {
                if (data.status === 'success') {
                    return res.json(data);
                }
            } 
            // If it's the render one (alfa-leetcode-api)
            else if (apiUrl.includes('onrender')) {
                // Map alfa-leetcode-api response to our expected format
                if (data.username) {
                    return res.json({
                        status: 'success',
                        totalSolved: data.totalSolved,
                        totalQuestions: data.totalQuestions,
                        easySolved: data.easySolved,
                        totalEasy: data.totalEasy,
                        mediumSolved: data.mediumSolved,
                        totalMedium: data.totalMedium,
                        hardSolved: data.hardSolved,
                        totalHard: data.totalHard,
                        acceptanceRate: data.acceptanceRate,
                        ranking: data.ranking
                    });
                }
            }
        } catch (err) {
            console.warn(`LeetCode API ${apiUrl} failed:`, err.message);
            // Continue to next API
        }
    }

    res.status(404).json({ message: 'Could not fetch LeetCode statistics. Make sure the username is correct or try again later.' });
};
