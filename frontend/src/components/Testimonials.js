import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Project Manager',
      company: 'TechCorp',
      image: '/varsha.jpeg',
      quote: 'Varsha is an exceptional developer who consistently delivers high-quality work. Her attention to detail and problem-solving skills are outstanding.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Senior Developer',
      company: 'InnovateTech',
      image: '/varsha.jpeg',
      quote: 'Working with Varsha was a pleasure. She quickly grasped complex requirements and implemented elegant solutions. Great team player!'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'CTO',
      company: 'StartupXYZ',
      image: '/varsha.jpeg',
      quote: 'Varsha demonstrated excellent technical skills and professionalism. She would be a valuable asset to any development team.'
    }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2>What People Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p>{testimonial.quote}</p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                  <span>{testimonial.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

