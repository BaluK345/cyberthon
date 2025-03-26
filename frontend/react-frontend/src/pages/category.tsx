import React, { useState } from "react";
import "./category.css";
import logo from "../assets/logo_cyber.png"; // Ensure you have the logo
import { FaUser } from "react-icons/fa";
import { useDescription } from "./DescriptionContext";

const Category: React.FC = () => {
  const [showCategory, setShowCategory] = useState(false);
  const { description } = useDescription();

  return (
    <div className="category-body">
      {/* Header: Logo & User Profile */}
      <div className="category-header">
        <img src={logo} alt="Logo" className="category-logo" />
        <FaUser className="category-profile-icon" />
      </div>

      {/* Page Container */}
      <div className="category-container">
        {/* View Category Toggle Button */}
        <div className="view-category">
          <button onClick={() => setShowCategory(!showCategory)}>
           <span>{showCategory ? "<" : ">"}</span>
          </button>
        </div>

        {/* Conditional Rendering: Description or Category */}
        {!showCategory ? (
          <div className="description-container">
            <label className="description-label">Description:</label>
            <div className="description-box">{description}</div>
          </div>
        ) : (
          <div className="category-box">
            <label className="category-label">Category:</label>
            <div className="category-content"></div>
          </div>
        )}

        {/* Single Submit/Print Button */}
        <div className="submit-container">
          <button className="submit-button">Submit / Print</button>
        </div>
      </div>
    </div>
  );
};

export default Category;
