import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GraduationCap } from 'lucide-react';
import type { Language } from '../types';

interface GlobeViewerProps {
  lang: Language;
}

export const GlobeViewer: React.FC<GlobeViewerProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Globe group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Base Sphere
    const globeRadius = 1.9;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x14151e,
      roughness: 0.8,
      metalness: 0.2,
      wireframe: false,
    });
    const globe = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globe);

    // Glowing Wireframe Latitude/Longitude Grid
    const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(globeRadius * 1.002, 28, 28));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x2d3248,
      transparent: true,
      opacity: 0.35,
    });
    const wireframe = new THREE.LineSegments(wireGeo, wireMat);
    globeGroup.add(wireframe);

    // Atmosphere Glow Halo
    const haloGeo = new THREE.SphereGeometry(globeRadius * 1.14, 32, 32);
    const haloMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x4cc9f0) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, intensity * 0.45);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(halo);

    // Helper: Lat/Long to 3D Cartesian coordinates
    const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // Key Coordinates:
    // Dhaka, Bangladesh: 23.8103° N, 90.4125° E
    const dhakaPos = latLongToVector3(23.81, 90.41, globeRadius);
    // Dublin, Ireland: 53.3498° N, 6.2603° W
    const dublinPos = latLongToVector3(53.35, -6.26, globeRadius);
    // Galway, Ireland: 53.2707° N, 9.0568° W
    const galwayPos = latLongToVector3(53.27, -9.05, globeRadius);

    // Create City Markers
    const addMarker = (pos: THREE.Vector3, colorHex: number, size: number) => {
      const pinGeo = new THREE.SphereGeometry(size, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(pos);
      globeGroup.add(pin);

      // Pulse ring around pin
      const ringGeo = new THREE.RingGeometry(size * 1.5, size * 2.5, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);
    };

    addMarker(dhakaPos, 0xe63550, 0.055); // Dhaka (Red/Gold)
    addMarker(dublinPos, 0x4cc9f0, 0.05); // Dublin (Cyan)
    addMarker(galwayPos, 0xf5d37c, 0.045); // Galway (Gold)

    // Helper to generate flight parabolic arc
    const createCurvedFlightArc = (p1: THREE.Vector3, p2: THREE.Vector3, arcHeight: number, colorHex: number) => {
      // Calculate middle point elevated above sphere
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const distance = p1.distanceTo(p2);
      mid.normalize().multiplyScalar(globeRadius + distance * arcHeight);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(60);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: colorHex,
        linewidth: 2,
        transparent: true,
        opacity: 0.75,
      });
      const arcLine = new THREE.Line(geometry, material);
      globeGroup.add(arcLine);

      // Flying pulse energy bead
      const beadGeo = new THREE.SphereGeometry(0.038, 12, 12);
      const beadMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const bead = new THREE.Mesh(beadGeo, beadMat);
      globeGroup.add(bead);

      return { curve, bead };
    };

    const arc1 = createCurvedFlightArc(dhakaPos, dublinPos, 0.45, 0x4cc9f0);
    const arc2 = createCurvedFlightArc(dhakaPos, galwayPos, 0.52, 0xc9a24b);

    // Initial globe orientation to highlight Europe-Asia path
    globeGroup.rotation.y = -1.2;
    globeGroup.rotation.x = 0.35;

    // Interaction / Drag handling
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      globeGroup.rotation.y += dx * 0.006;
      globeGroup.rotation.x += dy * 0.006;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow idle orbit
      if (!isDragging) {
        globeGroup.rotation.y += 0.002;
      }

      // Animate flight energy pulses
      const t1 = (elapsed * 0.35) % 1;
      const t2 = ((elapsed + 1.2) * 0.35) % 1;
      arc1.bead.position.copy(arc1.curve.getPointAt(t1));
      arc2.bead.position.copy(arc2.curve.getPointAt(t2));

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
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] rounded-2xl overflow-hidden border border-[#4CC9F0]/25 bg-gradient-to-b from-[#0B0D14] via-[#0E0E12] to-[#0A0B0E] shadow-2xl">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Route Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-[#4CC9F0]/40 rounded-full text-xs font-mono-code text-[#4CC9F0]">
          <GraduationCap className="w-4 h-4 text-[#F5D37C]" />
          <span>{lang === 'en' ? 'Graduate Research Flight Trajectory' : 'উচ্চশিক্ষা ও নাট্যগবেষণা রুট'}</span>
        </div>
      </div>

      {/* Destinations Indicator Pills */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex flex-wrap gap-2 text-xs font-mono-code">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/80 border border-[#E63550]/50 rounded-lg text-white">
            <span className="w-2 h-2 rounded-full bg-[#E63550]" />
            <span>Dhaka (JU 52nd Batch)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/80 border border-[#4CC9F0]/50 rounded-lg text-white">
            <span className="w-2 h-2 rounded-full bg-[#4CC9F0]" />
            <span>Dublin (Trinity College)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/80 border border-[#F5D37C]/50 rounded-lg text-white">
            <span className="w-2 h-2 rounded-full bg-[#F5D37C]" />
            <span>Galway (Univ. of Galway)</span>
          </div>
        </div>

        <div className="text-[11px] text-[#F4EFE6]/60 font-mono-code bg-black/60 px-2.5 py-1 rounded">
          {lang === 'en' ? 'Drag to rotate globe' : 'গ্লোব ঘোরাতে ড্র্যাগ করুন'}
        </div>
      </div>
    </div>
  );
};
