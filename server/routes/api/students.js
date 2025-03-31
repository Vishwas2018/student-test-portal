// server/routes/api/students.js
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/students
// @desc    Get all students
// @access  Private (teachers and admins only)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is a teacher or admin
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ lastName: 1, firstName: 1 });
    
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/students/:id
// @desc    Get student by ID
// @access  Private (teachers, admins, or the student)
router.get('/:id', auth, async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');
    
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Check if user is authorized to view the student
    if (
      req.user.role !== 'teacher' && 
      req.user.role !== 'admin' && 
      req.user.id !== req.params.id
    ) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    res.json(student);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/students/grade/:grade
// @desc    Get students by grade
// @access  Private (teachers and admins only)
router.get('/grade/:grade', auth, async (req, res) => {
  try {
    // Check if user is a teacher or admin
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const students = await User.find({ 
      role: 'student',
      grade: req.params.grade 
    })
      .select('-password')
      .sort({ lastName: 1, firstName: 1 });
    
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/students/:id
// @desc    Update student
// @access  Private (admins only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const {
      firstName,
      lastName,
      email,
      username,
      grade,
      school,
      active
    } = req.body;

    // Build student object
    const studentFields = {};
    if (firstName) studentFields.firstName = firstName;
    if (lastName) studentFields.lastName = lastName;
    if (email) studentFields.email = email;
    if (username) studentFields.username = username;
    if (grade) studentFields.grade = grade;
    if (school) studentFields.school = school;
    if (active !== undefined) studentFields.active = active;

    let student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Make sure it's a student account
    if (student.role !== 'student') {
      return res.status(400).json({ msg: 'Not a student account' });
    }

    // Update
    student = await User.findByIdAndUpdate(
      req.params.id,
      { $set: studentFields },
      { new: true }
    ).select('-password');

    res.json(student);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;