import React from 'react';
import { authService } from '../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const sidebarItems = [
  { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { label: 'Circulars', path: '/dashboard/circulars', icon: 'circulars' },
  { label: 'Announcements', path: '/dashboard/announcements', icon: 'announcements' },
  { label: 'Material & Timetable', path: '/dashboard/material-timetable', icon: 'material' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = authService.getRole();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="sidebar-fixed">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">Aditya University</span>
        </div>
      </div>

      <ul className="sidebar-menu">
        {sidebarItems.map((item) => {
          const normalizePath = (path) => path.replace(/\/$/, '');
          const isActive = normalizePath(location.pathname) === normalizePath(item.path);

          return (
            <li
              key={item.path}
              className={`sidebar-item ${item.icon}${isActive ? ' active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className={`sidebar-icon ${item.icon}`}></span>
              <span className="sidebar-label">{item.label}</span>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <button className="sidebar-footer-btn settings-btn">
          <span className="sidebar-footer-icon">⚙️</span> Settings
        </button>
        <button className="sidebar-footer-btn logout-btn" onClick={handleLogout}>
          <span className="sidebar-footer-icon"></span> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
