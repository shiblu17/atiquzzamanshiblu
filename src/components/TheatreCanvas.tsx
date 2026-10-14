import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TheatreCanvasProps {
  currentScene: number; // 0 to 6
  ghostLightOn: boolean;
  houseLights: boolean;
  is3DFallback: boolean;
}

export const TheatreCanvas: React.FC<TheatreCanvasProps> = ({
  currentScene,
  ghostLightOn,
  houseLights,
  is3DFallback,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scenePropsRef = useRef({ currentScene, ghostLightOn, houseLights });
  scenePropsRef.current = { currentScene, ghostLightOn, houseLights };

  useEffect(() => {
    if (is3DFallback) return;
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(0x0e0e10, 0.045);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.8, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 2. Theatrical Stage Floor (Dark varnished timber planks)
    const floorGeo = new THREE.PlaneGeometry(36, 36, 12, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x161311,
      roughness: 0.85,
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    floor.receiveShadow = true;
    scene.add(floor);

    // 3. Proscenium Stage Frame & Curtains (Hero Velvet Curtains)
    const curtainGroup = new THREE.Group();
    scene.add(curtainGroup);

    // Left Velvet Curtain
    const leftCurtainGeo = new THREE.PlaneGeometry(8, 12, 16, 16);
    const curtainMat = new THREE.MeshStandardMaterial({
      color: 0x820c20,
      roughness: 0.9,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    const leftCurtain = new THREE.Mesh(leftCurtainGeo, curtainMat);
    leftCurtain.position.set(-6, 3, 2.5);
    curtainGroup.add(leftCurtain);

    // Right Velvet Curtain
    const rightCurtain = new THREE.Mesh(leftCurtainGeo, curtainMat);
    rightCurtain.position.set(6, 3, 2.5);
    curtainGroup.add(rightCurtain);

    // Proscenium Top Valance / Pelmet
    const pelmetGeo = new THREE.BoxGeometry(16, 2, 0.4);
    const pelmet = new THREE.Mesh(pelmetGeo, curtainMat);
    pelmet.position.set(0, 8, 2.6);
    curtainGroup.add(pelmet);

    // 4. Ghost Light Apparatus (in center of stage)
    const ghostGroup = new THREE.Group();
    ghostGroup.position.set(0, -1.5, 1.0);
    scene.add(ghostGroup);

    const ghostBulbGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const ghostBulbMat = new THREE.MeshBasicMaterial({ color: 0xffe599 });
    const ghostBulb = new THREE.Mesh(ghostBulbGeo, ghostBulbMat);
    ghostBulb.position.y = 2.4;
    ghostGroup.add(ghostBulb);

    const ghostStandGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.4, 8);
    const ghostStandMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8 });
    const ghostStand = new THREE.Mesh(ghostStandGeo, ghostStandMat);
    ghostStand.position.y = 1.2;
    ghostGroup.add(ghostStand);

    const ghostLightSource = new THREE.PointLight(0xffe599, 12, 10);
    ghostLightSource.position.y = 2.4;
    ghostGroup.add(ghostLightSource);

    // 5. Lighting per Act
    // Ambient light (affected by House Lights toggle)
    const ambientLight = new THREE.AmbientLight(0x221a1a, 0.6);
    scene.add(ambientLight);

    // Dynamic Spotlight following cursor / scene
    const spotlight = new THREE.SpotLight(0xfff1d6, 35);
    spotlight.position.set(0, 9, 4.5);
    spotlight.angle = Math.PI / 4.5;
    spotlight.penumbra = 0.6;
    spotlight.castShadow = true;
    scene.add(spotlight);
    scene.add(spotlight.target);

    // Atmospheric Colored Rim/Side Lights for Acts
    const sideLight1 = new THREE.DirectionalLight(0xb3122d, 1.2); // Theatre red
    sideLight1.position.set(-6, 3, -2);
    scene.add(sideLight1);

    const sideLight2 = new THREE.DirectionalLight(0x4cc9f0, 0.8); // Tech cyan
    sideLight2.position.set(6, 3, -2);
    scene.add(sideLight2);

    // 6. 2,500+ Floating Dust Particles (PRD Requirement A5)
    const particleCount = 2000;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = Math.random() * 8 - 1.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;

      particleSpeeds[i * 3] = (Math.random() - 0.5) * 0.005;
      particleSpeeds[i * 3 + 1] = Math.random() * 0.004 + 0.002; // drift upward
      particleSpeeds[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf5d37c,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);

    // Mouse Tracking for spotlight & parallax (PRD Requirement A2 & Hero parallax)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onPointerMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const { currentScene: sceneIdx, ghostLightOn: isGhostOn, houseLights: isHouseOn } = scenePropsRef.current;

      // Lerp mouse target for smooth spotlight inertia (PRD Section 6.1 Physics-feel)
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Spotlight target follows cursor
      spotlight.target.position.set(targetX * 3.5, targetY * 2.2, 0);

      // Camera transitions per scene (Scroll-driven camera path A4)
      const targetCamZ = sceneIdx === 0 ? 9.5 : sceneIdx === 1 ? 8.2 : sceneIdx === 2 ? 6.5 : sceneIdx === 3 ? 7.2 : sceneIdx === 4 ? 6.0 : sceneIdx === 5 ? 7.8 : 8.8;
      const targetCamY = sceneIdx === 0 ? 1.5 : sceneIdx === 2 ? 2.4 : 1.8;
      const targetCamX = sceneIdx === 2 ? -0.4 : sceneIdx === 4 ? 0.4 : 0;

      camera.position.z += (targetCamZ - camera.position.z) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.position.x += (targetCamX - camera.position.x) * 0.04;

      // Curtain opening & closing animation (A1 & Curtain Call)
      const isCurtainOpen = sceneIdx >= 1 && sceneIdx <= 5;
      const targetLeftX = isCurtainOpen ? -9.5 : -4.5;
      const targetRightX = isCurtainOpen ? 9.5 : 4.5;
      leftCurtain.position.x += (targetLeftX - leftCurtain.position.x) * 0.05;
      rightCurtain.position.x += (targetRightX - rightCurtain.position.x) * 0.05;

      // Ghost Light presence & flicker
      ghostLightSource.intensity = isGhostOn ? (10 + Math.sin(elapsed * 15) * 1.5) : 0;
      ghostBulb.visible = isGhostOn;

      // House Lights Toggle (F12)
      ambientLight.intensity = isHouseOn ? 2.8 : 0.6;
      fog.density = isHouseOn ? 0.015 : 0.045;

      // Act Lighting Shifts (Section 7.3)
      if (sceneIdx === 2) {
        // Act I: Warm amber
        spotlight.color.setHex(0xffaa44);
        sideLight1.color.setHex(0xb3122d);
      } else if (sceneIdx === 3) {
        // Act II: Tungsten newsroom warmth
        spotlight.color.setHex(0xffc27a);
        sideLight1.color.setHex(0xe69500);
      } else if (sceneIdx === 4) {
        // Act III: Cool cyan UI glow
        spotlight.color.setHex(0x4cc9f0);
        sideLight2.color.setHex(0x0077b6);
      } else if (sceneIdx === 5) {
        // Epilogue: Soft white-gold dawn
        spotlight.color.setHex(0xfff7e6);
        sideLight1.color.setHex(0xc9a24b);
      } else {
        spotlight.color.setHex(0xfff1d6);
      }

      // Animate floating dust particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i * 3 + 1];
        positions[i * 3] += Math.sin(elapsed + i) * 0.001;

        // Reset particle when it floats above ceiling
        if (positions[i * 3 + 1] > 7) {
          positions[i * 3 + 1] = -1.5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [is3DFallback]);

  if (is3DFallback) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#0E0E10] via-[#161314] to-[#0A0A0C]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 overflow-hidden"
      aria-hidden="true"
    />
  );
};
