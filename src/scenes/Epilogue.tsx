import React from 'react';
import { GlobeViewer } from '../components/GlobeViewer';
import { academicVisionContent } from '../content/content';
import type { Language } from '../types';
import { FileDown, BookOpen } from 'lucide-react';
import { soundManager } from '../lib/soundManager';

interface EpilogueProps {
  lang: Language;
  onDownloadCV: () => void;
}

export const Epilogue: React.FC<EpilogueProps> = ({ lang, onDownloadCV }) => {
  return (
    <section id="epilogue" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 z-10 text-left">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full stage-glass border border-[#F5D37C]/50 text-xs font-mono-code text-[#F5D37C] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#F5D37C] animate-pulse" />
          <span>{lang === 'en' ? 'Epilogue · Academic Horizon' : 'উপসংহার · নাট্যগবেষণা ও বিশ্বমঞ্চ'}</span>
        </div>
        <h2 className="font-serif-drama text-3xl sm:text-5xl md:text-6xl text-white mb-4">
          {lang === 'en' ? 'Vision & Scholarship Goals' : 'উচ্চশিক্ষা ও নাট্যদর্শন'}
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#9E9AA0] font-sans">
          {lang === 'en'
            ? 'Bridging Bengali proscenium traditions with contemporary European theatrical research, archival dramaturgy, and spatial stage technologies.'
            : 'বাংলা নাট্যঐতিহ্যের সাথে ইউরোপীয় সমকালীন মঞ্চতত্ত্ব, মহাফেজখানাভিত্তিক নাট্যগবেষণা ও ডিজিটাল দৃশ্যশিল্পের আন্তঃসাংস্কৃতিক সংযোগ।'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        {/* Left Column: 3D Globe with Flight Path (PRD Feature F10 & A10) */}
        <div className="lg:col-span-7">
          <GlobeViewer lang={lang} />
        </div>

        {/* Right Column: Master's Scholarship Aspirations & Institutions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl stage-glass-gold border border-[#C9A24B]/40 shadow-2xl">
            <span className="text-xs font-mono-code uppercase tracking-wider text-[#C9A24B] font-bold block mb-1">
              {lang === 'en' ? 'Graduate Degree Objective' : 'উচ্চশিক্ষার লক্ষ্য'}
            </span>
            <h3 className="font-serif-drama text-2xl text-white mb-3">
              {academicVisionContent.goal[lang]}
            </h3>
            <p className="font-serif-drama italic text-sm text-[#F5D37C]/90 mb-4 border-l-2 border-[#C9A24B] pl-3">
              {academicVisionContent.quote[lang]}
            </p>

            {/* Target Institutions */}
            <div className="space-y-4">
              {academicVisionContent.institutions.map((inst, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/60 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono-code mb-1">
                    <span className="font-bold text-white">{inst.name[lang]}</span>
                    <span className="text-[#4CC9F0]">{inst.country[lang]}</span>
                  </div>
                  <p className="text-[11px] font-mono-code text-[#C9A24B] mb-1">
                    {inst.department[lang]}
                  </p>
                  <p className="text-xs text-[#F4EFE6]/80 leading-relaxed">
                    {inst.focus[lang]}
                  </p>
                </div>
              ))}
            </div>

            {/* CV / Statement of Purpose Download Button */}
            <button
              onClick={() => {
                soundManager.playTactileTick();
                onDownloadCV();
              }}
              className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#C9A24B] to-[#F5D37C] hover:from-[#F5D37C] hover:to-[#C9A24B] text-black font-mono-code text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <FileDown className="w-4 h-4 text-black" />
              <span>{lang === 'en' ? 'Download Academic CV & Statement' : 'একাডেমিক সিভি ও স্টেটমেন্ট ডাউনলোড'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statement of Purpose Excerpt */}
      <div className="p-6 sm:p-8 rounded-3xl stage-glass border border-white/10 shadow-xl">
        <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#C9A24B] mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#F5D37C]" />
          <span>{lang === 'en' ? 'Statement of Research Intent' : 'গবেষণার রূপরেখা ও অভিসন্দর্ভ'}</span>
        </h3>
        <p className="font-serif-drama text-sm sm:text-base text-[#F4EFE6]/90 leading-relaxed">
          {academicVisionContent.researchStatement[lang]}
        </p>
      </div>
    </section>
  );
};
