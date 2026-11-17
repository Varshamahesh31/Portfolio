import React from 'react';
import './Hero.css';
import FloatingPortrait from './FloatingPortrait';
import portfolioData from '../data/portfolioData';

const Hero = () => {
  const { personal, heroStats } = portfolioData;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" aria-label="Introduction">
      {/* Background ambient particles */}
      <div className="hero-background">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      {/* Two-column editorial layout */}
      <div className="hero-layout">
        {/* Left column: editorial typography and introduction */}
        <div className="hero-left">
          <span className="hero-eyebrow">Hello, I'm</span>

          <h1 className="hero-name">
            Varsha<br /><em>M R</em>
          </h1>

          <p className="hero-role">Software Engineer | Full Stack Developer</p>

          <p className="hero-tagline">
            Building intelligent, scalable and user-focused digital experiences.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <button
              className="hero-btn-primary"
              onClick={() => scrollTo('projects')}
              id="hero-view-work-btn"
            >
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              className="hero-btn-secondary"
              onClick={() => scrollTo('contact')}
              id="hero-connect-btn"
            >
              Let's Connect
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>

          {/* Social links */}
          <div className="hero-social">
            {/* GitHub */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub Profile"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={personal.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn Profile"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* Key Stats Row */}
          <div className="hero-stats-row">
            {heroStats.map((stat, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-number">{stat.number}</span>
                <span className="hero-stat-label">{stat.label}</span>
                {stat.sublabel && (
                  <span className="hero-stat-sublabel">{stat.sublabel}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Floating 3D Portrait with layered depth & WebGL background */}
        <div className="hero-right">
          <FloatingPortrait />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero-scroll-indicator"
        onClick={() => scrollTo('what-i-build')}
        aria-label="Scroll down to What I Build"
      >
        <span>Scroll</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
