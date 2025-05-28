import React from 'react';
import './FeatureSection.css';

function FeaturesSection() {
  return (
    <section className="features-section">
      <h2 className="features-title">Why Use This Proof of Concept?</h2>
      <div className="features-container">
        <div className="feature-box">
          <h3>Fast Setup</h3>
          <p>Spin up this project in seconds with minimal config.</p>
        </div>
        <div className="feature-box">
          <h3>Modern Stack</h3>
          <p>Built with React, JSX, and clean CSS layout principles.</p>
        </div>
        <div className="feature-box">
          <h3>Customizable</h3>
          <p>Adapt it easily for any prototype or real-world use case.</p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
