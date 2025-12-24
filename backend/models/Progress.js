const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    status: { type: String, enum: ['LOCKED', 'UNLOCKED', 'COMPLETED'], default: 'LOCKED' },
    bestScore: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
    lastAttemptAt: { type: Date }
}, { timestamps: true });

ProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);
