import React from "react";
import "./sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="sidebar-button">Your Profile</button>
      <button className="sidebar-button">Your Complaint</button>
      <button className="sidebar-close" onClick={onClose}>Close</button>
    </div>
  );
};

export default Sidebar;
