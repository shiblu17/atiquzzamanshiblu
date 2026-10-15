import React from 'react';
import { Volume2, VolumeX, Lightbulb, Sun, Moon, Globe } from 'lucide-react';
import type { Language } from '../types';
import { soundManager } from '../lib/soundManager';

interface NavbarProps {
  currentScene: number;
  onSelectScene: (idx: number) => void;
  lang: Language;
  onToggleLang: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  houseLights: boolean;
  onToggleHouseLights: () => void;
  ghostLightOn: boolean;
  onToggleGhostLight: () => void;
  is3DFallback: boolean;
  onToggle3DFallback: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScene,
  onSelectScene,
  lang,
  onToggleLang,
  soundEnabled,
  onToggleSound,
  houseLights,
  onToggleHouseLights,
  ghostLightOn,
  onToggleGhostLight,
  is3DFallback,
  onToggle3DFallback,
}) => {
  const navItems = [
    { idx: 1, label: { en: 'The Stage', bn: 'মঞ্চ' }, act: { en: 'Stage', bn: 'মঞ্চ' } },
    { idx: 2, label: { en: 'Act I: Theatre', bn: '১ম অঙ্ক: নাট্যকলা' }, act: { en: 'Act I', bn: '১ম অঙ্ক' } },
    { idx: 3, label: { en: 'Act II: Leadership', bn: '২য় অঙ্ক: নেতৃত্ব' }, act: { en: 'Act II', bn: '২য় অঙ্ক' } },
    { idx: 4, label: { en: 'Act III: Technology', bn: '৩য় অঙ্ক: প্রযুক্তি' }, act: { en: 'Act III', bn: '৩য় অঙ্ক' } },
    { idx: 5, label: { en: 'Epilogue: Vision', bn: 'উপসংহার: নাট্যগবেষণা' }, act: { en: 'Vision', bn: 'গবেষণা' } },
    { idx: 6, label: { en: 'Curtain Call', bn: 'যবনিকাপাত' }, act: { en: 'Contact', bn: 'যোগাযোগ' } },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-2 sm:px-6 py-2 sm:py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 p-2 sm:px-4 rounded-2xl stage-glass border border-[#C9A24B]/20 shadow-xl">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            soundManager.playTactileTick();
            onSelectScene(1);
          }}
          className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C9A24B] shrink-0"
          aria-label="Return to Hero"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#B3122D] to-[#5C0A17] border border-[#C9A24B]/40 flex items-center justify-center text-xs sm:text-sm shadow-md group-hover:scale-105 transition-transform shrink-0">
            🎭
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif-drama text-xs sm:text-base font-bold text-[#F4EFE6] leading-none whitespace-nowrap">
              <span className="sm:hidden">A. Shiblu</span>
              <span className="hidden sm:inline">Atiquzzaman Shiblu</span>
            </h1>
            <span className="text-[9px] sm:text-[10px] text-[#C9A24B] font-mono-code uppercase tracking-wider">
              {lang === 'en' ? 'JU 52nd Batch' : 'জাবি ৫২তম ব্যাচ'}
            </span>
          </div>
        </button>

        {/* Act Scene Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Acts and Scenes Navigation">
          {navItems.map((item) => {
            const isActive = currentScene === item.idx;
            return (
              <button
                key={item.idx}
                onClick={() => {
                  soundManager.playTactileTick();
                  onSelectScene(item.idx);
                }}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#C9A24B] bg-[#C9A24B]/15 font-semibold border border-[#C9A24B]/40'
                    : 'text-[#F4EFE6]/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label[lang]}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#C9A24B] rounded-full shadow-[0_0_8px_#C9A24B]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Utility & Accessibility Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Sound Toggle (F11) */}
          <button
            onClick={() => {
              soundManager.playTactileTick();
              onToggleSound();
            }}
            title={soundEnabled ? (lang === 'en' ? 'Mute Audio' : 'শব্দ বন্ধ করুন') : (lang === 'en' ? 'Play Ambient Stage Audio' : 'মঞ্চের আবহ সঙ্গীত চালু করুন')}
            aria-label="Toggle Sound"
            className={`p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-[#B3122D]/30 border border-[#B3122D] text-white shadow-sm'
                : 'bg-black/40 border border-white/10 text-[#F4EFE6]/60 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E63550]" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {/* House Lights Toggle (F12) */}
          <button
            onClick={() => {
              soundManager.playTactileTick();
              onToggleHouseLights();
            }}
            title={houseLights ? (lang === 'en' ? 'Dim House Lights (Dark Stage)' : 'মঞ্চের আলো কমান') : (lang === 'en' ? 'Turn on House Lights (High Contrast)' : 'হলের আলো জ্বালান (উচ্চ বৈসাদৃশ্য)')}
            aria-label="Toggle House Lights"
            className={`p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer ${
              houseLights
                ? 'bg-[#C9A24B]/30 border border-[#C9A24B] text-[#F5D37C] shadow-sm'
                : 'bg-black/40 border border-white/10 text-[#F4EFE6]/60 hover:text-white'
            }`}
          >
            {houseLights ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5D37C]" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {/* Ghost Light Toggle / Easter Egg (F13: 'G' key) */}
          <button
            onClick={() => {
              soundManager.playGhostLightSwitch();
              onToggleGhostLight();
            }}
            title={lang === 'en' ? 'Ghost Light (Shortcut: G)' : 'ঘোস্ট লাইট (শর্টকাট: G)'}
            aria-label="Toggle Ghost Light"
            className={`p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer ${
              ghostLightOn
                ? 'bg-[#F5D37C]/20 border border-[#F5D37C]/60 text-[#F5D37C]'
                : 'bg-black/40 border border-white/10 text-[#F4EFE6]/40 hover:text-white'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* 3D / 2D Fallback Toggle (F16) */}
          <button
            onClick={() => {
              soundManager.playTactileTick();
              onToggle3DFallback();
            }}
            title={is3DFallback ? (lang === 'en' ? 'Enable 3D Canvas' : 'থ্রিডি ক্যানভাস চালু করুন') : (lang === 'en' ? 'Switch to Lightweight 2D Mode' : 'লাইটওয়েট ২ডি মোডে যান')}
            aria-label="Toggle 2D/3D Mode"
            className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono-code transition-all cursor-pointer ${
              is3DFallback
                ? 'bg-[#4CC9F0]/20 border border-[#4CC9F0] text-[#4CC9F0]'
                : 'bg-black/40 border border-white/10 text-[#F4EFE6]/70 hover:text-white'
            }`}
          >
            {is3DFallback ? '2D' : '3D'}
          </button>

          {/* Language Switcher (F7: EN / বাংলা) */}
          <button
            onClick={() => {
              soundManager.playTactileTick();
              onToggleLang();
            }}
            title={lang === 'en' ? 'Switch to বাংলা' : 'Switch to English'}
            aria-label="Toggle Language"
            className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-[#C9A24B]/50 bg-black/60 hover:bg-[#C9A24B] hover:text-black text-[11px] sm:text-xs font-mono-code text-[#C9A24B] font-bold transition-all cursor-pointer shadow-sm"
          >
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Scene Selector Bar */}
      <div className="md:hidden flex items-center justify-between gap-1 overflow-x-auto py-1.5 px-2 mt-1.5 stage-glass rounded-xl border border-white/10 shadow-lg scrollbar-none">
        {navItems.map((item) => {
          const isActive = currentScene === item.idx;
          return (
            <button
              key={item.idx}
              onClick={() => {
                soundManager.playTactileTick();
                onSelectScene(item.idx);
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] whitespace-nowrap font-mono-code transition-all active:scale-95 ${
                isActive
                  ? 'bg-[#C9A24B] text-black font-bold shadow-md shadow-[#C9A24B]/30'
                  : 'bg-black/40 text-[#F4EFE6]/70 hover:text-white'
              }`}
            >
              {item.act[lang]}
            </button>
          );
        })}
      </div>
    </header>
  );
};
