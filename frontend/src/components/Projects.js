import React from 'react';
import portfolioData from '../data/portfolioData';
import TiltCard from './TiltCard';

const ProjectCard = ({ project }) => {
  return (
    <TiltCard
      maxTilt={8}
      scale={1.02}
      maxGlare={0.15}
      perspective={1000}
      className="project-card-tilt"
      as="article"
    >
      <div className="project-card">
        <div className="project-card-top">
          <span className="project-number">0{project.id}</span>
          {project.achievement && (
            <div className="project-achievement-badge">🏆 {project.achievement}</div>
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
            className="btn-github"
            aria-label={`GitHub repository for ${project.title}`}
          >
            GitHub →
          </a>
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
          <span className="section-label">My Work</span>
          <h2>Selected <em>Work</em></h2>
          <div className="gold-line centered"></div>
          <p className="projects-subtitle">
            A collection of projects where technology meets problem-solving.
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
