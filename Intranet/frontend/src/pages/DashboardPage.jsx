import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminPage from './admin/AdminPage';
import FacultyPage from './faculty/FacultyPage';
import StudentPage from './StudentPage';
import StudentDashboard from './student/StudentDashboard';

import CircularsPage from './student/CircularsPage';
import AnnouncementsPage from './student/AnnouncementsPage';
import MaterialTimetablePage from './student/MaterialTimetablePage';

import { authService } from '../services/authService';

export default function DashboardPage() {
  const user = authService.getUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  const role = user.role?.toLowerCase(); // normalize once

  return (
    <Routes>
      <Route index element={<RoleHome role={role} />} />

      {/* ================= ADMIN ROUTES ================= */}
      {role === 'admin' && (
        <>
          <Route path="faculty" element={<AdminPage section="faculty" />} />
          <Route path="hods" element={<AdminPage section="hods" />} />
          <Route path="deans" element={<AdminPage section="deans" />} />
        </>
      )}

      {/* ================= FACULTY ROUTES ================= */}
      {role === 'faculty' && (
        <>
          <Route path="faculty-dashboard" element={<FacultyPage />} />
        </>
      )}

      {/* ================= STUDENT ROUTES ================= */}
      {role === 'student' && (
        <Route path="" element={<StudentPage />}>
          <Route
            index
            element={
              <StudentDashboard
                name={user.name}
                email={user.email}
              />
            }
          />
          <Route
            path="dashboard"
            element={
              <StudentDashboard
                name={user.name}
                email={user.email}
              />
            }
          />
          <Route path="circulars" element={<CircularsPage name={user.name}
                email={user.email} />} />
          <Route path="announcements" element={<AnnouncementsPage name={user.name}
                email={user.email} />} />
          <Route path="material-timetable" element={<MaterialTimetablePage name={user.name}
                email={user.email} />} />
        </Route>
      )}

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

/* ================= ROLE HOME LOGIC ================= */

function RoleHome({ role }) {
  if (role === 'admin') {
    return <AdminPage />;
  }

  if (role === 'faculty') {
    return <FacultyPage />;
  }

  if (role === 'student') {
    return <Navigate to="dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}
