import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import axios from "axios";
import "../style/complaint.css";
import logo from "../assets/logo_cyber.png";
import { FaSearch, FaChevronDown, FaChevronUp, FaUser } from "react-icons/fa";

const Complaint: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [query, setQuery] = useState("");
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTrendingNews();
  }, []);

  const fetchTrendingNews = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=743c32e21e83437a9320f8dffa93b35a`
      );
      setNews(response.data.articles || []);
    } catch (err) {
      setError("Failed to load trending news. Please try again.");
    }

    setLoading(false);
  };

  const handleSearch = async () => {
    if (query.trim() === "") return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=743c32e21e83437a9320f8dffa93b35a`
      );
      setNews(response.data.articles || []);
    } catch (err) {
      setError("Failed to fetch news. Please try again.");
    }

    setLoading(false);
  };

  const scrollToNextNews = () => {
    if (news.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % news.length);
    }
  };

  const scrollToPreviousNews = () => {
    if (news.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex - 3 < 0 ? news.length - (news.length % 3 || 3) : prevIndex - 3
      );
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="Crime Atlas Logo" className="logo" />
      </div>
      <button className="complaint-button" onClick={() => navigate("/analyze")}>
        Complaint
      </button>
      <button className="user-profile-button" onClick={() => navigate("/profile")}>
        <FaUser className="profile-icon" />
      </button>
      <div className="search-container">
        <FaSearch className="search-icon" size={25} />
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      <div className="content-box">
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : news.length > 0 ? (
          <div className="news-container">
            {news.slice(currentIndex, currentIndex + 3).map((article, index) => (
              <div key={index} className="news-item">
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} className="news-image" />
                )}
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-news">No news available.</p>
        )}

        {/* Scroll Buttons inside Content Box */}
        <div className="scroll-buttons">
          <button className="scroll-button" onClick={scrollToPreviousNews}>
            <FaChevronUp size={24} />
          </button>
          <button className="scroll-button" onClick={scrollToNextNews}>
            <FaChevronDown size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
