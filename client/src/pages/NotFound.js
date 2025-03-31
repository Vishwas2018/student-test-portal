import { Box, Button, Container, Paper, Typography } from '@mui/material';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// client/src/pages/NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        my: 8, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5, 
            borderRadius: 2,
            width: '100%',
            maxWidth: 600
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
          
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Oops! Page Not Found
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4 }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            Go to Home
          </Button>
          
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound;