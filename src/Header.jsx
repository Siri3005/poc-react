import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
            Proof of Concept
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>

        <Link to="/proof">
          <button className="cta-button">Get Started</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
