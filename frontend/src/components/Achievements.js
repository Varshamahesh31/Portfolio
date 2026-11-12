import React, { useState } from 'react';
import portfolioData from '../data/portfolioData';
import TiltCard from './TiltCard';

const AchievementFlipCard = ({ achievement }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`achievement-flip-container ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(prev => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(prev => !prev);
        }
      }}
      aria-label={`${achievement.title} - Click or press Enter to flip for credentials`}
    >
      <TiltCard
        maxTilt={12}
        scale={1.035}
        maxGlare={0.24}
        perspective={1000}
        className="achievement-card-tilt"
      >
        <div className="achievement-flip-card-inner">
          {/* FRONT */}
          <div className="achievement-card-front">
            <div className="achievement-image-container">
              {achievement.image ? (
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="achievement-img"
                  loading="lazy"
                />
              ) : (
                <div className="achievement-badge-card" aria-hidden="true">
                  <div className="badge-icon">🏆</div>
                  <div className="badge-platform">HackerRank</div>
                  <div className="badge-label">Verified Skill Assessment</div>
                </div>
              )}
              {achievement.badge && (
                <span className="achievement-corner-badge">
                  {achievement.badge}
                </span>
              )}
            </div>
            <div className="achievement-details">
              <h3>{achievement.title}</h3>
              <p className="achievement-highlight">{achievement.highlight}</p>
              <div className="flip-hint-badge">
                <span>Click to view credential details ↻</span>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="achievement-card-back">
            <div className="back-content">
              <span className="back-badge">Verified Credential</span>
              <h3 className="back-title">{achievement.title}</h3>
              <p className="back-highlight">{achievement.highlight}</p>
              <p className="back-desc">{achievement.description}</p>
              <div className="back-signature">
                <span className="cert-check">✓ Authenticated Record</span>
              </div>
              <span className="back-flip-return">Click anywhere to flip back ↺</span>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

const Achievements = () => {
  const { achievements } = portfolioData;

  return (
    <section id="achievements" className="achievements" aria-label="Achievements and Certifications">
      <div className="achievements-container">
        <div className="achievements-header">
          <span className="section-label">Verified Milestones</span>
          <h2>Milestones & <em>Achievements</em></h2>
          <div className="gold-line centered"></div>
          <p className="achievements-subtitle">
            Global hackathon rankings, datathon participation, and technical assessments.
          </p>
        </div>
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <AchievementFlipCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
