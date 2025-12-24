const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, enum: ['unit', 'lesson'], default: 'lesson' },
    description: String,
    content: [mongoose.Schema.Types.Mixed], // Text, code snippets, etc.
    xpReward: { type: Number, default: 50 },
    order: { type: Number, required: true },
    prerequisites: [{ type: String }], // Array of slugs
    isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', LessonSchema);
