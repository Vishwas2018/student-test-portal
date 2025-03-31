import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Paper, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// client/src/pages/Help.js
import React from 'react';

const Help = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Help Center
        </Typography>
        
        <Typography variant="body1" paragraph>
          Welcome to the Student Test Portal help center. Below you'll find answers to common questions and guidance on how to use the platform.
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, my: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Need Assistance?
          </Typography>
          <Typography variant="body1" paragraph>
            If you can't find the answer to your question, please contact our support team:
          </Typography>
          <Button variant="contained" color="primary">
            Contact Support
          </Button>
        </Paper>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Frequently Asked Questions
        </Typography>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">How do I log in with a picture password?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              To log in with a picture password, enter your username and click "Continue". You'll then be presented with a 
              grid of pictures. Select the pictures that form your password in the correct order, then click "Login".
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">What should I do if I forget my password?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              If you've forgotten your password, click on the "Forgot Password" link on the login page. For students 
              with picture passwords, please ask your teacher to reset your password.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">How do I start a test?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              After logging in, navigate to your dashboard where you'll see available tests. Click on the test you want 
              to take, review the instructions, and then click "Start Test". Make sure you have enough time to complete 
              the test before starting, especially for timed tests.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Can I pause a test and resume later?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              For most tests, you cannot pause and resume later. Once you start a test, you should complete it in one session. 
              Timed tests will automatically submit when the time expires. If you experience technical issues during a test, 
              please contact your teacher immediately.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">How do teachers create tests?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Teachers can create tests by logging in with their teacher account, navigating to the "Tests" section, and 
              clicking "Create New Test". The test creation wizard will guide you through setting up questions, assigning 
              the test to specific grades or students, and configuring test parameters like time limits.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">How can I view my results?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              After completing a test, you'll see your results immediately (unless your teacher has disabled this feature). 
              You can also view all your past results by going to the "Results" section in your dashboard. Teachers can 
              provide additional feedback on your results, which will appear alongside your scores.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default Help;