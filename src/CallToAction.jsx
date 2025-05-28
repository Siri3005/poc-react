import React from 'react';
import './CallToAction.css';
import { useNavigate } from 'react-router-dom';

function CallToActionSection() {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <h2 className="cta-title">Ready to Explore?</h2>
      <p className="cta-text">Start building your idea with this Proof of Concept template. It's fast, responsive, and easy to extend.</p>
      <button className="cta-button" onClick={() => navigate('/proof')}>
        Get Started
      </button>
    </section>
  );
}

export default CallToActionSection;
