import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/otp.css";
import logo from "../assets/logo_cyber.png"; // Ensure correct logo path

const OTPPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To disable button during verification

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

    const email = localStorage.getItem("userEmail"); // Retrieve stored email
    if (!email) {
      setError("Session expired. Please sign up again.");
      navigate("/signup");
      return;
    }

    setLoading(true); // Disable button while verifying

    try {
      const response = await fetch("http://127.0.0.1:8000/api/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("OTP Verified! Redirecting to login...");
        navigate("/login");
      } else {
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false); // Re-enable button
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
