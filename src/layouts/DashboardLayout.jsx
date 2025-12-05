import React from 'react';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  // Outlet hobe
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
