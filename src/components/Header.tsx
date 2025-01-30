import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ height: '10vh', marginBottom: '2rem' }}>
      <Toolbar>
        <Typography variant="h4" color="inherit" sx={{ flexGrow: 1 }}>
          TASKKIFY
        </Typography>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
