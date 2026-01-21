import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiFetch from "../services/api";
import { authService } from "../services/authService";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Student"
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const selectedRole = form.role.toLowerCase();
      const actualRole = data.user?.role?.toLowerCase();

      if (selectedRole !== actualRole) {
        throw new Error(
          `Incorrect role selected `
        );
      }

      authService.login(data);
      navigate("/dashboard", { replace: true });

    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };



  return (
    <div className="login-scr">
      <div className="login-container">
        <div className="login-left">
          <div className="login-logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">Aditya University</span>
          </div>
          <h1>Welcome back!</h1>
          <p>
            Log in to the university’s intranet to access exclusive resources and services.
          </p>
        </div>
        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">University Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your university email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="role">Select Your Role</label>
            <select
              name="role"
              id="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="login-actions">
              <a href="forgetpwpage" className="forgot-password">Forgot Password?</a>
            </div>
            {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
            <button type="submit" className="login-btn">Login</button>
            <div>
              Don’t have an account? <Link to="/register" className="register-link">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;