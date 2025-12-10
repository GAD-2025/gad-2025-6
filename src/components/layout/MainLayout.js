import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import homeBackgroundImage from '../../assets/images/home_background.jpeg';

const MainLayout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/home';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 600,
        width: '100vw',
        height: '100dvh',
        position: 'relative',
        backgroundImage: isHomePage ? `url(${homeBackgroundImage})` : 'none',
        backgroundSize: isHomePage ? 'cover' : 'auto',

        border: '1px solid red',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px 20px',
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
