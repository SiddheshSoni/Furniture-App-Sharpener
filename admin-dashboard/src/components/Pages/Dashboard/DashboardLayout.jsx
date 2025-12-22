import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../../UI/Sidebar';

const DashboardLayout = () => {

  return (
      <>
        <div className="d-flex">
        <Sidebar />
        <div className=" w-100">
            <Outlet />
        </div>

        </div>
    </>
  );
};

export default DashboardLayout;