// server/routes/api/results.js
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// Models (these would need to be created)
// const Result = require('../../models/Result');
// const User = require('../../models/User');
// const Exam = require('../../models/Exam');
// const Question = require('../../models/Question');

// @route   GET api/results
// @desc    Get all results for current user (or all if admin/teacher)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Students can only view their own results
    if (req.user.role === 'student') {
      const results = await Result.find({ student: req.user.id })
        .populate('exam', 'title subject gradeLevel')
        .sort({ createdAt: -1 });
      
      return res.json(results);
    }
    
    // Parents can view their children's results
    if (req.user.role === 'parent') {
      // This would require a parent-child relationship model
      // For now, we'll return an empty array
      return res.json([]);
    }
    
    // Teachers and admins can view all results
    const results = await Result.find()
      .populate('student', 'firstName lastName grade')
      .populate('exam', 'title subject gradeLevel')
      .sort({ createdAt: -1 });
    
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/results/:id
// @desc    Get result by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('student', 'firstName lastName grade')
      .populate('exam', 'title subject gradeLevel timeLimit passingScore')
      .populate('answers.question');
    
    if (!result) {
      return res.status(404).json({ msg: 'Result not found' });
    }
    
    // Check if user is authorized to view this result
    if (
      req.user.role !== 'teacher' && 
      req.user.role !== 'admin' && 
      req.user.id !== result.student._id.toString()
    ) {
      return res.status(403).json({ msg: 'Not authorized to view this result' });
    }
    
    res.json(result);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Result not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/results
// @desc    Submit an exam and get results
// @access  Private (students only)
router.post(
  '/',
  [
    auth,
    [
      check('examId', 'Exam ID is required').not().isEmpty(),
      check('answers', 'Answers are required').isArray({ min: 1 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Only students can submit exams
    if (req.user.role !== 'student') {
      return res.status(403).json({ msg: 'Only students can submit exams' });
    }
    
    try {
      const { examId, answers, timeSpent } = req.body;
      
      // Check if exam exists
      const exam = await Exam.findById(examId);
      if (!exam) {
        return res.status(404).json({ msg: 'Exam not found' });
      }
      
      // Check if student is eligible for this exam
      const student = await User.findById(req.user.id);
      if (student.grade !== exam.gradeLevel) {
        return res.status(403).json({ msg: 'Not authorized to take this exam' });
      }
      
      // Check if student has already completed this exam
      const existingResult = await Result.findOne({
        student: req.user.id,
        exam: examId
      });
      
      if (existingResult) {
        return res.status(400).json({ msg: 'You have already completed this exam' });
      }
      
      // Get all questions for this exam
      const questions = await Question.find({ examId });
      
      // Validate that all questions are answered
      const questionIds = questions.map(q => q._id.toString());
      const answeredIds = answers.map(a => a.questionId);
      
      const missingAnswers = questionIds.filter(id => !answeredIds.includes(id));
      if (missingAnswers.length > 0) {
        return res.status(400).json({ 
          msg: 'All questions must be answered',
          missingQuestions: missingAnswers
        });
      }
      
      // Calculate the result
      let totalPoints = 0;
      let maxPoints = 0;
      const processedAnswers = [];
      
      for (const question of questions) {
        const answer = answers.find(a => a.questionId === question._id.toString());
        const isCorrect = evaluateAnswer(question, answer.answer);
        const pointsEarned = isCorrect ? question.points : 0;
        
        totalPoints += pointsEarned;
        maxPoints += question.points;
        
        processedAnswers.push({
          question: question._id,
          answer: answer.answer,
          isCorrect,
          pointsEarned
        });
      }
      
      const percentageScore = (totalPoints / maxPoints) * 100;
      const isPassed = percentageScore >= exam.passingScore;
      
      // Create the result
      const newResult = new Result({
        student: req.user.id,
        exam: examId,
        answers: processedAnswers,
        totalPoints,
        maxPoints,
        percentageScore,
        isPassed,
        timeSpent: timeSpent || 0,
        completedAt: Date.now()
      });
      
      await newResult.save();
      
      // Populate result with related data
      const populatedResult = await Result.findById(newResult._id)
        .populate('exam', 'title subject gradeLevel')
        .populate('answers.question');
      
      res.json(populatedResult);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/results/exam/:examId
// @desc    Get all results for a specific exam
// @access  Private (teachers and admins only)
router.get('/exam/:examId', auth, async (req, res) => {
  try {
    // Check if user is a teacher or admin
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    
    const results = await Result.find({ exam: req.params.examId })
      .populate('student', 'firstName lastName grade')
      .sort({ percentageScore: -1 });
    
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/results/student/:studentId
// @desc    Get all results for a specific student
// @access  Private (teachers, admins, and the student)
router.get('/student/:studentId', auth, async (req, res) => {
  try {
    // Check if user is authorized to view the student's results
    if (
      req.user.role !== 'teacher' && 
      req.user.role !== 'admin' && 
      req.user.id !== req.params.studentId
    ) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    
    const results = await Result.find({ student: req.params.studentId })
      .populate('exam', 'title subject gradeLevel')
      .sort({ createdAt: -1 });
    
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/results/:id/feedback
// @desc    Add teacher feedback to a result
// @access  Private (teachers and admins only)
router.post(
  '/:id/feedback',
  [
    auth,
    [
      check('feedback', 'Feedback is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Check if user is a teacher or admin
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to provide feedback' });
    }
    
    try {
      const result = await Result.findById(req.params.id);
      
      if (!result) {
        return res.status(404).json({ msg: 'Result not found' });
      }
      
      result.feedback = req.body.feedback;
      await result.save();
      
      res.json(result);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Result not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// Helper function to evaluate if an answer is correct
function evaluateAnswer(question, answer) {
  switch (question.questionType) {
    case 'multiple-choice':
      return answer === question.correctAnswer;
    
    case 'true-false':
      return answer === question.correctAnswer;
    
    case 'short-answer':
      // Case-insensitive comparison
      return answer.toLowerCase() === question.correctAnswer.toLowerCase();
    
    case 'matching':
      // For matching, we need to check if all pairs match
      if (typeof answer !== 'object' || typeof question.correctAnswer !== 'object') {
        return false;
      }
      
      for (const key in question.correctAnswer) {
        if (answer[key] !== question.correctAnswer[key]) {
          return false;
        }
      }
      return true;
    
    case 'drag-drop':
      // For drag-drop, we need to check if arrays match (order matters)
      if (!Array.isArray(answer) || !Array.isArray(question.correctAnswer)) {
        return false;
      }
      
      if (answer.length !== question.correctAnswer.length) {
        return false;
      }
      
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] !== question.correctAnswer[i]) {
          return false;
        }
      }
      return true;
    
    default:
      return false;
  }
}

module.exports = router;