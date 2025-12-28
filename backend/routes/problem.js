const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');
const protect = require('../middleware/auth');

router.get('/', problemController.getProblems);
router.get('/stats/:username', protect, problemController.getLeetCodeStats);
router.get('/:slug', problemController.getProblemBySlug);

module.exports = router;
