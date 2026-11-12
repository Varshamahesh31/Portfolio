import React, { useEffect, useRef } from 'react';

const Hero3DCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    // Viewport dimensions
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for 3D tilt
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotY = (x / (width / 2)) * 0.45;
      targetRotX = -(y / (height / 2)) * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Visibility observer to pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // 3D Particles & Nodes
    const particleCount = Math.min(width < 768 ? 40 : 80, 90);
    const particles = [];
    const sphereRadius = Math.min(width, height) * 0.42;

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution for uniform 3D sphere/torus constellation
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const radiusOffset = sphereRadius * (0.75 + Math.random() * 0.5);
      particles.push({
        origX: radiusOffset * Math.sin(phi) * Math.cos(theta),
        origY: radiusOffset * Math.sin(phi) * Math.sin(theta),
        origZ: radiusOffset * Math.cos(phi),
        x: 0,
        y: 0,
        z: 0,
        baseSize: Math.random() * 2.5 + 1.5,
        speed: (Math.random() - 0.5) * 0.002,
        pulseOffset: Math.random() * Math.PI * 2,
        colorType: i % 4 === 0 ? 'gold' : i % 4 === 1 ? 'lightGold' : 'cream'
      });
    }

    const fov = 450;
    let baseAngle = 0;

    const render = (time) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth camera interpolation towards target mouse rotation
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;
      baseAngle += 0.003;

      const cosY = Math.cos(rotY + baseAngle);
      const sinY = Math.sin(rotY + baseAngle);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected = [];

      // Transform 3D coordinates
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D Rotation around Y axis
        let x1 = p.origX * cosY - p.origZ * sinY;
        let z1 = p.origZ * cosY + p.origX * sinY;

        // 3D Rotation around X axis
        let y2 = p.origY * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.origY * sinX;

        // Perspective projection
        const scale = fov / (fov + z2 + 350);
        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y2 * scale;
        const alpha = Math.max(0.12, Math.min(0.85, (z2 + sphereRadius) / (2 * sphereRadius)));

        projected.push({
          x: projX,
          y: projY,
          z: z2,
          scale,
          alpha,
          size: p.baseSize * scale,
          colorType: p.colorType
        });
      }

      // Sort by Z for realistic depth rendering (back to front)
      projected.sort((a, b) => a.z - b.z);

      // Draw 3D connecting lines between nearby points
      const maxDistance = width < 768 ? 95 : 130;
      ctx.lineWidth = 1;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.22 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw 3D glowing particle nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        // Radial glow for front particles
        if (p.alpha > 0.45) {
          const glowGrad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 3.5
          );
          glowGrad.addColorStop(0, `rgba(212, 175, 55, ${p.alpha * 0.5})`);
          glowGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);

        if (p.colorType === 'gold') {
          ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        } else if (p.colorType === 'lightGold') {
          ctx.fillStyle = `rgba(240, 215, 120, ${p.alpha})`;
        } else {
          ctx.fillStyle = `rgba(245, 230, 211, ${p.alpha * 0.8})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-3d-canvas"
      aria-hidden="true"
    />
  );
};

export default Hero3DCanvas;
