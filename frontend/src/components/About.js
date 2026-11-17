import React from 'react';
import portfolioData from '../data/portfolioData';
import TiltCard from './TiltCard';

const About = () => {
  const { personal, about } = portfolioData;

  return (
    <section id="about" className="about" aria-label="About Varsha M R">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-lead">{about.paragraph1}</p>
            <p className="about-skills-lead">{about.paragraph2}</p>

            <div className="about-highlights">
              <TiltCard maxTilt={8} scale={1.03} maxGlare={0.15} className="about-pill-tilt">
                <div className="about-pill">
                  <span className="pill-icon">📍</span>
                  <span>{personal.location}</span>
                </div>
              </TiltCard>

              <TiltCard maxTilt={8} scale={1.03} maxGlare={0.15} className="about-pill-tilt">
                <div className="about-pill">
                  <span className="pill-icon">💼</span>
                  <span>{personal.availability}</span>
                </div>
              </TiltCard>

              <TiltCard maxTilt={8} scale={1.03} maxGlare={0.15} className="about-pill-tilt">
                <div className="about-pill">
                  <span className="pill-icon">🎓</span>
                  <span>B.E. Computer Science (CGPA: 8.90)</span>
                </div>
              </TiltCard>
            </div>

            <div className="about-cta-row">
              <a
                href={personal.resumePdf}
                download={personal.resumeDownloadName}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-btn btn-3d"
                id="about-download-resume-btn"
                aria-label="Download Resume PDF"
              >
                <span>Download Resume</span>
                <span className="btn-icon">📄</span>
              </a>

              <a
                href={`mailto:${personal.email}`}
                className="about-contact-btn btn-3d"
                aria-label="Send email to Varsha"
              >
                <span>Get in Touch</span>
                <span className="btn-icon">✉️</span>
              </a>
            </div>
          </div>

          <div className="about-image">
            <TiltCard
              maxTilt={14}
              scale={1.04}
              maxGlare={0.3}
              perspective={900}
              className="about-image-tilt"
            >
              <div className="image-placeholder image-placeholder-3d">
                <img
                  src={personal.profileImage}
                  alt={`${personal.name} - Software Developer`}
                  className="profile-img"
                  loading="lazy"
                />
                <div className="profile-3d-badge">
                  <span className="badge-glow-dot"></span>
                  <span>Full-Stack & Backend</span>
                </div>
                <div className="profile-3d-floating-tag">
                  <span>CGPA 8.90 / 10</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;