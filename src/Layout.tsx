import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout: React.FC = () => {
  return (
    <div>
      <header style={{ height: '10vh' }}>
        <Header />
      </header>
      <main style={{ height: '90vh' }}>
        <Outlet /> {/* This will render the content of Home */}
      </main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default Layout;
