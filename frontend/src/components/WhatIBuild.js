import React from 'react';
import './WhatIBuild.css';

const cards = [
  {
    icon: '⬡',
    title: 'Full Stack Development',
    description: 'Building responsive, scalable and user-focused web applications with modern frontend and backend technologies.',
    techs: ['React.js', 'JavaScript', 'Node.js', 'FastAPI', 'HTML', 'CSS'],
    accent: '#C69B32'
  },
  {
    icon: '◈',
    title: 'AI & Machine Learning',
    description: 'Exploring intelligent systems and integrating machine learning and AI capabilities into practical applications.',
    techs: ['Python', 'Machine Learning', 'LangChain', 'Gemini API'],
    accent: '#E6C879'
  },
  {
    icon: '⬢',
    title: 'Backend & Databases',
    description: 'Developing reliable APIs, managing databases and building efficient server-side systems.',
    techs: ['Python', 'SQL', 'MySQL', 'MongoDB', 'REST APIs'],
    accent: '#C69B32'
  }
];

const WhatIBuild = () => {
  return (
    <section id="what-i-build" className="what-i-build">
      <div className="wib-container">
        <div className="wib-header">
          <span className="section-label">My Expertise</span>
          <h2 className="section-heading light">What I <em>Build</em></h2>
          <div className="gold-line centered"></div>
          <p className="wib-subtitle">Turning ideas into functional, intelligent and meaningful digital experiences.</p>
        </div>

        <div className="wib-grid">
          {cards.map((card, i) => (
            <div key={i} className="wib-card">
              <div className="wib-card-icon">{card.icon}</div>
              <h3 className="wib-card-title">{card.title}</h3>
              <p className="wib-card-desc">{card.description}</p>
              <div className="wib-tech-list">
                {card.techs.map((t, j) => (
                  <span key={j} className="wib-tech-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIBuild;
