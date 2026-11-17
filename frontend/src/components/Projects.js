import React from 'react';
import portfolioData from '../data/portfolioData';
import TiltCard from './TiltCard';

const ProjectCard = ({ project }) => {
  return (
    <TiltCard
      maxTilt={10}
      scale={1.03}
      maxGlare={0.22}
      perspective={1100}
      className="project-card-tilt"
      as="article"
    >
      <div className="project-card-3d-wrapper">
        {/* Realistic dimensional browser mockup header */}
        <div className="browser-mockup-bar">
          <div className="browser-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="browser-url-bar">
            <span>github.com/Varshamahesh31/{project.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 24)}</span>
          </div>
          <div className="project-corner-number">0{project.id}</div>
        </div>

        <div className="project-card-body">
          <div className="project-card-top">
            {project.achievement && (
              <div className="project-achievement-badge">
                <span className="badge-trophy" aria-hidden="true">🏆</span>
                <span>{project.achievement}</span>
              </div>
            )}
          </div>

          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>

          <div className="project-footer">
            <div className="project-tags">
              {project.tech.map((tag, tagIdx) => (
                <span key={tagIdx} className="project-tech-tag">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github-3d"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <span>Explore Code</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2>Selected <em>Work</em></h2>
          <div className="gold-line centered"></div>
          <p className="projects-subtitle">
            A dimensional collection of software and AI projects built with performance, security, and precision.
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
