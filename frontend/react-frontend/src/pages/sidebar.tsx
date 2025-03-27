import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>✖</button>

        <button className="sidebar-button">Your Profile</button>
        <button className="sidebar-button">Your Complaint</button>
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay show" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;
