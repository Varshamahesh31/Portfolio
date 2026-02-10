import React, { useState, useEffect, useRef } from 'react';

const MouseTrail = () => {
  const [trails, setTrails] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = {
        id: trailIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        opacity: 1
      };

      setTrails(prev => [...prev, newTrail]);

      // Remove old trails
      setTimeout(() => {
        setTrails(prev => prev.filter(trail => trail.id !== newTrail.id));
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="mouse-trail">
      {trails.map(trail => (
        <div
          key={trail.id}
          className="trail-particle"
          style={{
            left: trail.x,
            top: trail.y,
            width: trail.size,
            height: trail.size,
            opacity: trail.opacity
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;

