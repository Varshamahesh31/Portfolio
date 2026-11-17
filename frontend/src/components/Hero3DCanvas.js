import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Hero3DCanvas: Three.js background ambient 3D scene that floats BEHIND and AROUND
 * the cutout portrait.
 * Features:
 * - Subtle floating golden metallic geometries (torus knot, octahedrons, rings)
 * - Atmospheric stardust particle field with depth
 * - Mouse parallax camera that gently reacts to user pointer movement
 * - Warm cinematic studio lighting (key gold, rim gold, soft ambient)
 */
const Hero3DCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 560;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x35241d, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe6c879, 3.5);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc69b32, 2.5);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    const mouseLight = new THREE.PointLight(0xfff2cc, 2.0, 12);
    mouseLight.position.set(0, 0, 5);
    scene.add(mouseLight);

    // 1. FLOATING ABSTRACT GOLD SCULPTURAL RING (Background Layer)
    const ringGeo = new THREE.TorusGeometry(2.3, 0.09, 32, 120);
    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C69B32'),
      metalness: 0.94,
      roughness: 0.18
    });
    const ringMesh = new THREE.Mesh(ringGeo, goldMat);
    ringMesh.position.set(0.2, 0.2, -1.8);
    ringMesh.rotation.set(0.5, 0.3, 0);
    scene.add(ringMesh);

    // 2. INNER SLOWLY ROTATING ABSTRACT TORUS KNOT (Subtle depth behind portrait)
    const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.22, 100, 24, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E6C879'),
      metalness: 0.9,
      roughness: 0.25,
      transparent: true,
      opacity: 0.85
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotMesh.position.set(0, 0, -2.5);
    scene.add(knotMesh);

    // 3. SATELLITE FLOATING 3D SHAPES (Small glass & gold elements)
    const floatingShapes = [];
    const shapeCount = 6;

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F5EFE5'),
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.88,
      thickness: 1.0,
      transparent: true,
      opacity: 0.85
    });

    for (let i = 0; i < shapeCount; i++) {
      const isGold = i % 2 === 0;
      let geom;
      if (i % 3 === 0) {
        geom = new THREE.OctahedronGeometry(0.28, 0);
      } else if (i % 3 === 1) {
        geom = new THREE.IcosahedronGeometry(0.24, 0);
      } else {
        geom = new THREE.SphereGeometry(0.22, 24, 24);
      }

      const mesh = new THREE.Mesh(geom, isGold ? goldMat : glassMat);

      const angle = (i / shapeCount) * Math.PI * 2;
      const radius = 2.8 + (i % 2) * 0.6;
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.75 + (i - 3) * 0.3,
        -1.2 + (i % 3) * 0.8
      );

      floatingShapes.push({
        mesh,
        baseX: mesh.position.x,
        baseY: mesh.position.y,
        baseZ: mesh.position.z,
        speed: 0.8 + (i * 0.2),
        rotSpeedX: (Math.random() - 0.5) * 0.8,
        rotSpeedY: (Math.random() - 0.5) * 0.8,
        phase: Math.random() * Math.PI * 2
      });
      scene.add(mesh);
    }

    // 4. MULTI-LAYER GOLDEN STARDUST PARTICLES
    const pCount = 140;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1.5;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({
      color: new THREE.Color('#E6C879'),
      size: 0.055,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particleField = new THREE.Points(pGeo, pMat);
    scene.add(particleField);

    // MOUSE PARALLAX TRACKING
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.7;
      targetY = y * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // INTERSECTION OBSERVER
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    // ANIMATION LOOP
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;

      camera.position.x = curX * 0.9;
      camera.position.y = curY * 0.7;
      camera.lookAt(0, 0, -1);

      mouseLight.position.x = curX * 3.5;
      mouseLight.position.y = curY * 3.5;

      // Rotate background ring & knot
      ringMesh.rotation.z = elapsed * 0.15;
      ringMesh.rotation.x = 0.5 + Math.sin(elapsed * 0.4) * 0.15;

      knotMesh.rotation.x = elapsed * 0.22;
      knotMesh.rotation.y = elapsed * 0.32;

      // Animate floating satellites
      floatingShapes.forEach((s) => {
        s.mesh.position.y = s.baseY + Math.sin(elapsed * s.speed + s.phase) * 0.28;
        s.mesh.position.x = s.baseX + Math.cos(elapsed * (s.speed * 0.7) + s.phase) * 0.15;
        s.mesh.rotation.x += s.rotSpeedX * 0.02;
        s.mesh.rotation.y += s.rotSpeedY * 0.02;
      });

      // Particle rotation
      particleField.rotation.y = elapsed * 0.025;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      ringGeo.dispose();
      goldMat.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      glassMat.dispose();
      floatingShapes.forEach(s => s.mesh.geometry.dispose());
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-3d-bg-canvas"
      aria-hidden="true"
    />
  );
};

export default Hero3DCanvas;
