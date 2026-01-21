import React from 'react';
import Sidebar from '../../components/Sidebar';

export default function AdminPage({ section }) {
  const titleMap = {
    faculty: 'All Faculties',
    hods: 'Heads of Department',
    deans: 'Deans'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 24 }}>
        <h2>{titleMap[section] || 'Admin Dashboard'}</h2>

        {!section && (
          <div>
            <p>Welcome, Admin.</p>
            <p>Manage users, courses, and system settings here.</p>
          </div>
        )}

        {section && (
          <div>
            <p>Manage {titleMap[section]} here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
