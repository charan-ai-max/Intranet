import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import "./StudentPage.css";

export default function StudentPage() {
  // Layout with sidebar and outlet for nested routes
  return (
    <div style={{ display: 'flex' }} className='entire-view'>
      <Sidebar />
      <div className='dashboard-view'>
        <Outlet />
      </div>
    </div>
  );
}
