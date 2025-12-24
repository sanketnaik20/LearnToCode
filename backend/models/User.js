const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    xp: { type: Number, default: 0 },
    streakCount: { type: Number, default: 0 },
    lastActiveAt: { type: Date, default: Date.now },
    // SRS concept tracking
    conceptMastery: [{
        concept: String,
        masteryLevel: { type: Number, default: 0 },
        interval: { type: Number, default: 1 },
        repetition: { type: Number, default: 0 },
        efactor: { type: Number, default: 2.5 },
        nextReviewAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
