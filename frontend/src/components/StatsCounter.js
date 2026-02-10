import React, { useState, useEffect } from 'react';

const StatsCounter = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    experience: 0,
    clients: 0,
    awards: 0
  });

  const targets = {
    projects: 15,
    experience: 3,
    clients: 10,
    awards: 5
  };

  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const steps = 60; // Number of animation steps
    const increment = duration / steps;

    const animateValue = (key, start, end) => {
      let current = start;
      const stepValue = (end - start) / steps;

      const timer = setInterval(() => {
        current += stepValue;
        if ((stepValue > 0 && current >= end) || (stepValue < 0 && current <= end)) {
          setCounts(prev => ({ ...prev, [key]: end }));
          clearInterval(timer);
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, increment);
    };

    // Start animation when component mounts
    const timeout = setTimeout(() => {
      Object.keys(targets).forEach(key => {
        animateValue(key, 0, targets[key]);
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
      Object.values(counts).forEach((_, key) => {
        // Clear any remaining intervals
      });
    };
  }, []);

  const stats = [
    {
      icon: '🚀',
      number: counts.projects,
      suffix: '+',
      label: 'Projects Completed'
    },
    {
      icon: '💼',
      number: counts.experience,
      suffix: '+',
      label: 'Years Experience'
    },
    {
      icon: '😊',
      number: counts.clients,
      suffix: '+',
      label: 'Happy Clients'
    },
    {
      icon: '🏆',
      number: counts.awards,
      suffix: '',
      label: 'Awards Won'
    }
  ];

  return (
    <section id="stats" className="stats-counter">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">
                {stat.number}{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;

