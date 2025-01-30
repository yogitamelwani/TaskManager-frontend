import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import loginImage from '../assets/images/login-image.jpg';
import userData, { User } from '../assets/data/userData';

const Login = () => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({ email: '', password: '' });
  const navigate = useNavigate();

  const getUserData = (): User[] => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : userData;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const storedUserData = getUserData();
      const user = storedUserData.find(
        (user) => user.email === formData.email && user.password === formData.password
      );
      
      if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        navigate('/');
      } else {
        setErrors({ email: 'Invalid email or password', password: '' });
      }
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: '#F8F9FC',
        height: '100vh',
        maxWidth:'none !important',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '900px',
          bgcolor: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 3,
          display: 'flex',
        }}
      >
        <Grid container sx={{ flex: 1 }} component="form" onSubmit={handleSubmit}>
          <Grid item xs={12} md={6} sx={{ p: 4 }}>
            <Typography variant="h5" color="primary" fontWeight="bold" sx={{ textAlign: 'center' }} gutterBottom>
              Welcome Back!
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={3} sx={{ textAlign: 'center' }}>
              Login to continue managing your tasks.
            </Typography>

            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="you@email.com"
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="********"
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button fullWidth variant="contained" sx={{ mt: 2, pt: 1, pb: 1 }} type="submit">
              Sign In
            </Button>
            <Button fullWidth color="primary" variant="text" sx={{ mt: 1 }} onClick={() => navigate('/register')}>
              Sign up
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              bgcolor: '#F1F2F6',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: '80%',
                height: '80%',
                backgroundColor: '#E0E0E0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={loginImage}
                alt="Login Illustration"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
