import React from "react";
import { useNavigate } from 'react-router-dom';
import "./StudentDashboard.css";

const StudentDashboard = ({ name, email }) => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-root">
      <div className="main-content">
        <header className="dashboard-header">
          <span className="dashboard-title">Student Dashboard</span>
          <div className="dashboard-search-user">
            <input className="dashboard-search" type="search" placeholder="Search..." />
            <div className="dashboard-user">
              <div className="user-avatar">{/* Placeholder avatar */}</div>
              <div className="user-info">
                <span className="user-name">{name}</span>
                <span className="user-email">{email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="dashboard-body">
          {/* Left: Main Dashboard */}
          <div className="dashboard-main">
            <h2 className="welcome">Student Dashboard</h2>
            <div className="welcome-sub">Welcome back, {name.split(" ")[0]}</div>
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <div className="card-title">Upcoming Assignments</div>
                <div className="card-value">3</div>
              </div>
              <div className="dashboard-card" onClick={() => navigate('/dashboard/circulars')} style={{ cursor: 'pointer' }}>
                <div className="card-title">New Circulars</div>
                <div className="card-value">2</div>
              </div>
              <div className="dashboard-card">
                <div className="card-title">Pending Lab Reports</div>
                <div className="card-value">1</div>
              </div>
            </div>

            <div className="dashboard-section">
              <div className="section-title">Recent Circulars</div>
              <div className="section-list">
                <div className="section-item">
                  <div className="item-title">Mid-Term Exam Schedule Revision</div>
                  <div className="item-meta">From: HOD, Computer Science - Published: 1 day ago</div>
                </div>
                <div className="section-item">
                  <div className="item-title">Guest Lecture on AI & Ethics</div>
                  <div className="item-meta">From: Faculty, AI Department - Published: 3 days ago</div>
                </div>
                <div className="section-item">
                  <div className="item-title">Industrial Visit Registration</div>
                  <div className="item-meta">From: HOD, Mechanical Engineering - Published: 5 days ago</div>
                </div>
              </div>
            </div>

            <div className="dashboard-section">
              <div className="section-title">Announcements</div>
              <div className="section-list">
                <div className="section-item">
                  <div className="item-title">Annual Sports Fest "Velocity 2024"</div>
                  <div className="item-meta">From: Student Affairs Council - Published: 2 days ago</div>
                </div>
                <div className="section-item">
                  <div className="item-title">Library Hours Extended for Exams</div>
                  <div className="item-meta">From: University Administration - Published: 1 week ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Material & Timetable */}
          <div className="dashboard-side">
            <div className="side-section">
              <div className="side-title">Material & Timetable</div>
              <div className="side-desc">Quick access to your course materials, class schedules, and exam details.</div>
              <button className="side-btn main">View My Timetable</button>
              <button className="side-btn secondary">Download Course Material <span className="download-icon">↓</span></button>
            </div>
            <div className="side-section">
              <div className="side-title small">Quick Filters</div>
              <div className="side-filters">
                <span className="filter exam">Exam Schedules</span>
                <span className="filter lab">Lab Timings</span>
                <span className="filter assignment">Assignments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
