import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Paper,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
// client/src/pages/ExamPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Import necessary Redux actions here
// import { getExam } from '../features/exams/examsSlice';
// import { submitExam } from '../features/progress/progressSlice';

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get exam from Redux store
  // const { exam, loading } = useSelector((state) => state.exams);
  
  // Mock data for development
  const exam = {
    _id: examId,
    title: 'Math Quiz - Addition',
    subject: 'Mathematics',
    gradeLevel: 3,
    description: 'A quiz to test your addition skills',
    timeLimit: 15, // in minutes
    questions: [
      {
        _id: 'q1',
        questionText: 'What is 5 + 3?',
        questionType: 'multiple-choice',
        options: [
          { id: 'a', text: '7' },
          { id: 'b', text: '8' },
          { id: 'c', text: '9' },
          { id: 'd', text: '10' }
        ],
        correctAnswer: 'b'
      },
      {
        _id: 'q2',
        questionText: 'What is 10 + 15?',
        questionType: 'multiple-choice',
        options: [
          { id: 'a', text: '20' },
          { id: 'b', text: '23' },
          { id: 'c', text: '25' },
          { id: 'd', text: '30' }
        ],
        correctAnswer: 'c'
      },
      {
        _id: 'q3',
        questionText: 'What is 7 + 8?',
        questionType: 'multiple-choice',
        options: [
          { id: 'a', text: '13' },
          { id: 'b', text: '14' },
          { id: 'c', text: '15' },
          { id: 'd', text: '16' }
        ],
        correctAnswer: 'c'
      },
      {
        _id: 'q4',
        questionText: 'Is 9 + 9 equal to 18?',
        questionType: 'true-false',
        options: [
          { id: 'true', text: 'True' },
          { id: 'false', text: 'False' }
        ],
        correctAnswer: 'true'
      },
      {
        _id: 'q5',
        questionText: 'What is 12 + 12?',
        questionType: 'short-answer',
        correctAnswer: '24'
      }
    ]
  };
  
  const loading = false;
  
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examStarted, setExamStarted] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  
  // Fetch exam data on component mount
  useEffect(() => {
    // dispatch(getExam(examId));
  }, [dispatch, examId]);
  
  // Set up timer when exam starts
  useEffect(() => {
    let timer;
    if (examStarted && exam?.timeLimit > 0) {
      // Set initial remaining time
      setRemainingTime(exam.timeLimit * 60);
      
      // Start timer
      timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            // Time's up, submit the exam
            handleSubmitExam();
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
        
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [examStarted, exam]);
  
  const handleStartExam = () => {
    setExamStarted(true);
  };
  
  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };
  
  const handleSubmitExam = () => {
    // Format answers for API submission
    const formattedAnswers = Object.keys(answers).map(questionId => ({
      questionId,
      answer: answers[questionId]
    }));
    
    // dispatch(submitExam({
    //   examId,
    //   answers: formattedAnswers,
    //   timeSpent
    // }));
    
    // For demo purposes
    console.log('Exam submitted:', {
      examId,
      answers: formattedAnswers,
      timeSpent
    });
    
    // Navigate to results page (in a real app, this would happen after the API call)
    navigate(`/results/${examId}`);
  };
  
  // Format time for display (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Render specific question type
  const renderQuestion = (question) => {
    switch (question.questionType) {
      case 'multiple-choice':
        return (
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormLabel component="legend">{question.questionText}</FormLabel>
            <RadioGroup
              value={answers[question._id] || ''}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            >
              {question.options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label={option.text}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
        
      case 'true-false':
        return (
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormLabel component="legend">{question.questionText}</FormLabel>
            <RadioGroup
              value={answers[question._id] || ''}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            >
              <FormControlLabel value="true" control={<Radio />} label="True" />
              <FormControlLabel value="false" control={<Radio />} label="False" />
            </RadioGroup>
          </FormControl>
        );
        
      case 'short-answer':
        return (
          <FormControl fullWidth>
            <FormLabel>{question.questionText}</FormLabel>
            <TextField
              value={answers[question._id] || ''}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
            />
          </FormControl>
        );
        
      default:
        return <Typography>Unsupported question type</Typography>;
    }
  };
  
  // Render exam instructions before starting
  const renderInstructions = () => (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        {exam.title}
      </Typography>
      
      <Typography variant="body1" paragraph>
        {exam.description}
      </Typography>
      
      <Typography variant="body1" paragraph>
        Subject: {exam.subject}
      </Typography>
      
      <Typography variant="body1" paragraph>
        Number of Questions: {exam.questions.length}
      </Typography>
      
      {exam.timeLimit > 0 && (
        <Typography variant="body1" paragraph>
          Time Limit: {exam.timeLimit} minutes
        </Typography>
      )}
      
      <Typography variant="body1" paragraph sx={{ fontWeight: 'bold' }}>
        Instructions:
      </Typography>
      
      <Typography variant="body1" paragraph>
        • Read each question carefully before answering
      </Typography>
      
      <Typography variant="body1" paragraph>
        • You can navigate between questions using the Next and Back buttons
      </Typography>
      
      {exam.timeLimit > 0 && (
        <Typography variant="body1" paragraph>
          • The exam will automatically submit when the time limit is reached
        </Typography>
      )}
      
      <Typography variant="body1" paragraph>
        • Click Submit when you have completed all questions
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStartExam}
        >
          Begin Exam
        </Button>
      </Box>
    </Paper>
  );
  
  // Render exam questions when started
  const renderExam = () => (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      {/* Timer display if exam has time limit */}
      {exam.timeLimit > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Time Remaining: {formatTime(remainingTime)}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(1 - remainingTime / (exam.timeLimit * 60)) * 100} 
            color={remainingTime < 60 ? "error" : "primary"}
          />
        </Box>
      )}
      
      {/* Stepper for question navigation */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {exam.questions.map((question, index) => (
          <Step key={index}>
            <StepLabel>Q{index + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {/* Current question */}
      <Box sx={{ mb: 4 }}>
        {renderQuestion(exam.questions[activeStep])}
      </Box>
      
      {/* Navigation buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        
        {activeStep === exam.questions.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setConfirmSubmit(true)}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </Box>
      
      {/* Confirmation dialog */}
      <Dialog
        open={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
      >
        <DialogTitle>Submit Exam</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit your exam? You will not be able to make any changes after submission.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmSubmit(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitExam} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
  
  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (!exam) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" color="error">
            Exam not found
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 2 }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        {!examStarted ? renderInstructions() : renderExam()}
      </Box>
    </Container>
  );
};

export default ExamPage;