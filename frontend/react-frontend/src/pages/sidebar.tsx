import React, { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>✖</button>

        <button className="sidebar-button" onClick={() => handleButtonClick("profile")}>
          Your Profile
        </button>
        
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay show" onClick={onClose}></div>}

      {/* Display the selected section */}
      {activeSection === "profile" && (
        <div className="profile-section">
          <h3>Your Profile</h3>
          <label>Name:</label>
          <input type="text" className="input-box" />
          <label>Phone No:</label>
          <input type="text" className="input-box" />
        </div>
      )}

      {activeSection === "complaint" && (
        <div className="complaint-section">
          <h3>Your Complaint</h3>
          <textarea className="complaint-box"></textarea>
        </div>
      )}
    </>
  );
};

export default Sidebar;
