import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Hero3DCanvas: Production Three.js 3D WebGL scene featuring:
 * - A central rotating metallic gold abstract sculpture (TorusKnot with customized golden metallic material)
 * - Orbiting floating transparent glass spheres with golden reflections
 * - Multi-depth particle field (foreground, midground, background)
 * - Studio lighting setup with ambient, directional gold key, warm rim, and mouse-responsive point light
 * - Mouse-driven camera parallax with smooth damping
 * - Performance-optimized rendering loop with IntersectionObserver
 */
const Hero3DCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 480;
    let height = container.clientHeight || 500;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x35241d, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe6c879, 3.2);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc69b32, 2.5);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    const warmFill = new THREE.PointLight(0xffddaa, 2.0, 15);
    warmFill.position.set(0, 4, 3);
    scene.add(warmFill);

    const mouseLight = new THREE.PointLight(0xfff2cc, 2.5, 10);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // 1. CENTRAL GOLD SCULPTURE
    // Procedural Torus Knot - luxury digital sculpture
    const knotGeometry = new THREE.TorusKnotGeometry(1.6, 0.42, 128, 32, 2, 3);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C69B32'),
      metalness: 0.92,
      roughness: 0.18,
      wireframe: false
    });
    const sculpture = new THREE.Mesh(knotGeometry, goldMaterial);
    scene.add(sculpture);

    // Inner subtle glow core
    const innerGeo = new THREE.IcosahedronGeometry(0.9, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E6C879'),
      emissive: new THREE.Color('#664d14'),
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.3,
      wireframe: true
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerCore);

    // 2. ORBITING GLASS / GOLD SATELLITES
    const satellitesGroup = new THREE.Group();
    const satelliteCount = 5;
    const satellites = [];
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F5EFE5'),
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      transparent: true,
      opacity: 0.9
    });
    const goldSatMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E6C879'),
      metalness: 0.95,
      roughness: 0.15
    });

    for (let i = 0; i < satelliteCount; i++) {
      const radius = 0.22 + Math.random() * 0.18;
      const sphereGeo = new THREE.SphereGeometry(radius, 32, 32);
      const isGold = i % 2 === 0;
      const sat = new THREE.Mesh(sphereGeo, isGold ? goldSatMaterial : glassMaterial);
      
      const orbitRadius = 2.6 + (i * 0.45);
      const orbitSpeed = 0.4 + (i * 0.15);
      const orbitAngle = (i / satelliteCount) * Math.PI * 2;
      const yOffset = (i - 2) * 0.45;

      satellites.push({
        mesh: sat,
        orbitRadius,
        orbitSpeed,
        orbitAngle,
        yOffset
      });
      satellitesGroup.add(sat);
    }
    scene.add(satellitesGroup);

    // 3. MULTI-LAYER PARTICLE FIELD
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      scales[i] = Math.random() * 0.04 + 0.02;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#E6C879'),
      size: 0.065,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // MOUSE TRACKING & PARALLAX
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.8;
      targetMouseY = y * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 480;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // INTERSECTION OBSERVER (pause when out of view)
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

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (spring damping)
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Update camera position slightly for parallax
      camera.position.x = currentMouseX * 1.2;
      camera.position.y = currentMouseY * 0.9;
      camera.lookAt(0, 0, 0);

      // Move point light to mouse
      mouseLight.position.x = currentMouseX * 3.5;
      mouseLight.position.y = currentMouseY * 3.5;

      // Rotate primary sculpture
      sculpture.rotation.x = elapsedTime * 0.22 + currentMouseY * 0.3;
      sculpture.rotation.y = elapsedTime * 0.35 + currentMouseX * 0.4;

      innerCore.rotation.x = -elapsedTime * 0.15;
      innerCore.rotation.y = -elapsedTime * 0.25;

      // Orbit satellites
      satellites.forEach((sat, idx) => {
        const angle = sat.orbitAngle + elapsedTime * sat.orbitSpeed * 0.6;
        sat.mesh.position.x = Math.cos(angle) * sat.orbitRadius;
        sat.mesh.position.z = Math.sin(angle) * sat.orbitRadius;
        sat.mesh.position.y = sat.yOffset + Math.sin(elapsedTime * 1.5 + idx) * 0.25;
      });

      // Slowly rotate particle field
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = elapsedTime * 0.015;

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

      // Dispose geometries and materials
      knotGeometry.dispose();
      goldMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      glassMaterial.dispose();
      goldSatMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-3d-canvas-container"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '420px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto'
      }}
      aria-label="Interactive 3D Golden Sculpture"
    />
  );
};

export default Hero3DCanvas;
