import React from "react";
import "./category.css";
import logo from "../assets/logo cyber.png"; 
import { FaUser } from "react-icons/fa";

const Category: React.FC = () => {
  return (
    <div className="container">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Crime Atlas Logo" className="logo" />
      </div>

      {/* Main Box */}
      <div className="category-box">
        {/* Tabs */}
        <div className="tabs">
          <div className="tab">Description</div>
          <div className="tab">Category</div>
        </div>
        <button className="user-profile-button">
  <FaUser className="profile-icon" />
</button>

        {/* Content Box */}
        <div className="content-area"></div>
      </div>
    </div>
  );
};

export default Category;
