import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { skillNodesData } from '../content/content';
import type { Language, SkillNode } from '../types';
import { Sparkles, Eye, ListFilter } from 'lucide-react';

interface SkillConstellationProps {
  lang: Language;
}

export const SkillConstellation: React.FC<SkillConstellationProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'theatre' | 'leadership' | 'tech'>('all');
  const [showListView, setShowListView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || showListView) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // Color mapper
    const getCategoryColor = (cat: 'theatre' | 'leadership' | 'tech'): number => {
      switch (cat) {
        case 'theatre': return 0xe63550;
        case 'leadership': return 0xc9a24b;
        case 'tech': return 0x4cc9f0;
      }
    };

    // Meshes for raycasting
    const nodeMeshes: { mesh: THREE.Mesh; data: SkillNode }[] = [];

    skillNodesData.forEach((skill) => {
      const color = getCategoryColor(skill.category);
      const size = 0.14 + (skill.level / 100) * 0.12;

      const sphereGeo = new THREE.SphereGeometry(size, 20, 20);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(...skill.position);
      constellationGroup.add(mesh);

      // Outer glow ring
      const haloGeo = new THREE.RingGeometry(size * 1.3, size * 1.8, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.set(...skill.position);
      constellationGroup.add(halo);

      nodeMeshes.push({ mesh, data: skill });
    });

    // Connecting lines between nodes in same category
    const createLinesForCategory = (cat: 'theatre' | 'leadership' | 'tech') => {
      const items = skillNodesData.filter((s) => s.category === cat);
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const p1 = new THREE.Vector3(...items[i].position);
          const p2 = new THREE.Vector3(...items[j].position);
          if (p1.distanceTo(p2) < 3.2) {
            points.push(p1, p2);
          }
        }
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: getCategoryColor(cat),
        transparent: true,
        opacity: 0.35,
      });
      const lineSegments = new THREE.LineSegments(geo, mat);
      constellationGroup.add(lineSegments);
    };

    createLinesForCategory('theatre');
    createLinesForCategory('leadership');
    createLinesForCategory('tech');

    // Ambient Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(amb);

    // Raycasting for hover & click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));

      if (intersects.length > 0) {
        const found = nodeMeshes.find((n) => n.mesh === intersects[0].object);
        if (found) {
          setSelectedNode(found.data);
          container.style.cursor = 'pointer';
          return;
        }
      }
      container.style.cursor = 'grab';
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousemove', onPointerMove);

    // Drag Orbit
    let isDragging = false;
    let prev = { x: 0, y: 0 };
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prev = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      constellationGroup.rotation.y += dx * 0.007;
      constellationGroup.rotation.x += dy * 0.007;
      prev = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    // Mobile touch interaction & tap selection
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));
        if (intersects.length > 0) {
          const found = nodeMeshes.find((n) => n.mesh === intersects[0].object);
          if (found) setSelectedNode(found.data);
        }
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prev.x;
      const dy = e.touches[0].clientY - prev.y;
      constellationGroup.rotation.y += dx * 0.008;
      constellationGroup.rotation.x += dy * 0.008;
      prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    dom.addEventListener('touchmove', onTouchMove, { passive: true });
    dom.addEventListener('touchend', onTouchEnd);

    // Render loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging) {
        constellationGroup.rotation.y += delta * 0.12;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousemove', onPointerMove);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, [showListView]);

  const filteredSkills = skillNodesData.filter((s) =>
    activeCategory === 'all' ? true : s.category === activeCategory
  );

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#C9A24B]/30 bg-[#0E0E14] shadow-2xl p-4 sm:p-6">
      {/* Header & View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4CC9F0]/10 border border-[#4CC9F0]/30 flex items-center justify-center text-[#4CC9F0]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-drama text-lg sm:text-xl text-white">
              {lang === 'en' ? 'Skill Constellation' : 'দক্ষতা নক্ষত্রমণ্ডল'}
            </h3>
            <p className="text-xs text-[#9E9AA0] font-mono-code">
              {lang === 'en' ? 'Cross-Disciplinary Synergy: Theatre · Leadership · Tech' : 'আন্তঃবিষয়ক মেলবন্ধন: থিয়েটার · নেতৃত্ব · প্রযুক্তি'}
            </p>
          </div>
        </div>

        {/* View Switcher: 3D Constellation vs Accessible List Fallback */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowListView(!showListView)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#C9A24B]/40 bg-black/60 hover:bg-[#C9A24B]/20 text-xs font-mono-code text-[#C9A24B] transition-all cursor-pointer"
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>{showListView ? (lang === 'en' ? 'View 3D Cloud' : 'থ্রিডি ভিউ দেখুন') : (lang === 'en' ? 'Accessible List View' : 'তালিকা ভিউ')}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: 'all', label: { en: 'All Disciplines', bn: 'সকল ক্ষেত্র' } },
          { id: 'theatre', label: { en: '🎭 Theatre (Red)', bn: '🎭 থিয়েটার' } },
          { id: 'leadership', label: { en: '🏛️ Leadership (Gold)', bn: '🏛️ নেতৃত্ব' } },
          { id: 'tech', label: { en: '💻 Technology (Cyan)', bn: '💻 প্রযুক্তি' } },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3 py-1 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#C9A24B] text-black font-semibold shadow-md'
                : 'bg-white/5 text-[#F4EFE6]/70 hover:bg-white/10'
            }`}
          >
            {cat.label[lang]}
          </button>
        ))}
      </div>

      {/* 3D View or Accessible 2D List */}
      {!showListView ? (
        <div className="relative w-full h-[400px] sm:h-[460px] rounded-xl overflow-hidden bg-black/50 border border-white/5">
          <div ref={containerRef} className="w-full h-full cursor-grab" />

          {/* Hover / Selected Skill Inspector Card */}
          {selectedNode ? (
            <div className="absolute top-4 right-4 z-10 max-w-xs p-4 bg-black/85 backdrop-blur-md border border-[#C9A24B]/50 rounded-xl shadow-xl text-left pointer-events-none animate-fadeIn">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs uppercase font-mono-code px-2 py-0.5 rounded bg-white/10 text-[#C9A24B]">
                  {selectedNode.category}
                </span>
                <span className="text-xs font-mono-code text-white font-bold">
                  {selectedNode.level}%
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{selectedNode.name}</h4>
              <p className="text-xs text-[#9E9AA0]">
                <strong className="text-[#F4EFE6]">{lang === 'en' ? 'Applied in: ' : 'প্রয়োগ: '}</strong>
                {selectedNode.usedIn[lang]}
              </p>
            </div>
          ) : (
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 rounded-lg border border-white/10 text-[11px] font-mono-code text-[#F4EFE6]/70">
                <Eye className="w-3.5 h-3.5 text-[#C9A24B]" />
                {lang === 'en' ? 'Hover nodes to inspect skills · Drag to rotate' : 'দক্ষতা দেখতে নোডের উপর মাউস নিন'}
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Accessible List View Fallback (PRD Acceptance Criteria) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[460px] overflow-y-auto pr-2">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-[#C9A24B]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                  <span
                    className="capitalize font-medium"
                    style={{
                      color:
                        skill.category === 'theatre'
                          ? '#E63550'
                          : skill.category === 'leadership'
                          ? '#C9A24B'
                          : '#4CC9F0',
                    }}
                  >
                    ● {skill.category}
                  </span>
                  <span className="text-[#F4EFE6]/80">{skill.level}%</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">{skill.name}</h4>
                <p className="text-xs text-[#9E9AA0]">
                  {lang === 'en' ? 'Applied in: ' : 'প্রয়োগ: '} {skill.usedIn[lang]}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor:
                      skill.category === 'theatre'
                        ? '#E63550'
                        : skill.category === 'leadership'
                        ? '#C9A24B'
                        : '#4CC9F0',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
