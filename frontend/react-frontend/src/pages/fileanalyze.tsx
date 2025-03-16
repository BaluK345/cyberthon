import React, { useState } from "react";
import "./fileanalyze.css";
import crimeAtlasLogo from "../assets/logo cyber.png";
import { FaUser } from "react-icons/fa";

const FileAnalyze: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [proof, setProof] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleProofChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProof(event.target.files[0]);
    }
  };

  return (
    <div className="fa-container">
      {/* Back Button */}
      <button className="fa-back-button" onClick={() => window.history.back()}>
        Back
      </button>

      {/* Logo Section */}
      <div className="fa-logo-container">
        <img src={crimeAtlasLogo} alt="Crime Atlas Logo" className="fa-logo-analyze" />
      </div>

      {/* Upload Section */}
      <div className="fa-analyze-box">
        <div className="fa-tabs">
          <div className="fa-tab active">File</div>
          <div className="fa-tab">Description</div>
        </div>
        
        <div className="fa-content">
          {/* File Upload */}
          <div className="fa-input-group fa-file-upload">
            <label className="fa-label">File:</label>
            <input type="file" id="fa-file-upload" hidden onChange={handleFileChange} />
            <button className="fa-file-button" onClick={() => document.getElementById("fa-file-upload")?.click()}>
              Upload file
            </button>
            <button className="fa-user-profile-button">
              <FaUser className="fa-profile-icon" />
            </button>
            {file && <p className="fa-file-name">{file.name}</p>}
          </div>

          {/* Proof Upload */}
          <div className="fa-input-group fa-proof-upload">
            <label className="fa-label">Proof:</label>
            <input type="file" id="fa-proof-upload" hidden accept="image/*,video/*" onChange={handleProofChange} />
            <button className="fa-file-button" onClick={() => document.getElementById("fa-proof-upload")?.click()}>
              Upload photo/video
            </button>
            {proof && <p className="fa-file-name">{proof.name}</p>}
          </div>
        </div>

        {/* Analyze Button */}
        <div className="fa-analyze-button-container">
          <button className="fa-analyze-button">Analyze</button>
        </div>
      </div>
    </div>
  );
};

export default FileAnalyze;
