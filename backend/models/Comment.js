const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: { 
        type: String, 
        required: true,
        trim: true
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post',
        required: true
    },
    parentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment',
        default: null
    },
    upvotes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    downvotes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]
}, { timestamps: true });

// Virtual for vote count
CommentSchema.virtual('voteCount').get(function() {
    return this.upvotes.length - this.downvotes.length;
});

CommentSchema.set('toJSON', { virtuals: true });
CommentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Comment', CommentSchema);
