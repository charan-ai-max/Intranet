import React from "react";
import "./StudentDashboard.css";
import "./MaterialTimetablePage.css";

const materials = [
  {
    course: "CS101 - Introduction to Programming",
    items: [
      {
        title: "Lecture 1: Introduction to Python",
        type: "pdf",
        source: "Dr. Evelyn Reed",
        date: "2024-03-01",
      },
      {
        title: "Lab 1: Variables and Data Types",
        type: "video",
        source: "Dr. Evelyn Reed",
        date: "2024-03-05",
      },
      {
        title: "Mid-Term Exam Study Guide",
        type: "doc",
        source: "Dr. Evelyn Reed",
        date: "2024-03-15",
      },
    ],
  },
  {
    course: "MA203 - Advanced Calculus",
    items: [
      {
        title: "Vector Calculus Lecture Recording",
        type: "video",
        source: "Prof. Alan Grant",
        date: "2024-03-12",
      },
      {
        title: "Lab 3: Worksheets and Solutions",
        type: "pdf",
        source: "Prof. Alan Grant",
        date: "2024-03-18",
      },
    ],
  },
];

const MaterialTimetablePage = ({ name, email }) => {
  return (
    <div className="dashboard-root">
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <span className="dashboard-title">Student Material</span>
          <div className="dashboard-search-user">
            <input
              className="dashboard-search"
              type="search"
              placeholder="Search materials..."
            />
            <div className="dashboard-user">
              <div className="user-avatar"></div>
              <div className="user-info">
                <span className="user-name">{name}</span>
                <span className="user-email">{email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="dashboard-body">
          <div className="dashboard-main">
            <h2 className="welcome">Course Materials</h2>
            <p className="welcome-sub">
              Find and download all your study materials here.
            </p>

            {/* Filters */}
            <div className="material-filters">
              <div className="filter-group">
                <label>Course</label>
                <select>
                  <option>All Courses</option>
                </select>
              </div>
              <div className="filter-group">
                <label>File Type</label>
                <select>
                  <option>All Types</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Date Uploaded</label>
                <select>
                  <option>Any Time</option>
                </select>
              </div>
              <button className="apply-btn">Apply Filters</button>
            </div>

            {/* Quick Filters */}
            <div className="quick-filters">
              <span className="pill active">Exams</span>
              <span className="pill">Labs</span>
              <span className="pill">Assignments</span>
              <span className="pill">Lecture Notes</span>
            </div>

            {/* Course Sections */}
            {materials.map((course, idx) => (
              <div className="course-section" key={idx}>
                <h3 className="course-title">{course.course}</h3>

                <div className="material-table">
                  <div className="table-header">
                    <span>Material Title</span>
                    <span>Source</span>
                    <span>Date</span>
                    <span>Actions</span>
                  </div>

                  {course.items.map((m, i) => (
                    <div className="table-row" key={i}>
                      <div className="material-title">
                        <span className={`file-icon ${m.type}`}></span>
                        {m.title}
                      </div>
                      <div>{m.source}</div>
                      <div>{m.date}</div>
                      <div className="actions">
                        <button className="view-btn">View</button>
                        <button className="download-btn">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialTimetablePage;
