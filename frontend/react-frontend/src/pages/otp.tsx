import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./otp.css";
import "../styles/common.css";
import logo from "../assets/logo_cyber.png"; // Ensure correct logo path
import { useAuth } from "../context/AuthContext";

const OTPPage: React.FC = () => {
  const navigate = useNavigate();
  const { verifyOTP } = useAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from localStorage or redirect if not found
    const registrationEmail = localStorage.getItem('registrationEmail');
    if (!registrationEmail) {
      navigate('/register');
      return;
    }
    setEmail(registrationEmail);
  }, [navigate]);

  // Handle OTP input change
  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    setOtp(value);
    setError(""); // Clear error when typing
  };

  // Handle Confirm button click
  const handleConfirm = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      await verifyOTP(email, otp);
      
      // Clear stored email after successful verification
      localStorage.removeItem('registrationEmail');
      
      // Navigate to login page with success message
      navigate("/login", { 
        state: { message: "Registration successful! Please login with your credentials." }
      });
    } catch (error: any) {
      setError(error.message || "OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Allow "Enter" key to submit OTP
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && otp.length === 6 && !isLoading) {
        handleConfirm();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [otp, isLoading]);

  return (
    <div className="otp-container">
      {/* Logo */}
      <div className="otp-logo-container">
        <img src={logo} alt="Logo" className="otp-logo" />
      </div>

      {/* OTP Box */}
      <div className="otp-box">
        <h2 className="otp-title">OTP Verification</h2>
        <p className="otp-description">
          We've sent a 6-digit OTP to {email}. Please enter it below to verify your account.
        </p>

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
            disabled={isLoading}
          />
          {error && <p className="otp-error-text">{error}</p>}
        </div>

        {/* Confirm Button: Disabled if OTP is not 6 digits */}
        <button
          className="otp-confirm-button"
          onClick={handleConfirm}
          disabled={otp.length !== 6 || isLoading}
        >
          {isLoading ? "Verifying..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default OTPPage;
