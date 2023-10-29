// Logo.jsx
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

// eslint-disable-next-line import/no-unresolved
import { RouterLink } from 'src/routes/components'; // Modify the path to the PNG file
import logoPNG from './apple-touch-icon.png'; // Import the PNG file as a variable

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 140,
        height: 140,
        display: 'inline-flex',
        borderRadius: '50%',
        ...sx,
      }}
      {...other}
    >
      <img src={logoPNG} alt="Logo" style={{ borderRadius: '50%' }} />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} sx={{ display: 'contents', borderRadius: '50%' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
