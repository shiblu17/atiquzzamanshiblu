import React from 'react';
import { X, FileDown, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Language } from '../types';
import { soundManager } from '../lib/soundManager';

interface CVDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const CVDownloadModal: React.FC<CVDownloadModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const handleDownload = (type: 'academic' | 'portfolio') => {
    soundManager.playTactileTick();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#B3122D', '#C9A24B', '#F5D37C', '#4CC9F0'],
    });

    // Create and trigger dynamic printable text document download
    const filename = type === 'academic'
      ? 'Atiquzzaman_Shiblu_Academic_CV.txt'
      : 'Atiquzzaman_Shiblu_Theatrical_Portfolio.txt';

    const content = `==================================================================
CURRICULUM VITAE: ATIQUZZAMAN SHIBLU
Department of Drama & Dramatic Theory, Jahangirnagar University (52nd Batch)
President, TSC-Affiliated Campus Newspaper
Target Objective: Master's in Theatre Studies & Performance (Trinity College Dublin / University of Galway)
Contact: atiquzzaman.shiblu.ju@gmail.com | github.com/atiquzzaman-shiblu
==================================================================

1. ACADEMIC BACKGROUND
- Bachelor of Arts (Honours) in Drama & Dramatic Theory
  Department of Drama & Dramatic Theory, Jahangirnagar University, Savar, Dhaka.
  Focus: Scenography, Archival Dramaturgy, Playwriting & Theatrical Semiotics.

2. THEATRICAL PERFORMANCES & PRODUCTIONS
- "Rakta Karabi" (Red Oleanders) by Rabindranath Tagore
  Role: The Professor (অধ্যাপক) | Script Editing | Production Finance
  Venue: Zahir Raihan Auditorium, Jahangirnagar University (2024)
- "Aar Koto Din" by Zahir Raihan
  Role: Ensemble Lead & Dramaturgical Assistant (2023)
- Bangladesh Shilpakala Academy Collaborations
  Role: Performer & Technical Stage Rigging Crew, National Theatre Hall (2023-2025)
- 1:12 Miniature Stage Set: Vintage Chemistry Laboratory
  Role: Lead Scenographer & Scale Modeller (Blender 3D + Handcrafted Balsa & Etched Brass)

3. EDITORIAL LEADERSHIP & CAMPUS GOVERNANCE
- President & Editor-in-Chief, TSC-Affiliated Campus Newspaper
  Led 35 staff journalists, published 14 investigative issues, reached 18,000+ readers.
- Chief Event Convener, JUCSU Run 2026 & Batch Day Festival
  Coordinated 2,500+ runners, 12 corporate brand sponsors, 85-member volunteer operations squad.

4. TECHNOLOGY & WEB ARCHITECTURES
- Theatre Rehearsal Management System (React, Supabase, Tailwind, TypeScript)
- JU Campus Transit GPS Tracker (Mobile telemetry, WebSockets, real-time bus map)
- Autonomous Workflow Pipelines (Make.com, n8n, Google Apps Script, REST APIs)

5. RESEARCH ASPIRATIONS (IRELAND GRADUATE STUDIES)
- Investigating the convergence of traditional Bengali dramatic forms (Tagore) with contemporary European scenographic technologies at Trinity College Dublin (The Lir Academy) and University of Galway.
==================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl stage-glass-gold border border-[#C9A24B]/40 text-left text-[#F4EFE6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C9A24B]/20 border border-[#C9A24B]/50 flex items-center justify-center text-[#F5D37C]">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-drama text-2xl text-white">
              {lang === 'en' ? 'Academic Dossier & CV' : 'একাডেমিক জীবনবৃত্তান্ত ও পোর্টফোলিও'}
            </h3>
            <p className="text-xs text-[#C9A24B] font-mono-code">
              Atiquzzaman Shiblu · JU 52nd Batch
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#F4EFE6]/80 mb-6 leading-relaxed">
          {lang === 'en'
            ? 'Verified records formatted for graduate admissions committees (Trinity College Dublin, University of Galway) and professional theatre repertories.'
            : 'উচ্চশিক্ষা ভর্তি কমিটি (ট্রিনিটি কলেজ ডাবলিন, ইউনিভার্সিটি অব গ্যালওয়ে) ও পেশাদার নাট্য প্রযোজকদের জন্য প্রস্তুতকৃত পূর্ণাঙ্গ তথ্যাবলি।'}
        </p>

        {/* Download Options */}
        <div className="space-y-3 mb-6">
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-[#C9A24B]/60 transition-all flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">
                {lang === 'en' ? 'Comprehensive Academic Curriculum Vitae' : 'পূর্ণাঙ্গ একাডেমিক জীবনবৃত্তান্ত (সিভি)'}
              </h4>
              <p className="text-[11px] text-[#9E9AA0] font-mono-code">
                {lang === 'en' ? 'Education, Honours, Dramaturgy, Leadership & Tech' : 'শিক্ষা, সম্মাননা, নাট্যতত্ত্ব, নেতৃত্ব ও প্রযুক্তি'}
              </p>
            </div>
            <button
              onClick={() => handleDownload('academic')}
              className="px-4 py-2 rounded-xl bg-[#C9A24B] hover:bg-[#F5D37C] text-black font-mono-code text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <FileDown className="w-4 h-4" />
              <span>{lang === 'en' ? 'Download' : 'ডাউনলোড'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-[#4CC9F0]/60 transition-all flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">
                {lang === 'en' ? 'Theatrical Production & Scenography Portfolio' : 'নাট্য প্রযোজনা ও দৃশ্যশিল্প পোর্টফোলিও'}
              </h4>
              <p className="text-[11px] text-[#9E9AA0] font-mono-code">
                {lang === 'en' ? 'Rakta Karabi, 1:12 Miniature Set, Shilpakala logs' : 'রক্তকরবী, ১:১২ ক্ষুদ্রাকৃতির মডেল, শিল্পকলা লগ'}
              </p>
            </div>
            <button
              onClick={() => handleDownload('portfolio')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono-code text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <FileDown className="w-4 h-4 text-[#4CC9F0]" />
              <span>{lang === 'en' ? 'Download' : 'ডাউনলোড'}</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-mono-code bg-white/5 hover:bg-white/10 text-[#9E9AA0] hover:text-white transition-all cursor-pointer"
          >
            {lang === 'en' ? 'Close Window' : 'বন্ধ করুন'}
          </button>
        </div>
      </div>
    </div>
  );
};
