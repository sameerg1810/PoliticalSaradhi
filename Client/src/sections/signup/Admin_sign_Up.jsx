import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
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

const AdminSignUp = () => {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    // oid: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const { name, email, password, mobile } = formData;

    try {
      const response = await fetch('https://canvas-back-end.onrender.com/main/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, mobile}),
      });
      const responseData = await response.json();
      console.log('Response:', responseData);
      if (response.ok) {
        router.push('/'); // Redirect to the home page after successful registration
      } else {
        console.error('Sign up failed:', responseData.message);
      }
    } catch (error){
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
        backgroundImage: `url('/assets/background/overlay_4.jpg')`,
      }}
    >
      <Box 
      sx={{
        width:500
      }}
      >
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
              maxWidth: 520,
            }}
          >
            <Typography variant="h4">Create an  Admin account</Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              Already have an account?
              <RouterLink to="/" variant="subtitle2" sx={{ ml: 0.5 }}>
                Login
              </RouterLink>
            </Typography>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <form onSubmit={handleSignup}>
              <Stack spacing={3}>
                <TextField name="name" label="Name" onChange={handleInputChange} />
                <TextField name="email" label="Email address" onChange={handleInputChange} />
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
                  onChange={handleInputChange}
                />
                <TextField
                  name="mobile"
                  label="Mobile"
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={handleInputChange}
                />
                {/* <TextField name="oid" label="OID" onChange={handleInputChange} /> */}
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                  sx={{
                    marginTop:10
                  }}
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

export default AdminSignUp;
