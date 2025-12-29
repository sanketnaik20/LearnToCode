const express = require('express');
const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    votePost,
    createComment,
    getComments,
    voteComment
} = require('../controllers/communityController');

const router = express.Router();
const protect = require('../middleware/auth');
const { communityLimiter } = require('../middleware/rateLimiter');

// Apply community specific limiter to all routes in this file
router.use(communityLimiter);

router.route('/posts')
    .get(getPosts)
    .post(protect, createPost);

router.route('/posts/:id')
    .get(getPost)
    .put(protect, updatePost)
    .delete(protect, deletePost);

router.post('/posts/:id/vote', protect, votePost);

router.route('/posts/:postId/comments')
    .get(getComments)
    .post(protect, createComment);

router.post('/comments/:id/vote', protect, voteComment);

module.exports = router;
