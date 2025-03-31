// server/models/Question.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'short-answer', 'matching', 'drag-drop'],
    required: true
  },
  options: {
    type: [
      {
        text: {
          type: String,
          required: true
        },
        id: {
          type: String,
          required: true
        }
      }
    ],
    default: []
  },
  correctAnswer: {
    type: mongoose.Schema.Mixed,
    required: true
    // This can be:
    // - String (for short-answer or single multiple-choice)
    // - Array of strings (for multiple correct answers)
    // - Object (for matching questions, with keys and values)
  },
  points: {
    type: Number,
    default: 1
  },
  explanation: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  image: {
    type: String // URL to image if question has an image
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', QuestionSchema);