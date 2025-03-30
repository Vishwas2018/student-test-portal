import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Blue
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#ff9800', // Orange
      light: '#ffb74d',
      dark: '#f57c00',
    },
    success: {
      main: '#4caf50', // Green
      light: '#81c784',
      dark: '#388e3c',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '8px 0',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;

