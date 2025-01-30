import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme'; 
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Home page is wrapped inside Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

          {/* Login and Register are standalone routes without Layout */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
