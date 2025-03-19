import React, { useState } from "react";
import "./fileanalyze.css";
import crimeAtlasLogo from "../assets/logo cyber.png";
import { FaUser } from "react-icons/fa"; // User profile icon

const FileAnalyze: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"file" | "description">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileProof, setFileProof] = useState<File | null>(null); // Separate proof state for File tab
  const [descriptionProof, setDescriptionProof] = useState<File | null>(null); // Separate proof state for Description tab
  const [description, setDescription] = useState<string>("");

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle proof upload for the correct tab
  const handleProofChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      if (activeTab === "file") {
        setFileProof(event.target.files[0]); // Update proof for File tab
      } else {
        setDescriptionProof(event.target.files[0]); // Update proof for Description tab
      }
    }
  };

  return (
    <div className="fa-container">
      {/* Logo (Separate from Back Button) */}
      <img src={crimeAtlasLogo} alt="Logo" className="fa-logo" />

      {/* Back Button */}
      <button className="fa-back-button">Back</button>

      {/* User Profile (Top Right) */}
      <div className="fa-user-profile">
        <FaUser className="fa-user-icon" />
      </div>

      {/* Main Content */}
      <div className="fa-content">
        {/* Tabs Positioned at Border */}
        <div className="fa-tabs">
          <button
            className={`fa-tab ${activeTab === "file" ? "active" : ""}`}
            onClick={() => setActiveTab("file")}
          >
            File
          </button>
          <button
            className={`fa-tab ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
        </div>

        {/* Content Box */}
        <div className="fa-box">
          {activeTab === "file" && (
            <div className="fa-upload-section">
              {/* File Upload */}
              <div className="fa-input-group">
                <label className="fa-label">File:</label>
                <input
                  type="file"
                  id="file-upload"
                  className="fa-hidden-input"
                  onChange={handleFileChange}
                />
                <button
                  className="fa-upload-button"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  Upload file
                </button>
                {selectedFile && <p className="fa-file-name">{selectedFile.name}</p>}
              </div>

              {/* Proof Upload (File Tab) */}
              <div className="fa-input-group">
                <label className="fa-label">Proof:</label>
                <input
                  type="file"
                  id="proof-upload-file"
                  className="fa-hidden-input"
                  accept="image/*,video/*"
                  onChange={handleProofChange}
                />
                <button
                  className="fa-upload-button"
                  onClick={() => document.getElementById("proof-upload-file")?.click()}
                >
                  Upload photo/video
                </button>
                {fileProof && <p className="fa-file-name">{fileProof.name}</p>}
              </div>

              {/* Analyze Button (File Tab) */}
              <button className="fa-analyze-button-file">Analyze</button>
            </div>
          )}

          {activeTab === "description" && (
            <div className="fa-description-section">
              <div className="fa-description-box">
                <label className="fa-description-label">Description:</label>
                <textarea
                  className="fa-description-input"
                  placeholder="Write from here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Proof Upload (Description Tab) */}
              <div className="fa-input-group">
                <label className="fa-label">Proof:</label>
                <input
                  type="file"
                  id="proof-upload-description"
                  className="fa-hidden-input"
                  accept="image/*,video/*"
                  onChange={handleProofChange}
                />
                <button
                  className="fa-upload-button"
                  onClick={() =>
                    document.getElementById("proof-upload-description")?.click()
                  }
                >
                  Upload photo/video
                </button>
                {descriptionProof && <p className="fa-file-name">{descriptionProof.name}</p>}
              </div>

              {/* Analyze Button (Description Tab) */}
              <button className="fa-analyze-button-description">Analyze</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileAnalyze;
