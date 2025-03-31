import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
// client/src/pages/DashboardPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

// Import necessary Redux actions here
// import { getExams } from '../features/exams/examsSlice';
// import { getResults } from '../features/progress/progressSlice';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user from Redux store
  const { user } = useSelector((state) => state.auth);
  
  // Get exams and results from Redux store
  // const { exams, loading: examsLoading } = useSelector((state) => state.exams);
  // const { results, loading: resultsLoading } = useSelector((state) => state.progress);
  
  // Mock data for development
  const exams = [
    { _id: '1', title: 'Math Quiz - Addition', subject: 'Mathematics', gradeLevel: 3, isActive: true },
    { _id: '2', title: 'Reading Comprehension', subject: 'English', gradeLevel: 3, isActive: true },
    { _id: '3', title: 'Science - Plants', subject: 'Science', gradeLevel: 3, isActive: true }
  ];
  
  const results = [
    { _id: '1', exam: { title: 'Spelling Test' }, percentageScore: 85, completedAt: new Date().toISOString() },
    { _id: '2', exam: { title: 'Math Quiz' }, percentageScore: 92, completedAt: new Date(Date.now() - 86400000).toISOString() }
  ];
  
  const notifications = [
    { id: 1, message: 'New Math quiz available', date: new Date().toISOString() },
    { id: 2, message: 'Teacher has provided feedback on your Science test', date: new Date(Date.now() - 43200000).toISOString() }
  ];
  
  // Fetch exams and results on component mount
  useEffect(() => {
    // dispatch(getExams());
    // dispatch(getResults());
  }, [dispatch]);
  
  // Determine which dashboard to show based on user role
  const renderStudentDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Available Tests
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {exams.map((exam) => (
              <Grid item xs={12} sm={6} key={exam._id}>
                <Card sx={{ height: '100%' }}>
                  <CardActionArea onClick={() => navigate(`/exams/${exam._id}`)}>
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {exam.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Subject: {exam.subject}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Grade: {exam.gradeLevel}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Results
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {results.map((result) => (
              <React.Fragment key={result._id}>
                <ListItem button onClick={() => navigate(`/results/${result._id}`)}>
                  <ListItemIcon>
                    <AssessmentIcon color={result.percentageScore >= 70 ? "success" : "error"} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={result.exam.title} 
                    secondary={`Score: ${result.percentageScore}% - ${new Date(result.completedAt).toLocaleDateString()}`} 
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button variant="text" color="primary" onClick={() => navigate('/profile')}>
              View All Results
            </Button>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom display="flex" alignItems="center">
            <EmojiEventsIcon sx={{ mr: 1 }} />
            Achievements
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            You've completed 8 tests this month!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Your average score is 88%
          </Typography>
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom display="flex" alignItems="center">
            <NotificationsIcon sx={{ mr: 1 }} />
            Notifications
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem>
                  <ListItemText 
                    primary={notification.message} 
                    secondary={new Date(notification.date).toLocaleDateString()} 
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
  
  const renderTeacherDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Your Tests
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {exams.map((exam) => (
              <Grid item xs={12} sm={6} key={exam._id}>
                <Card sx={{ height: '100%' }}>
                  <CardActionArea onClick={() => navigate(`/exams/${exam._id}`)}>
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {exam.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Subject: {exam.subject}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Grade: {exam.gradeLevel}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status: {exam.isActive ? 'Active' : 'Inactive'}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/exams/create')}>
              Create New Test
            </Button>
          </Box>
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Student Activity
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            <ListItem>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText 
                primary="John Smith completed Math Quiz" 
                secondary="Score: 85% - Today" 
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Emily Johnson completed English Test" 
                secondary="Score: 92% - Yesterday" 
              />
            </ListItem>
          </List>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button variant="text" color="primary" onClick={() => navigate('/students')}>
              View All Students
            </Button>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Class Performance
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Average class score: 82%
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Tests completed this month: 45
          </Typography>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button variant="text" color="primary" onClick={() => navigate('/analytics')}>
              View Analytics
            </Button>
          </Box>
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Button fullWidth variant="outlined" color="primary" sx={{ mb: 2 }}>
            Create New Test
          </Button>
          <Button fullWidth variant="outlined" color="primary" sx={{ mb: 2 }}>
            View Student Progress
          </Button>
          <Button fullWidth variant="outlined" color="primary">
            Generate Reports
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Dashboard
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Welcome back, {user?.firstName || 'User'}! Here's an overview of your activities.
        </Typography>
        
        {user?.role === 'teacher' ? renderTeacherDashboard() : renderStudentDashboard()}
      </Box>
    </Container>
  );
};

export default DashboardPage;