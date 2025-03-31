// client/src/components/auth/PictureLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Button,
  TextField,
  Alert,
  Paper,
  Chip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// Import action creators (to be created)
// import { pictureLogin } from '../../features/auth/authSlice';

// Sample picture options - these would come from your server in a real implementation
const pictureOptions = [
  { id: 'apple', src: '/images/auth/apple.png', alt: 'Apple' },
  { id: 'banana', src: '/images/auth/banana.png', alt: 'Banana' },
  { id: 'cat', src: '/images/auth/cat.png', alt: 'Cat' },
  { id: 'dog', src: '/images/auth/dog.png', alt: 'Dog' },
  { id: 'elephant', src: '/images/auth/elephant.png', alt: 'Elephant' },
  { id: 'frog', src: '/images/auth/frog.png', alt: 'Frog' },
  { id: 'giraffe', src: '/images/auth/giraffe.png', alt: 'Giraffe' },
  { id: 'house', src: '/images/auth/house.png', alt: 'House' },
  { id: 'ice-cream', src: '/images/auth/ice-cream.png', alt: 'Ice Cream' },
  { id: 'jellyfish', src: '/images/auth/jellyfish.png', alt: 'Jellyfish' },
  { id: 'kite', src: '/images/auth/kite.png', alt: 'Kite' },
  { id: 'lion', src: '/images/auth/lion.png', alt: 'Lion' },
];

const PictureLogin = () => {
  const [username, setUsername] = useState('');
  const [picturePassword, setPicturePassword] = useState([]);
  const [error, setError] = useState(null);
  const [usernameSubmitted, setUsernameSubmitted] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get loading and error state from Redux
  const { isLoading, error: authError } = useSelector(state => state.auth);
  
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    
    // In a real implementation, you might want to validate the username here
    setUsernameSubmitted(true);
    setError(null);
  };
  
  const handlePictureClick = (pictureId) => {
    setPicturePassword([...picturePassword, pictureId]);
  };
  
  const handleRemovePicture = (index) => {
    setPicturePassword(picturePassword.filter((_, i) => i !== index));
  };
  
  const handleSubmit = () => {
    if (picturePassword.length < 3) {
      setError('Please select at least 3 pictures');
      return;
    }
    
    // Dispatch login action
    // dispatch(pictureLogin({ username, picturePassword }));
    
    // For demo purposes only
    console.log('Login attempt with:', { username, picturePassword });
    navigate('/dashboard');
  };
  
  const handleReset = () => {
    setPicturePassword([]);
    setError(null);
  };
  
  const handleBack = () => {
    setUsernameSubmitted(false);
    setPicturePassword([]);
    setError(null);
  };
  
  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 4,
          borderRadius: 2,
          background: 'linear-gradient(145deg, #f0f4ff 0%, #e0e8ff 100%)'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          gutterBottom 
          color="primary"
          sx={{ fontWeight: 'bold' }}
        >
          Picture Login
        </Typography>
        
        <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
          {!usernameSubmitted 
            ? 'Enter your username to get started' 
            : 'Select the pictures that form your password in the correct order'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {authError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {authError}
          </Alert>
        )}
        
        {!usernameSubmitted ? (
          <Box component="form" onSubmit={handleUsernameSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              autoFocus
              sx={{ mb: 3 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2, py: 1.5 }}
            >
              Continue
            </Button>
            
            <Button
              fullWidth
              variant="text"
              color="secondary"
              onClick={() => navigate('/login')}
              sx={{ mt: 2 }}
            >
              Use Password Login Instead
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Selected Pictures:
              </Typography>
              
              {picturePassword.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No pictures selected yet. Click on the pictures below to select them.
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  {picturePassword.map((pic, index) => (
                    <Chip
                      key={index}
                      label={pictureOptions.find(p => p.id === pic)?.alt || pic}
                      onDelete={() => handleRemovePicture(index)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Box>
            
            <Grid container spacing={2}>
              {pictureOptions.map((picture) => (
                <Grid item xs={6} sm={4} md={3} key={picture.id}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Card 
                      sx={{ 
                        borderRadius: 2,
                        boxShadow: 3,
                        transition: '0.3s',
                        '&:hover': {
                          boxShadow: 6
                        }
                      }}
                    >
                      <CardActionArea onClick={() => handlePictureClick(picture.id)}>
                        <CardMedia
                          component="img"
                          height="120"
                          image={picture.src}
                          alt={picture.alt}
                          sx={{ p: 2 }}
                        />
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ display: 'flex', mt: 4, gap: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleBack}
                sx={{ flexGrow: 1 }}
              >
                Back
              </Button>
              
              <Button
                variant="outlined"
                color="error"
                onClick={handleReset}
                sx={{ flexGrow: 1 }}
              >
                Clear Selection
              </Button>
              
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isLoading}
                sx={{ flexGrow: 1 }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default PictureLogin;