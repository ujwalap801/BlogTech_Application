import React from 'react';
import '../src/assets/Styles/TechHero.css'


const TechHero = () => {
  return (
    <div className="container-fluid bg-dark text-white py-5 text-center">
<h1
  className="display-4 fw-bold mb-3"
  style={{
    background: 'linear-gradient(90deg, #007cf0, #00dfd8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '1px',
  }}
>
  Welcome to Tech Blog
</h1>
      <p className="lead">
        Dive into the world of
        <span className="animated-text-wrapper">
          <span className="animated-text" />
        </span>
      </p>
    </div>
  );
};

export default TechHero;
