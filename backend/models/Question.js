const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    type: { type: String, enum: ['MCQ', 'PARSONS', 'FILL_IN_BLANK'], required: true },
    prompt: { type: String, required: true },
    codeTemplate: String, // For fill-in-the-blank
    blocks: [String], // For Parsons
    options: [String], // For MCQ
    solution: mongoose.Schema.Types.Mixed, // String, Index, or Array
    concepts: [String] // For legacy/SRS tagging
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
