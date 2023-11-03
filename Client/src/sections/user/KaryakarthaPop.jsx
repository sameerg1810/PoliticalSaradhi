import React from 'react';
import PropTypes from 'prop-types';

import { Box, Card, Grid, Popover, Typography, CardContent } from '@mui/material';

import Map from '../overview/Map';

const KaryakarthaInfoPopup = ({ open, handleClose, karyakarthaInfo }) => {
  const { name, address, currentLocation, kmCanvassed, reportsSent, votersRegistered, status } =
    karyakarthaInfo;

  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorReference="none"
      anchorPosition={{ top: '50%', left: '50%' }}
      transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          p: 4,
          backgroundColor: '#f0f0f0',
          overflow: 'auto',
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={handleClose}
            style={{ background: 'none', border: 'none', fontSize: '4em', cursor: 'pointer' }}
          >
            &times;
          </button>
        </Box>
        <Card sx={{ width: '100%', maxWidth: 600, my: 2, overflow: 'auto' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Karyakartha Info
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography align="left">Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">{name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">Address:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">{address}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">Current Location:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">{currentLocation}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">Karyakartha Status:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">{status}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">No of km canvassed:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">{kmCanvassed}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">No of reports sent:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">{reportsSent}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">No of voters registered:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">{votersRegistered}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ width: '100%', maxWidth: 600, height: '600px', my: 2, overflow: 'auto' }}>
          <CardContent>
            <Map style={{ width: '100%', height: '100%' }} />
          </CardContent>
        </Card>
      </Box>
    </Popover>
  );
};

KaryakarthaInfoPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  karyakarthaInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    currentLocation: PropTypes.string.isRequired,
    kmCanvassed: PropTypes.number.isRequired,
    reportsSent: PropTypes.number.isRequired,
    votersRegistered: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default KaryakarthaInfoPopup;
