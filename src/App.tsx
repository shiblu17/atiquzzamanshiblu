import { useState, useEffect } from 'react';
import { PrologueLoading } from './components/PrologueLoading';
import { TheatreCanvas } from './components/TheatreCanvas';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { SceneDetailModal } from './components/SceneDetailModal';
import { HeroScene } from './scenes/HeroScene';
import { ActTheatre } from './scenes/ActTheatre';
import { ActLeadership } from './scenes/ActLeadership';
import { ActTech } from './scenes/ActTech';
import { Epilogue } from './scenes/Epilogue';
import { CurtainCall } from './scenes/CurtainCall';
import type { Language, ProductionItem, TechProject } from './types';
import { soundManager } from './lib/soundManager';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState(1); // 1 to 6
  const [lang, setLang] = useState<Language>('en');
  const [houseLights, setHouseLights] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [ghostLightOn, setGhostLightOn] = useState(true);
  const [is3DFallback, setIs3DFallback] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<ProductionItem | TechProject | null>(null);

  // Keyboard shortcut listener (PRD Feature F13: pressing 'G' toggles ghost light)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'g' || e.key === 'G') {
        soundManager.playGhostLightSwitch();
        setGhostLightOn((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update body class for House Lights mode (PRD F12)
  useEffect(() => {
    if (houseLights) {
      document.body.classList.add('house-lights-on');
    } else {
      document.body.classList.remove('house-lights-on');
    }
  }, [houseLights]);

  // Scroll detection to update active scene index for 3D camera
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const act1 = document.getElementById('act-theatre');
      const act2 = document.getElementById('act-leadership');
      const act3 = document.getElementById('act-tech');
      const epilogue = document.getElementById('epilogue');
      const curtain = document.getElementById('curtain-call');

      if (curtain && scrollPos >= curtain.offsetTop) {
        setCurrentScene(6);
      } else if (epilogue && scrollPos >= epilogue.offsetTop) {
        setCurrentScene(5);
      } else if (act3 && scrollPos >= act3.offsetTop) {
        setCurrentScene(4);
      } else if (act2 && scrollPos >= act2.offsetTop) {
        setCurrentScene(3);
      } else if (act1 && scrollPos >= act1.offsetTop) {
        setCurrentScene(2);
      } else {
        setCurrentScene(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToScene = (idx: number) => {
    setCurrentScene(idx);
    let targetId = 'hero';
    if (idx === 2) targetId = 'act-theatre';
    if (idx === 3) targetId = 'act-leadership';
    if (idx === 4) targetId = 'act-tech';
    if (idx === 5) targetId = 'epilogue';
    if (idx === 6) targetId = 'curtain-call';

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const newState = soundManager.toggleMute();
    setSoundEnabled(newState);
  };

  return (
    <div className="relative min-h-screen selection:bg-[#B3122D] selection:text-white">
      {/* Prologue Loading Screen (PRD Feature F1) */}
      {isLoading && (
        <PrologueLoading
          onComplete={() => setIsLoading(false)}
          lang={lang}
        />
      )}

      {/* Custom Spotlight Cursor */}
      <CustomCursor />

      {/* Global 3D Theatre WebGL Canvas (PRD Feature F3) */}
      <TheatreCanvas
        currentScene={currentScene}
        ghostLightOn={ghostLightOn}
        houseLights={houseLights}
        is3DFallback={is3DFallback}
      />

      {/* Theatrical Navigation Bar */}
      <Navbar
        currentScene={currentScene}
        onSelectScene={scrollToScene}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'en' ? 'bn' : 'en'))}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        houseLights={houseLights}
        onToggleHouseLights={() => setHouseLights((prev) => !prev)}
        ghostLightOn={ghostLightOn}
        onToggleGhostLight={() => setGhostLightOn((prev) => !prev)}
        is3DFallback={is3DFallback}
        onToggle3DFallback={() => setIs3DFallback((prev) => !prev)}
      />

      {/* Main HTML Story Content Overlay (Accessible & Screen-Reader Friendly) */}
      <main className="relative z-10 flex flex-col w-full">
        <div id="hero">
          <HeroScene
            lang={lang}
            onExplore={() => scrollToScene(2)}
            onContact={() => scrollToScene(6)}
          />
        </div>

        <ActTheatre
          lang={lang}
          onSelectDetail={(item) => setSelectedDetail(item)}
        />

        <ActLeadership
          lang={lang}
        />

        <ActTech
          lang={lang}
          onSelectDetail={(item) => setSelectedDetail(item)}
        />

        <Epilogue
          lang={lang}
        />

        <CurtainCall
          lang={lang}
        />
      </main>

      {/* Production / Project Detail Modal (PRD Feature F5) */}
      <SceneDetailModal
        item={selectedDetail}
        onClose={() => setSelectedDetail(null)}
        lang={lang}
      />
    </div>
  );
}

export default App;
