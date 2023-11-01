// NotificationPopup.js
import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Button, Typography } from '@mui/material';

const NotificationPopup = ({ open, handleClosePopup }) => (
  <Modal open={open} onClose={handleClosePopup}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 20,
        p: 4,
        border: '10px solid black',
      }}
    >
      <Typography>Notification Popup Content</Typography>
      <Button variant="contained" onClick={handleClosePopup}>
        Close
      </Button>
    </Box>
  </Modal>
);

NotificationPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
};

export default NotificationPopup;
