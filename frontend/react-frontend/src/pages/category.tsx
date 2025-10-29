import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/category.css";
import logo from "../assets/logo_cyber.png";
import { FaUser } from "react-icons/fa";

const Category: React.FC = () => {
  const navigate = useNavigate();
  const [classificationResult, setClassificationResult] = useState<any>(null);

  useEffect(() => {
    // Retrieve classification result from localStorage
    const storedResult = localStorage.getItem("classificationResult");
    if (storedResult) {
      setClassificationResult(JSON.parse(storedResult));
    }
  }, []);

  return (
    <div className="category-body">
      {/* Header */}
      <div className="category-header">
        <img src={logo} alt="Logo" className="category-logo" />
      </div>

      {/* Main Container */}
      <div className="category-container">
        <h1>Case insights</h1>

        {classificationResult ? (
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
        ) : (
          <p>No classification result found. Please analyze your input.</p>
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
