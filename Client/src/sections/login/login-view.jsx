import React, { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Card,
  Stack,
  Divider,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

// eslint-disable-next-line import/no-unresolved
import { useRouter } from 'src/routes/hooks';
// eslint-disable-next-line import/no-unresolved
import { RouterLink } from 'src/routes/components';

// eslint-disable-next-line import/no-unresolved
import Logo from 'src/components/logo';
// eslint-disable-next-line import/no-unresolved
import Iconify from 'src/components/iconify';

import ChooseLanguage from '../udashboard/ChooseLanguage';

export default function LoginView() {
  const lan = localStorage.getItem('language');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = userCredentials;
    try {
      const response = await fetch(`https://canvas-back-end.onrender.com/main/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log('karyakartha logged in successfully');
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.message === 'ok') {
        const { token, id, msg } = responseData;
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
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
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('/assets/background/overlay_4.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <ChooseLanguage />
      </Box>
      <Box>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
          }}
        />
        <Stack alignItems="center" justifyContent="center">
          <Card sx={{ p: 3, maxWidth: 300 }}>
            <Typography variant="h3">
              {lan === 'english'
                ? 'Sign in to Political Saradhi'
                : 'పొలిటికల్ సారధికి సైన్ ఇన్ చేయండి'}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 2, mb: 5, color: 'blue', textShadow: '1px 1px 2px black' }}
            >
              {lan === 'english' ? ' Don’t have an account?' : 'ఖాతా లేదా..? '}{' '}
              <RouterLink
                to="/signup"
                variant="subtitle2"
                sx={{
                  ml: 0.5,
                  color: 'blue',
                  textShadow: '1px 1px 2px black',
                }}
              >
                {lan === 'english' ? 'Get started' : '   ప్రారంభించండి'}
              </RouterLink>
            </Typography>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {lan === 'english' ? '   OR' : 'లేదా.'}
              </Typography>
            </Divider>
            <form onSubmit={handleLogin}>
              <Stack spacing={3}>
                <TextField
                  name="email"
                  label={lan === 'english' ? 'Email address' : 'ఇమెయిల్'}
                  value={userCredentials.email}
                  onChange={(e) =>
                    setUserCredentials({ ...userCredentials, email: e.target.value })
                  }
                />
                <TextField
                  name="password"
                  label={lan === 'english' ? 'Password' : 'పాస్‌వర్డ్'}
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
                  {lan === 'english' ? 'Forgot Password' : 'పాస్వర్డ్ మర్చిపోయారా?'}
                </RouterLink>
              </Stack>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
              >
                {lan === 'english' ? 'Login' : 'లాగిన్ చేయండి'}
              </LoadingButton>
            </form>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
