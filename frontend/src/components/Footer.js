import React from 'react';
import portfolioData from '../data/portfolioData';

const Footer = () => {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <p>
          &copy; 2026 {personal.name} ({personal.shortName}). All rights reserved.
        </p>
        <p className="footer-role">
          {personal.role}
        </p>
        <div className="footer-links">
          {personal.linkedIn && (
            <a
              href={personal.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
          )}
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            GitHub
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Direct Email"
          >
            Email
          </a>
          <button
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Scroll back to top"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;