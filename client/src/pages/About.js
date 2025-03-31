import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';

// client/src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          About Student Test Portal
        </Typography>
        
        <Typography variant="body1" paragraph>
          The Student Test Portal is an innovative educational platform designed specifically for students in Grades 2-6, 
          aligned with the Australian Victorian Curriculum. Our mission is to provide an engaging, interactive learning 
          experience that helps students master core subjects while making assessment more efficient for teachers.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Key Features
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Child-Friendly Authentication
                </Typography>
                <Typography variant="body2">
                  Our picture-based login system makes it easy for younger students to securely access their accounts 
                  without having to remember complex passwords.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Interactive Assessments
                </Typography>
                <Typography variant="body2">
                  Multiple question types including multiple-choice, true/false, matching, and drag-and-drop make 
                  learning engaging and comprehensive.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Progress Tracking
                </Typography>
                <Typography variant="body2">
                  Students, teachers, and parents can monitor academic progress over time with detailed analytics 
                  and visual reporting.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Multiple Subjects
                </Typography>
                <Typography variant="body2">
                  Support for English, Mathematics, Science, Digital Technologies, Spelling, and Writing to provide 
                  a comprehensive learning platform.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Our Approach
        </Typography>
        
        <Typography variant="body1" paragraph>
          We believe that assessment should be a positive learning experience. Our platform is designed to be 
          encouraging and supportive, providing immediate feedback and celebrating student achievements.
        </Typography>
        
        <Typography variant="body1" paragraph>
          All content is carefully crafted to align with the Australian Victorian Curriculum standards, ensuring 
          that students are developing the knowledge and skills expected at their grade level.
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Our Team
        </Typography>
        
        <Typography variant="body1" paragraph>
          The Student Test Portal was developed by a team of educators and developers committed to improving 
          educational outcomes through technology. We work closely with teachers to ensure our platform meets 
          real classroom needs.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;