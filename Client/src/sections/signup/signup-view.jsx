// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

// eslint-disable-next-line import/no-unresolved
import { useRouter } from 'src/routes/hooks';
// eslint-disable-next-line import/no-unresolved
import { RouterLink } from 'src/routes/components';

// eslint-disable-next-line import/no-unresolved
import Logo from 'src/components/logo';
// eslint-disable-next-line import/no-unresolved
import Iconify from 'src/components/iconify';

const SignupView = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (event) => {
    console.log('Event:', event);
    if (!event || !event.target || !event.target.elements) {
      console.error('Event or event.target is undefined.');
      return;
    }

    console.log('Event target:', event.target);

    event.preventDefault();
    const formData = new FormData();
    formData.append('name', event.target.elements.name.value);
    formData.append('email', event.target.elements.email.value);
    formData.append('password', event.target.elements.password.value);
    formData.append('mobile', event.target.elements.mobile.value);
    formData.append('oid', event.target.elements.oid.value);
    // Log the form data
    console.log('Form Data:', formData);
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(
        'https://canvas-back-end.onrender.com/main/admin/signup',
        formData
      );

      // Handle the response here
      console.log('Response:', response.data);

      // Redirect to the home page after successful registration
      router.push('/');
    } catch (error) {
      // Handle errors here
      console.error('An error occurred:', error);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Box>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
          }}
        />

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h4">Create an account</Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              Already have an account?
              <RouterLink component={RouterLink} to="/login" variant="subtitle2" sx={{ ml: 0.5 }}>
                Get started
              </RouterLink>
            </Typography>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <form onSubmit={handleSignup}>
              <Stack spacing={3}>
                <TextField name="name" label="Name" />
                <TextField name="email" label="Email address" />
                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField name="mobile" label="Mobile" inputProps={{ inputMode: 'numeric' }} />
                <TextField name="oid" label="OID" />
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit" // Make sure type is set to submit
                variant="contained"
                color="inherit"
              >
                Sign Up
              </LoadingButton>
            </form>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignupView;
