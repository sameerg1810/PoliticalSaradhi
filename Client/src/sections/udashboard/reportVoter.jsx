import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

// eslint-disable-next-line import/no-unresolved
import closeIcon from './close.png';
import '../styles/Report-incident.css';

export default function Reportvoter() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    houseNumber: '',
    pointOfContact: '',
    numberOfVoters: '',
    contactDetails: '',
    issue: 'Illegal Movement',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, for example, by sending the data to a server.
    console.log('Form submitted with data:', formData);
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
      <h1>Report an Issue</h1>
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
