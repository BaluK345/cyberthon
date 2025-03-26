import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registrationpage.css";
import logo from "../assets/logo_cyber.png";

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
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
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  // Validate and navigate to OTP Page
  const handleSignUp = () => {
    let newErrors = { ...errors };
    let hasError = false;

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key as keyof typeof formData] = `This ${key} is required`;
        hasError = true;
      }
    });

    setErrors(newErrors);
    if (!hasError) navigate("/otp"); // Navigate only if no errors
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
          <input type="text" name="name" placeholder="Enter your Name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="registration-page-input-group">
          <label>Phone Number:</label>
          <input type="tel" name="phone" placeholder="Enter your Phone Number" value={formData.phone} onChange={handleChange} />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        <div className="registration-page-input-group">
          <label>Email:</label>
          <input type="email" name="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="registration-page-input-group">
          <label>Password:</label>
          <input type="password" name="password" placeholder="Enter your Password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="registration-page-input-group">
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" placeholder="Enter Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
        </div>

        <button className="registration-page-sign-up-button" onClick={handleSignUp}>
          Sign Up
        </button>

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
