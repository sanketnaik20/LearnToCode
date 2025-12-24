const express = require('express');
const router = express.Router();
const { getCurriculum, getLesson } = require('../controllers/curriculumController');
const auth = require('../middleware/auth');

// @route   GET api/curriculum
router.get('/', auth, getCurriculum);

// @route   GET api/curriculum/:slug
router.get('/:slug', auth, getLesson);

module.exports = router;
