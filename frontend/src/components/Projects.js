import React, { useState } from 'react';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const projectsData = [
    {
      id: 1,
      title: "Word Document Clone",
      description: "Word Document Clone — A MEAN stack app for real-time document creation with rich text formatting, autosave, and multi-user collaboration.",
      tech: "React, Node.js, MongoDB, Express",
      github: "https://github.com/Varshamahesh31/EtherxWord"
    },
    {
      id: 2,
      title: "Smart Loan System with ML integration", 
      description: "Automates loan eligibility and approval using predictive models, with secure workflows and dashboards; built with React, Node.js/FastAPI, and MongoDB.",
      tech: "React, Socket.io, Express, JWT, Python, mongoDB",
      github: "https://github.com/Varshamahesh31/loan_approval"
    },
    {
      id: 3,
      title: "E-Commerce Price Prediction using Web development and ML",
      description: "E-Commerce Price Prediction using Web Development & ML — Web app that predicts product prices from real-time data with interactive dashboards and APIs; built with React, Node.js/FastAPI, MongoDB, and Python (scikit-learn).", 
      tech: "Next.js, PostgreSQL, Prisma, AWS",
      github: "https://github.com/Varshamahesh31/Amazon_hackathon"
    }
  ];

  const certificates = [
    { name: "Amazon ML Challenge", issuer: "Amazon", year: "2025" },
    { name: "IBM Z Datathon Participation", issuer: "IBM", year: "2025" },
    { name: "Full Stack Web Development", issuer: "freeCodeCamp", year: "2024" }
  ];

  const techStack = {
    frontend: ["HTML", "CSS","Tailwind CSS","Javascript" ,"React"],
    backend: ["mongodb","Express", "Node.js"],
    database: ["MongoDB", "PostgreSQL"],
    cloud: ["AWS"]
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Work</h2>
        <div className="project-tabs">
          <button 
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
            onClick={() => setActiveTab('certificates')}
          >
            Certificates
          </button>
          <button 
            className={`tab-btn ${activeTab === 'techstack' ? 'active' : ''}`}
            onClick={() => setActiveTab('techstack')}
          >
            Tech Stack
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="projects-grid">
            {projectsData.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-content">
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p className="tech-used">{project.tech}</p>
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="certificates-grid">
            {certificates.map((cert, index) => (
              <div key={index} className="certificate-card">
                <h3>{cert.name}</h3>
                <p>{cert.issuer}</p>
                <span className="cert-year">{cert.year}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'techstack' && (
          <div className="techstack-grid">
            {Object.entries(techStack).map(([category, technologies]) => (
              <div key={category} className="tech-category">
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div className="tech-items">
                  {technologies.map((tech, index) => (
                    <span key={index} className="tech-item">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;