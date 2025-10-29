import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/otp.css";
import logo from "../assets/logo_cyber.png"; // Ensure correct logo path
import { useAuth } from "../context/AuthContext";

const OTPPage: React.FC = () => {
  const navigate = useNavigate();
  const { verifyOTP, loading } = useAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // Handle OTP input change
  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (value.length <= 6) {
      setOtp(value);
      setError(""); // Clear error when typing
    }
  };

  // Handle Confirm button click
  const handleConfirm = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    const email = localStorage.getItem("registrationEmail"); // Use the correct key
    if (!email) {
      setError("Session expired. Please register again.");
      navigate("/registration");
      return;
    }

    try {
      await verifyOTP(email, otp);
      // Success - redirect to login
      localStorage.removeItem("registrationEmail"); // Clean up
      alert("OTP Verified! Registration complete. Please login.");
      navigate("/login");
    } catch (error: any) {
      setError(error.message || "Invalid OTP. Please try again.");
    }
  };

  // Allow "Enter" key to submit OTP
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && otp.length === 6 && !loading) {
        handleConfirm();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [otp, loading]);

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
            disabled={loading}
          />
          {error && <p className="otp-error-text">{error}</p>}
        </div>

        {/* Confirm Button: Disabled if OTP is not 6 digits */}
        <button
          className="otp-confirm-button"
          onClick={handleConfirm}
          disabled={otp.length !== 6 || loading}
        >
          {loading ? "Verifying..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default OTPPage;
