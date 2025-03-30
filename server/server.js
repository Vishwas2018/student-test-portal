const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const passport = require('passport');
const { createServer } = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/students', require('./routes/api/students'));
app.use('/api/teachers', require('./routes/api/teachers'));
app.use('/api/parents', require('./routes/api/parents'));
app.use('/api/subjects', require('./routes/api/subjects'));
app.use('/api/exams', require('./routes/api/exams'));
app.use('/api/questions', require('./routes/api/questions'));
app.use('/api/results', require('./routes/api/results'));
app.use('/api/progress', require('./routes/api/progress'));

// Error handling middleware
app.use(errorHandler);

// Socket.io setup
const io = socketIo(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Socket.io middleware and handlers
require('./sockets')(io);

// Start server
const PORT = process.env.SERVER_PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  httpServer.close(() => process.exit(1));
});

module.exports = app;

