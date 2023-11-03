/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
/* eslint-disable import/order */
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  Menu,
  Card,
  AppBar,
  Toolbar,
  MenuItem,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

// eslint-disable-next-line perfectionist/sort-imports, import/order
// import { useRouter } from 'src/routes/hooks';

import Bell from './buttons/bell.png';
import NotificationPopup from './Notification';
import Reportvoter from './buttons/report-voter.jpeg';
import Reportincident from './buttons/incident-reporting.jpeg';
// Replace with the correct path
// eslint-disable-next-line import/no-unresolved

// eslint-disable-next-line import/no-unresolved
import Logo from 'src/components/logo';

import Language from './Languages';
// Replace with the correct path
// eslint-disable-next-line import/no-unresolved

import UserMapView from './userMap';
import Profile from './buttons/Profile.png';
import Canvassing from './buttons/Canvassing.png';

export default function KaryaDashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPop, setOpenPop] = useState(false);
  const [userName, setUserName] = useState('');

  const open = Boolean(anchorEl);
  // const router = useRouter(); // state to control the visibility of VoterFormComponent
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const id = localStorage.getItem('id');
      if (id) {
        await fetch(`https://canvas-back-end.onrender.com/main/user/logout/${id}`, {
          method: 'GET',
        });
      }
      // Clear local storage, session storage, and cookies
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      // Prevent the user from navigating forward after logging out
      navigate('/');
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  const handleOpenPopup = () => {
    setOpenPop(true);
  };

  const handleClosePopup = () => {
    setOpenPop(false);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    // Fetch user name and email from local storage when the component mounts
    const name = localStorage.getItem('name');

    setUserName(name);
  }, []);
  return (
    <Box p={1}>
      <AppBar position="static" sx={{ backgroundColor: '#212121', p: 1 }}>
        <Toolbar>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '5%',
              width: '25%',
              padding: '2px',
              margin: '1px',
              borderRadius: '50%',
            }}
          >
            <Logo />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            edge="end"
            aria-label="profile"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <img src={Profile} alt="Profile" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            sx={{ minWidth: '150px' }} // Adjust the width as needed
          >
            <MenuItem onClick={handleClose} sx={{ minHeight: '30px' }}>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                {userName}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ minHeight: '30px' }}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* this is main interface with tracking options , reporting voter , reporting incident , and Submitting voter forms */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box mt={1} p={2} bgcolor="grey.200" border={2} borderColor="success.main" borderRadius={5}>
          <UserMapView />
          <Typography variant="body1" color="text.secondary" align="center">
            Enable this option to make yourself available and keep you online.
          </Typography>
        </Box>
        <Box mt={1} p={1} bgcolor="grey.200">
          <Box mt={1}>
            <IconButton
              onClick={handleOpenPopup}
              color="inherit"
              aria-label="notifications"
              edge="end"
            >
              <img src={Bell} alt="Bell" />
            </IconButton>
          </Box>
          <Box mt={1} sx={{ minHeight: '30px' }}>
            <Language />
          </Box>
          <Box mt={1} p={1} bgcolor="grey.200">
            <NotificationPopup open={openPop} handleClosePopup={handleClosePopup} />
          </Box>
        </Box>
      </Box>
      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box mt={1} display="flex" justifyContent="center">
                <button
                  type="button"
                  className="report-incident-button"
                  onClick={() => {
                    navigate('/voterform');
                  }}
                >
                  <img src={Canvassing} alt="Canvassing" />
                </button>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Box mt={2} display="flex" justifyContent="center">
                <button
                  type="button"
                  className="report-incident-button"
                  onClick={() => {
                    navigate('/Report-incident');
                  }}
                >
                  <img src={Reportincident} alt="report-incident" />
                </button>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Box mt={2} display="flex" justifyContent="center">
                <button
                  type="button"
                  className="report-incident-button"
                  onClick={() => {
                    navigate('/reportVoter');
                  }}
                >
                  <img src={Reportvoter} alt="report-incident" />
                </button>
              </Box>
              <div
                className="report-con"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
              >
                <button type="button" style={{ margin: '0 10px' }}>
                  Call
                </button>
                <button type="button" style={{ margin: '0 10px' }}>
                  Message
                </button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
