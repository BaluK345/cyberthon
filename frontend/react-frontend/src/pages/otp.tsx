import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./otp.css";
import logo from "../assets/logo_cyber.png"; // Ensure correct logo path

const OTPPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // Handle OTP input change
  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    setOtp(value);
    setError(""); // Clear error when typing
  };

  // Handle Confirm button click
  const handleConfirm = () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    // Simulate backend processing & navigate to login page
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  // Allow "Enter" key to submit OTP
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && otp.length === 6) {
        handleConfirm();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [otp]);

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
            className={`otp-input ${error ? "error" : ""}`}
            placeholder="Enter your OTP"
            maxLength={6}
            value={otp}
            onChange={handleOTPChange}
          />
          {error && <p className="otp-error-text">{error}</p>}
        </div>

        {/* Confirm Button: Disabled if OTP is not 6 digits */}
        <button
          className="otp-confirm-button"
          onClick={handleConfirm}
          disabled={otp.length !== 6}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default OTPPage;
