import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, IconButton, Typography, TextareaAutosize } from '@mui/material';

import '../styles/Report-incident.css';
import close from './buttons/Close-button.jpeg';

export default function Reportincident() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('File:', file);
    console.log('Comment:', comment);
  };
const lan=localStorage.getItem('language')

const language = lan === 'english' 

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton
          className="closebutton"
          onClick={() => {
            navigate('/udashboard');
          }}
        >
          <img src={close} alt="close" />
        </IconButton>
      </Box>

      <Box mt={2}>
        <Typography variant="h5" gutterBottom>
        {language?" Report Incident":"ఏ ఘటన జరిగినా తెలియజేయండి"} 
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box mt={2}>
          <TextField label={language?"Incident":"అది ఏ ఘటన"} variant="outlined" fullWidth required />
        </Box>

        <Box mt={2}>
          <TextareaAutosize
            placeholder={language?"Write your comment here...":"జరిగిన ఘటన గురించి మరియు ఘటన స్థలం గురించి వివరించండి"}
            minRows={3}
            style={{
              width: '100%',
              padding: '10px',
              resize: 'none',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>

        <Box mt={2}>
          <Typography variant="body1" gutterBottom>
          {language?"Attach File":"ఒక చిత్రం లేదా ఫైల్ చేర్చండి"}  
          </Typography>
          <input type="file" onChange={handleFileChange} />
        </Box>

        <Box mt={2}>
          <Button variant="contained" type="submit">
            {language?"Submit":"ఫారం పంపండి"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
