import React from 'react';

const Timeline = () => {
  const timelineData = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Innovations Inc.',
      description: 'Building scalable web applications using React, Node.js, and MongoDB. Leading frontend development and implementing best practices.',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      title: 'Data Science Intern',
      company: 'Corizo',
      description: 'Worked on machine learning models for data analysis. Developed predictive analytics solutions for business intelligence.',
      skills: ['Python', 'Machine Learning', 'SQL', 'Tableau']
    },
    {
      title: 'Bachelor of Engineering',
      company: 'Computer Science',
      description: 'Graduated with honors. Specialized in Software Engineering and Data Science. Active member of coding clubs and tech societies.',
      skills: ['Algorithms', 'Data Structures', 'Database Systems']
    },
    {
      title: 'Web Development Bootcamp',
      company: 'Online Learning',
      description: 'Completed intensive training in full-stack web development. Built multiple projects including e-commerce platforms.',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js']
    }
  ];

  return (
    <section id="timeline" className="timeline">
      <div className="container">
        <h2>My Journey</h2>
        <div className="timeline-container">
          {timelineData.map((item, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <h4>{item.company}</h4>
                <p>{item.description}</p>
                <div className="timeline-skills">
                  {item.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
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

