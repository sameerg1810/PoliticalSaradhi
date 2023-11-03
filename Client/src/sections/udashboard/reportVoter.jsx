import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import '../styles/Report-incident.css';
// eslint-disable-next-line import/no-unresolved
import closeIcon from './buttons/Close-button.jpeg';

export default function Reportvoter() {
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
        >
          <img src={closeIcon} alt="close" />
        </Button>
      </Box>
      <h1>Report a Voter</h1>
      <form onSubmit={handleSubmit}>
        <Box mt={3}>
          <FormControl fullWidth>
            <TextField
              label="House Number"
              value={formData.houseNumber}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <TextField
              label="Point of Contact"
              value={formData.pointOfContact}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <TextField
              label="No of Voters"
              type="number"
              value={formData.numberOfVoters}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <TextField
              label="Contact Details"
              value={formData.contactDetails}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <TextField
              label="Comments.."
              value={formData.contactDetails}
              onChange={handleInputChange}
            />
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <InputLabel id="issue-label">Select Issue</InputLabel>
            <Select
              labelId="issue-label"
              id="issue"
              value={formData.issue}
              label="Select Issue"
              onChange={handleInputChange}
            >
              <MenuItem value="Illegal Movement">Illegal Movement</MenuItem>
              <MenuItem value="Removal of Vote">Removal of Vote</MenuItem>
              <MenuItem value="Change of Address">Change of Address</MenuItem>
              <MenuItem value="Death">Death</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt={3}>
          <FormControl fullWidth>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
        </Box>
      </form>
    </Box>
  );
}
