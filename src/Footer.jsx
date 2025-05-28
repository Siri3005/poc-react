import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-title">Proof of Concept</p>
        <nav className="footer-links">
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </nav>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Siri. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
