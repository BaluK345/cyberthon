import React, { useState, useRef } from "react";
import "./registrationpage.css";
import logo from "../assets/logo_cyber.png";
import { Eye, EyeOff } from "lucide-react"; // Import icons

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Refs for input fields
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextRef: React.RefObject<HTMLInputElement | HTMLButtonElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  return (
    <div className="registration-page-container">
      <div className="registration-page-logo-container">
        <img src={logo} alt="Logo" className="registration-page-logo" />
      </div>

      <div className="registration-page-box">
        <h2 className="registration-page-title">Register</h2>

        <div className="registration-page-input-group">
          <label>Name:</label>
          <input type="text" name="name" placeholder="Enter your Name" value={formData.name} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, phoneRef)} />
        </div>

        <div className="registration-page-input-group">
          <label>Phone Number:</label>
          <input type="tel" name="phone" placeholder="Enter your Phone Number" value={formData.phone} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, emailRef)} ref={phoneRef} />
        </div>

        <div className="registration-page-input-group">
          <label>Email:</label>
          <input type="email" name="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, passwordRef)} ref={emailRef} />
        </div>

        <div className="registration-page-input-group">
          <label>Password:</label>
          <div className="password-input-wrapper">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your Password" value={formData.password} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)} ref={passwordRef} />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
        </div>

        <div className="registration-page-input-group">
          <label>Confirm Password:</label>
          <div className="password-input-wrapper">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Enter your Confirm Password" value={formData.confirmPassword} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, submitButtonRef)} ref={confirmPasswordRef} />
            <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
        </div>

        <button className="registration-page-sign-up-button" ref={submitButtonRef}>Sign Up</button>

        <p className="registration-page-signin-text">Have an account? <span className="registration-page-signin-link">Sign In</span></p>
      </div>
    </div>
  );
};

export default RegistrationPage;