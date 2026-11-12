import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Contact3DScene: An ambient floating golden kinetic ribbon/icosahedron sculpture
 * with warm volumetric studio illumination.
 */
const Contact3DScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // LIGHTS
    const ambient = new THREE.AmbientLight(0xfff5e6, 1.5);
    scene.add(ambient);

    const goldKey = new THREE.DirectionalLight(0xe6c879, 3.0);
    goldKey.position.set(4, 5, 3);
    scene.add(goldKey);

    const rim = new THREE.PointLight(0xc69b32, 2.5, 12);
    rim.position.set(-3, -3, -1);
    scene.add(rim);

    // KINETIC DOUBLE RING / TORUS SCULPTURE
    const ring1Geo = new THREE.TorusGeometry(1.4, 0.08, 16, 100);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc69b32,
      metalness: 0.95,
      roughness: 0.15
    });
    const ring1 = new THREE.Mesh(ring1Geo, goldMat);
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.1, 0.06, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xe6c879,
      metalness: 0.9,
      roughness: 0.2
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    scene.add(ring2);

    // INNER FLOATING GLASS GEM
    const gemGeo = new THREE.OctahedronGeometry(0.55, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0xffeedd,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.8,
      thickness: 1.0,
      transparent: true,
      opacity: 0.95
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    scene.add(gem);

    // PARTICLES
    const pCount = 60;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 6;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xe6c879,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    scene.add(pSystem);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      const t = clock.getElapsedTime();

      ring1.rotation.x = t * 0.35;
      ring1.rotation.y = t * 0.25;

      ring2.rotation.x = -t * 0.3;
      ring2.rotation.z = t * 0.4;

      gem.rotation.y = t * 0.5;
      gem.rotation.x = t * 0.25;
      gem.position.y = Math.sin(t * 1.5) * 0.12;

      pSystem.rotation.y = t * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 360;
      height = container.clientHeight || 340;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      ring1Geo.dispose();
      ring2Geo.dispose();
      gemGeo.dispose();
      goldMat.dispose();
      ring2Mat.dispose();
      gemMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '320px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label="Floating Golden Kinetic 3D Sculpture"
    />
  );
};

export default Contact3DScene;

