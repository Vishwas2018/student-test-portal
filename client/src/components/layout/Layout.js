import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
// client/src/components/layout/Layout.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';

// Import logout action
// import { logout } from '../../features/auth/authSlice';

const drawerWidth = 240;

const Layout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Get user from Redux store
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    handleMenuClose();
    // dispatch(logout());
    navigate('/');
  };
  
  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };
  
  // Define different menu items based on user role
  const getMenuItems = () => {
    const menuItems = [
      {
        text: 'Dashboard',
        icon: <DashboardIcon />,
        link: '/dashboard'
      }
    ];
    
    if (user?.role === 'student') {
      menuItems.push(
        {
          text: 'My Tests',
          icon: <AssignmentIcon />,
          link: '/dashboard'
        },
        {
          text: 'My Progress',
          icon: <SchoolIcon />,
          link: '/profile'
        }
      );
    } else if (user?.role === 'teacher' || user?.role === 'admin') {
      menuItems.push(
        {
          text: 'Students',
          icon: <PeopleIcon />,
          link: '/students'
        },
        {
          text: 'Tests',
          icon: <AssignmentIcon />,
          link: '/exams'
        },
        {
          text: 'Settings',
          icon: <SettingsIcon />,
          link: '/settings'
        }
      );
    }
    
    return menuItems;
  };
  
  const drawer = (
    <Box>
      <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Student Portal
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {getMenuItems().map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={Link} 
              to={item.link}
              onClick={() => isMobile && setMobileOpen(false)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${isAuthenticated ? drawerWidth : 0}px)` },
          ml: { md: isAuthenticated ? `${drawerWidth}px` : 0 },
        }}
      >
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Test Portal
          </Typography>
          
          {!isAuthenticated ? (
            <Box>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{ mr: 1 }}
              >
                Login
              </Button>
              <Button 
                color="inherit"
                variant="outlined"
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Box>
              <IconButton 
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ p: 0 }}
              >
                <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                  {user?.firstName?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                keepMounted
              >
                <MenuItem onClick={handleProfileClick}>
                  <ListItemIcon>
                    <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                      {user?.firstName?.charAt(0) || 'U'}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      {isAuthenticated && (
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better performance on mobile
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${isAuthenticated ? drawerWidth : 0}px)` },
          ml: { md: isAuthenticated ? `${drawerWidth}px` : 0 },
        }}
      >
        <Toolbar /> {/* Spacer to prevent content from going under AppBar */}
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;