// server/models/Result.js
const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
      },
      answer: {
        type: mongoose.Schema.Mixed,
        required: true
      },
      isCorrect: {
        type: Boolean,
        required: true
      },
      pointsEarned: {
        type: Number,
        required: true
      }
    }
  ],
  totalPoints: {
    type: Number,
    required: true
  },
  maxPoints: {
    type: Number,
    required: true
  },
  percentageScore: {
    type: Number,
    required: true
  },
  isPassed: {
    type: Boolean,
    required: true
  },
  timeSpent: {
    type: Number, // Time spent in seconds
    default: 0
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  feedback: {
    type: String
  }
}, {
  timestamps: true
});

// Virtual for displaying time spent in a human-readable format
ResultSchema.virtual('formattedTimeSpent').get(function() {
  const minutes = Math.floor(this.timeSpent / 60);
  const seconds = this.timeSpent % 60;
  return `${minutes}m ${seconds}s`;
});

// Method to generate a PDF report of the result
ResultSchema.methods.generatePDF = async function() {
  // Implementation would use pdfmake to generate a PDF report
  // This is a placeholder for the actual implementation
  return 'PDF generation placeholder';
};

module.exports = mongoose.model('Result', ResultSchema);