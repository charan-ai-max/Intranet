import React from "react";
import "./StudentDashboard.css";
import "./CircularsPage.css";

const circulars = [
  {
    title: "Regarding Mid-Term Examination Schedule",
    desc: "Please find the attached schedule for the upcoming mid-term examinations for all departments.",
    sender: "Dr. Evelyn Reed (HOD, CSE)",
    date: "2024-03-15",
  },
  {
    title: 'Guest Lecture on "Future of AI"',
    desc: "A guest lecture has been arranged on the topic 'Future of Artificial Intelligence'. All students are invited.",
    sender: "Prof. Alan Grant (Faculty, CSE)",
    date: "2024-03-12",
  },
  {
    title: "Holiday Notification for University Fest",
    desc: "This is to inform all students that the university will remain closed on account of the annual fest.",
    sender: "Administration Office",
    date: "2024-03-10",
  },
  {
    title: "Call for Submissions: Annual Tech Magazine",
    desc: "We are now accepting submissions for articles, papers, and projects for our annual tech magazine.",
    sender: "Dr. Evelyn Reed (HOD, CSE)",
    date: "2024-03-05",
  },
];

const CircularsPage = ({ name, email }) => {
  return (
    <div className="dashboard-root">
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <span className="dashboard-title">Student Circulars</span>
          <div className="dashboard-search-user">
            <input
              className="dashboard-search"
              type="search"
              placeholder="Search circulars..."
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
            <h2 className="welcome">Circulars</h2>
            <p className="welcome-sub">
              Stay updated with the latest circulars from HODs and Faculty.
            </p>

            {/* Filters */}
            <div className="circular-filters">
              <div className="filter-group">
                <label>Sender</label>
                <select>
                  <option>All Senders</option>
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

            {/* Table */}
            <div className="circular-table">
              <div className="table-header">
                <span>Circul​ar Title</span>
                <span>Sender</span>
                <span>Date</span>
                <span>Actions</span>
              </div>

              {circulars.map((c, i) => (
                <div className="table-row" key={i}>
                  <div className="title-col">
                    <div className="title">{c.title}</div>
                    <div className="desc">{c.desc}</div>
                  </div>
                  <div className="sender-col">{c.sender}</div>
                  <div className="date-col">{c.date}</div>
                  <div className="action-col">
                    <button className="view-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularsPage;
