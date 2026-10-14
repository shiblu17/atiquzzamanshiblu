import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import type { Language } from '../types';
import { soundManager } from '../lib/soundManager';

interface PrologueLoadingProps {
  onComplete: () => void;
  lang: Language;
}

export const PrologueLoading: React.FC<PrologueLoadingProps> = ({ onComplete, lang }) => {
  const [progress, setProgress] = useState(0);
  const [allowSkip, setAllowSkip] = useState(false);
  const isFlickering = true;

  useEffect(() => {
    // Show skip after 1.5s as required by PRD
    const skipTimer = setTimeout(() => {
      setAllowSkip(true);
    }, 1500);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            soundManager.playCurtainSwish();
            onComplete();
          }, 400);
          return 100;
        }
        // Realistic easing progress
        const step = Math.max(1, Math.floor((100 - prev) * 0.12));
        return Math.min(100, prev + step);
      });
    }, 50);

    return () => {
      clearTimeout(skipTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  const handleSkip = () => {
    soundManager.playCurtainSwish();
    onComplete();
  };

  const brightness = progress / 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading The Stage Portfolio"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] transition-opacity duration-1000 select-none overflow-hidden"
    >
      {/* Radial stage ambience slowly brightening */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 55%, rgba(201, 162, 75, ${0.12 * brightness}) 0%, rgba(179, 18, 45, ${0.05 * brightness}) 35%, transparent 70%)`,
          opacity: brightness
        }}
      />

      {/* 3D/Visual Ghost Light apparatus */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glow halo around bulb */}
        <div
          className="absolute -top-12 w-48 h-48 rounded-full pointer-events-none transition-all duration-300 blur-2xl"
          style={{
            backgroundColor: '#F5D37C',
            opacity: 0.15 + brightness * 0.75,
            transform: `scale(${0.8 + brightness * 0.6})`
          }}
        />

        {/* Vintage Ghost Light Stand Graphic */}
        <div className="relative flex flex-col items-center">
          {/* Wire protective cage around filament */}
          <div className="relative w-16 h-20 rounded-t-full border-2 border-[#C9A24B]/40 flex items-center justify-center bg-black/40 shadow-inner">
            {/* Protective cage wire ribs */}
            <div className="absolute inset-x-2 top-0 bottom-0 border-x border-[#C9A24B]/30" />
            <div className="absolute inset-y-4 left-0 right-0 border-y border-[#C9A24B]/30" />

            {/* Glowing Edison filament bulb */}
            <div
              className={`w-7 h-10 rounded-full transition-all duration-200 flex items-center justify-center ${isFlickering ? 'animate-ghost-light' : ''}`}
              style={{
                backgroundColor: brightness > 0.1 ? '#FFE599' : '#42280A',
                boxShadow: brightness > 0.1
                  ? `0 0 ${20 + brightness * 40}px rgba(245, 211, 124, ${0.6 + brightness * 0.4})`
                  : 'none'
              }}
            >
              <div
                className="w-1.5 h-4 bg-orange-400 rounded-full"
                style={{
                  opacity: Math.max(0.4, brightness),
                  boxShadow: '0 0 8px #FFA500'
                }}
              />
            </div>
          </div>

          {/* Socket / base */}
          <div className="w-8 h-4 bg-[#2A2A30] border-t border-[#C9A24B]/60 rounded-b" />

          {/* Cast iron tall stand */}
          <div className="w-2 h-24 bg-gradient-to-b from-[#2A2A30] via-[#1A1A20] to-[#121216] shadow-md" />

          {/* Heavy tripod base on stage floor */}
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-3 bg-[#1D1D24] rounded-full border-t border-white/10" />
            {/* Cast shadow on stage floor */}
            <div
              className="absolute -bottom-2 w-40 h-4 bg-black/80 rounded-full blur-sm"
              style={{ opacity: 0.5 + brightness * 0.5 }}
            />
          </div>
        </div>

        {/* Progress & Theatrical Text */}
        <div className="mt-8 text-center space-y-3">
          <p className="font-serif-drama text-xl sm:text-2xl text-[#F4EFE6] tracking-widest uppercase">
            {lang === 'en' ? 'The House Is Open' : 'মঞ্চের দ্বার উন্মোচিত'}
          </p>

          <p className="text-xs tracking-widest text-[#C9A24B] uppercase font-mono-code">
            {lang === 'en' ? 'Activating Stage Lights & Scenography' : 'মঞ্চের আলো ও দৃশ্যকল্প প্রস্তুত হচ্ছে'} — {progress}%
          </p>

          {/* Progress bar line */}
          <div className="w-48 sm:w-64 h-1 bg-[#1A1A1E] rounded-full overflow-hidden mx-auto border border-[#C9A24B]/20">
            <div
              className="h-full bg-gradient-to-r from-[#B3122D] via-[#C9A24B] to-[#F5D37C] transition-all duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip button available after 1.5s (PRD Requirement) */}
        {allowSkip && (
          <button
            onClick={handleSkip}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2 text-xs font-mono-code tracking-wider uppercase text-[#C9A24B] hover:text-white border border-[#C9A24B]/40 hover:border-[#C9A24B] bg-black/50 hover:bg-[#B3122D]/40 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{lang === 'en' ? 'Enter Stage' : 'মঞ্চে প্রবেশ করুন'}</span>
          </button>
        )}
      </div>

      {/* Atmospheric Stage Floor Lines */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
