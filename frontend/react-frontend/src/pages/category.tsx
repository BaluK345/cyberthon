import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDescription } from "./DescriptionContext";
import "../style/category.css";
import logo from "../assets/logo_cyber.png";
import { FaUser } from "react-icons/fa";

const Category: React.FC = () => {
  const navigate = useNavigate();
  const { description: analyzeDescription } = useDescription();
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [caseInsights, setCaseInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Retrieve classification result from localStorage
    const storedResult = localStorage.getItem("classificationResult");
    if (storedResult) {
      setClassificationResult(JSON.parse(storedResult));
    }

    // Automatically generate case insights if description exists
    if (analyzeDescription && analyzeDescription.trim()) {
      generateCaseInsights(analyzeDescription.trim());
    }
  }, [analyzeDescription]);

  const generateCaseInsights = async (description: string) => {
    setLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("access_token");
      
      if (!token) {
        setError("Please login first");
        return;
      }
      
      const response = await fetch("http://localhost:8000/api/case-insights/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCaseInsights(data.insights);
        setError("");
      } else {
        if (response.status === 401) {
          setError("Session expired. Please login again.");
          // Optionally redirect to login
          // navigate("/login");
        } else {
          setError(data.error || "Failed to generate case insights");
        }
        setCaseInsights(null);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setCaseInsights(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-body">
      {/* Header */}
      <div className="category-header">
        <img src={logo} alt="Logo" className="category-logo" />
      </div>

      {/* Main Container */}
      <div className="category-container">
        <h1>Case insights</h1>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <p style={{ color: "#0f9e99", fontWeight: "bold", textAlign: "center" }}>
              🔄 Generating case insights using Gemini AI...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-container">
            <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
              ❌ {error}
            </p>
          </div>
        )}

        {/* Gemini AI Case Insights */}
        {caseInsights && !loading && (
          <div className="category-details">
            <p>
              <strong>Predicted Category:</strong>{" "}
              {caseInsights.predicted_category || "Not specified"}
            </p>
            <p>
              <strong>Applicable Law:</strong>{" "}
              {caseInsights.applicable_law || "Consult a legal expert"}
            </p>
            <p>
              <strong>Procedure:</strong>{" "}
              {caseInsights.procedure || "Seek professional legal advice"}
            </p>
            <p>
              <strong>Fine:</strong>{" "}
              {caseInsights.fine || "Varies based on case specifics"}
            </p>

            {caseInsights.extracted_keywords && Array.isArray(caseInsights.extracted_keywords) && (
              <>
                <strong>Extracted Keywords:</strong>
                <ul>
                  {caseInsights.extracted_keywords.map(
                    (keyword: string, index: number) => (
                      <li key={index}>{keyword}</li>
                    )
                  )}
                </ul>
              </>
            )}
          </div>
        )}

        {/* Fallback: Show classification result if no Gemini insights */}
        {!caseInsights && !loading && !error && classificationResult && (
          <div className="category-details">
            <p>
              <strong>Predicted Category:</strong>{" "}
              {classificationResult.predicted_category}
            </p>

            {classificationResult.ai_details && (
              <>
                <p>
                  <strong>Applicable Law:</strong>{" "}
                  {classificationResult.ai_details["Applicable Law"]}
                </p>
                <p>
                  <strong>Procedure:</strong>{" "}
                  {classificationResult.ai_details["Procedure"]}
                </p>
                <p>
                  <strong>Fine:</strong>{" "}
                  {classificationResult.ai_details["Fine"]}
                </p>

                {classificationResult.ai_details["Extracted Keywords"] && (
                  <>
                    <strong>Extracted Keywords:</strong>
                    <ul>
                      {classificationResult.ai_details["Extracted Keywords"].map(
                        (keyword: string, index: number) => (
                          <li key={index}>{keyword}</li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* No data state */}
        {!caseInsights && !classificationResult && !loading && !error && (
          <p style={{ textAlign: "center", color: "#666" }}>
            No case insights available. Please analyze your input first.
          </p>
        )}

        {/* Button to go back */}
        <div className="submit-container">
          <button className="submit-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
