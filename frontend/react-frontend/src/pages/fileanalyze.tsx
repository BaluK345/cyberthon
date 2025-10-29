import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDescription } from "./DescriptionContext";
import "../style/fileanalyze.css";
import crimeAtlasLogo from "../assets/logo_cyber.png";

const FileAnalyze: React.FC = () => {
  const navigate = useNavigate();
  const { description, setDescription } = useDescription();
  const [activeTab, setActiveTab] = useState<"file" | "description">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileProof, setFileProof] = useState<File | null>(null);
  const [descriptionProof, setDescriptionProof] = useState<File | null>(null);
  const [inputDescription, setInputDescription] = useState<string>(description);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle proof upload
  const handleProofChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      if (activeTab === "file") {
        setFileProof(event.target.files[0]);
      } else {
        setDescriptionProof(event.target.files[0]);
      }
    }
  };

  // Handle analyze button
  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (selectedFile) {
        formData.append("pdf", selectedFile);
      }

      formData.append("description", inputDescription);

      const response = await fetch("http://localhost:8000/api/upload/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Upload & Classification Successful:", result);
        localStorage.setItem("classificationResult", JSON.stringify(result));
        setDescription(inputDescription);
        navigate("/category");
      } else {
        console.error("Error:", result);
        alert("Error: " + (result.error || "Something went wrong"));
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to process the request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fa-container">
      {/* Clickable Logo (Navigates to Home) */}
      <img
        src={crimeAtlasLogo}
        alt="Logo"
        className="fa-logo"
        onClick={() => navigate("/complaint")} // Redirects to home page
        style={{ cursor: "pointer" }} // Makes it look clickable
      />

      {/* Back Button (Moved to Top Right) */}
      <button className="fa-back-button" onClick={() => navigate(-1)}>
        Back
      </button>

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
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  Upload file
                </button>
                {selectedFile && (
                  <p className="fa-file-name">{selectedFile.name}</p>
                )}
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
                  onClick={() =>
                    document.getElementById("proof-upload-file")?.click()
                  }
                >
                  Upload photo/video
                </button>
                {fileProof && <p className="fa-file-name">{fileProof.name}</p>}
              </div>

              {/* Analyze Button */}
              <button
                className="fa-analyze-button-file"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? "Processing..." : "Analyze"}
              </button>
            </div>
          )}

          {activeTab === "description" && (
            <div className="fa-description-section">
              <div className="fa-description-box">
                <label className="fa-description-label">Description:</label>
                <textarea
                  className="fa-description-input"
                  placeholder="Write from here..."
                  value={inputDescription}
                  onChange={(e) => setInputDescription(e.target.value)}
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
                {descriptionProof && (
                  <p className="fa-file-name">{descriptionProof.name}</p>
                )}
              </div>

              {/* Analyze Button */}
              <button
                className="fa-analyze-button-description"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? "Processing..." : "Analyze"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileAnalyze;
