import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const MainLayout = () => {
  return (
    <div style={{ width: 390, height: '100dvh', position: 'relative' }}>
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default MainLayout;
