const Lesson = require('../models/Lesson');
const Question = require('../models/Question');
const Progress = require('../models/Progress');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all units and lessons with user progress
// @route   GET /api/curriculum
// @access  Private
exports.getCurriculum = asyncHandler(async (req, res, next) => {
    const lessons = await Lesson.find().sort('order');
    const progress = await Progress.find({ userId: req.user.id });

    const mappedLessons = lessons.map(lesson => {
        const userProg = progress.find(p => p.lessonId.toString() === lesson._id.toString());
        return {
            ...lesson.toObject(),
            status: userProg ? userProg.status : (lesson.order === 0 ? 'UNLOCKED' : 'LOCKED'),
            bestScore: userProg ? userProg.bestScore : 0
        };
    });

    res.status(200).json({
        success: true,
        data: mappedLessons
    });
});

// @desc    Get lesson content and questions
// @route   GET /api/curriculum/:slug
// @access  Private
exports.getLesson = asyncHandler(async (req, res, next) => {
    const lesson = await Lesson.findOne({ slug: req.params.slug });
    
    if (!lesson) {
        return next(new ErrorResponse(`Lesson not found with slug of ${req.params.slug}`, 404));
    }

    const questions = await Question.find({ lessonId: lesson._id });
    
    // Hide solutions from client
    const safeQuestions = questions.map(q => {
        const { solution, ...rest } = q.toObject();
        return rest;
    });

    res.status(200).json({
        success: true,
        data: {
            lesson,
            questions: safeQuestions
        }
    });
});
