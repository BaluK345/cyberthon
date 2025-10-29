import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style/loginpage.css";
import logo from "../assets/logo_cyber.png"; // Ensure correct path

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Ref for password input
  const passwordRef = useRef<HTMLInputElement>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when typing
  };

  // Handle Enter key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.currentTarget.name === "email") {
        passwordRef.current?.focus(); // Move to password field
      } else if (e.currentTarget.name === "password") {
        handleSignIn(); // Submit on Enter
      }
    }
  };

  // Handle login
  const handleSignIn = async () => {
    setError("");
    const { email, password } = formData;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      console.log("🔹 Sending login request:", { email, password });

      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("🔹 Login API Response:", response.status, data);

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        alert("Login successful!");
        navigate("/complaint");
      } else {
        setError(data.error || "Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("🔹 Error:", error);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-logo-container">
        <img src={logo} alt="Logo" className="login-page-logo" />
      </div>

      <div className="login-page-box">
        <h2 className="login-page-title">Login</h2>

        <div className="login-page-input-group">
          <label className="login-page-label">Email:</label>
          <input
            type="text"
            name="email"
            className="login-page-email-box"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="login-page-input-group">
          <label className="login-page-label">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="login-page-password-box"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={passwordRef}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

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

        <button
          className="login-page-sign-in-button"
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="login-page-signup-text">
          Don't have an account?{" "}
          <span className="login-page-signup-link" onClick={() => navigate("/registration")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
