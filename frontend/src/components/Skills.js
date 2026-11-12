import React from 'react';
import portfolioData from '../data/portfolioData';
import TiltCard from './TiltCard';

const CATEGORY_ICONS = {
  'Frontend': '💻',
  'Backend and APIs': '⚙️',
  'Databases and tools': '🗄️',
  'Machine Learning and fundamentals': '🧠',
};

const styles = `
.skills {
  background: #35241D;
  padding: 100px 0;
}
.skills-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}
.skills-header {
  text-align: center;
  margin-bottom: 4rem;
}
.skills-subheading {
  color: #B9A99A;
  font-size: 1rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
  font-family: Inter, -apple-system, sans-serif;
}
.skills-heading {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  color: #F5EFE5;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.15;
}
.skills-heading em {
  font-style: italic;
  color: #C69B32;
}
.skills-gold-line {
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #C69B32, #E6C879);
  border-radius: 2px;
  margin: 0 auto;
}
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}
.skill-card-tilt {
  display: block;
}
.skill-card {
  background: rgba(36,24,19,0.7);
  border: 1px solid rgba(198,155,50,0.15);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  height: 100%;
}
.skill-card:hover {
  border-color: rgba(198,155,50,0.5);
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 20px rgba(198,155,50,0.08);
}
.skill-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.8rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid rgba(198,155,50,0.15);
}
.skill-category-icon {
  font-size: 2rem;
  line-height: 1;
}
.skill-card-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #F5EFE5;
  font-weight: 600;
  margin: 0;
}
.skills-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 0;
  margin: 0;
}
.skill-item-3d {
  background: rgba(198,155,50,0.1);
  border: 1px solid rgba(198,155,50,0.25);
  color: #E7D9C7;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: Inter, -apple-system, sans-serif;
}
.skill-item-3d:hover {
  background: rgba(198,155,50,0.2);
  border-color: #C69B32;
  color: #C69B32;
  transform: translateY(-2px);
}
.skill-bullet {
  color: #C69B32;
  font-size: 0.7rem;
}
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
  .skills {
    padding: 60px 0;
  }
  .skills-container {
    padding: 0 24px;
  }
}
`;

const Skills = () => {
  const { skillGroups } = portfolioData;

  return (
    <>
      <style>{styles}</style>
      <section id="skills" className="skills" aria-label="Technical Skills">
        <div className="skills-container">
          {/* Header */}
          <div className="skills-header">
            <p className="skills-subheading">What I Know</p>
            <h2 className="skills-heading">
              Technical <em>Skills</em>
            </h2>
            <div className="skills-gold-line" />
          </div>

          {/* 2×2 Grid */}
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <TiltCard
                key={index}
                maxTilt={10}
                scale={1.03}
                maxGlare={0.18}
                perspective={1000}
                className="skill-card-tilt"
              >
                <div className="skill-card">
                  <div className="skill-card-header">
                    <span className="skill-category-icon" aria-hidden="true">
                      {CATEGORY_ICONS[group.category] || '🔹'}
                    </span>
                    <h3>{group.category}</h3>
                  </div>
                  <ul className="skills-list">
                    {group.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="skill-item-3d">
                        <span className="skill-bullet" aria-hidden="true">◆</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;
