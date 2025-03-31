// client/src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Avatar, 
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Card, 
  CardContent
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Import necessary Redux actions here
// import { updateProfile } from '../features/auth/authSlice';
// import { getResults } from '../features/progress/progressSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  
  // Get user from Redux store
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  // const { results, loading: resultsLoading } = useSelector((state) => state.progress);
  
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Mock data for development
  const results = [
    { 
      _id: '1', 
      exam: { title: 'Math Quiz - Addition', subject: 'Mathematics' }, 
      percentageScore: 85, 
      isPassed: true,
      completedAt: new Date().toISOString() 
    },
    { 
      _id: '2', 
      exam: { title: 'Reading Comprehension', subject: 'English' }, 
      percentageScore: 92, 
      isPassed: true,
      completedAt: new Date(Date.now() - 86400000).toISOString() 
    },
    { 
      _id: '3', 
      exam: { title: 'Science - Plants', subject: 'Science' }, 
      percentageScore: 68, 
      isPassed: false,
      completedAt: new Date(Date.now() - 172800000).toISOString() 
    }
  ];
  
  const achievements = [
    { id: 1, title: 'Perfect Score', description: 'Achieve 100% on any test', earned: true },
    { id: 2, title: 'Math Whiz', description: 'Complete 5 math tests with an average score of 90% or higher', earned: true },
    { id: 3, title: 'Science Explorer', description: 'Complete all science tests for your grade level', earned: false },
    { id: 4, title: 'Reading Champion', description: 'Correctly answer 50 reading comprehension questions', earned: false },
  ];
  
  // Update form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }));
    }
    
    // Fetch results
    // dispatch(getResults());
  }, [dispatch, user]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // dispatch(updateProfile({
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   email: formData.email
    // }));
    
    // For demo purposes
    console.log('Profile update form submitted:', formData);
  };
  
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      // Show error (would use a form state or toast notification in production)
      alert('New passwords do not match');
      return;
    }
    
    // dispatch(updatePassword({
    //   currentPassword: formData.currentPassword,
    //   newPassword: formData.newPassword
    // }));
    
    // For demo purposes
    console.log('Password update form submitted');
    
    // Clear password fields
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  // Profile information tab content
  const renderProfileTab = () => (
    <Box component="form" onSubmit={handleProfileUpdate} sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            variant="outlined"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            variant="outlined"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email Address"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
            required
            type="email"
          />
        </Grid>
        {user?.role === 'student' && (
          <Grid item xs={12}>
            <TextField
              name="grade"
              label="Grade Level"
              fullWidth
              variant="outlined"
              value={user.grade || ''}
              disabled
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={authLoading}
          >
            {authLoading ? <CircularProgress size={24} /> : 'Update Profile'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
  
  // Password change tab content
  const renderPasswordTab = () => (
    <Box component="form" onSubmit={handlePasswordUpdate} sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="currentPassword"
            label="Current Password"
            fullWidth
            variant="outlined"
            type="password"
            value={formData.currentPassword}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="newPassword"
            label="New Password"
            fullWidth
            variant="outlined"
            type="password"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="confirmPassword"
            label="Confirm New Password"
            fullWidth
            variant="outlined"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={authLoading}
          >
            {authLoading ? <CircularProgress size={24} /> : 'Change Password'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
  
  // Test history tab content
  const renderHistoryTab = () => (
    <Box sx={{ mt: 3 }}>
      <List>
        {results.map((result) => (
          <React.Fragment key={result._id}>
            <ListItem>
              <ListItemText
                primary={result.exam.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {result.exam.subject} - Score: {result.percentageScore}%
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary">
                      {new Date(result.completedAt).toLocaleDateString()} - 
                      {result.isPassed ? ' Passed' : ' Failed'}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
  
  // Achievements tab content
  const renderAchievementsTab = () => (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {achievements.map((achievement) => (
          <Grid item xs={12} sm={6} key={achievement.id}>
            <Card sx={{ 
              height: '100%',
              opacity: achievement.earned ? 1 : 0.6
            }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {achievement.title}
                </Typography>
                <Typography variant="body2">
                  {achievement.description}
                </Typography>
                <Typography 
                  variant="body2" 
                  color={achievement.earned ? "success.main" : "text.secondary"}
                  sx={{ mt: 2 }}
                >
                  {achievement.earned ? 'Earned' : 'Not yet earned'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'primary.main',
                mr: 3
              }}
            >
              {user?.firstName?.charAt(0) || 'U'}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.role === 'student' ? `Grade ${user?.grade} Student` : 'Teacher'}
              </Typography>
            </Box>
          </Box>
          
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab icon={<PersonIcon />} label="Profile" />
            <Tab icon={<LockIcon />} label="Password" />
            <Tab icon={<HistoryIcon />} label="Test History" />
            {user?.role === 'student' && <Tab icon={<EmojiEventsIcon />} label="Achievements" />}
          </Tabs>
          
          <Box sx={{ py: 3 }}>
            {tabValue === 0 && renderProfileTab()}
            {tabValue === 1 && renderPasswordTab()}
            {tabValue === 2 && renderHistoryTab()}
            {tabValue === 3 && user?.role === 'student' && renderAchievementsTab()}
          </Box>
        </Paper>
      </Box>
    </Container>
  );