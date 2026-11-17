import React, { useState, useEffect } from 'react';
import './FloatingPortrait.css';
import Hero3DCanvas from './Hero3DCanvas';

/**
 * FloatingPortrait: Editorial composition presenting the full original photograph as uploaded
 * with background intact, enhanced with:
 * - Subtle ambient 3D WebGL golden ring/particles in the background
 * - Warm golden aura and realistic dimensional shadow
 * - Gentle vertical floating animation (NO mouse parallax tilt on photo)
 * - Clean editorial frame with metallic gold accents and badges
 * - Initial smooth fade/scale reveal
 */
const FloatingPortrait = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`floating-portrait-container ${isLoaded ? 'revealed' : ''}`}
      aria-label="Varsha M R - Portrait"
    >
      {/* LAYER 1: Interactive 3D WebGL Canvas (Behind) */}
      <div className="portrait-3d-canvas-wrap">
        <Hero3DCanvas />
      </div>

      {/* LAYER 2: Soft Golden Ambient Glow */}
      <div className="portrait-ambient-glow" aria-hidden="true" />

      {/* LAYER 3: Portrait Frame & Full Original Photo (Floating, NO mouse tilt) */}
      <div className="portrait-full-frame">
        {/* Soft realistic shadow */}
        <div className="portrait-depth-shadow" aria-hidden="true" />

        {/* Editorial border wrapper with corner accents */}
        <div className="portrait-image-wrapper">
          <div className="frame-corner top-left" aria-hidden="true" />
          <div className="frame-corner top-right" aria-hidden="true" />
          <div className="frame-corner bottom-left" aria-hidden="true" />
          <div className="frame-corner bottom-right" aria-hidden="true" />

          {/* Full photo as uploaded with background intact */}
          <img
            src="/varsha-new.jpeg"
            alt="Varsha M R - Software Engineer"
            className="portrait-full-img"
            loading="eager"
          />

          {/* Subtle inner gold vignette edge */}
          <div className="frame-inner-overlay" aria-hidden="true" />
        </div>
      </div>

      {/* LAYER 4: Foreground Metallic Gold Elements & Editorial Badges */}
      <div className="portrait-foreground-accents" aria-hidden="true">
        {/* Top-Right Floating Gold Geo Diamond */}
        <div className="gold-geo-accent geo-diamond">
          <span className="geo-sparkle">✦</span>
        </div>

        {/* Bottom-Left Floating Editorial Experience Pill */}
        <div className="floating-editorial-badge badge-bottom-left">
          <span className="badge-pulse-dot" />
          <div className="badge-text-group">
            <span className="badge-title">Software Engineer</span>
            <span className="badge-sub">Full Stack & AI</span>
          </div>
        </div>

        {/* Bottom-Right Minimal Metric Pill */}
        <div className="floating-editorial-badge badge-bottom-right">
          <span className="badge-gold-icon">◈</span>
          <span className="badge-title">CGPA 8.90 / 10</span>
        </div>

        {/* Top-Left Delicate Gold Line Motif */}
        <div className="gold-line-motif">
          <div className="line-bar" />
          <span className="motif-text">EST. 2026</span>
        </div>
      </div>
    </div>
  );
};

export default FloatingPortrait;
