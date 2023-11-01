import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Stack,
  Avatar,
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

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  address,
  role,
  isVerified,
  status,
  handleClick,
}) {
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
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
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
        <TableCell>{role}</TableCell>
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
          <MenuItem onClick={handleCloseMenu}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <Iconify icon="eva:download-outline" sx={{ mr: 2 }} />
            Download
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
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
