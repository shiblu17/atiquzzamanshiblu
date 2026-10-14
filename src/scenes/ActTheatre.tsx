import React from 'react';
import { productionsData } from '../content/content';
import { MiniatureLabViewer } from '../components/MiniatureLabViewer';
import type { ProductionItem, Language } from '../types';
import { Sparkles, ChevronRight, Eye } from 'lucide-react';
import { soundManager } from '../lib/soundManager';

interface ActTheatreProps {
  lang: Language;
  onSelectDetail: (item: ProductionItem) => void;
}

export const ActTheatre: React.FC<ActTheatreProps> = ({ lang, onSelectDetail }) => {
  const raktaKarabi = productionsData.find((p) => p.id === 'rakta-karabi');
  const aarKotoDin = productionsData.find((p) => p.id === 'aar-koto-din');
  const shilpakala = productionsData.find((p) => p.id === 'shilpakala-productions');
  const miniatureSet = productionsData.find((p) => p.id === 'chemistry-lab-miniature');

  return (
    <section id="act-theatre" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 z-10 text-left">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full stage-glass border border-[#B3122D]/50 text-xs font-mono-code text-[#E63550] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#B3122D]" />
          <span>{lang === 'en' ? 'Act I · Scenography, Text & Acting' : '১ম অঙ্ক · মঞ্চসজ্জা, নাট্যরূপ ও অভিনয়'}</span>
        </div>
        <h2 className="font-serif-drama text-3xl sm:text-5xl md:text-6xl text-white mb-4">
          {lang === 'en' ? 'Theatre & Performing Arts' : 'নাট্যকলা ও মঞ্চাভিনয়'}
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#9E9AA0] font-sans">
          {lang === 'en'
            ? 'From classical Tagore allegories to physical anti-war drama, proscenium rigging at Bangladesh Shilpakala Academy, and architectural 1:12 scale scenography.'
            : 'রবীন্দ্র নাট্যরূপ থেকে জহির রায়হানের যুদ্ধবিরোধী রূপক নাটক, জাতীয় নাট্যশালার কারিগরি সমন্বয় এবং ১:১২ স্কেল ক্ষুদ্রাকৃতির মঞ্চ স্থাপত্য।'}
        </p>
      </div>

      {/* Production Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* Card 1: Rakta Karabi with 3D Yakshapuri Gate Silhouette (PRD Act I) */}
        {raktaKarabi && (
          <div
            onClick={() => {
              soundManager.playTactileTick();
              onSelectDetail(raktaKarabi);
            }}
            className="group relative p-6 sm:p-7 rounded-3xl stage-glass-gold border border-[#C9A24B]/30 hover:border-[#E63550] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xl"
          >
            {/* 3D Yakshapuri Gate & Iron Grille Silhouette Background */}
            <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none overflow-hidden">
              <svg className="w-full h-full text-[#E63550]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="10" y1="0" x2="10" y2="100" stroke="currentColor" strokeWidth="2" />
                <line x1="30" y1="0" x2="30" y2="100" stroke="currentColor" strokeWidth="2" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="2" />
                <line x1="70" y1="0" x2="70" y2="100" stroke="currentColor" strokeWidth="2" />
                <line x1="90" y1="0" x2="90" y2="100" stroke="currentColor" strokeWidth="2" />
                <path d="M 0 30 Q 50 10 100 30" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M 0 60 Q 50 40 100 60" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-[#B3122D]/30 border border-[#B3122D]/60 text-[#F5D37C]">
                  {raktaKarabi.badge[lang]}
                </span>
                <span className="text-xs font-mono-code text-[#C9A24B]">{raktaKarabi.year}</span>
              </div>

              <h3 className="font-serif-drama text-2xl text-white group-hover:text-[#F5D37C] transition-colors mb-2">
                {raktaKarabi.title[lang]}
              </h3>
              <p className="text-xs font-mono-code text-[#9E9AA0] mb-3">
                {lang === 'en' ? 'By ' : 'নাট্যকার: '}{raktaKarabi.playwright[lang]}
              </p>

              <div className="p-3 rounded-xl bg-black/50 border border-white/5 mb-4">
                <p className="text-xs font-mono-code text-[#4CC9F0] font-semibold mb-1">
                  🎭 {raktaKarabi.role[lang]}
                </p>
                <p className="text-xs text-[#F4EFE6]/75 line-clamp-3">
                  {raktaKarabi.synopsis[lang]}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono-code text-[#C9A24B]">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {lang === 'en' ? 'View Yakshapuri Details' : 'যক্ষপুরীর বিবরণ দেখুন'}
              </span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}

        {/* Card 2: Aar Koto Din with Film-Grain & Projected Light Reveal (PRD Act I) */}
        {aarKotoDin && (
          <div
            onClick={() => {
              soundManager.playTactileTick();
              onSelectDetail(aarKotoDin);
            }}
            className="group relative p-6 sm:p-7 rounded-3xl stage-glass border border-white/10 hover:border-[#C9A24B] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xl"
          >
            {/* Film Grain Texture overlay & Projected Light reveal */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C9A24B]/5 to-white/[0.03] group-hover:via-[#C9A24B]/15 transition-all duration-700 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-[#4A1521] border border-[#B3122D]/40 text-[#F4EFE6]">
                  {aarKotoDin.badge[lang]}
                </span>
                <span className="text-xs font-mono-code text-[#9E9AA0]">{aarKotoDin.year}</span>
              </div>

              <h3 className="font-serif-drama text-2xl text-white group-hover:text-[#F5D37C] transition-colors mb-2">
                {aarKotoDin.title[lang]}
              </h3>
              <p className="text-xs font-mono-code text-[#9E9AA0] mb-3">
                {lang === 'en' ? 'By ' : 'নাট্যকার: '}{aarKotoDin.playwright[lang]}
              </p>

              <div className="p-3 rounded-xl bg-black/50 border border-white/5 mb-4">
                <p className="text-xs font-mono-code text-[#E63550] font-semibold mb-1">
                  🕊️ {aarKotoDin.role[lang]}
                </p>
                <p className="text-xs text-[#F4EFE6]/75 line-clamp-3">
                  {aarKotoDin.synopsis[lang]}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono-code text-[#C9A24B]">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {lang === 'en' ? 'Open Scene Ledger' : 'নাট্য বিবরণী দেখুন'}
              </span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}

        {/* Card 3: Bangladesh Shilpakala Academy Hanging Stage Flat (PRD Act I) */}
        {shilpakala && (
          <div
            onClick={() => {
              soundManager.playTactileTick();
              onSelectDetail(shilpakala);
            }}
            className="group relative p-6 sm:p-7 rounded-3xl stage-glass border border-white/10 hover:border-[#4CC9F0] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xl"
          >
            {/* Hanging Stage Flat visual ropes on top */}
            <div className="absolute top-0 inset-x-0 flex justify-around pointer-events-none">
              <div className="w-0.5 h-4 bg-[#C9A24B]/40 group-hover:h-6 transition-all duration-300" />
              <div className="w-0.5 h-4 bg-[#C9A24B]/40 group-hover:h-6 transition-all duration-300" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-[#8C1D40]/30 border border-[#8C1D40]/60 text-[#F5D37C]">
                  {shilpakala.badge[lang]}
                </span>
                <span className="text-xs font-mono-code text-[#4CC9F0]">{shilpakala.year}</span>
              </div>

              <h3 className="font-serif-drama text-2xl text-white group-hover:text-[#4CC9F0] transition-colors mb-2">
                {shilpakala.title[lang]}
              </h3>
              <p className="text-xs font-mono-code text-[#9E9AA0] mb-3">
                {shilpakala.venue[lang]}
              </p>

              <div className="p-3 rounded-xl bg-black/50 border border-white/5 mb-4">
                <p className="text-xs font-mono-code text-[#F5D37C] font-semibold mb-1">
                  🏛️ {shilpakala.role[lang]}
                </p>
                <p className="text-xs text-[#F4EFE6]/75 line-clamp-3">
                  {shilpakala.synopsis[lang]}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono-code text-[#C9A24B]">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {lang === 'en' ? 'Inspect Repertoire' : 'অভিজ্ঞতা বিস্তারিত'}
              </span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}
      </div>

      {/* Signature Showpiece: 1:12 Miniature Stage Set Model Viewer (PRD Act I & A7) */}
      <div className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A24B]/20 border border-[#C9A24B]/50 text-xs font-mono-code text-[#F5D37C] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>{lang === 'en' ? 'Signature Showpiece · 3D Scenography' : 'স্বাক্ষর প্রদর্শনী · ত্রিমাত্রিক মঞ্চায়ন'}</span>
            </div>
            <h3 className="font-serif-drama text-2xl sm:text-3xl text-white">
              {lang === 'en' ? '1:12 Miniature Stage Model: Vintage Chemistry Laboratory' : '১:১২ ক্ষুদ্রাকৃতির মঞ্চ মডেল: ভিন্টেজ রসায়ন গবেষণাগার'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9E9AA0] font-sans max-w-2xl">
              {lang === 'en'
                ? 'Handcrafted physical scale model translated into interactive 3D WebGL. Orbit 360°, zoom in, or toggle the "Exploded View" to examine the architectural joinery, fume extraction hood, and retort glass assemblies.'
                : 'হাতে তৈরি ১:১২ স্কেল মডেলের থ্রিডি রূপান্তর। ৩৬০ ডিগ্রিতে ঘুরিয়ে দেখুন বা "এক্সপ্লোডেড ভিউ" চেপে এর ভেতরের প্রতিটি সূক্ষ্ম কাঠের জোড়া, ফিউম হুড ও টেস্ট টিউব র‍্যাক আলাদা করে পর্যবেক্ষণ করুন।'}
            </p>
          </div>

          {miniatureSet && (
            <button
              onClick={() => {
                soundManager.playTactileTick();
                onSelectDetail(miniatureSet);
              }}
              className="px-4 py-2 rounded-xl stage-glass-gold hover:bg-[#C9A24B] hover:text-black text-xs font-mono-code text-[#F4EFE6] transition-all cursor-pointer shadow-md"
            >
              {lang === 'en' ? 'Scenography Notes & Distinctions' : 'মঞ্চায়ন তথ্য ও মূল্যায়ন'}
            </button>
          )}
        </div>

        {/* 3D Interactive Miniature Viewer */}
        <MiniatureLabViewer lang={lang} />
      </div>
    </section>
  );
};
