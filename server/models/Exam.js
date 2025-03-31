// server/models/Exam.js
const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  gradeLevel: {
    type: Number,
    required: true,
    min: 2,
    max: 6
  },
  description: {
    type: String,
    default: ''
  },
  timeLimit: {
    type: Number,
    default: 0 // 0 means no time limit, otherwise time in minutes
  },
  passingScore: {
    type: Number,
    default: 60
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Exam', ExamSchema);