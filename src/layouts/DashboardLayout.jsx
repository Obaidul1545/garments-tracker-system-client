import React from 'react';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  // Outlet hobe
  return (
    <div className="bg-[#E2E8F0]">
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
