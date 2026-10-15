import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Info, Eye } from 'lucide-react';
import type { Language } from '../types';

interface MiniatureLabViewerProps {
  lang: Language;
}

export const MiniatureLabViewer: React.FC<MiniatureLabViewerProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState(false);
  const explodedRef = useRef(false);
  explodedRef.current = exploded;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121216);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(4.5, 3.2, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lighting (theatrical warm tungsten + cool side rim)
    const ambientLight = new THREE.AmbientLight(0xfff3db, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xffd59e, 35);
    keyLight.position.set(3, 5, 4);
    keyLight.angle = Math.PI / 4;
    keyLight.penumbra = 0.5;
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x4cc9f0, 1.2);
    cyanRimLight.position.set(-4, 2, -3);
    scene.add(cyanRimLight);

    // Group for the entire 1:12 Miniature Lab Set
    const labGroup = new THREE.Group();
    scene.add(labGroup);

    // Data structures for exploded animation
    interface ExplodableMesh {
      mesh: THREE.Object3D;
      normalPos: THREE.Vector3;
      explodedPos: THREE.Vector3;
      nameEn: string;
      nameBn: string;
    }
    const parts: ExplodableMesh[] = [];

    // --- 1. Stage Rostrum / Wooden Plank Floor ---
    const floorGeo = new THREE.BoxGeometry(4.2, 0.18, 3.2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x3d271d,
      roughness: 0.85,
      metalness: 0.1,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -0.09, 0);
    floorMesh.receiveShadow = true;
    labGroup.add(floorMesh);
    parts.push({
      mesh: floorMesh,
      normalPos: new THREE.Vector3(0, -0.09, 0),
      explodedPos: new THREE.Vector3(0, -0.9, 0),
      nameEn: '1:12 Timber Stage Floor & Rostrum',
      nameBn: '১:১২ কাঠের মঞ্চ তক্তা ও রোস্ট্রাম',
    });

    // --- 2. Rear Distressed Brick Wall ---
    const backWallGeo = new THREE.BoxGeometry(4.2, 2.6, 0.15);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x422a27,
      roughness: 0.9,
    });
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 1.3, -1.6);
    backWall.receiveShadow = true;
    labGroup.add(backWall);
    parts.push({
      mesh: backWall,
      normalPos: new THREE.Vector3(0, 1.3, -1.6),
      explodedPos: new THREE.Vector3(0, 1.3, -2.8),
      nameEn: 'Rear Distressed Masonry Wall',
      nameBn: 'পেছনের পোড়া ইটের দেয়াল ও নাট্যপট',
    });

    // --- 3. Left Studio Wall with Archway ---
    const leftWallGeo = new THREE.BoxGeometry(0.15, 2.6, 3.2);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.set(-2.1, 1.3, 0);
    leftWall.receiveShadow = true;
    labGroup.add(leftWall);
    parts.push({
      mesh: leftWall,
      normalPos: new THREE.Vector3(-2.1, 1.3, 0),
      explodedPos: new THREE.Vector3(-3.4, 1.3, 0),
      nameEn: 'Stage Left Wing Flat & Archway',
      nameBn: 'মঞ্চের বাম দিকের উইং ফ্ল্যাট ও প্রবেশদ্বার',
    });

    // --- 4. Laboratory Workstation Bench ---
    const tableGroup = new THREE.Group();
    const tableTopGeo = new THREE.BoxGeometry(2.4, 0.12, 1.2);
    const tableTopMat = new THREE.MeshStandardMaterial({ color: 0x2e1e18, roughness: 0.7 });
    const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
    tableTop.position.set(0, 0.8, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // 4 Turned Legs
    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1f1410, roughness: 0.8 });
    const legOffsets = [
      [-1.05, 0.4, -0.45],
      [1.05, 0.4, -0.45],
      [-1.05, 0.4, 0.45],
      [1.05, 0.4, 0.45]
    ];
    legOffsets.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      tableGroup.add(leg);
    });
    labGroup.add(tableGroup);
    parts.push({
      mesh: tableGroup,
      normalPos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 0.3, 1.0),
      nameEn: 'Weathered Oak Chemistry Workbench',
      nameBn: 'প্রাচীন ওক কাঠের রসায়ন ওয়ার্কবেঞ্চ',
    });

    // --- 5. Antique Fume Extraction Hood & Flue Pipe ---
    const fumeGroup = new THREE.Group();
    const hoodGeo = new THREE.ConeGeometry(0.7, 0.9, 4);
    const hoodMat = new THREE.MeshStandardMaterial({
      color: 0x8a5433,
      metalness: 0.7,
      roughness: 0.35,
    });
    const hoodMesh = new THREE.Mesh(hoodGeo, hoodMat);
    hoodMesh.position.set(-0.8, 2.0, -0.8);
    hoodMesh.rotation.y = Math.PI / 4;
    fumeGroup.add(hoodMesh);

    // Copper pipe extending to ceiling
    const pipeGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.0, 16);
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0xb87333, metalness: 0.8, roughness: 0.3 });
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    pipe.position.set(-0.8, 2.6, -0.8);
    fumeGroup.add(pipe);
    labGroup.add(fumeGroup);
    parts.push({
      mesh: fumeGroup,
      normalPos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(-0.6, 1.2, -0.6),
      nameEn: 'Copper Fume Extraction Hood & Flue',
      nameBn: 'তামার ফিউম হুড ও এক্সহস্ট পাইপ',
    });

    // --- 6. Chemical Retort Flasks & Glassware Apparatus ---
    const glassGroup = new THREE.Group();
    // Glass retort flask
    const flaskGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xa8e6cf,
      transmission: 0.88,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
    });
    const flask = new THREE.Mesh(flaskGeo, glassMat);
    flask.position.set(-0.5, 1.05, 0.1);
    flask.castShadow = true;
    glassGroup.add(flask);

    // Stand rod
    const standGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8);
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.3 });
    const stand = new THREE.Mesh(standGeo, ironMat);
    stand.position.set(-0.5, 1.1, 0.1);
    glassGroup.add(stand);

    // Test tube wooden rack
    const rackGeo = new THREE.BoxGeometry(0.55, 0.15, 0.12);
    const rackMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.8 });
    const rack = new THREE.Mesh(rackGeo, rackMat);
    rack.position.set(0.4, 0.93, 0.2);
    glassGroup.add(rack);

    // 4 Glass Test Tubes
    const tubeColors = [0x4cc9f0, 0xb3122d, 0xf5d37c, 0x52b788];
    for (let i = 0; i < 4; i++) {
      const tubeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.22, 12);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: tubeColors[i],
        roughness: 0.2,
        metalness: 0.1,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      tube.position.set(0.25 + i * 0.1, 1.04, 0.2);
      glassGroup.add(tube);
    }
    labGroup.add(glassGroup);
    parts.push({
      mesh: glassGroup,
      normalPos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 0.8, 0.4),
      nameEn: 'Distillation Retort & Reagent Glassware',
      nameBn: 'পাতন রিটর্ট ফ্লাস্ক ও টেস্ট টিউব র‍্যাক',
    });

    // --- 7. Reaction Equation Chalkboard ---
    const boardGroup = new THREE.Group();
    const boardFrameGeo = new THREE.BoxGeometry(1.5, 1.0, 0.06);
    const boardFrameMat = new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.8 });
    const boardFrame = new THREE.Mesh(boardFrameGeo, boardFrameMat);

    const slateGeo = new THREE.PlaneGeometry(1.38, 0.88);
    const slateMat = new THREE.MeshStandardMaterial({ color: 0x1f2b24, roughness: 0.95 });
    const slate = new THREE.Mesh(slateGeo, slateMat);
    slate.position.set(0, 0, 0.035);

    boardGroup.add(boardFrame);
    boardGroup.add(slate);
    boardGroup.position.set(0.8, 1.6, -1.5);
    labGroup.add(boardGroup);
    parts.push({
      mesh: boardGroup,
      normalPos: new THREE.Vector3(0.8, 1.6, -1.5),
      explodedPos: new THREE.Vector3(1.2, 1.8, -2.3),
      nameEn: 'Formula Chalkboard & Stage Notation',
      nameBn: 'রাসায়নিক ফর্মুলা চকবোর্ড ও মহড়া নোট',
    });

    // Center pivot point
    const target = new THREE.Vector3(0, 1.0, 0);

    // Orbit & Drag state
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let spherical = {
      radius: 6.8,
      theta: Math.PI / 4,
      phi: Math.PI / 3.2,
    };

    const updateCameraFromSpherical = () => {
      camera.position.x = target.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = target.y + spherical.radius * Math.cos(spherical.phi);
      camera.position.z = target.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(target);
    };
    updateCameraFromSpherical();

    // Mouse & Touch listeners for OrbitControls
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      spherical.theta -= deltaX * 0.008;
      spherical.phi = Math.max(0.1, Math.min(Math.PI / 2.05, spherical.phi - deltaY * 0.008));

      updateCameraFromSpherical();
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      spherical.radius = Math.max(3.2, Math.min(11, spherical.radius + e.deltaY * 0.006));
      updateCameraFromSpherical();
    };

    // Touch support for mobile pinch/rotate
    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        isDragging = false;
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        spherical.theta -= deltaX * 0.008;
        spherical.phi = Math.max(0.1, Math.min(Math.PI / 2.05, spherical.phi - deltaY * 0.008));
        updateCameraFromSpherical();
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = touchStartDist - dist;
        spherical.radius = Math.max(3.2, Math.min(11, spherical.radius + delta * 0.02));
        touchStartDist = dist;
        updateCameraFromSpherical();
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    domElement.addEventListener('touchmove', onTouchMove, { passive: true });
    domElement.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Slow gentle auto-rotation when not interacting
      if (!isDragging) {
        spherical.theta += delta * 0.04;
        updateCameraFromSpherical();
      }

      // Smoothly lerp parts between normal and exploded positions
      const isExp = explodedRef.current;
      parts.forEach((p) => {
        const targetPos = isExp ? p.explodedPos : p.normalPos;
        p.mesh.position.lerp(targetPos, 0.08);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);
      domElement.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[540px] rounded-2xl overflow-hidden border border-[#C9A24B]/30 bg-[#0E0E12] shadow-2xl touch-pan-y">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Theatrical HUD Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#C9A24B]/40 rounded-full text-xs font-mono-code text-[#C9A24B]">
          <span className="w-2 h-2 rounded-full bg-[#E63550] animate-ping" />
          <span>{lang === 'en' ? '1:12 Architectural Stage Set' : '১:১২ স্কেল স্থাপত্য মঞ্চ মডেল'}</span>
        </div>
        <p className="text-white text-xs sm:text-sm font-serif-drama tracking-wide">
          {lang === 'en' ? 'Vintage Chemistry Laboratory' : 'ভিন্টেজ রসায়ন গবেষণাগার'}
        </p>
      </div>

      {/* Control Buttons (Exploded View, Zoom, Reset) */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pointer-events-auto">
        {/* Exploded View Toggle (PRD Requirement A7 & Acceptance Criteria 3) */}
        <button
          onClick={() => setExploded(!exploded)}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 shadow-lg cursor-pointer ${
            exploded
              ? 'bg-[#B3122D] text-white border border-[#E63550] shadow-[#B3122D]/40'
              : 'bg-black/85 text-[#F4EFE6] border border-[#C9A24B]/50 hover:bg-[#C9A24B] hover:text-black'
          }`}
        >
          <Layers className={`w-4 h-4 ${exploded ? 'animate-bounce' : ''}`} />
          <span>{exploded ? (lang === 'en' ? 'Assemble Model' : 'মডেল জোড়া লাগান') : (lang === 'en' ? 'Exploded View (Set Components)' : 'এক্সপ্লোডেড ভিউ (অংশগুলো আলাদা করুন)')}</span>
        </button>

        {/* Orbit & Zoom Hint */}
        <div className="flex items-center justify-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] sm:text-[11px] text-[#F4EFE6]/70 font-mono-code">
          <Eye className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>{lang === 'en' ? 'Drag to Orbit · Scroll to Zoom' : 'ঘোরাতে ড্র্যাগ করুন · জুম করতে স্ক্রোল করুন'}</span>
        </div>
      </div>

      {/* Exploded View Labels Overlay when exploded */}
      {exploded && (
        <div className="absolute top-16 right-3 sm:right-4 z-10 flex flex-col gap-1.5 max-w-[240px] sm:max-w-xs p-2.5 sm:p-3 bg-black/85 backdrop-blur-md border border-[#C9A24B]/30 rounded-xl text-xs text-[#F4EFE6] animate-fadeIn">
          <div className="flex items-center gap-1.5 font-semibold text-[#C9A24B] text-[11px] sm:text-xs">
            <Info className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Exploded Components' : 'দৃশ্যপট উপাদানসমূহ'}</span>
          </div>
          <ul className="space-y-1 text-[10px] sm:text-[11px] text-[#F4EFE6]/80 list-disc list-inside">
            <li>{lang === 'en' ? 'Copper extraction fume hood' : 'তামার ফিউম হুড ও পাইপ'}</li>
            <li>{lang === 'en' ? 'Distillation retort glassware' : 'পাতন ফ্লাস্ক ও বিকার'}</li>
            <li>{lang === 'en' ? 'Turned-leg oak lab workbench' : 'ওক কাঠের রসায়ন টেবিল'}</li>
            <li>{lang === 'en' ? 'Formula blackboard' : 'চকবোর্ড ও নাট্য নোট'}</li>
            <li>{lang === 'en' ? 'Timber rostrum & brick flats' : 'রোস্ট্রাম ও পোড়া ইটের দেয়াল'}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
