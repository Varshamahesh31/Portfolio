import React from 'react';

const Skills = () => {
  const skillsData = [
    {
      category: "Frontend",
      skills: ["React", "JavaScript", "HTML","CSS", "Tailwind CSS"]
    },
    {
      category: "Backend", 
      skills: ["Node.js", "Express", "MongoDB", "Cloud hosting"]
    },
    {
      category: "Data Analytics",
      skills: ["Python", "SQL", "Excel", "PowerBi", "Tableau"]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>Skills</h2>
        <div className="skills-grid">
          {skillsData.map((skillGroup, index) => (
            <div key={index} className="skill-card">
              <h3>{skillGroup.category}</h3>
              <ul>
                {skillGroup.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;