import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ display: 'flex', position: 'fixed', inset: 0, backgroundColor:'red' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header can go here if needed */}
        <main style={{ flex: 1, height: '100vh', padding: '20px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
