import React, { useState, useRef } from "react";
import "./otp.css";
import logo from "../assets/logo_cyber.png"; // Ensure correct logo path

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Move focus to Confirm button on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.focus();
    }
  };

  // Handle Confirm Button Key Press
  const handleButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click(); // Triggers button click
    }
  };

  return (
    <div className="otp-container">
      {/* Logo */}
      <div className="otp-logo-container">
        <img src={logo} alt="Logo" className="otp-logo" />
      </div>

      {/* OTP Box */}
      <div className="otp-box">
        <h2 className="otp-title">OTP Verification</h2>

        {/* OTP Input */}
        <div className="otp-input-group">
          <label className="otp-label">OTP:</label>
          <input
            type="text"
            className="otp-input"
            placeholder="Enter your OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
        </div>

        {/* Confirm Button */}
        <button
          className="otp-confirm-button"
          ref={buttonRef}
          onKeyDown={handleButtonKeyDown}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default OTPPage;
