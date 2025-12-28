const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    tags: [String],
    leetcodeUrl: String,
    explanation: String,
    order: Number
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);
