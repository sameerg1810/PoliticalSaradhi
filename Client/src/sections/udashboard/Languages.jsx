import React from 'react';

import { Menu, Button, MenuItem, Typography } from '@mui/material';

import hindiIcon from './Hindi.png';
import teluguIcon from './telugu.png';
import englishIcon from './English.png';
import languageIcon from './Translate.png';

const Language = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<img src={languageIcon} alt="Language Icon" width="20" height="20" />}
      >
        Language
      </Button>
      {anchorEl && (
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <Typography variant="inherit" noWrap>
              <img src={englishIcon} alt="English" width="20" height="20" />
              English
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="inherit" noWrap>
              <img src={teluguIcon} alt="Telugu" width="20" height="20" />
              Telugu
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="inherit" noWrap>
              <img src={hindiIcon} alt="Hindi" width="20" height="20" />
              Hindi
            </Typography>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default Language;
