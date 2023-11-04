import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button } from '@mui/material';

const ChooseLanguage = () => {
  const setLanguage = (language) => {
    localStorage.setItem('language', language);
  };

  return (
    <Box>
      <Box>
        <Button onClick={() => setLanguage('english')}>
          <Link>English</Link>
        </Button>
        <Button onClick={() => setLanguage('telugu')}>
          <Link>తెలుగు</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default ChooseLanguage;
