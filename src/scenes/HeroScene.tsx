import React, { useEffect, useState } from 'react';
import { FileDown, Mail, ArrowDown } from 'lucide-react';
import type { Language } from '../types';
import { soundManager } from '../lib/soundManager';

interface HeroSceneProps {
  lang: Language;
  onExplore: () => void;
  onContact: () => void;
  onDownloadCV: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  lang,
  onExplore,
  onContact,
  onDownloadCV,
}) => {
  // Typewriter effect for tagline
  const taglinesEn = ['Actor.', 'Dramaturg.', 'Organiser.', 'Builder.'];
  const taglinesBn = ['অভিনেতা।', 'নাট্যতাত্ত্বিক।', 'সংগঠক।', 'নির্মাতা।'];
  const [displayText, setDisplayText] = useState('');
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentList = lang === 'en' ? taglinesEn : taglinesBn;
    const currentWord = currentList[taglineIdx % currentList.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTaglineIdx((prev) => (prev + 1) % currentList.length);
        }
      }
    }, isDeleting ? 40 : 90);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, taglineIdx, lang]);

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 pb-16 z-10">
      {/* Background radial spotlight glow */}
      <div className="absolute inset-0 spotlight-glow pointer-events-none" />

      {/* Theatrical Proscenium Subtitle Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full stage-glass border border-[#C9A24B]/40 text-xs sm:text-sm font-mono-code text-[#C9A24B] mb-6 shadow-lg animate-fadeIn">
        <span className="w-2 h-2 rounded-full bg-[#E63550] animate-pulse" />
        <span>
          {lang === 'en'
            ? 'Scene 1 · The Curtain Rises'
            : '১ম দৃশ্য · যবনিকোন্মোচন'}
        </span>
      </div>

      {/* 3D Extruded-Style Hero Typography: ATIQUZZAMAN SHIBLU (PRD A3) */}
      <div className="relative mb-4 group select-none">
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-8xl font-black tracking-wider uppercase leading-none bg-gradient-to-b from-[#FFF5DC] via-[#E8C570] to-[#8C6420] bg-clip-text text-transparent drop-shadow-[0_8px_32px_rgba(201,162,75,0.4)]">
          {lang === 'en' ? 'Atiquzzaman Shiblu' : 'আতিকুজ্জামান শিবলু'}
        </h1>
        {/* Subtle metallic bevel highlight */}
        <div
          className="absolute inset-0 font-cinzel text-4xl sm:text-6xl md:text-8xl font-black tracking-wider uppercase leading-none text-white/5 blur-sm pointer-events-none"
          aria-hidden="true"
        >
          {lang === 'en' ? 'Atiquzzaman Shiblu' : 'আতিকুজ্জামান শিবলু'}
        </div>
      </div>

      {/* Typewriter Tagline (PRD Scene 1) */}
      <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
        <p className="font-serif-drama text-xl sm:text-3xl text-[#F4EFE6] italic tracking-wide">
          <span>{displayText}</span>
          <span className="inline-block w-0.5 h-6 ml-1 bg-[#C9A24B] animate-pulse align-middle" />
        </p>
      </div>

      {/* Academic Subtext */}
      <p className="max-w-2xl text-xs sm:text-base text-[#F4EFE6]/75 font-sans leading-relaxed mb-10">
        {lang === 'en' ? (
          <>
            Department of Drama & Dramatic Theory, <strong className="text-[#C9A24B]">Jahangirnagar University</strong> (52nd Batch) ·{' '}
            President, <span className="text-[#F5D37C]">TSC-Affiliated Newspaper</span>.
          </>
        ) : (
          <>
            নাট্যকলা ও নাট্যতত্ত্ব বিভাগ, <strong className="text-[#C9A24B]">জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</strong> (৫২তম ব্যাচ) ·{' '}
            সভাপতি, <span className="text-[#F5D37C]">টিএসসি-অনুমোদিত ক্যাম্পাস সংবাদপত্র</span>।
          </>
        )}
      </p>

      {/* Action CTAs (PRD: Explore Works, Download CV, Contact) */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        {/* CTA 1: Explore Works */}
        <button
          onClick={() => {
            soundManager.playCurtainSwish();
            onExplore();
          }}
          className="group relative px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#B3122D] to-[#8C0E23] hover:from-[#E63550] hover:to-[#B3122D] text-white font-mono-code text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-xl hover:shadow-[#B3122D]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer border border-[#E63550]/40"
        >
          <span>{lang === 'en' ? 'Explore Works' : 'কাজের বিবরণী'}</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>

        {/* CTA 2: Download CV */}
        <button
          onClick={() => {
            soundManager.playTactileTick();
            onDownloadCV();
          }}
          className="group px-6 py-3.5 rounded-2xl stage-glass-gold hover:bg-[#C9A24B] hover:text-black text-[#F4EFE6] font-mono-code text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <FileDown className="w-4 h-4 text-[#C9A24B] group-hover:text-black transition-colors" />
          <span>{lang === 'en' ? 'Download CV' : 'সিভি ডাউনলোড'}</span>
        </button>

        {/* CTA 3: Contact */}
        <button
          onClick={() => {
            soundManager.playTactileTick();
            onContact();
          }}
          className="px-6 py-3.5 rounded-2xl bg-black/60 hover:bg-white/10 text-[#F4EFE6] border border-white/15 font-mono-code text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          <Mail className="w-4 h-4 text-[#4CC9F0]" />
          <span>{lang === 'en' ? 'Curtain Call / Contact' : 'যোগাযোগ'}</span>
        </button>
      </div>

      {/* Downward Scroll Cue */}
      <div className="flex flex-col items-center gap-2 text-xs font-mono-code text-[#C9A24B]/70 animate-bounce cursor-pointer" onClick={onExplore}>
        <span>{lang === 'en' ? 'Step Onto The Stage' : 'মঞ্চে এগিয়ে যান'}</span>
        <ArrowDown className="w-4 h-4 text-[#C9A24B]" />
      </div>
    </section>
  );
};
