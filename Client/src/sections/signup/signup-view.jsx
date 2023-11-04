// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';

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

const SignupView = () => {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    oid: '',
  });

  const lan = localStorage.getItem('language');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const { name, email, password, mobile, oid } = formData;

    try {
      const response = await fetch('https://canvas-back-end.onrender.com/main/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, mobile, oid }),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (response.ok) {
        router.push('/'); // Redirect to the home page after successful registration
        if (lan !== 'english') {
          // Show a material-ui popup message for 2 seconds
          // You can replace 'My message' with the appropriate translation for your language
          toast.success(
            'మీరు కత్తదనారులు అయ్యారు, లాగిన్ అవ్వండి. You are a member now, please login.',
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            }
          );
        } else {
          toast.success('You are a member now, please login.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      } else {
        console.error('Sign up failed:', responseData.message);
      }
    } catch (error) {
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
            <Typography variant="h4">
              {lan === 'english' ? 'Create an account' : 'ఖాతా సృష్టించండి'}
            </Typography>

            <Typography
              variant="body2"
              sx={{ mt: 2, mb: 5, color: 'blue', textShadow: '1px 1px 2px black' }}
            >
              {lan === 'english' ? 'Already have an account?' : 'ఖాతా ఉందా..?'}
              <RouterLink
                to="/"
                variant="subtitle2"
                sx={{
                  ml: 0.5,
                  color: 'blue',
                  textShadow: '1px 1px 2px black',
                }}
              >
                {lan === 'english' ? 'Login' : 'ఇక్కడ లాగిన్ చెయ్యండి'}
              </RouterLink>
            </Typography>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {lan === 'english' ? 'OR' : 'లేదా'}
              </Typography>
            </Divider>

            <form onSubmit={handleSignup}>
              <Stack spacing={3}>
                <TextField
                  name="name"
                  label={lan === 'english' ? 'Name' : 'పేరు'}
                  onChange={handleInputChange}
                />
                <TextField
                  name="email"
                  label={lan === 'english' ? 'Email address' : 'ఇమెయిల్'}
                  onChange={handleInputChange}
                />
                <TextField
                  name="password"
                  label={lan === 'english' ? 'Password' : 'పాస్వర్డ్'}
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
                  label={lan === 'english' ? 'Mobile' : 'ఫోన్ నెంబర్'}
                  inputProps={{ inputMode: 'numeric' }}
                  onChange={handleInputChange}
                />
                <TextField
                  name="oid"
                  label={lan === 'english' ? 'OID' : 'ఐ.డి'}
                  onChange={handleInputChange}
                />
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
              >
                {lan === 'english' ? 'Sign Up' : 'వివరాలు పంపండి'}
              </LoadingButton>
            </form>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignupView;
