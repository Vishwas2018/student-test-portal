import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';

// client/src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Student Test Portal
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
          Interactive learning aligned with the Australian Victorian Curriculum
        </Typography>
        
        <Box sx={{ mt: 4, mb: 6 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={() => navigate('/login')}
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            onClick={() => navigate('/picture-login')}
          >
            Picture Login
          </Button>
        </Box>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>For Students</Typography>
              <Typography variant="body1">
                Take interactive quizzes, track your progress, and learn at your own pace with our engaging platform.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>For Teachers</Typography>
              <Typography variant="body1">
                Create custom assessments, monitor class performance, and provide personalized feedback to your students.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>For Parents</Typography>
              <Typography variant="body1">
                Stay informed about your child's academic progress and support their learning journey.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;