import React from "react";
import "./profilepage.css";

interface ProfileProps {
  onClose: () => void; // Function to close the profile and return to the sidebar
}

const Profile: React.FC<ProfileProps> = ({ onClose }) => {
  return (
    <div className="profile-container">
      {/* Close Button */}
      <button className="close-button" onClick={onClose}>×</button>

      <h2 className="profile-title">Your Profile</h2>

      <div className="profile-box">
        <div className="profile-section">
          <span className="profile-label">Name:</span>
        </div>

        <div className="profile-section">
          <span className="profile-label">Phone No:</span>
        </div>
      </div>

      <h2 className="complaint-title">Your Complaint</h2>
      <div className="complaint-box"></div>
    </div>
  );
};

export default Profile;
