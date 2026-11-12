import React from 'react';
import portfolioData from '../data/portfolioData';
import TiltCard from './TiltCard';

const Achievements = () => {
  const { achievements } = portfolioData;

  return (
    <section id="achievements" className="achievements" aria-label="Achievements and Certifications">
      <div className="container">
        <h2>Achievements & Certifications</h2>
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <TiltCard
              key={achievement.id}
              maxTilt={12}
              scale={1.035}
              maxGlare={0.24}
              perspective={920}
              className="achievement-card-tilt"
            >
              <div className="achievement-card achievement-card-3d">
                <div className="achievement-image-container achievement-img-3d">
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
                    <span className="achievement-corner-badge badge-3d">
                      {achievement.badge}
                    </span>
                  )}
                </div>
                <div className="achievement-details">
                  <h3>{achievement.title}</h3>
                  <p className="achievement-highlight">{achievement.highlight}</p>
                  <p className="achievement-desc">{achievement.description}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;