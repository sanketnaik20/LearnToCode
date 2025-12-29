const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Create a new post
// @route   POST /api/community/posts
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
    req.body.author = req.user.id;

    const post = await Post.create(req.body);

    res.status(201).json({
        success: true,
        data: post
    });
});

// @desc    Get all posts
// @route   GET /api/community/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
    const { type, sort, page = 1, limit = 10 } = req.query;

    const query = {};
    if (type) query.type = type;

    let sortOption = { createdAt: -1 }; // Default: Latest
    if (sort === 'top') {
        // Sorting by virtual field is tricky in MongoDB directly, 
        // we'll calculate it or sort by length of upvotes
        sortOption = { upvotes: -1 }; 
    }

    const posts = await Post.find(query)
        .populate('author', 'username avatar karma')
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total = await Post.countDocuments(query);

    res.status(200).json({
        success: true,
        count: posts.length,
        total,
        data: posts
    });
});

// @desc    Get single post
// @route   GET /api/community/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)
        .populate('author', 'username avatar karma');

    if (!post) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
    }

    // Increment view count
    post.viewCount += 1;
    await post.save();

    res.status(200).json({
        success: true,
        data: post
    });
});

// @desc    Update post
// @route   PUT /api/community/posts/:id
// @access  Private (Owner only)
exports.updatePost = asyncHandler(async (req, res, next) => {
    let post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is post author
    if (post.author.toString() !== req.user.id) {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this post`, 401));
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: post
    });
});

// @desc    Delete post
// @route   DELETE /api/community/posts/:id
// @access  Private (Owner only)
exports.deletePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is post author
    if (post.author.toString() !== req.user.id) {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this post`, 401));
    }

    await post.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Vote on a post
// @route   POST /api/community/posts/:id/vote
// @access  Private
exports.votePost = asyncHandler(async (req, res, next) => {
    const { voteType } = req.body; // 'upvote', 'downvote', 'unvote'
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorResponse('Post not found', 404));
    }

    const userId = req.user.id;
    const authorId = post.author;

    // Help function to update karma
    const updateKarma = async (uid, amount) => {
        await User.findByIdAndUpdate(uid, { $inc: { karma: amount } });
    };

    let karmaChange = 0;

    if (voteType === 'upvote') {
        if (post.upvotes.includes(userId)) {
            return next(new ErrorResponse('Already upvoted', 400));
        }
        if (post.downvotes.includes(userId)) {
            // Remove from downvotes first
            post.downvotes = post.downvotes.filter(id => id.toString() !== userId);
            karmaChange += 1; // canceling downvote
        }
        post.upvotes.push(userId);
        karmaChange += 1;
    } else if (voteType === 'downvote') {
        if (post.downvotes.includes(userId)) {
            return next(new ErrorResponse('Already downvoted', 400));
        }
        if (post.upvotes.includes(userId)) {
            // Remove from upvotes first
            post.upvotes = post.upvotes.filter(id => id.toString() !== userId);
            karmaChange -= 1; // canceling upvote
        }
        post.downvotes.push(userId);
        karmaChange -= 1;
    } else if (voteType === 'unvote') {
        if (post.upvotes.includes(userId)) {
            post.upvotes = post.upvotes.filter(id => id.toString() !== userId);
            karmaChange -= 1;
        } else if (post.downvotes.includes(userId)) {
            post.downvotes = post.downvotes.filter(id => id.toString() !== userId);
            karmaChange += 1;
        }
    }

    await post.save();
    if (karmaChange !== 0 && authorId.toString() !== userId) {
        await updateKarma(authorId, karmaChange);
    }

    res.status(200).json({
        success: true,
        data: post
    });
});

// @desc    Create a comment
// @route   POST /api/community/posts/:postId/comments
// @access  Private
exports.createComment = asyncHandler(async (req, res, next) => {
    req.body.author = req.user.id;
    req.body.postId = req.params.postId;

    const comment = await Comment.create(req.body);

    res.status(201).json({
        success: true,
        data: comment
    });
});

// @desc    Get comments for a post
// @route   GET /api/community/posts/:postId/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({ postId: req.params.postId })
        .populate('author', 'username avatar karma')
        .sort({ createdAt: 1 });

    res.status(200).json({
        success: true,
        data: comments
    });
});

// @desc    Vote on a comment
// @route   POST /api/community/comments/:id/vote
// @access  Private
exports.voteComment = asyncHandler(async (req, res, next) => {
    const { voteType } = req.body; // 'upvote', 'downvote', 'unvote'
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new ErrorResponse('Comment not found', 404));
    }

    const userId = req.user.id;
    const authorId = comment.author;

    // Help function to update karma
    const updateKarma = async (uid, amount) => {
        await User.findByIdAndUpdate(uid, { $inc: { karma: amount } });
    };

    let karmaChange = 0;

    if (voteType === 'upvote') {
        if (comment.upvotes.includes(userId)) {
            return next(new ErrorResponse('Already upvoted', 400));
        }
        if (comment.downvotes.includes(userId)) {
            comment.downvotes = comment.downvotes.filter(id => id.toString() !== userId);
            karmaChange += 1;
        }
        comment.upvotes.push(userId);
        karmaChange += 1;
    } else if (voteType === 'downvote') {
        if (comment.downvotes.includes(userId)) {
            return next(new ErrorResponse('Already downvoted', 400));
        }
        if (comment.upvotes.includes(userId)) {
            comment.upvotes = comment.upvotes.filter(id => id.toString() !== userId);
            karmaChange -= 1;
        }
        comment.downvotes.push(userId);
        karmaChange -= 1;
    } else if (voteType === 'unvote') {
        if (comment.upvotes.includes(userId)) {
            comment.upvotes = comment.upvotes.filter(id => id.toString() !== userId);
            karmaChange -= 1;
        } else if (comment.downvotes.includes(userId)) {
            comment.downvotes = comment.downvotes.filter(id => id.toString() !== userId);
            karmaChange += 1;
        }
    }

    await comment.save();
    if (karmaChange !== 0 && authorId.toString() !== userId) {
        await updateKarma(authorId, karmaChange);
    }

    res.status(200).json({
        success: true,
        data: comment
    });
});
