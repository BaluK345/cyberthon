import React from "react";
import { useNavigate } from "react-router-dom";
import { useDescription } from "./DescriptionContext";
import "./category.css";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo_cyber.png"; // Corrected path

const Category: React.FC = () => {
  const navigate = useNavigate();
  const { description } = useDescription();

  return (
    <div className="category-container">
      {/* Logo */}
      <img src={logo} alt="Logo" className="category-logo" />

      {/* User Profile */}
      <div className="category-user-profile">
        <FaUser className="category-user-icon" />
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/analyze")}>
        Back
      </button>

      {/* Table Content */}
      <div className="category-content">
        <div className="category-box">
          <div className="category-header">Description</div>
          <div className="category-header">Category</div>
        </div>

        <div className="category-body">
          <div className="category-description">
            {description || "No description provided."}
          </div>
          <div className="category-category">No category assigned.</div>
        </div>
      </div>

      {/* Submit Button */}
      <button className="submit-button">Submit</button>
    </div>
  );
};

export default Category;
