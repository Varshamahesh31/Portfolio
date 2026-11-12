import React, { useState } from 'react';
import portfolioData from '../data/portfolioData';
import TiltCard from './TiltCard';
import Skills3DOrbit from './Skills3DOrbit';

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
  position: relative;
  overflow: hidden;
}
.skills-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}
.skills-header {
  text-align: center;
  margin-bottom: 3rem;
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
  margin: 0 auto 1.5rem;
}
.skills-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;
}
.skills-orbit-wrap {
  background: rgba(36,24,19,0.55);
  border: 1px solid rgba(198,155,50,0.2);
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
  backdrop-filter: blur(12px);
  position: relative;
}
.skills-orbit-title {
  text-align: center;
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #C69B32;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
.skill-card-tilt {
  display: block;
}
.skill-card {
  background: rgba(36,24,19,0.7);
  border: 1px solid rgba(198,155,50,0.15);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  height: 100%;
}
.skill-card:hover {
  border-color: rgba(198,155,50,0.5);
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 20px rgba(198,155,50,0.08);
}
.skill-card-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(198,155,50,0.15);
}
.skill-category-icon {
  font-size: 1.6rem;
  line-height: 1;
}
.skill-card-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  color: #F5EFE5;
  font-weight: 600;
  margin: 0;
}
.skills-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
}
.skill-item-3d {
  background: rgba(198,155,50,0.1);
  border: 1px solid rgba(198,155,50,0.25);
  color: #E7D9C7;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 500;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: Inter, -apple-system, sans-serif;
}
.skill-item-3d.highlighted {
  background: #C69B32;
  color: #241813;
  border-color: #E6C879;
  font-weight: 700;
  box-shadow: 0 0 15px rgba(198,155,50,0.5);
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
@media (max-width: 1024px) {
  .skills-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
@media (max-width: 640px) {
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
  const [selectedTech, setSelectedTech] = useState(null);

  const handleSelectTech = (tech) => {
    setSelectedTech(prev => (prev === tech ? null : tech));
  };

  return (
    <>
      <style>{styles}</style>
      <section id="skills" className="skills" aria-label="Technical Skills">
        <div className="skills-container">
          {/* Header */}
          <div className="skills-header">
            <p className="skills-subheading">What I Know</p>
            <h2 className="skills-heading">
              Technical <em>Arsenal</em>
            </h2>
            <div className="skills-gold-line" />
          </div>

          <div className="skills-layout">
            {/* Interactive 3D Orbit */}
            <div className="skills-orbit-wrap">
              <div className="skills-orbit-title">Interactive 3D Technology Orbit</div>
              <Skills3DOrbit
                onSelectTech={handleSelectTech}
                selectedTech={selectedTech}
              />
            </div>

            {/* Categorized Skills Grid */}
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
                      {group.skills.map((skill, skillIndex) => {
                        const isMatch = selectedTech && skill.toLowerCase().includes(selectedTech.toLowerCase());
                        return (
                          <li
                            key={skillIndex}
                            className={`skill-item-3d ${isMatch ? 'highlighted' : ''}`}
                            onClick={() => handleSelectTech(skill)}
                            style={{ cursor: 'pointer' }}
                          >
                            <span className="skill-bullet" aria-hidden="true">◆</span>
                            <span>{skill}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;
