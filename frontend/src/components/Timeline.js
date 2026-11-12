import React from 'react';
import portfolioData from '../data/portfolioData';

const Timeline = () => {
  const items = portfolioData.experienceEducation;

  return (
    <section id="timeline" className="timeline">
      <div className="timeline-container-wrap">
        <div className="timeline-header">
          <span className="section-label">My Path</span>
          <h2 className="timeline-heading">The Journey <em>So Far</em></h2>
          <div className="gold-line centered"></div>
        </div>
        <div className="timeline-track">
          <div className="timeline-line"></div>
          {items.map((item, i) => (
            <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-header-row">
                  <span className="timeline-year">{item.duration}</span>
                  <span className={`timeline-badge badge-${item.type.toLowerCase()}`}>
                    {item.type}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <h4>{item.organization}</h4>
                <div className="timeline-description">
                  {item.description.split('\n').map((line, lineIdx) => (
                    <p key={lineIdx}>{line}</p>
                  ))}
                </div>
                <div className="timeline-skills">
                  {item.skills.map((skill, skillIdx) => (
                    <span key={skillIdx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
