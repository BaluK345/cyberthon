import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpage.css";
import logo from "../assets/logo_cyber.png"; // Ensure correct path

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Refs for input fields
  const passwordRef = useRef<HTMLInputElement>(null);

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
  const handleSignIn = () => {
    let newErrors = { email: "", password: "" };
    let hasError = false;

    if (!formData.email) {
      newErrors.email = "Email is required";
      hasError = true;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      navigate("/complaint"); // Navigate to Complaint page after login
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
            placeholder="Enter your Email or Mobile Number"
            value={formData.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Handle Enter key
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
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

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

        <button className="login-page-sign-in-button" onClick={handleSignIn}>
          Sign in
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
