import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { authService } from './services/authService';


function PublicRoute({ children }) {
  return authService.isAuthenticated()
    ? <Navigate to="/dashboard" replace />
    : children;
}

function PrivateRoute({ children }) {
  return authService.isAuthenticated()
    ? children
    : <Navigate to="/login" replace />;
}

function RoleRoute({ children, allowedRoles }) {
  const role = authService.getRole();

  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <Navigate to="/dashboard" replace />
            </RoleRoute>
          }
        />

        <Route
          path="/faculty"
          element={
            <RoleRoute allowedRoles={['faculty']}>
              <Navigate to="/dashboard" replace />
            </RoleRoute>
          }
        />

        <Route
          path="/student"
          element={
            <RoleRoute allowedRoles={['student']}>
              <Navigate to="/dashboard" replace />
            </RoleRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
