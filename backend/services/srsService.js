/**
 * Spaced Repetition System (SRS) Service
 * Based on the SuperMemo-2 (SM-2) algorithm principles.
 */

class SrsService {
    /**
     * Calculates the next review date and updated mastery metrics.
     * 
     * @param {Object} currentStats 
     * @param {number} currentStats.interval - current interval in days
     * @param {number} currentStats.repetition - consecutive correct responses
     * @param {number} currentStats.efactor - ease factor (default 2.5)
     * @param {number} quality - user response quality (0-5)
     *        5: perfect response
     *        4: correct response after a hesitation
     *        3: correct response with serious difficulty
     *        2: incorrect response; where the correct one seemed easy to recall
     *        1: incorrect response; the correct one remembered
     *        0: complete blackout.
     * 
     * @returns {Object} Updated stats { interval, repetition, efactor, nextReviewDate }
     */
    static calculateNextReview(currentStats, quality) {
        let { interval, repetition, efactor } = currentStats;

        if (quality >= 3) {
            // Correct response
            if (repetition === 0) {
                interval = 1;
            } else if (repetition === 1) {
                interval = 6;
            } else {
                interval = Math.round(interval * efactor);
            }
            repetition++;
        } else {
            // Incorrect response
            repetition = 0;
            interval = 1;
        }

        // Update Ease Factor
        efactor = efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (efactor < 1.3) efactor = 1.3;

        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + interval);

        return {
            interval,
            repetition,
            efactor,
            nextReviewDate
        };
    }

    /**
     * Simplified logic for flagging concepts based on failure.
     */
    static getReviewPriority(incorrectAttempts, lastReviewDate) {
        // Higher weight if failed many times recently
        const daysSinceLastReview = (new Date() - new Date(lastReviewDate)) / (1000 * 60 * 60 * 24);
        return (incorrectAttempts * 2) + Math.max(0, 7 - daysSinceLastReview);
    }
}

module.exports = SrsService;
