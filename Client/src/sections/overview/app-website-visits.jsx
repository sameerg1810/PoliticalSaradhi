import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Tracking from './Map';

const cardStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2px',
};

const mapStyle = {
  position: 'relative',
  width: '100%', // Adjusted width for mobile screens
  height: '50vh', // Adjusted height for mobile screens
  margin: '0 auto',
};

export default function AppWebsiteVisits({ title, subheader, ...other }) {
  return (
    <Card sx={cardStyle} {...other}>
      <CardHeader title={title} subheader={subheader} />
      <div style={mapStyle}>
        <Tracking />
      </div>
    </Card>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
