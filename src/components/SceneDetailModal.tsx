import React, { useEffect } from 'react';
import { X, Calendar, MapPin, Sparkles, BookOpen, Code2 } from 'lucide-react';
import type { ProductionItem, TechProject, Language } from '../types';

interface SceneDetailModalProps {
  item: ProductionItem | TechProject | null;
  onClose: () => void;
  lang: Language;
}

export const SceneDetailModal: React.FC<SceneDetailModalProps> = ({ item, onClose, lang }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const isProduction = 'playwright' in item;
  const prod = isProduction ? (item as ProductionItem) : null;
  const tech = !isProduction ? (item as TechProject) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto my-auto p-5 sm:p-8 rounded-2xl sm:rounded-3xl stage-glass-gold border border-[#C9A24B]/40 text-left text-[#F4EFE6] shadow-2xl scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Light Bar */}
        <div className="sticky -top-5 sm:-top-8 -mx-5 sm:-mx-8 h-1.5 bg-gradient-to-r from-[#B3122D] via-[#C9A24B] to-[#4CC9F0] z-20" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white/90 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isProduction && prod && (
          <div>
            {/* Header info */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-[#B3122D]/30 border border-[#B3122D]/60 text-[#F5D37C]">
                {prod.badge[lang]}
              </span>
              <span className="text-xs font-mono-code text-[#9E9AA0] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" /> {prod.year}
              </span>
              <span className="text-xs font-mono-code text-[#9E9AA0] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E63550]" /> {prod.venue[lang]}
              </span>
            </div>

            <h2 className="font-serif-drama text-2xl sm:text-4xl text-white mb-2 leading-tight">
              {prod.title[lang]}
            </h2>

            <p className="text-sm sm:text-base font-mono-code text-[#C9A24B] mb-6">
              {lang === 'en' ? 'Playwright: ' : 'নাট্যকার: '}
              <span className="text-[#F4EFE6]">{prod.playwright[lang]}</span> ·{' '}
              <span className="text-[#4CC9F0]">{prod.role[lang]}</span>
            </p>

            {/* Quote excerpt if exists */}
            {prod.quote && (
              <blockquote className="my-5 p-4 rounded-xl bg-black/60 border-l-4 border-[#C9A24B] italic font-serif-drama text-base sm:text-lg text-[#F5D37C]/95">
                {prod.quote[lang]}
              </blockquote>
            )}

            {/* Synopsis */}
            <div className="mb-6">
              <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#9E9AA0] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#C9A24B]" />
                {lang === 'en' ? 'Production Synopsis & Dramaturgy' : 'প্রযোজনা পরিচিতি ও নাট্যতত্ত্ব'}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#F4EFE6]/90 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                {prod.synopsis[lang]}
              </p>
            </div>

            {/* Key Artistic & Technical Contributions */}
            <div>
              <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#9E9AA0] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E63550]" />
                {lang === 'en' ? 'Specific Responsibilities & Contributions' : 'দায়িত্ব ও শৈল্পিক অবদান'}
              </h3>
              <ul className="space-y-2.5">
                {prod.contributions[lang].map((itemStr, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#F4EFE6]/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] mt-2 shrink-0" />
                    <span>{itemStr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!isProduction && tech && (
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-[#4CC9F0]/20 border border-[#4CC9F0]/60 text-[#4CC9F0]">
                {tech.category[lang]}
              </span>
              <span className="text-xs font-mono-code text-[#52B788] uppercase px-2 py-0.5 rounded bg-black/50 border border-[#52B788]/40">
                ● {tech.status}
              </span>
            </div>

            <h2 className="font-serif-drama text-2xl sm:text-3xl text-white mb-4">
              {tech.title[lang]}
            </h2>

            {/* Problem & Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <h4 className="text-xs font-mono-code text-[#E63550] uppercase mb-1.5 font-bold">
                  {lang === 'en' ? 'The Problem' : 'সমস্যা'}
                </h4>
                <p className="text-xs sm:text-sm text-[#F4EFE6]/85 leading-relaxed">
                  {tech.problem[lang]}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <h4 className="text-xs font-mono-code text-[#4CC9F0] uppercase mb-1.5 font-bold">
                  {lang === 'en' ? 'Architectural Approach' : 'সমাধান ও প্রযুক্তি কৌশল'}
                </h4>
                <p className="text-xs sm:text-sm text-[#F4EFE6]/85 leading-relaxed">
                  {tech.approach[lang]}
                </p>
              </div>
            </div>

            {/* Stack Tags */}
            <div className="mb-6">
              <h4 className="text-xs font-mono-code uppercase text-[#9E9AA0] mb-2">
                {lang === 'en' ? 'Technology Stack' : 'প্রযুক্তি স্ট্যাক'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {tech.stack.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono-code bg-white/5 border border-white/10 text-[#C9A24B]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="p-4 rounded-xl bg-[#52B788]/10 border border-[#52B788]/30 mb-6">
              <h4 className="text-xs font-mono-code uppercase text-[#52B788] mb-1 font-bold">
                {lang === 'en' ? 'Measurable Impact & Result' : 'বাস্তব ফলাফল ও প্রভাব'}
              </h4>
              <p className="text-sm text-[#F4EFE6]/90">{tech.result[lang]}</p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {tech.github && (
                <a
                  href={tech.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono-code text-white transition-all cursor-pointer"
                >
                  <Code2 className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-mono-code bg-[#B3122D] hover:bg-[#E63550] text-white transition-all cursor-pointer"
          >
            {lang === 'en' ? 'Return to Stage' : 'মঞ্চে ফিরুন'}
          </button>
        </div>
      </div>
    </div>
  );
};
