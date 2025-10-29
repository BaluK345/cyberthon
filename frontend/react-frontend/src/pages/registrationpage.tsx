import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registrationpage.css";
import "../styles/common.css";
import logo from "../assets/logo_cyber.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { useAuth } from "../context/AuthContext";

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  // Handle Enter key press to move to the next input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission

      const form = e.currentTarget.form;
      if (form) {
        const index = Array.from(form.elements).indexOf(e.currentTarget);
        const nextElement = form.elements[index + 1] as HTMLElement;

        if (nextElement) {
          nextElement.focus();
        } else {
          handleSignUp(); // If last input, trigger sign-up
        }
      }
    }
  };

  // Validate and navigate to OTP Page
  const handleSignUp = async () => {
    let newErrors = { ...errors };
    let hasError = false;

    // Reset general error
    newErrors.general = "";

    // Basic field validation
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key as keyof typeof formData] = `This ${key} is required`;
        hasError = true;
      }
    });

    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      hasError = true;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setIsLoading(true);
      try {
        await register({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        });
        
        // Store email for OTP verification
        localStorage.setItem('registrationEmail', formData.email);
        navigate("/otp");
      } catch (error: any) {
        setErrors(prev => ({
          ...prev,
          general: error.message || "Registration failed. Please try again."
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="registration-page-container">
      <div className="registration-page-logo-container">
        <img src={logo} alt="Logo" className="registration-page-logo" />
      </div>

      <div className="registration-page-box">
        <h2 className="registration-page-title">Register</h2>

        <form>
          {errors.general && <div className="error-text general-error">{errors.general}</div>}
          
          <div className="registration-page-input-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="registration-page-input-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          <div className="registration-page-input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="registration-page-input-group password-input-wrapper">
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="registration-page-input-group password-input-wrapper">
            <label>Confirm Password:</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>

          <button 
            className="registration-page-sign-up-button" 
            type="button" 
            onClick={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="registration-page-signin-text">
          Have an account?{" "}
          <span className="registration-page-signin-link" onClick={() => navigate("/login")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
