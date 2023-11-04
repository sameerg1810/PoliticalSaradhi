import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Toolbar, Typography } from '@mui/material';

import teluguIcon from './telugu.png';
import englishIcon from './English.png';

const ChooseLanguage = () => {
  const setLanguage = (language) => {
    localStorage.setItem('language', language);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
      }}
    >
      <Toolbar disableGutters>
        <Button
          sx={{
            padding: '5px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => setLanguage('english')}
        >
          <Link to="/">
            <img
              src={englishIcon}
              alt="English"
              style={{ width: '30px', height: '30px', marginRight: '5px' }}
            />
            <Typography variant="subtitle1">English</Typography>
          </Link>
        </Button>

        <Button
          sx={{
            padding: '5px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => setLanguage('telugu')}
        >
          <Link to="/">
            <img
              src={teluguIcon}
              alt="Telugu"
              style={{ width: '30px', height: '30px', marginRight: '5px' }}
            />
            <Typography variant="subtitle1">తెలుగు</Typography>
          </Link>
        </Button>
      </Toolbar>
    </Box>
  );
};

export default ChooseLanguage;
