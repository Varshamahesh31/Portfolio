import React, { useRef, useState, useCallback } from 'react';

/**
 * TiltCard: High-performance 3D perspective tilt component with dynamic specular glare
 * and multi-plane depth layering.
 */
const TiltCard = ({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
  glare = true,
  maxGlare = 0.25,
  as: Component = 'div',
  ...rest
}) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const xPercent = (x / rect.width) * 2 - 1;
        const yPercent = (y / rect.height) * 2 - 1;

        const rotateX = -yPercent * maxTilt;
        const rotateY = xPercent * maxTilt;

        setStyle({
          transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
          transition: isHovered ? 'transform 0.1s ease-out' : `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
        });

        if (glare) {
          const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI) - 90;
          setGlareStyle({
            opacity: maxGlare,
            background: `linear-gradient(${angle}deg, rgba(255, 235, 180, ${maxGlare}) 0%, rgba(212, 175, 55, 0.05) 60%, rgba(255, 255, 255, 0) 100%)`
          });
        }
      });
    },
    [maxTilt, perspective, scale, speed, glare, maxGlare, isHovered]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
    });
    setGlareStyle({
      opacity: 0,
      transition: `opacity ${speed}ms ease`
    });
  };

  return (
    <Component
      ref={cardRef}
      className={`tilt-card-3d ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <div className="tilt-card-inner">
        {children}
        {glare && (
          <div
            className="tilt-glare"
            style={glareStyle}
            aria-hidden="true"
          />
        )}
      </div>
    </Component>
  );
};

export default TiltCard;
