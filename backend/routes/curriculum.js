const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Question = require('../models/Question');
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');

// @route   GET api/curriculum
// Returns all units and lessons with user progress
router.get('/', auth, async (req, res) => {
    try {
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

        res.json(mappedLessons);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET api/curriculum/:slug
// Returns lesson content and questions
router.get('/:slug', auth, async (req, res) => {
    try {
        const lesson = await Lesson.findOne({ slug: req.params.slug });
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

        const questions = await Question.find({ lessonId: lesson._id });
        
        // Hide solutions from client
        const safeQuestions = questions.map(q => {
            const { solution, ...rest } = q.toObject();
            return rest;
        });

        res.json({ lesson, questions: safeQuestions });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
