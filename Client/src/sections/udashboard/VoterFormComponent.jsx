import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  Grid,
  Button,
  TextField,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

import Home from './buttons/home.png';

export default function VoterFormComponent() {
  const lan=localStorage.getItem('language')
  const id = localStorage.getItem('id');
  const resetFormData = () => {
    setFormData({
      name: '',
      fatherName: '',
      motherName: '',
      houseNumber: '',
      colony: '',
      villageDivision: '',
      occupation: '',
      totalVoters: '',
      availableVoters: '',
      migratedVoters: '',
      caste: '',
      category: '',
      religion: '',
      comments: '',
    });
  };

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    houseNumber: '',
    colony: '',
    villageDivision: '',
    occupation: '',
    totalVoters: '',
    availableVoters: '',
    migratedVoters: '',
    caste: '',
    category: '',
    religion: '',
    comments: '',
  });

  const handleUploadFile = (files) => {
    console.log('Uploaded files:', files);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleVoterFormSubmit = async () => {
    console.log('voter submitted form initiated');
    try {
      const response = await fetch(`https://canvas-back-end.onrender.com/main/user/form/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      const data = await response.json();
      console.log('Form submitted successfully:', data);
      alert('Form submitted successfully:', formData);
      resetFormData();
      // Optionally, you can redirect to a different page after successful form submission
    } catch (error) {
      console.error('An error occurred during form submission:', error);
    }
  };
  const navigate = useNavigate();
  return (
    <Box mt={3}>
      <Box mt={3}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={10} md={6}>
            <Box mt={1} display="flex" justifyContent="center">
              <IconButton
                className="closebutton"
                onClick={() => {
                  navigate('/udashboard');
                }}
              >
                <img src={Home} alt="Home" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <Typography variant="h4">{lan==="english"?"Canvassing Form<":"ఎన్నికల ప్రచారం ఫారం"}</Typography>
      </Box>

      <Card sx={{ border: '1px solid black', borderRadius: '4px', padding: '16px' }}>
        <CardContent>
          <Typography variant="h6">{lan==="english"?"Enter Details below":"కింది వివరాలు నమోదు చేయండి"}</Typography>
          <TextField
            label={lan==="english?"?" Name":" పేరు"}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english?"?"Father's Name":"తండ్రి పేరు"}
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"Mother's  Name":"తల్లి పేరు"}
            name="motherName"
            value={formData.motherName}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"House Number":"ఫ్లాట్  - నెంబరు"}
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"Colony":"కాలనీ"}
            name="colony"
            value={formData.colony}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"Village/Division":"గ్రామం/నగరం"}
            name="villageDivision"
            value={formData.villageDivision}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"Occupation":"వృత్తి"}
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"Total Number Of Voters":"ఓటర్ల మొత్తం సంఖ్య"}
            name="totalVoters"
            value={formData.totalVoters}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"Total Number Of available voters to poll":"ఓటు చేయడానికి అందుబాటులో ఉన్న మొత్తం ఓటర్లు"}
            name="availableVoters"
            value={formData.availableVoters}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"Total Number Of migrated Voters":"ప్రవాసించిన ఓటర్లు/అందుబాటులో లేని ఓటర్లు"}
            name="migratedVoters"
            value={formData.migratedVoters}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"Caste":"కులం"}
            name="caste"
            value={formData.caste}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"Category":"వర్గం(బీసి-ఏ , బీసి-బి , బీసి-సి,ఎస్టి.....)"}
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"Religion":"మతం"}
            name="religion"
            value={formData.religion}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={lan==="english"?"Comments":"వ్యాఖ్యలు మరియు సందేశం"}
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Box mt={3}>
            <input type="file"  onChange={(e) => handleUploadFile(e.target.files)} />
          </Box>
          <Button
            variant="contained"
            onClick={handleVoterFormSubmit}
            sx={{ backgroundColor: '#f9a825', color: 'white', marginTop: '16px' }}
          >
           {lan==='english'?"Submit":"ఫారం పంపండి"} 
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
