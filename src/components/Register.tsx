import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import loginImage from '../assets/images/login-image.jpg';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = React.useState({});
  const [alert, setAlert] = React.useState({ message: '', severity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newUser = { ...formData };
      const storedUserData = JSON.parse(
        localStorage.getItem('userData') || '[]'
      );
      storedUserData.push(newUser);
      localStorage.setItem('userData', JSON.stringify(storedUserData));
      setAlert({ message: 'Account created successfully.', severity: 'success' });
      setTimeout(() => navigate('/login'), 1500); // Redirect after 1.5 seconds
    } else {
      setAlert({ message: 'Something went wrong. Please try again.', severity: 'error' });
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
          width: 900,
          bgcolor: 'white',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
          display: 'flex',
        }}
      >
        <Grid
          container
          sx={{ flex: 1 }}
          component="form"
          onSubmit={handleSubmit}
        >
          {/* Left Section - Form */}
          <Grid item xs={12} md={6} sx={{ p: 4 }}>
            <Typography
              variant="h5"
              color="primary"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Create an account
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              mb={3}
              textAlign="center"
            >
              Sign up now and unlock exclusive access!
            </Typography>

            <TextField
              fullWidth
              label="Your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
            />

            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
              Create Account
            </Button>
            <Button
              fullWidth
              color="primary"
              variant="text"
              sx={{ mt: 1 }}
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          </Grid>

          {/* Right Section - Illustration */}
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
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={loginImage}
                alt="Login Illustration"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Conditional Alert */}
      {alert.message && (
        <Alert severity={alert.severity} sx={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}>
          {alert.message}
        </Alert>
      )}
    </Container>
  );
};

export default Register;
