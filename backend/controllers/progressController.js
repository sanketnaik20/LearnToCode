const Question = require('../models/Question');
const User = require('../models/User');
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const CppValidator = require('../utils/cppValidator');
const SrsService = require('../services/srsService');
const ImpactService = require('../services/impactService');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Validate question answer
// @route   POST /api/progress/validate
// @access  Private
exports.validateAnswer = asyncHandler(async (req, res, next) => {
    const { questionId, answer } = req.body;
    const question = await Question.findById(questionId).populate('lessonId');
    
    if (!question) {
        return next(new ErrorResponse('Question not found', 404));
    }

    let isCorrect = false;
    if (question.type === 'MCQ') {
        isCorrect = parseInt(answer) === question.solution;
    } else if (question.type === 'FILL_IN_BLANK') {
        isCorrect = CppValidator.validateFillInBlank(answer, question.solution);
    } else if (question.type === 'PARSONS') {
        isCorrect = CppValidator.validateParsons(answer, question.solution);
    }

    const user = await User.findById(req.user.id);
    
    // Check if user has answered this question before (for first-time bonus)
    let questionProgress = user.questionHistory?.find(q => q.questionId.toString() === questionId);
    const isFirstAttempt = !questionProgress;
    
    // Update SRS and Concept Mastery
    if (question.concepts && question.concepts.length > 0) {
        question.concepts.forEach(conceptName => {
            let concept = user.conceptMastery.find(c => c.concept === conceptName);
            if (!concept) {
                concept = { concept: conceptName };
                user.conceptMastery.push(concept);
            }

            const quality = isCorrect ? 5 : 0;
            const updatedStats = SrsService.calculateNextReview({
                interval: concept.interval,
                repetition: concept.repetition,
                efactor: concept.efactor
            }, quality);

            Object.assign(concept, updatedStats);
        });
    }

    let xpEarned = 0;
    let impactBreakdown = null;

    // Handle XP and Streak
    if (isCorrect) {
        // Calculate dynamic XP
        const impactResult = ImpactService.calculate({
            questionType: question.type,
            lessonLevel: question.lessonId?.level || 'Beginner',
            streakCount: user.streakCount,
            isFirstAttempt
        });
        
        xpEarned = impactResult.totalXP;
        impactBreakdown = impactResult.multipliers;
        user.xp += xpEarned;

        // Update streak
        const now = new Date();
        const lastActive = new Date(user.lastActiveAt);
        const diffDays = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            user.streakCount += 1;
        } else if (diffDays > 1) {
            user.streakCount = 1;
        }
        user.lastActiveAt = now;

        // Track question history for first-time bonus
        if (!user.questionHistory) user.questionHistory = [];
        if (isFirstAttempt) {
            user.questionHistory.push({ questionId, answeredAt: now, correct: true });
        }
    }

    await user.save();

    res.status(200).json({
        success: true,
        data: {
            isCorrect,
            xpEarned,
            streak: user.streakCount,
            multipliers: impactBreakdown,
            isFirstAttempt
        }
    });
});

// @desc    Complete lesson and unlock next
// @route   POST /api/progress/complete-lesson
// @access  Private
exports.completeLesson = asyncHandler(async (req, res, next) => {
    const { lessonId, score } = req.body;
    const lesson = await Lesson.findById(lessonId);
    
    if (!lesson) {
        return next(new ErrorResponse('Lesson not found', 404));
    }

    let progress = await Progress.findOne({ userId: req.user.id, lessonId });
    if (!progress) {
        progress = new Progress({ userId: req.user.id, lessonId });
    }

    progress.status = 'COMPLETED';
    progress.bestScore = Math.max(progress.bestScore, score);
    progress.attempts += 1;
    progress.lastAttemptAt = Date.now();
    await progress.save();

    // Unlock next lesson
    const nextLesson = await Lesson.findOne({ order: lesson.order + 1 });
    if (nextLesson) {
        let nextProgress = await Progress.findOne({ userId: req.user.id, lessonId: nextLesson._id });
        if (!nextProgress) {
            nextProgress = new Progress({ 
                userId: req.user.id, 
                lessonId: nextLesson._id, 
                status: 'UNLOCKED' 
            });
            await nextProgress.save();
        }
    }

    res.status(200).json({
        success: true,
        message: 'Lesson completed',
        data: progress
    });
});
