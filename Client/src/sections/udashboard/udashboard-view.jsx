/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import {
  Box,
  Grid,
  Card,
  Modal,
  Button,
  AppBar,
  Toolbar,
  TextField,
  Typography,
  CardContent,
} from '@mui/material';

// eslint-disable-next-line import/no-unresolved
import { useRouter } from 'src/routes/hooks';

import Logo from 'src/components/logo';

// eslint-disable-next-line import/no-unresolved
import UserMapView from './userMap';

export default function KaryaDashboard() {
  // eslint-disable-next-line no-unused-vars
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showVoterDetailsForm, setShowVoterDetailsForm] = useState(false); // default hidden

  const handleNotificationClick = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleUploadFile = (files) => {
    console.log('Uploaded files:', files);
  };

  const handleToggleVoterDetailsForm = () => {
    setShowVoterDetailsForm(!showVoterDetailsForm);
  };

  const handleVoterFormSubmit = () => {
    // Handle logic for submitting voter form
    console.log('Voter form submitted');
  };

  return (
    <Box p={1}>
      <AppBar position="static" sx={{ backgroundColor: '#212121', p: 1 }}>
        <Toolbar>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '25%',
              width: '50%',
              padding: '2px',
              margin: '1px',
              borderRadius: '50%',
            }}
          >
            <Logo />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              User Name
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#fff' }}>
              useremail@example.com
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box mt={3}>
        <Typography variant="h4">Voter Details</Typography>
      </Box>

      <Box mt={3}>
        <Modal open={open} onClose={handleClosePopup}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography>Notification Popup Content</Typography>
            <Button variant="contained" onClick={handleClosePopup}>
              Close
            </Button>
          </Box>
        </Modal>
      </Box>

      <Box mt={3}>
        <input type="file" onChange={(e) => handleUploadFile(e.target.files)} />
      </Box>

      <Box mt={3}>
        <Button
          variant="contained"
          onClick={handleToggleVoterDetailsForm}
          sx={{ backgroundColor: '#4caf50', color: 'white' }}
        >
          {showVoterDetailsForm ? 'Hide Voter Details Form' : 'Show Voter Details Form'}
        </Button>
      </Box>

      {showVoterDetailsForm && (
        <Box mt={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Voter Form</Typography>
              <TextField label="Name" variant="outlined" fullWidth margin="normal" />
              <TextField label="Father's Name" variant="outlined" fullWidth margin="normal" />
              <TextField label="Date of Birth" variant="outlined" fullWidth margin="normal" />
              <TextField label="Gender" variant="outlined" fullWidth margin="normal" />
              <TextField label="Booth Number" variant="outlined" fullWidth margin="normal" />
              <Button
                variant="contained"
                onClick={handleVoterFormSubmit}
                sx={{ backgroundColor: '#f9a825', color: 'white' }}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box mt={3}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                sx={{ backgroundColor: '#f50057', color: 'white', borderRadius: '50px' }}
                onClick={handleNotificationClick}
              >
                <Typography variant="button">Notifications</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} p={2} bgcolor="grey.200">
        <UserMapView />
      </Box>
    </Box>
  );
}
