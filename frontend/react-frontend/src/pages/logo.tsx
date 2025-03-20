import React from "react";
import "./logo.css";
import logoImage from "../assets/logo_cyber.png"; // Ensure correct path

const LogoPage: React.FC = () => {
  return (
    <div className="logo-wrapper">
      <img src={logoImage} alt="Crime Atlas Logo" className="logo-page" />
      <h1 className="title">Crime Atlas</h1>
    </div>
  );
};

export default LogoPage;
