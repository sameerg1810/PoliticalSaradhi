// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

// eslint-disable-next-line import/no-unresolved
import { useRouter } from 'src/routes/hooks';
// eslint-disable-next-line import/no-unresolved
import { RouterLink } from 'src/routes/components';

// eslint-disable-next-line import/no-unresolved
import { bgGradient } from 'src/theme/css';

// eslint-disable-next-line import/no-unresolved
import Logo from 'src/components/logo';
// eslint-disable-next-line import/no-unresolved
import Iconify from 'src/components/iconify';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

  const handleLogin = async (event) => {
    console.log('Event:', event);
    if (!event || !event.target || !event.target.elements) {
      console.error('Event or event.target is undefined.');
      return;
    }

    console.log('Event target:', event.target);

    event.preventDefault();
    const formData = new FormData(event.target);
    console.log('Form Data:', formData);

    try {
      const response = await axios.post('https://canvas-back-end.onrender.com/main/admin/login', {
        email: userCredentials.email,
        password: userCredentials.password,
      });

      const { data } = response;
      if (data.message === 'ok') {
        // Successful login, handle the response accordingly
        const { token, id } = data;
        // Store the token in localStorage or a state management solution
        localStorage.setItem('token', token);
        // Redirect to the appropriate dashboard based on the user's role or ID
        if (id === '12345678') {
          router.push('/ldashboard');
        } else {
          router.push('/udashboard');
        }
      } else {
        // Handle invalid credentials
        alert('Invalid credentials');
      }
    } catch (error) {
      // Handle errors
      console.error('An error occurred:', error);
      // Display an error message to the user
      alert('An error occurred during login. Please try again.');
    }
  };

  const renderForm = (
    <form onSubmit={handleLogin}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={userCredentials.email}
          onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={userCredentials.password}
          onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
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

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Login
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
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
            maxWidth: 420,
          }}
        >
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

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
