import React, { useState } from "react";
import "./description.css";
import logo from "../assets/logo cyber.png"; 
import { FaUser } from "react-icons/fa";

const Description: React.FC = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="container">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Crime Atlas Logo" className="logo" />
      </div>

      {/* Upload Section */}
      <div className="analyze-box">
        {/* Tabs */}
        <div className="tabs">
          <div className="tab">File</div>
          <div className="tab active">Description</div>
        </div>

        {/* Content */}
        <div className="content">
          {/* Description Box */}
          <div className="description-container">
            <label className="description-label">Description:</label>
            <textarea
              className="description-box"
              placeholder="Write from here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>

          <div className="input-group">
            <label className="label">Proof:</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <button className="file-button" onClick={() => {
    const fileInput = document.querySelector<HTMLInputElement>('.file-input');
    if (fileInput) fileInput.click();
}}>
    Upload photo/video
</button>

            {file && <p className="file-name">Selected: {file.name}</p>}
          </div>
          
          <button className="user-profile-button">
            <FaUser className="profile-icon" />
          </button>
          {/* Back Button */}
      <button className="back-button" onClick={() => window.history.back()}>
        Back
      </button>
          <button className="analyze-button">Analyze</button>
        </div>
      </div>
    </div>
  );
};

export default Description;
