import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Stack,
  Avatar,
  Select,
  Popover,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  Typography,
  IconButton,
} from '@mui/material';

// eslint-disable-next-line import/no-unresolved
import Label from 'src/components/label';
// eslint-disable-next-line import/no-unresolved
import Iconify from 'src/components/iconify';

import KaryakarthaInfoPopup from './KaryakarthaPop';
import {
  fetchData,
  downloadReportVoter,
  downloadCanvassingForm,
  downloadReportIncident,
} from './DataDownloader';

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  address,
  email,
  isVerified,
  status,
  handleClick,
}) {
  const today = new Date();
  const previousDates = [];

  // Calculate the previous 5 dates
  for (let i = 1; i <= 5; i = +1) {
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - i);
    previousDates.push(previousDate.toISOString()); // Replace with the desired format
  }

  // Array to store previous dates

  // Create options array with current date and previous 5 dates
  const options = [
    { value: today.toISOString(), label: today.toISOString() }, // Replace label with your desired date format
    // Add the previous 5 dates to the options array
    ...previousDates.map((date) => ({ value: date, label: date })),
  ];

  // Define the state for selected date
  const [selectedDate, setSelectedDate] = useState(today.toISOString()); // Setting the current date as the default selected date
  const id = localStorage.getItem('id');
  // Function to handle selection change
  const handleDateChange = (selectedOption) => {
    // Update the selected date
    setSelectedDate(selectedOption.value);
  };
  const [menuPosition, setMenuPosition] = useState(null);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const handleOpenMenu = (event) => {
    setMenuPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };

  const handleCloseMenu = () => {
    setMenuPosition(null);
  };

  const handleOpenInfo = () => {
    setInfoOpen(true);
    handleCloseMenu();
  };

  const handleCloseInfo = () => {
    setInfoOpen(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} email="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{address}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>
        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {menuPosition && (
        <Popover
          open={Boolean(menuPosition)}
          onClose={handleCloseMenu}
          anchorReference="anchorPosition"
          anchorPosition={menuPosition}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <MenuItem>
            <Select
              options={options} // Replace with your options
              value={selectedDate} // Replace with your selected date state
              onChange={(selectedOption) => handleDateChange(selectedOption)} // Replace with your state setter function
              placeholder="Select a date"
            />
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>

          <MenuItem
            onClick={async () => {
              try {
                const data = await fetchData(id, selectedDate); // Fetch the data here or obtain it from another source
                if (data) {
                  await downloadCanvassingForm(data);
                }
                handleCloseMenu();
              } catch (error) {
                console.error('Error occurred:', error);
              }
            }}
          >
            <Iconify icon="eva:download-outline" sx={{ mr: 2 }} />
            Canvassing Form Download
          </MenuItem>
          <MenuItem
            onClick={async () => {
              try {
                const data = await fetchData(id, selectedDate); // Fetch the data here or obtain it from another source
                if (data) {
                  await downloadReportIncident(data);
                }
                handleCloseMenu();
              } catch (error) {
                console.error('Error occurred:', error);
              }
            }}
          >
            <Iconify icon="eva:download-outline" sx={{ mr: 2 }} />
            Report Incident Download
          </MenuItem>
          <MenuItem
            onClick={async () => {
              try {
                const data = await fetchData(id, selectedDate); // Fetch the data here or obtain it from another source
                if (data) {
                  await downloadReportVoter(data);
                }
                handleCloseMenu();
              } catch (error) {
                console.error('Error occurred:', error);
              }
            }}
          >
            <Iconify icon="eva:download-outline" sx={{ mr: 2 }} />
            Report Voter Download
          </MenuItem>

          <MenuItem onClick={handleOpenInfo}>
            <Iconify icon="eva:info-outline" sx={{ mr: 2 }} />
            More info
          </MenuItem>
        </Popover>
      )}

      <KaryakarthaInfoPopup
        open={isInfoOpen}
        handleClose={handleCloseInfo}
        karyakarthaInfo={{
          name: 'Rajyalaxmi',
          address: 'L.B.Nagar',
          currentLocation: '',
          kmCanvassed: 100,
          reportsSent: 50,
          votersRegistered: 200,
        }}
      />
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  address: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  email: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
