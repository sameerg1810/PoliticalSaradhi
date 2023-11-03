// Language.js
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

import { Menu, Button, MenuItem, Typography } from '@mui/material';

import hindiIcon from './Hindi.png';
import teluguIcon from './telugu.png';
import englishIcon from './English.png';
import languageIcon from './Translate.png';

const Language = () => {
  const { t } = useTranslation();

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
        {t('language')}
      </Button>
      {anchorEl && (
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <Typography variant="inherit" noWrap>
              <img src={englishIcon} alt="English" width="20" height="20" />
              {t('english')}
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="inherit" noWrap>
              <img src={teluguIcon} alt="Telugu" width="20" height="20" />
              {t('telugu')}
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="inherit" noWrap>
              <img src={hindiIcon} alt="Hindi" width="20" height="20" />
              {t('hindi')}
            </Typography>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default Language;
