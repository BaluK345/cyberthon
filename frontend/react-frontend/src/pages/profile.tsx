import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/profile.css";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", phone: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Get token from local storage

        if (!token) {
          console.error("No access token found");
          navigate("/login"); // Redirect to login if token is missing
          return;
        }

        const response = await fetch("/api/profile/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="profile-container">
      <button className="close-button" onClick={() => navigate("/complaint")}>×</button>

      <h2 className="profile-title">Your Profile</h2>
      <div className="profile-box">
        <div className="profile-section">
          <span className="profile-label">Name:</span>
          <span className="profile-data">{userData.name || "N/A"}</span>
        </div>
        <div className="profile-section">
          <span className="profile-label">Phone No:</span>
          <span className="profile-data">{userData.phone || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
