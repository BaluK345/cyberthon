import React, { useState } from "react";
import "./loginpage.css";
import logo from "../assets/logo_cyber.png"; // Ensure the correct path to your logo

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page-container">
      {/* Logo */}
      <div className="login-page-logo-container">
        <img src={logo} alt="Logo" className="login-page-logo" />
      </div>

      {/* Login Box */}
      <div className="login-page-box">
        <h2 className="login-page-title">Login</h2>

        {/* Email Field */}
        <div className="login-page-input-group">
          <label className="login-page-label">Email:</label>
          <input
            type="text"
            className="login-page-email-box"
            placeholder="Enter your Email or Mobile Number"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                document.getElementById("login-page-password-box")?.focus();
              }
            }}
          />
        </div>

        {/* Password Field */}
        <div className="login-page-input-group">
          <label className="login-page-label">Password:</label>
          <input
            id="login-page-password-box"
            type={showPassword ? "text" : "password"}
            className="login-page-password-box"
            placeholder="Enter your Password"
          />
        </div>

        {/* Show Password Checkbox */}
        <div className="login-page-checkbox-container">
          <input
            type="checkbox"
            id="login-page-show-password"
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="login-page-show-password" className="login-page-checkbox-label">
            Show Password
          </label>
        </div>

        {/* Sign In Button */}
        <button className="login-page-sign-in-button">Sign in</button>

        {/* Sign Up Link */}
        <p className="login-page-signup-text">
          Don't have an account? <span className="login-page-signup-link">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
