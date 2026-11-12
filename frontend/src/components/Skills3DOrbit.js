import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const techList = [
  { name: 'Python', category: 'Backend/AI', color: '#E6C879' },
  { name: 'FastAPI', category: 'Backend', color: '#009688' },
  { name: 'React.js', category: 'Frontend', color: '#61DAFB' },
  { name: 'Node.js', category: 'Backend', color: '#68A063' },
  { name: 'SQL', category: 'Databases', color: '#C69B32' },
  { name: 'MongoDB', category: 'Databases', color: '#4DB33D' },
  { name: 'ML', category: 'AI', color: '#E6C879' },
  { name: 'JavaScript', category: 'Frontend', color: '#F7DF1E' }
];

const Skills3DOrbit = ({ onSelectTech, selectedTech }) => {
  const mountRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // LIGHTS
    const ambient = new THREE.AmbientLight(0xfff5e6, 1.4);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0xe6c879, 3.5, 20);
    keyLight.position.set(2, 4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xc69b32, 2.0, 15);
    rimLight.position.set(-3, -3, -2);
    scene.add(rimLight);

    // CENTRAL GLOWING CORE (Icosahedron gold lattice)
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xc69b32,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const innerSphereGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const innerSphereMat = new THREE.MeshStandardMaterial({
      color: 0xe6c879,
      emissive: 0x5a3f0d,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.1
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    scene.add(innerSphere);

    // ORBITING NODES & GOLD CONNECTORS
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const orbitRadius = 2.4;
    const nodes = [];

    techList.forEach((tech, idx) => {
      const angle = (idx / techList.length) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadius;
      const y = Math.sin(angle) * orbitRadius * 0.45;
      const z = Math.sin(angle) * orbitRadius * 0.9;

      const nodeGeo = new THREE.SphereGeometry(0.22, 24, 24);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(tech.color || '#C69B32'),
        metalness: 0.85,
        roughness: 0.25
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      nodeMesh.userData = { techName: tech.name, index: idx };
      orbitGroup.add(nodeMesh);

      // Gold connecting line to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xc69b32,
        transparent: true,
        opacity: 0.35
      });
      const line = new THREE.Line(lineGeo, lineMat);
      orbitGroup.add(line);

      nodes.push({ mesh: nodeMesh, angle, line });
    });

    // RAYCASTING FOR INTERACTIVITY
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));
      if (intersects.length > 0) {
        const clickedName = intersects[0].object.userData.techName;
        if (onSelectTech) onSelectTech(clickedName);
      }
    };

    container.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 380;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // ANIMATE
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      core.rotation.x = elapsed * 0.3;
      core.rotation.y = elapsed * 0.45;
      innerSphere.rotation.y = -elapsed * 0.2;

      // Slow orbit rotation
      orbitGroup.rotation.y = elapsed * 0.25;

      // Interactive hover check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        hit.scale.set(1.4, 1.4, 1.4);
        setHoveredTech(hit.userData.techName);
        container.style.cursor = 'pointer';
      } else {
        nodes.forEach(n => n.mesh.scale.set(1, 1, 1));
        setHoveredTech(null);
        container.style.cursor = 'default';
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      renderer.dispose();
    };
  }, [onSelectTech]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '380px' }}>
      <div
        ref={mountRef}
        style={{ width: '100%', height: '100%' }}
        aria-label="Interactive 3D Technology Orbit"
      />
      {hoveredTech && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(36,24,19,0.92)',
            border: '1px solid #C69B32',
            padding: '6px 16px',
            borderRadius: '20px',
            color: '#E6C879',
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '1px',
            pointerEvents: 'none',
            backdropFilter: 'blur(10px)'
          }}
        >
          {hoveredTech} (Click to filter)
        </div>
      )}
    </div>
  );
};

export default Skills3DOrbit;

