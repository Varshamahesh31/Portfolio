import React from 'react';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "IBM Z Datathon 2025 ",
      description: "A Global Datathon Event",
      image: "/IBM.jpg"
    },
    {
      id: 2,
      title: "Amazon ML Challenge 2025",
      description: "Secured 1119th rank out of 82,000+ teams",
      image: "/Amazon.jpg"
    },
    {
      id: 3,
      title: "Data Science Internship",
      description: "Completion of data science internship",
      image: "/Corizo.jpg"
    }
  ];

  return (
    <section id="achievements" className="achievements">
      <div className="container">
        <h2>Achievements</h2>
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-image-container">
                <img src={achievement.image} alt={achievement.title} className="achievement-img" />
              </div>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;