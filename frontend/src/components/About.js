import React from 'react';

const About = () => {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/VarshaCV.pdf';
    link.download = 'Varsha_Mahesh_Resume.pdf';
    link.click();
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>I'm a passionate Full Stack Developer with expertise in creating scalable web applications. I specialize in both frontend and backend technologies, delivering end-to-end solutions.</p>
            <p>With experience in modern frameworks like React, Node.js, and cloud technologies, I build robust, user-centric applications that solve real-world problems.</p>
            <button onClick={downloadResume} className="resume-btn">Download Resume</button>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <img src='/varsha.jpeg' alt='Varsha Mahesh' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;