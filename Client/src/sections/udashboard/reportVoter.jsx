import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import '../styles/Report-incident.css';
// eslint-disable-next-line import/no-unresolved

export default function Reportvoter() {
  const lan = localStorage.getItem('language');
  const language = lan === 'english';

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    houseNumber: '',
    pointOfContact: '',
    numberOfVoters: '',
    contactDetails: '',
    issue: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://canvas-back-end.onrender.com/main/user/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Form submitted successfully:', data);
        alert('report has been submitted successfully', data);
        // Optionally, you can redirect to a different page after successful form submission
        navigate('/success'); // Replace '/success' with the desired route
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('An error occurred during form submission:', error);
    }
  };

  return (
    <Box width={300} m="auto" mt={4}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          className="closebutton"
          onClick={() => {
            navigate('/udashboard');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate('/udashboard');
            }
          }}
          style={{ backgroundColor: 'red' }} // or use color: 'red' for the text color
        >
          <i className="fa-solid fa-xmark" />
        </Button>
      </Box>

      <h1>{language ? 'Report a Voter' : 'ఓటుదారుని రిపోర్ట్ చేయండి'}</h1>
      <form onSubmit={handleSubmit}>
        <Box mt={3}>
          <FormControl fullWidth>
            <TextField
              label={language ? 'House Number' : 'ఇంటి  నంబర్'}
              value={formData.houseNumber}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <TextField
              label={language ? 'Point of Contact' : 'సంప్రదించిన వ్యక్తి'}
              value={formData.pointOfContact}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <TextField
              label={language ? 'No of Voters' : 'ఉన్న ఓటర్ల సంఖ్య'}
              type="number"
              value={formData.numberOfVoters}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <TextField
              label={language ? 'Contact Details' : 'సంప్రదించిన వ్యక్తి ఫోన్ నంబర్'}
              value={formData.contactDetails}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <TextField
              label={language ? 'Comments..' : 'వివరణ'}
              value={formData.contactDetails}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <InputLabel id="issue-label">{language ? '' : 'సమస్యను ఎంచుకోండి'}</InputLabel>
            <Select
              labelId="issue-label"
              id="issue"
              value={formData.issue}
              label="Select Issue"
              onChange={handleInputChange}
            >
              <MenuItem value="Illegal Movement">
                {language
                  ? 'Illegal Movement'
                  : 'ఈ ప్రాంతంకి సంబంధించిన వ్యక్తి కాదు/అతడు ఇక్కడ లేరు'}
              </MenuItem>
              <MenuItem value="Removal of Vote">
                {language ? 'Removal of Vote' : 'ఓటు తీసి వేయబడింది'}
              </MenuItem>
              <MenuItem value="Change of Address">
                {language ? 'Change of Address' : 'వాళ్ళ చిరునామా మారింది'}
              </MenuItem>
              <MenuItem value="Death">{language ? 'Death' : 'మరణించారు'}</MenuItem>
              <MenuItem value="Others">{language ? 'Others' : 'ఇతర కారణాలు'}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              {language ? ' Submit' : 'ఫారం పంపండి'}
            </Button>
          </FormControl>
        </Box>
      </form>
    </Box>
  );
}
