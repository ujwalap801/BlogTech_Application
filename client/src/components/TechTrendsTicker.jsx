import React from 'react';
import '../assets/Styles/TechTrendsTicker.css'

const trends = [
  "Java 21 Released 🚀",
  "React Server Components 🔥",
  "Prompt Engineering for AI 🤖",
  "AWS Free Tier Tips ☁️",
  "Docker vs Podman 🐳",
  "Web 3.0 & Blockchain 🔐",
  "Cybersecurity Threats 2025 🛡️",
  "Full Stack with Spring Boot 🧱",
];

const TechTrendsTicker = () => {
  const allTrends = [...trends, ...trends];

  return (
    <div className="ticker-container">
      <div className="ticker-track">
        <div className="ticker-content">
          {allTrends.map((item, index) => (
            <span key={index} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechTrendsTicker;
