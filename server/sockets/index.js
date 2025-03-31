// server/sockets/index.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (io) => {
  // Authentication middleware for Socket.io
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Add user data to socket
      const user = await User.findById(decoded.user.id).select('-password');
      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }
      
      socket.user = user;
      next();
    } catch (error) {
      return next(new Error('Authentication error: Invalid token'));
    }
  });

  // Connection event
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id} (${socket.user.firstName} ${socket.user.lastName})`);
    
    // Join user to their role-based room
    socket.join(socket.user.role);
    
    // If student, join their grade room
    if (socket.user.role === 'student' && socket.user.grade) {
      socket.join(`grade-${socket.user.grade}`);
    }
    
    // Handle exam session
    socket.on('join-exam', (examId) => {
      socket.join(`exam-${examId}`);
      console.log(`${socket.user.firstName} joined exam: ${examId}`);
    });
    
    socket.on('leave-exam', (examId) => {
      socket.leave(`exam-${examId}`);
      console.log(`${socket.user.firstName} left exam: ${examId}`);
    });
    
    // Teacher monitoring student activity
    socket.on('monitor-student', (studentId) => {
      // Only teachers and admins can monitor students
      if (socket.user.role === 'teacher' || socket.user.role === 'admin') {
        socket.join(`student-${studentId}`);
        console.log(`${socket.user.firstName} is now monitoring student: ${studentId}`);
      }
    });
    
    socket.on('stop-monitoring-student', (studentId) => {
      socket.leave(`student-${studentId}`);
      console.log(`${socket.user.firstName} stopped monitoring student: ${studentId}`);
    });
    
    // Student submits answer
    socket.on('submit-answer', (data) => {
      const { examId, questionId, answer } = data;
      
      // Emit to teachers monitoring this student
      io.to(`student-${socket.user.id}`).emit('student-activity', {
        type: 'answer-submitted',
        studentId: socket.user.id,
        studentName: `${socket.user.firstName} ${socket.user.lastName}`,
        examId,
        questionId,
        timestamp: new Date()
      });
      
      console.log(`${socket.user.firstName} submitted answer for question: ${questionId}`);
    });
    
    // Notify students about new exams
    socket.on('new-exam-available', (data) => {
      const { examId, gradeLevel, subject } = data;
      
      // Only teachers and admins can send notifications
      if (socket.user.role === 'teacher' || socket.user.role === 'admin') {
        io.to(`grade-${gradeLevel}`).emit('notification', {
          type: 'new-exam',
          message: `A new ${subject} exam is available for you!`,
          examId,
          timestamp: new Date()
        });
        
        console.log(`Notified grade ${gradeLevel} about new ${subject} exam`);
      }
    });
    
    // Disconnect event
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id} (${socket.user.firstName} ${socket.user.lastName})`);
    });
  });
};