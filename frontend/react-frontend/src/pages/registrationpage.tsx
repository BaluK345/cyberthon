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
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [inputDescription, setInputDescription] = useState<string>(description);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle proof upload
  const handleProofChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setProofFile(event.target.files[0]);
    }
  };

  // Handle Analyze Button
  const handleAnalyze = async () => {
    if (!inputDescription && !selectedFile) {
      alert("Please provide either a description or a file.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      if (selectedFile) formData.append("pdf", selectedFile);
      if (proofFile) formData.append("proof", proofFile);
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
        localStorage.setItem("classificationResult", JSON.stringify(result));
        setDescription(inputDescription);
        navigate("/category");
      } else {
        alert("Error: " + (result.error || "Something went wrong"));
      }
    } catch (error) {
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
        onClick={() => navigate("/complaint")}
      />

      {/* Back Button */}
      <button className="fa-back-button" onClick={() => navigate(-1)}>
        Back
      </button>

      {/* Tabs */}
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

      {/* Content */}
      <div className="fa-box">
        {activeTab === "file" ? (
          <div className="fa-upload-section">
            {/* File Upload */}
            <label className="fa-label">File:</label>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && <p className="fa-file-name">{selectedFile.name}</p>}

            {/* Proof Upload */}
            <label className="fa-label">Proof (Image/Video):</label>
            <input type="file" accept="image/*,video/*" onChange={handleProofChange} />
            {proofFile && <p className="fa-file-name">{proofFile.name}</p>}

            {/* Analyze Button */}
            <button className="fa-analyze-button" onClick={handleAnalyze} disabled={loading}>
              {loading ? "Processing..." : "Analyze"}
            </button>
          </div>
        ) : (
          <div className="fa-description-section">
            <label className="fa-description-label">Description:</label>
            <textarea
              className="fa-description-input"
              placeholder="Describe your case..."
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
            />

            {/* Proof Upload */}
            <label className="fa-label">Proof (Image/Video):</label>
            <input type="file" accept="image/*,video/*" onChange={handleProofChange} />
            {proofFile && <p className="fa-file-name">{proofFile.name}</p>}

            {/* Analyze Button */}
            <button className="fa-analyze-button" onClick={handleAnalyze} disabled={loading}>
              {loading ? "Processing..." : "Analyze"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileAnalyze;
