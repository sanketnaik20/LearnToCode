const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    type: { 
        type: String, 
        enum: ['INTERVIEW', 'ARTICLE', 'DISCUSSION'],
        required: true
    },
    tags: [{ 
        type: String,
        trim: true
    }],
    upvotes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    downvotes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    viewCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Virtual for vote count
PostSchema.virtual('voteCount').get(function() {
    return this.upvotes.length - this.downvotes.length;
});

PostSchema.set('toJSON', { virtuals: true });
PostSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Post', PostSchema);
