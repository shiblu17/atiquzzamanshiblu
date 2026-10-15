import React, { useState } from 'react';
import { leadershipData } from '../content/content';
import type { Language } from '../types';
import { Newspaper, Award, Share2, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../lib/soundManager';

interface ActLeadershipProps {
  lang: Language;
}

export const ActLeadership: React.FC<ActLeadershipProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'newspaper' | 'jucsu' | 'network'>('newspaper');
  const [isPaperFlipped, setIsPaperFlipped] = useState(false);

  const tscNewspaper = leadershipData.find((l) => l.id === 'tsc-newspaper');
  const jucsuRun = leadershipData.find((l) => l.id === 'jucsu-run');

  return (
    <section id="act-leadership" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 z-10 text-left">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full stage-glass border border-[#C9A24B]/50 text-xs font-mono-code text-[#F5D37C] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#C9A24B]" />
          <span>{lang === 'en' ? 'Act II · Leadership, Publications & Events' : '২য় অঙ্ক · ক্যাম্পাস নেতৃত্ব, প্রকাশনা ও উৎসব'}</span>
        </div>
        <h2 className="font-serif-drama text-3xl sm:text-5xl md:text-6xl text-white mb-4">
          {lang === 'en' ? 'Leadership, Publications & Events' : 'নেতৃত্ব, প্রকাশনা ও ইভেন্ট ব্যবস্থাপনা'}
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#9E9AA0] font-sans">
          {lang === 'en'
            ? 'Presidential stewardship of the cultural magazine "Songskrriti Nagar" at Jahangirnagar University, coordinating creative teams, and organizing flagship campus festivals with thousands of participants.'
            : 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় টিএসসি সাংস্কৃতিক পত্রিকা "সংস্কৃতি নগর"-এর নেতৃত্ব, লেখক ও প্রকাশনা দলের সমন্বয় এবং হাজারো শিক্ষার্থীর অংশগ্রহণে জাকসু রান ও সেন্ট্রাল ব্যাচ ফেস্টিভ্যালের সফল আয়োজন।'}
        </p>
      </div>

      {/* Act II Navigation Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <button
          onClick={() => {
            soundManager.playTactileTick();
            setActiveTab('newspaper');
          }}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-mono-code transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === 'newspaper'
              ? 'bg-[#C9A24B] text-black font-bold shadow-lg shadow-[#C9A24B]/20'
              : 'stage-glass text-[#F4EFE6]/70 hover:text-white'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>{lang === 'en' ? '3D Publication (Songskrriti Nagar)' : '৩ডি প্রকাশনা (সংস্কৃতি নগর)'}</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTactileTick();
            setActiveTab('jucsu');
          }}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-mono-code transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === 'jucsu'
              ? 'bg-[#C9A24B] text-black font-bold shadow-lg shadow-[#C9A24B]/20'
              : 'stage-glass text-[#F4EFE6]/70 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{lang === 'en' ? 'JUCSU Run & Batch Festival' : 'জাকসু রান ও ব্যাচ ফেস্টিভ্যাল'}</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTactileTick();
            setActiveTab('network');
          }}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-mono-code transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            activeTab === 'network'
              ? 'bg-[#C9A24B] text-black font-bold shadow-lg shadow-[#C9A24B]/20'
              : 'stage-glass text-[#F4EFE6]/70 hover:text-white'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>{lang === 'en' ? 'Sponsorship & Team Node Graph' : 'স্পন্সর ও টিম নেটওয়ার্ক'}</span>
        </button>
      </div>

      {/* Tab 1: 3D Newspaper Unfold & Flip (PRD Act II) */}
      {activeTab === 'newspaper' && tscNewspaper && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Newspaper 3D Page Interactive Card */}
          <div className="lg:col-span-7 perspective-1000">
            <div
              onClick={() => {
                soundManager.playCurtainSwish();
                setIsPaperFlipped(!isPaperFlipped);
              }}
              className={`relative w-full min-h-[460px] sm:min-h-[500px] p-6 sm:p-8 rounded-2xl bg-[#E8E4D9] text-[#1F1E1C] shadow-2xl border-2 border-[#8A7968] cursor-pointer transition-transform duration-700 select-none ${
                isPaperFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
              }}
            >
              {/* Masthead Header */}
              <div className="border-b-2 border-black/80 pb-3 mb-4 text-center">
                <div className="flex justify-between items-center text-[11px] font-mono-code tracking-wider border-b border-black/30 pb-1 mb-2">
                  <span>VOL. XLII · ISSUE 14</span>
                  <span className="font-bold text-[#8C1D40]">JAHANGIRNAGAR UNIVERSITY PRESS</span>
                  <span>EST. TSC BANGLADESH</span>
                </div>
                <h3 className="font-serif-drama text-3xl sm:text-5xl font-black uppercase tracking-tight text-black leading-none">
                  SONGSKRRITI NAGAR
                </h3>
                <p className="text-[11px] font-serif-drama italic text-black/75 mt-1">
                  "সংস্কৃতি নগর · The Voice of Cultural Staging, Youth Discourse & Academic Autonomy"
                </p>
              </div>

              {!isPaperFlipped ? (
                /* Page Front: Lead Story & Editorial */
                <div>
                  <div className="inline-block px-2.5 py-0.5 bg-[#8C1D40] text-white font-mono-code text-[11px] uppercase tracking-wider mb-2 font-bold">
                    PRESIDENTIAL PUBLICATION DESK
                  </div>

                  <h4 className="font-serif-drama text-xl sm:text-2xl font-bold leading-tight mb-2 text-black">
                    {lang === 'en'
                      ? 'Nurturing Campus Culture: Student Voices & Creative Publications'
                      : 'ক্যাম্পাস সংস্কৃতি ও সৃজনশীল সাহিত্য প্রকাশনা সমন্বয়'}
                  </h4>

                  <p className="text-xs sm:text-sm font-serif-drama leading-relaxed text-black/85 mb-4 columns-1 sm:columns-2 gap-4">
                    {tscNewspaper.description[lang]}
                  </p>

                  <div className="mt-4 pt-4 border-t border-black/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-black/70">
                    <span className="font-bold text-black">
                      {lang === 'en' ? 'By Atiquzzaman Shiblu, President' : 'আতিকুজ্জামান শিবলু, সভাপতি'}
                    </span>
                    <span className="text-[#8C1D40] font-bold underline">
                      {lang === 'en' ? 'Click to flip page ➔' : 'পৃষ্ঠা উল্টাতে ক্লিক করুন ➔'}
                    </span>
                  </div>
                </div>
              ) : (
                /* Page Back: Publication & Impact */
                <div className="transform rotate-y-180">
                  <div className="inline-block px-2.5 py-0.5 bg-black text-white font-mono-code text-[11px] uppercase tracking-wider mb-3 font-bold">
                    PAGE 2 · PUBLICATION & EDITORIAL HIGHLIGHTS
                  </div>

                  <h4 className="font-serif-drama text-lg sm:text-xl font-bold mb-3 text-black">
                    {lang === 'en' ? 'Key Leadership Responsibilities & Impact' : 'দায়িত্ব ও প্রকাশনা অর্জন'}
                  </h4>

                  <ul className="space-y-2 mb-6">
                    {tscNewspaper.responsibilities[lang].map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-serif-drama text-black/90">
                        <CheckCircle2 className="w-4 h-4 text-[#8C1D40] shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 bg-black/5 rounded-lg border border-black/10 text-xs font-mono-code">
                    <p className="font-bold text-black mb-1">
                      {lang === 'en' ? 'Archived Issues in National Library:' : 'সংরক্ষিত প্রকাশনা সংখ্যা:'}
                    </p>
                    <p className="text-black/70">
                      {lang === 'en'
                        ? '14 issues catalogued in university central archives and student cultural union.'
                        : '১৪টি নিয়মিত ও বিশেষ সংখ্যা প্রকাশিত ও কেন্দ্রীয় টিএসসি আর্কাইভে সংরক্ষিত।'}
                    </p>
                  </div>

                  <p className="mt-6 text-center text-xs font-mono-code text-[#8C1D40] font-bold underline">
                    {lang === 'en' ? '⮌ Click to return to front page' : '⮌ প্রথম পৃষ্ঠায় ফিরতে ক্লিক করুন'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Metrics & Details */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif-drama text-2xl sm:text-3xl text-white">
              {tscNewspaper.title[lang]}
            </h3>
            <p className="text-xs font-mono-code text-[#C9A24B]">
              {tscNewspaper.organization[lang]} · {tscNewspaper.period}
            </p>

            {/* Metrics count cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {tscNewspaper.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl stage-glass border border-[#C9A24B]/30 text-center">
                  <span className="block text-2xl sm:text-3xl font-black font-cinzel text-[#F5D37C]">
                    {m.value.toLocaleString()}{m.suffix}
                  </span>
                  <span className="text-[11px] font-mono-code text-[#9E9AA0]">
                    {m.label[lang]}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl stage-glass border border-white/10 mt-4">
              <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#C9A24B] mb-2 font-bold">
                {lang === 'en' ? 'Publication & Leadership Competencies' : 'প্রকাশনা ও সাংগঠনিক ভিত্তি'}
              </h4>
              <p className="text-xs sm:text-sm text-[#F4EFE6]/80 leading-relaxed">
                {lang === 'en'
                  ? 'Orchestrated student cultural publications, guided creative layout aesthetics, managed print press schedules, and connected campus writers with university readers.'
                  : 'ক্যাম্পাসভিত্তিক সাংস্কৃতিক প্রকাশনা সমন্বয়, দৃষ্টিনন্দন প্রচ্ছদ ও লেআউট পরিকল্পনা, ছাপাখানা পরিচালনা এবং নবীন লেখকদের সৃজনশীল চিন্তার বিকাশ সাধন।'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: JUCSU Run 2026 & Batch Day Festival Carousel (PRD Act II) */}
      {activeTab === 'jucsu' && jucsuRun && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-[#C9A24B]/20 border border-[#C9A24B]/50 text-[#F5D37C]">
              {jucsuRun.period}
            </span>
            <h3 className="font-serif-drama text-2xl sm:text-4xl text-white">
              {jucsuRun.title[lang]}
            </h3>
            <p className="text-xs font-mono-code text-[#4CC9F0]">
              {jucsuRun.organization[lang]}
            </p>
            <p className="text-sm text-[#F4EFE6]/85 leading-relaxed">
              {jucsuRun.description[lang]}
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono-code uppercase text-[#9E9AA0] font-bold">
                {lang === 'en' ? 'Core Logistics & Responsibilities:' : 'লজিস্টিকস ও পরিচালনা:'}
              </h4>
              {jucsuRun.responsibilities[lang].map((r, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#F4EFE6]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Cylinder Stats Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl stage-glass-gold border border-[#C9A24B]/40 shadow-2xl">
              <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#9E9AA0] mb-4">
                {lang === 'en' ? 'Event Scale & Animated Metrics' : 'ইভেন্টের বিস্তার ও পরিসংখ্যান'}
              </h4>

              <div className="space-y-4">
                {jucsuRun.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono-code text-[#9E9AA0] block">
                        {m.label[lang]}
                      </span>
                      <span className="text-xs text-[#C9A24B]">
                        {lang === 'en' ? 'Verified Official JUCSU Count' : 'অফিসিয়াল জাকসু নথিভুক্ত'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
                        {m.value.toLocaleString()}{m.suffix}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-[#9E9AA0]">
                <span>{lang === 'en' ? 'Role: Chief Event Convener' : 'পদ: প্রধান ইভেন্ট আহ্বায়ক'}</span>
                <span className="text-[#52B788] font-bold">● {lang === 'en' ? 'Completed 100%' : 'সম্পূর্ণ সফল'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sponsorship & Team Coordination Node Graph (PRD Act II) */}
      {activeTab === 'network' && (
        <div className="p-6 sm:p-8 rounded-3xl stage-glass border border-white/10 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif-drama text-2xl sm:text-3xl text-white mb-2">
              {lang === 'en' ? 'Stakeholder & Sponsorship Coordination Graph' : 'স্পন্সর ও সমন্বয় নেটওয়ার্ক গ্রাফ'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9E9AA0]">
              {lang === 'en'
                ? 'Visual map illustrating central coordination linking Atiquzzaman Shiblu to external corporate brands, volunteer squads, and university administration.'
                : 'বিশ্ববিদ্যালয় প্রশাসন, করপোরেট স্পন্সর এবং স্বেচ্ছাসেবক বাহিনীর সাথে আতিকুজ্জামান শিবলুর সংযোগকারী নেটওয়ার্ক নকশা।'}
            </p>
          </div>

          {/* Interactive SVG Network Graph */}
          <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-black/70 border border-white/10 flex items-center justify-center p-4 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 600 360">
              {/* Connection Lines from Center */}
              <line x1="300" y1="180" x2="140" y2="90" stroke="#C9A24B" strokeWidth="2" strokeDasharray="4" />
              <line x1="300" y1="180" x2="460" y2="90" stroke="#E63550" strokeWidth="2" strokeDasharray="4" />
              <line x1="300" y1="180" x2="140" y2="270" stroke="#4CC9F0" strokeWidth="2" strokeDasharray="4" />
              <line x1="300" y1="180" x2="460" y2="270" stroke="#52B788" strokeWidth="2" strokeDasharray="4" />
              <line x1="300" y1="180" x2="300" y2="40" stroke="#F5D37C" strokeWidth="2" strokeDasharray="4" />

              {/* Center Node: Atiquzzaman Shiblu */}
              <g transform="translate(300, 180)">
                <circle r="36" fill="#1A1A22" stroke="#C9A24B" strokeWidth="3" />
                <circle r="42" fill="none" stroke="#C9A24B" strokeWidth="1" opacity="0.4" />
                <text textAnchor="middle" y="-4" fill="#F4EFE6" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  A. Shiblu
                </text>
                <text textAnchor="middle" y="12" fill="#C9A24B" fontSize="9" fontFamily="monospace">
                  CENTRAL HUB
                </text>
              </g>

              {/* Node 1: University Admin */}
              <g transform="translate(300, 40)">
                <circle r="26" fill="#1A1A22" stroke="#F5D37C" strokeWidth="2" />
                <text textAnchor="middle" y="4" fill="#FFF" fontSize="10" fontFamily="monospace">JU Admin</text>
              </g>

              {/* Node 2: Corporate Sponsors */}
              <g transform="translate(140, 90)">
                <circle r="30" fill="#1A1A22" stroke="#C9A24B" strokeWidth="2" />
                <text textAnchor="middle" y="-2" fill="#FFF" fontSize="10" fontWeight="bold">12+ Brands</text>
                <text textAnchor="middle" y="12" fill="#C9A24B" fontSize="8" fontFamily="monospace">Sponsors</text>
              </g>

              {/* Node 3: Editorial Board */}
              <g transform="translate(460, 90)">
                <circle r="30" fill="#1A1A22" stroke="#E63550" strokeWidth="2" />
                <text textAnchor="middle" y="-2" fill="#FFF" fontSize="10" fontWeight="bold">35 Writers</text>
                <text textAnchor="middle" y="12" fill="#E63550" fontSize="8" fontFamily="monospace">Editorial</text>
              </g>

              {/* Node 4: Volunteer Operations */}
              <g transform="translate(140, 270)">
                <circle r="30" fill="#1A1A22" stroke="#4CC9F0" strokeWidth="2" />
                <text textAnchor="middle" y="-2" fill="#FFF" fontSize="10" fontWeight="bold">85 Members</text>
                <text textAnchor="middle" y="12" fill="#4CC9F0" fontSize="8" fontFamily="monospace">Logistics</text>
              </g>

              {/* Node 5: Cultural Artists */}
              <g transform="translate(460, 270)">
                <circle r="30" fill="#1A1A22" stroke="#52B788" strokeWidth="2" />
                <text textAnchor="middle" y="-2" fill="#FFF" fontSize="10" fontWeight="bold">Stage Crew</text>
                <text textAnchor="middle" y="12" fill="#52B788" fontSize="8" fontFamily="monospace">Artists</text>
              </g>
            </svg>

            <div className="absolute bottom-3 left-4 text-xs font-mono-code text-[#C9A24B]">
              {lang === 'en' ? '● Synchronous Multi-Stakeholder Matrix' : '● বহুস্তরীয় সমন্বয় অবকাঠামো'}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
