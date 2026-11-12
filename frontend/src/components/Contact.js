import React, { useState } from 'react';
import portfolioData from '../data/portfolioData';
import TiltCard from './TiltCard';

const Contact = () => {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleEmailMe = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      formData.name
        ? `Portfolio Inquiry from ${formData.name}`
        : 'Portfolio Inquiry'
    );
    const bodyContent = `${formData.message || ''}\n\n---\nSender: ${formData.name || 'Visitor'}\nEmail: ${formData.email || 'Not provided'}`;
    const body = encodeURIComponent(bodyContent);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="contact" aria-label="Contact Information">
      <div className="container">
        <h2>Get In Touch</h2>
        <p className="contact-subtitle">
          Have an opportunity or question? Feel free to reach out directly.
        </p>

        <div className="contact-content">
          {/* Direct Contact Information Cards with 3D Tilt */}
          <div className="contact-info">
            <TiltCard maxTilt={8} scale={1.02} maxGlare={0.15} className="contact-item-tilt">
              <div className="contact-item contact-item-3d">
                <div className="contact-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <h3>Email</h3>
                  <a href={`mailto:${personal.email}`} className="contact-link">
                    {personal.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="copy-email-btn"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? '✓ Copied to clipboard!' : '📋 Copy Email'}
                  </button>
                </div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={8} scale={1.02} maxGlare={0.15} className="contact-item-tilt">
              <div className="contact-item contact-item-3d">
                <div className="contact-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <h3>Phone</h3>
                  <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="contact-link">
                    {personal.phone}
                  </a>
                </div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={8} scale={1.02} maxGlare={0.15} className="contact-item-tilt">
              <div className="contact-item contact-item-3d">
                <div className="contact-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <h3>Location</h3>
                  <p>{personal.location}</p>
                </div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={8} scale={1.02} maxGlare={0.15} className="contact-item-tilt">
              <div className="contact-item contact-item-3d">
                <div className="contact-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <h3>Availability</h3>
                  <p>{personal.availability}</p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Recruiter-friendly Email Message Composer with 3D Frame */}
          <TiltCard
            maxTilt={6}
            scale={1.015}
            maxGlare={0.2}
            perspective={1000}
            className="contact-form-tilt"
          >
            <div className="contact-form-container contact-form-3d">
              <form className="contact-form" onSubmit={handleEmailMe}>
                <div className="form-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Your Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Your Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Your message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="cta-btn email-me-btn btn-3d"
                  id="contact-email-me-btn"
                >
                  <span>Email Me</span>
                  <span className="btn-arrow">✉️</span>
                </button>

                <p className="form-note">
                  Direct email is preferred. Clicking &ldquo;Email Me&rdquo; opens your email client with your message drafted.
                </p>
              </form>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
