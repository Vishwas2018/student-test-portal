// server/routes/api/exams.js
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// We'll need to create these models
// const Exam = require('../../models/Exam');
// const Question = require('../../models/Question');

// @route   GET api/exams
// @desc    Get all exams
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // If student, only return exams available to their grade
    if (req.user.role === 'student') {
      // Get the student's grade level
      const student = await User.findById(req.user.id).select('grade');
      
      const exams = await Exam.find({
        gradeLevel: student.grade,
        isActive: true
      }).sort({ createdAt: -1 });
      
      return res.json(exams);
    }
    
    // For teachers and admins, return all exams
    const exams = await Exam.find().sort({ createdAt: -1 });
    res.json(exams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/exams/:id
// @desc    Get exam by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    
    if (!exam) {
      return res.status(404).json({ msg: 'Exam not found' });
    }
    
    // Check if student has access to this exam
    if (req.user.role === 'student') {
      const student = await User.findById(req.user.id).select('grade');
      
      if (exam.gradeLevel !== student.grade || !exam.isActive) {
        return res.status(403).json({ msg: 'Not authorized to access this exam' });
      }
    }
    
    res.json(exam);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Exam not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/exams
// @desc    Create a new exam
// @access  Private (teachers and admins only)
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('subject', 'Subject is required').not().isEmpty(),
      check('gradeLevel', 'Grade level is required').isInt({ min: 2, max: 6 }),
      check('timeLimit', 'Time limit must be a number').optional().isNumeric(),
      check('questions', 'At least one question is required').isArray({ min: 1 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Check if user is a teacher or admin
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to create exams' });
    }
    
    try {
      const {
        title,
        subject,
        gradeLevel,
        description,
        timeLimit,
        passingScore,
        questions,
        isActive
      } = req.body;
      
      // Create new exam
      const newExam = new Exam({
        title,
        subject,
        gradeLevel,
        description: description || '',
        timeLimit: timeLimit || 0, // 0 means no time limit
        passingScore: passingScore || 60,
        createdBy: req.user.id,
        isActive: isActive !== undefined ? isActive : true
      });
      
      // Save exam
      const exam = await newExam.save();
      
      // Add questions to the exam
      for (const q of questions) {
        const newQuestion = new Question({
          examId: exam._id,
          questionText: q.questionText,
          questionType: q.questionType,
          options: q.options || [],
          correctAnswer: q.correctAnswer,
          points: q.points || 1
        });
        
        await newQuestion.save();
      }
      
      res.json(exam);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/exams/:id
// @desc    Update an exam
// @access  Private (teachers and admins only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is a teacher or admin
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to update exams' });
    }
    
    const exam = await Exam.findById(req.params.id);
    
    if (!exam) {
      return res.status(404).json({ msg: 'Exam not found' });
    }
    
    // Check if user created the exam or is an admin
    if (exam.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to update this exam' });
    }
    
    const {
      title,
      subject,
      gradeLevel,
      description,
      timeLimit,
      passingScore,
      isActive
    } = req.body;
    
    // Build exam object
    const examFields = {};
    if (title) examFields.title = title;
    if (subject) examFields.subject = subject;
    if (gradeLevel) examFields.gradeLevel = gradeLevel;
    if (description !== undefined) examFields.description = description;
    if (timeLimit !== undefined) examFields.timeLimit = timeLimit;
    if (passingScore) examFields.passingScore = passingScore;
    if (isActive !== undefined) examFields.isActive = isActive;
    
    // Update
    const updatedExam = await Exam.findByIdAndUpdate(
      req.params.id,
      { $set: examFields },
      { new: true }
    );
    
    res.json(updatedExam);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Exam not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/exams/:id
// @desc    Delete an exam
// @access  Private (admins only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to delete exams' });
    }
    
    const exam = await Exam.findById(req.params.id);
    
    if (!exam) {
      return res.status(404).json({ msg: 'Exam not found' });
    }
    
    // Delete associated questions
    await Question.deleteMany({ examId: req.params.id });
    
    // Delete the exam
    await exam.remove();
    
    res.json({ msg: 'Exam deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Exam not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;