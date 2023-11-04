// NotificationPopup.js
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Box, Modal, Button, TextField, Typography } from '@mui/material';

const NotificationPopup = ({ open, handleClosePopup }) => {
  const lan = localStorage.getItem('language');
  const language = lan === 'english';
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);

  const handleSendMessage = () => {
    // Handle sending the message
    if (message) {
      console.log(`Sending message: ${message}`);
      setIsSent(true);
      setIsTextFieldVisible(false);
      setMessage(''); // Clear the message after sending
    }
  };

  return (
    <Modal open={open} onClose={handleClosePopup}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 300,
          bgcolor: 'background.paper',
          boxShadow: 20,
          p: 4,
          border: '10px solid black',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Typography variant="h5">
          {language ? 'Notification Popup Content' : 'అధికారుల సూచనలు'}
        </Typography>
        <Button
          className="btn home-call-btns"
          style={{ backgroundColor: 'green', width: '40px', height: '40px', borderRadius: '50%' }}
          onClick={() => setIsTextFieldVisible(true)}
        >
          <i
            className="fa fa-comment"
            aria-hidden="true"
            style={{ color: 'white', fontSize: '24px' }}
          />
        </Button>
        {isTextFieldVisible && (
          <div style={{ width: '100%', marginTop: '10px' }}>
            <TextField
              label={language ? 'Message' : 'సందేశం'}
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '100%' }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              style={{ backgroundColor: 'green', color: 'white', marginTop: '10px' }}
            >
              {language ? 'Send' : 'పంపించండి'}
            </Button>
          </div>
        )}
        {isSent && (
          <div style={{ marginTop: '10px', color: 'green' }}>
            {language ? 'Your message has been sent successfully' : 'మీ వార్త పంపబడింది'}
          </div>
        )}
        <Button variant="contained" onClick={handleClosePopup}>
          <i className="fa-solid fa-xmark" />
        </Button>
      </Box>
    </Modal>
  );
};

NotificationPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
};

export default NotificationPopup;
