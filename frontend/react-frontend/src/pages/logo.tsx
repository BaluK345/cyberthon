import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./logo.css";
import logoImage from "../assets/logo_cyber.png"; // Ensure correct path

const LogoPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login"); // Navigate to login after 3 seconds
    }, 3000);
  }, [navigate]);

  return (
    <div className="logo-wrapper">
      <img src={logoImage} alt="Crime Atlas Logo" className="logo-page" />
      <h1 className="title">Crime Atlas</h1>
    </div>
  );
};

export default LogoPage;
