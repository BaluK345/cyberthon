import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./category.css";
import logo from "../assets/logo_cyber.png";
import { useDescription } from "./DescriptionContext";

const Category: React.FC = () => {
  const navigate = useNavigate();
  const [showCategory, setShowCategory] = useState(false);
  const { description } = useDescription();

  return (
    <div className="category-body">
      {/* Header: Logo - Navigates to Complaint Page */}
      <div className="category-header">
        <img 
          src={logo} 
          alt="Logo" 
          className="category-logo" 
          onClick={() => navigate("/complaint")} 
          style={{ cursor: "pointer" }} 
        />
      </div>

      {/* Page Container */}
      <div className="category-container">
        <div className="view-category">
          <button onClick={() => setShowCategory(!showCategory)}>
            View Category {showCategory ? "<" : ">"}
          </button>
        </div>

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

        <div className="submit-container">
          <button className="submit-button">Submit / Print</button>
        </div>
      </div>
    </div>
  );
};

export default Category;
