import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./loginpage.css";
import "../styles/common.css";
import logo from "../assets/logo_cyber.png"; // Ensure correct path
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Refs for input fields
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      navigate("/complaint");
    }

    // Check for success message from registration
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [isAuthenticated, navigate, location.state]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  // Handle Enter key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission

      if (e.currentTarget.name === "email") {
        passwordRef.current?.focus(); // Move to password field
      } else if (e.currentTarget.name === "password") {
        handleSignIn(); // Submit when pressing Enter on password
      }
    }
  };

  // Validate and submit
  const handleSignIn = async () => {
    let newErrors = { email: "", password: "", general: "" };
    let hasError = false;

    if (!formData.email) {
      newErrors.email = "Email is required";
      hasError = true;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setIsLoading(true);
      try {
        await login(formData.email, formData.password);
        navigate("/complaint"); // Navigate to Complaint page after successful login
      } catch (error: any) {
        setErrors(prev => ({
          ...prev,
          general: error.message || "Login failed. Please check your credentials."
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-logo-container">
        <img src={logo} alt="Logo" className="login-page-logo" />
      </div>

      <div className="login-page-box">
        <h2 className="login-page-title">Login</h2>
        
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        
        {errors.general && (
          <div className="error-text general-error">{errors.general}</div>
        )}

        <div className="login-page-input-group">
          <label className="login-page-label">Email:</label>
          <input
            type="email"
            name="email"
            className="login-page-email-box"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Handle Enter key
            disabled={isLoading}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
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
            onKeyDown={handleKeyDown} // Handle Enter key
            ref={passwordRef} // Ref for password input
            disabled={isLoading}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="login-page-checkbox-container">
          <input
            type="checkbox"
            id="login-page-show-password"
            onChange={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          />
          <label htmlFor="login-page-show-password" className="login-page-checkbox-label">
            Show Password
          </label>
        </div>

        <button 
          className="login-page-sign-in-button" 
          onClick={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
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
