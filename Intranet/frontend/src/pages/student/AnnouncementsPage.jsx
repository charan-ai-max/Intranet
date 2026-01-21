import React from "react";
import "./StudentDashboard.css";
import "./AnnouncementsPage.css";

const announcements = [
  {
    type: "General",
    title: "University Holiday Schedule Update",
    source: "University Administration",
    date: "2024-03-20",
    desc: "Please be advised of the updated holiday schedule for the upcoming semester break. All administrative offices will be closed from March 25th to March 29th. Classes will resume on April 1st.",
  },
  {
    type: "Departmental",
    title: "Final Year Project Submissions Deadline",
    source: "Computer Science Dept.",
    date: "2024-03-18",
    desc: "This is a final reminder for all final year Computer Science students. The deadline for project submissions is April 15th, 2024. No extensions will be granted. Please check the portal for submission guidelines.",
  },
  {
    type: "Exams",
    title: "Mid-Term Examination Timetable Released",
    source: "Examination Cell",
    date: "2024-03-15",
    desc: "The timetable for the upcoming mid-term examinations has been published on the university website. Students are requested to download the schedule and report any clashes to the examination cell immediately.",
  },
];

const AnnouncementsPage = ({ name, email }) => {
  return (
    <div className="dashboard-root">
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <span className="dashboard-title">Student Announcements</span>
          <div className="dashboard-search-user">
            <input
              className="dashboard-search"
              type="search"
              placeholder="Search announcements..."
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
            <h2 className="welcome">Announcements</h2>
            <p className="welcome-sub">
              Stay updated with the latest news and announcements.
            </p>

            {/* Filters */}
            <div className="announcement-filters">
              <div className="filter-group">
                <label>Announcement Type</label>
                <select>
                  <option>All Types</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Date Posted</label>
                <select>
                  <option>Any Time</option>
                </select>
              </div>
              <button className="apply-btn">Apply Filters</button>
            </div>

            {/* Announcements List */}
            <div className="announcement-list">
              {announcements.map((a, i) => (
                <div className="announcement-card" key={i}>
                  <div className="announcement-top">
                    <span className={`tag ${a.type.toLowerCase()}`}>
                      {a.type}
                    </span>
                    <button className="read-btn">Read More</button>
                  </div>

                  <h3 className="announcement-title">{a.title}</h3>
                  <div className="announcement-meta">
                    Source: {a.source} • Date: {a.date}
                  </div>
                  <p className="announcement-desc">{a.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
