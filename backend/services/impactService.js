/**
 * Impact (XP) Calculation Service
 * Implements a dynamic, gamified XP system based on multiple factors.
 */

class ImpactService {
    // Base XP by question type
    static BASE_XP = {
        MCQ: 10,
        FILL_IN_BLANK: 15,
        PARSONS: 25,
        DEBUG: 30 // Future question type
    };

    // Difficulty multipliers by lesson level
    static DIFFICULTY_MULTIPLIER = {
        'Beginner': 1.0,
        'Intermediate': 1.5,
        'Advanced': 2.0,
        'Master': 2.5
    };

    /**
     * Calculate the XP earned for a correct answer.
     * 
     * @param {Object} params
     * @param {string} params.questionType - MCQ, FILL_IN_BLANK, PARSONS, DEBUG
     * @param {string} params.lessonLevel - Beginner, Intermediate, Advanced, Master
     * @param {number} params.streakCount - Current user streak in days
     * @param {boolean} params.isFirstAttempt - Whether this is the user's first attempt on this question
     * @returns {Object} { baseXP, multipliers, totalXP }
     */
    static calculate({ questionType, lessonLevel, streakCount, isFirstAttempt }) {
        // 1. Base XP
        const baseXP = this.BASE_XP[questionType] || 10;

        // 2. Streak Multiplier: 1 + (streak * 0.05), capped at 2.0
        // Ensure streakCount is a number, default to 0
        const safelyStreak = Number(streakCount) || 0;
        const streakMultiplier = Math.min(2.0, 1 + (safelyStreak * 0.05));

        // 3. Difficulty Multiplier
        const difficultyMultiplier = this.DIFFICULTY_MULTIPLIER[lessonLevel] || 1.0;

        // 4. First-Time Bonus: +50%
        const firstTimeMultiplier = isFirstAttempt ? 1.5 : 0.75;

        // Calculate total
        let totalXP = baseXP * streakMultiplier * difficultyMultiplier * firstTimeMultiplier;
        
        // Safety check against NaN or negative
        if (isNaN(totalXP) || totalXP < 0) totalXP = 10;
        
        totalXP = Math.round(totalXP);

        return {
            baseXP,
            multipliers: {
                streak: streakMultiplier.toFixed(2),
                difficulty: difficultyMultiplier.toFixed(2),
                firstTime: firstTimeMultiplier.toFixed(2)
            },
            totalXP
        };
    }

    /**
     * Get a formatted breakdown string for the user.
     */
    static getBreakdown(impactResult) {
        return `Base: ${impactResult.baseXP} × Streak: ${impactResult.multipliers.streak} × Difficulty: ${impactResult.multipliers.difficulty} × First: ${impactResult.multipliers.firstTime} = ${impactResult.totalXP} XP`;
    }
}

module.exports = ImpactService;
