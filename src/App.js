// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import Header from './Header';
import FeaturesSection from './FeatureSection';
import CallToAction from './CallToAction';
import Footer from './Footer';
import ProofOfConceptPage from './ProofOfConcept';
import ChecklistPage from './Checklist';
import './App.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <main className="hero">
        <h1 className="hero-title">Welcome to Proof of Concept</h1>
        <p className="hero-subtitle">
          This is a sample proof of concept website built using React and CSS.
          It demonstrates clean UI and modern layout design practices.
        </p>
        <button
          className="hero-button"
          onClick={() => navigate('/proof')}
        >
          Explore More
        </button>
      </main>

      {/* In‐page sections */}
      <section id="features"><FeaturesSection /></section>
      <section id="contact"><CallToAction /></section>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<HomePage />} />

        {/* Your POC form/table page */}
        <Route path="/proof" element={<ProofOfConceptPage />} />

        {/* The checklist page, navigated to by that “Next” button */}
        <Route path="/checklist" element={<ChecklistPage />} />
      </Routes>
    </Router>
  );
}
