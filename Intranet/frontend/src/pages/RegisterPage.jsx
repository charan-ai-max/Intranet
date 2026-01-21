import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const RegisterPage = () => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        id: "",
        role: "Student",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Registration logic here
    };

    return (
        <div className="login-root register-root">
            <div className="login-card register-card">
                {/* Left side */}
                <div className="login-left register-left">
                    <div className="login-logo">
                        <span className="logo-icon">🎓</span>
                        <span className="logo-text">Aditya University</span>
                    </div>
                    <h2 className="register-title">Create your account</h2>
                    <p className="register-desc">Join the university’s intranet to access exclusive resources and services.</p>
                </div>
                {/* Right side */}
                <div className="login-right register-right">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="register-form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={form.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="register-form-group">
                            <label htmlFor="email">University Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your university email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="register-form-row">
                            <div className="register-form-group half">
                                <label htmlFor="id">Student/Employee ID</label>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    placeholder="Your ID number"
                                    value={form.id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="register-form-group half">
                                <label htmlFor="role">Select Your Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="register-form-group">
                            <label htmlFor="password">Create Password</label>
                            <div className="register-password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Enter a secure password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                                <span
                                    className="register-password-toggle"
                                    onClick={() => setShowPassword((v) => !v)}
                                    style={{ cursor: "pointer" }}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="#888" strokeWidth="1.5" /><circle cx="10" cy="10" r="2.5" stroke="#888" strokeWidth="1.5" /></svg>
                                    ) : (
                                        <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="#888" strokeWidth="1.5" /><path d="M4 4L16 16" stroke="#888" strokeWidth="1.5" /></svg>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="register-form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="register-btn">Register</button>
                        <div className="register-signin-link">
                            Already have an account?{' '}
                            <Link to="/login" className="register-link">Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;