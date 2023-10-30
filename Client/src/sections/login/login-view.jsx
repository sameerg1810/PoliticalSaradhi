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

export default function LoginView() {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = userCredentials;
    try {
   

      const response = await fetch('https://canvas-back-end.onrender.com/main/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log('hello')
   
      const responseData = await response.json();
      console.log(responseData)
   
      if (responseData.message === 'ok') {
        const { token, id ,msg} = responseData;
        localStorage.setItem('token', token);
        localStorage.setItem('id',id)
        const nextPage = msg === 'user' ? '/udashboard' : '/ldashboard';
        router.push(nextPage);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('/assets/background/overlay_4.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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

        <Stack alignItems="center" justifyContent="center">
          <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
            <Typography variant="h4">Sign in to Political Saradhi</Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              Don’t have an account?{' '}
              <RouterLink to="/signup" variant="subtitle2" sx={{ ml: 0.5 }}>
                Get started
              </RouterLink>
            </Typography>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <form onSubmit={handleLogin}>
              <Stack spacing={3}>
                <TextField
                  name="email"
                  label="Email address"
                  value={userCredentials.email}
                  onChange={(e) =>
                    setUserCredentials({ ...userCredentials, email: e.target.value })
                  }
                />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={userCredentials.password}
                  onChange={(e) =>
                    setUserCredentials({ ...userCredentials, password: e.target.value })
                  }
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
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <RouterLink to="/forgot-password" variant="subtitle2" underline="hover">
                  Forgot password?
                </RouterLink>
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
              >
                Login
              </LoadingButton>
            </form>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
