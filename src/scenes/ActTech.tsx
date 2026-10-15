import React, { useState } from 'react';
import { techProjectsData } from '../content/content';
import { SkillConstellation } from '../components/SkillConstellation';
import type { TechProject, Language } from '../types';
import { Sliders, ChevronRight } from 'lucide-react';
import { soundManager } from '../lib/soundManager';

interface ActTechProps {
  lang: Language;
  onSelectDetail: (item: TechProject) => void;
}

export const ActTech: React.FC<ActTechProps> = ({ lang, onSelectDetail }) => {
  // Lighting console slider states
  const [activeFader, setActiveFader] = useState<number>(0);
  const [faderValues, setFaderValues] = useState<number[]>([85, 70, 95]);

  const handleSliderChange = (idx: number, val: number) => {
    const updated = [...faderValues];
    updated[idx] = val;
    setFaderValues(updated);
    setActiveFader(idx);
    soundManager.playTactileTick();
  };

  return (
    <section id="act-tech" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 z-10 text-left">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full stage-glass border border-[#4CC9F0]/50 text-xs font-mono-code text-[#4CC9F0] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#4CC9F0] animate-pulse" />
          <span>{lang === 'en' ? 'Act III · Control Booth & Automation' : '৩য় অঙ্ক · কন্ট্রোল বুথ ও প্রযুক্তি উদ্ভাবন'}</span>
        </div>
        <h2 className="font-serif-drama text-3xl sm:text-5xl md:text-6xl text-white mb-4">
          {lang === 'en' ? 'Technology & Automation' : 'প্রযুক্তি, কোডিং ও অটোমেশন'}
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#9E9AA0] font-sans">
          {lang === 'en'
            ? 'Bridging theatrical spatial logic with full-stack web engineering, 3D WebGL scenography tools, responsive cultural platforms, and autonomous API pipelines.'
            : 'থিয়েটারের স্থানিক অর্কেস্ট্রেশনকে রিয়্যাক্ট ও থ্রিজেএস ৩ডি সিনোগ্রাফি টুল, কালচারাল প্ল্যাটফর্ম এবং আধুনিক ক্লাউড আর্কিটেকচারের সাথে সমন্বয়।'}
        </p>
      </div>

      {/* Theatrical Lighting-Console / Terminal Faders UI (PRD Act III) */}
      <div className="p-6 sm:p-8 rounded-3xl stage-glass border border-[#4CC9F0]/30 shadow-2xl mb-16 bg-gradient-to-b from-[#121620] to-[#0A0D14]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4CC9F0]/20 border border-[#4CC9F0]/50 flex items-center justify-center text-[#4CC9F0]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono-code text-sm sm:text-base text-white font-bold tracking-wider uppercase">
                {lang === 'en' ? 'DMX 512 / Project Dimmer Console' : 'ডিএমএক্স ৫১২ / প্রজেক্ট কন্ট্রোল কনসোল'}
              </h3>
              <p className="text-xs text-[#4CC9F0] font-mono-code">
                {lang === 'en' ? 'Slide faders to engage project pipelines' : 'স্লাইডার সরিয়ে প্রজেক্ট পাইপলাইন সক্রিয় করুন'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-code text-[#52B788] bg-black/60 px-3 py-1.5 rounded-lg border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#52B788] animate-ping" />
            <span>TERMINAL ONLINE · CHANNELS ACTIVE</span>
          </div>
        </div>

        {/* Console Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techProjectsData.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => {
                setActiveFader(idx);
                soundManager.playTactileTick();
              }}
              className={`p-5 rounded-2xl transition-all duration-300 border cursor-pointer ${
                activeFader === idx
                  ? 'bg-black/80 border-[#4CC9F0] shadow-lg shadow-[#4CC9F0]/20'
                  : 'bg-black/40 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                <span className="text-[#4CC9F0]">CH 0{idx + 1}</span>
                <span className="text-white font-bold">{faderValues[idx]}% GAIN</span>
              </div>

              <h4 className="font-serif-drama text-lg text-white mb-2 line-clamp-1">
                {proj.title[lang]}
              </h4>

              {/* Interactive Fader Slider */}
              <div className="my-4">
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={faderValues[idx]}
                  onChange={(e) => handleSliderChange(idx, Number(e.target.value))}
                  className="w-full accent-[#4CC9F0] bg-white/20 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono-code text-[#9E9AA0]">
                <span>{proj.stack[0]}</span>
                <span className="text-[#F5D37C] uppercase">● {proj.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Project Cards: Problem -> Approach -> Stack -> Result (PRD Act III) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        {techProjectsData.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              soundManager.playTactileTick();
              onSelectDetail(project);
            }}
            className="group p-6 sm:p-7 rounded-3xl stage-glass border border-white/10 hover:border-[#4CC9F0] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-[#4CC9F0]/15 border border-[#4CC9F0]/40 text-[#4CC9F0]">
                  {project.category[lang]}
                </span>
                <span className="text-xs font-mono-code text-[#52B788]">
                  ● {project.status}
                </span>
              </div>

              <h3 className="font-serif-drama text-2xl text-white group-hover:text-[#4CC9F0] transition-colors mb-3 leading-snug">
                {project.title[lang]}
              </h3>

              {/* Problem */}
              <div className="mb-3 p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="block text-[11px] font-mono-code uppercase text-[#E63550] font-bold mb-1">
                  {lang === 'en' ? 'The Problem' : 'সমস্যা'}
                </span>
                <p className="text-xs text-[#F4EFE6]/80 line-clamp-2">
                  {project.problem[lang]}
                </p>
              </div>

              {/* Result */}
              <div className="mb-4 p-3 rounded-xl bg-[#52B788]/10 border border-[#52B788]/30">
                <span className="block text-[11px] font-mono-code uppercase text-[#52B788] font-bold mb-1">
                  {lang === 'en' ? 'Measurable Impact' : 'বাস্তব ফলাফল'}
                </span>
                <p className="text-xs text-[#F4EFE6]/90 line-clamp-2">
                  {project.result[lang]}
                </p>
              </div>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.slice(0, 4).map((techName, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-white/5 text-[#C9A24B]"
                  >
                    {techName}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-[#4CC9F0]">
              <span>{lang === 'en' ? 'Inspect Architecture' : 'আর্কিটেকচার দেখুন'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* 3D Skill Constellation Section (PRD F6 & A9) */}
      <div className="mt-8">
        <SkillConstellation lang={lang} />
      </div>
    </section>
  );
};
