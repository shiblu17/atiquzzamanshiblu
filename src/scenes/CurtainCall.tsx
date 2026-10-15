import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail } from 'lucide-react';
import type { Language } from '../types';
import { soundManager } from '../lib/soundManager';

interface CurtainCallProps {
  lang: Language;
}

export const CurtainCall: React.FC<CurtainCallProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Collaboration',
    message: '',
    honeypot: '', // honeypot spam protection (PRD Feature F8)
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Spam check
    if (formData.honeypot) {
      console.warn('Bot detected via honeypot.');
      return;
    }
    setIsSubmitting(true);
    soundManager.playTactileTick();

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundManager.playCurtainSwish();
    }, 900);
  };

  const subjectOptions = [
    { value: 'Collaboration', label: { en: 'Theatrical Collaboration / Direction', bn: 'নাট্য সহযোগিতা ও নির্দেশনা' } },
    { value: 'Scholarship', label: { en: 'Scholarship & Academia (Dublin / Galway)', bn: 'স্কলারশিপ ও গবেষণা (ডাবলিন / গ্যালওয়ে)' } },
    { value: 'Tech', label: { en: 'Web Engineering & Automation Project', bn: 'ওয়েব ইঞ্জিনিয়ারিং ও অটোমেশন' } },
    { value: 'Publications', label: { en: 'Campus Culture & Publication Inquiries', bn: 'সাংস্কৃতিক প্রকাশনা ও সাধারণ যোগাযোগ' } },
  ];

  return (
    <section id="curtain-call" className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 z-10 text-left">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full stage-glass border border-[#B3122D]/50 text-xs font-mono-code text-[#E63550] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#B3122D]" />
          <span>{lang === 'en' ? 'Final Scene · Curtain Call' : 'চূড়ান্ত দৃশ্য · যবনিকাপাত'}</span>
        </div>
        <h2 className="font-serif-drama text-3xl sm:text-5xl md:text-6xl text-white mb-4">
          {lang === 'en' ? 'Take Your Seat Backstage' : 'যোগাযোগ ও সংলাপ'}
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#9E9AA0] font-sans">
          {lang === 'en'
            ? 'Whether for theatre direction, academic scholarship discourse, or technology architectures — the green room is always open.'
            : 'নাট্য প্রযোজনা, প্রাতিষ্ঠানিক গবেষণা কিংবা ওয়েব অটোমেশন প্রযুক্তি — যে কোনো সংলাপের জন্য আমন্ত্রণ রইল।'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
        {/* Contact Form Card (with Spotlight Focus) */}
        <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl stage-glass-gold border border-[#C9A24B]/40 shadow-2xl relative overflow-hidden">
          {/* Subtle Top Red Ribbon */}
          <div className="absolute top-0 inset-x-0 h-1 bg-[#B3122D]" />

          {isSubmitted ? (
            <div className="text-center py-12 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#52B788]/20 border border-[#52B788] text-[#52B788] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-drama text-2xl text-white">
                {lang === 'en' ? 'Message Received Backstage!' : 'বার্তাটি মঞ্চের নেপথ্যে পৌঁছেছে!'}
              </h3>
              <p className="text-xs sm:text-sm text-[#9E9AA0] font-mono-code max-w-sm mx-auto">
                {lang === 'en'
                  ? 'Thank you for reaching out. I will review your cue and respond promptly.'
                  : 'ধন্যবাদ আপনার বার্তার জন্য। দ্রুততম সময়ে আপনার সাথে যোগাযোগ করা হবে।'}
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-5 py-2 text-xs font-mono-code rounded-xl border border-[#C9A24B] text-[#C9A24B] hover:bg-[#C9A24B] hover:text-black transition-all cursor-pointer"
              >
                {lang === 'en' ? 'Send Another Message' : 'আরেকটি বার্তা পাঠান'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field for bot spam defense (hidden from human visitors) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="block text-xs font-mono-code text-[#C9A24B] uppercase tracking-wider mb-1.5">
                  {lang === 'en' ? 'Your Name / Designation' : 'আপনার নাম / পরিচয়'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === 'en' ? 'e.g. Director / Prof. / Tech Lead' : 'যেমন: নাট্য পরিচালক / অধ্যাপক / প্রযোজক'}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-white/30 text-base sm:text-sm focus:outline-none focus:border-[#C9A24B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-[#C9A24B] uppercase tracking-wider mb-1.5">
                  {lang === 'en' ? 'Email Address' : 'ইমেইল ঠিকানা'}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-white/30 text-base sm:text-sm focus:outline-none focus:border-[#C9A24B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-[#C9A24B] uppercase tracking-wider mb-1.5">
                  {lang === 'en' ? 'Inquiry Category' : 'বিষয় শ্রেণী'}
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-white/10 text-white text-base sm:text-sm focus:outline-none focus:border-[#C9A24B] transition-colors cursor-pointer"
                >
                  {subjectOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#1A1A1E]">
                      {opt.label[lang]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-[#C9A24B] uppercase tracking-wider mb-1.5">
                  {lang === 'en' ? 'Message / Theatrical Cue' : 'বার্তা / প্রস্তাবনা'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'en' ? 'Describe your project, production, or academic proposal...' : 'আপনার প্রস্তাবনা বা বার্তাটি লিখুন...'}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-white/30 text-base sm:text-sm focus:outline-none focus:border-[#C9A24B] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#B3122D] to-[#8C0E23] hover:from-[#E63550] hover:to-[#B3122D] text-white font-mono-code text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-[#E63550]/40 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{lang === 'en' ? 'Dispatching to Stage...' : 'বার্তা পাঠানো হচ্ছে...'}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Transmit Cue Backstage' : 'বার্তা প্রেরণ করুন'}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Perforated Theatrical Admission Tickets (PRD Feature) */}
        <div className="md:col-span-5 space-y-4">
          <div className="text-left mb-2">
            <h3 className="font-serif-drama text-xl text-white">
              {lang === 'en' ? 'Admission Tickets & Channels' : 'থিয়েটার টিকিট ও সরাসরি যোগাযোগ'}
            </h3>
            <p className="text-xs text-[#9E9AA0] font-mono-code">
              {lang === 'en' ? 'Tap tickets to call or message' : 'সরাসরি যোগাযোগ করতে টিকিটে ট্যাপ করুন'}
            </p>
          </div>

          {/* Social Ticket 1: Direct Phone Call / WhatsApp */}
          <a
            href="tel:+8801317982413"
            className="group block relative p-4 rounded-2xl bg-[#1A1A22] border border-[#C9A24B]/30 hover:border-[#C9A24B] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-black ticket-edge-left active:scale-[0.98]"
          >
            <div className="flex items-center justify-between text-xs font-mono-code text-[#C9A24B] mb-1">
              <span>DIRECT HOTLINE · ফোন ও হোয়াটসঅ্যাপ</span>
              <span className="font-bold">#JU52-DIRECT</span>
            </div>
            <h4 className="font-bold text-white text-base group-hover:text-[#F5D37C] transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C9A24B] shrink-0" />
              <span>{lang === 'en' ? '+880 1317-982413' : '০১৩১৭-৯৮২৪১৩'}</span>
            </h4>
            <p className="text-[11px] text-[#9E9AA0]">
              {lang === 'en' ? 'Direct phone call, WhatsApp & theatrical collaboration' : 'সরাসরি ফোন কল, হোয়াটসঅ্যাপ ও নাট্য প্রযোজনা যোগাযোগ'}
            </p>
          </a>

          {/* Social Ticket 2: Email Direct */}
          <a
            href="mailto:atiquzzaman116592@gmail.com"
            className="group block relative p-4 rounded-2xl bg-[#1A1A22] border border-[#4CC9F0]/30 hover:border-[#4CC9F0] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-black ticket-edge-left active:scale-[0.98]"
          >
            <div className="flex items-center justify-between text-xs font-mono-code text-[#4CC9F0] mb-1">
              <span>PRIMARY CORRESPONDENCE · প্রধান ইমেইল</span>
              <span>GMAIL</span>
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-[#4CC9F0] transition-colors flex items-center gap-2 break-all">
              <Mail className="w-4 h-4 text-[#4CC9F0] shrink-0" />
              <span>atiquzzaman116592@gmail.com</span>
            </h4>
            <p className="text-[11px] text-[#9E9AA0]">
              {lang === 'en' ? 'Academic discourse, scholarship & production inquiries' : 'উচ্চশিক্ষা, স্কলারশিপ ও প্রাতিষ্ঠানিক বার্তা'}
            </p>
          </a>

          {/* Social Ticket 3: Campus Affiliation */}
          <div className="p-4 rounded-2xl bg-[#1A1A22] border border-white/10 ticket-edge-left">
            <div className="flex items-center justify-between text-xs font-mono-code text-[#E63550] mb-1">
              <span>CAMPUS RESIDENCE</span>
              <span>SAVAR, DHAKA</span>
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">
              Jahangirnagar University
            </h4>
            <p className="text-[11px] text-[#9E9AA0]">
              {lang === 'en'
                ? 'Department of Drama & Dramatic Theory · Savar, Dhaka-1342, Bangladesh'
                : 'নাট্যকলা ও নাট্যতত্ত্ব বিভাগ · সাভার, ঢাকা-১৩৪২, বাংলাদেশ'}
            </p>
          </div>
        </div>
      </div>

      {/* Theatrical Curtain Call Closing Footer (PRD Footer line) */}
      <footer className="pt-12 border-t border-white/10 text-center space-y-3">
        <p className="font-serif-drama italic text-base sm:text-lg text-[#F5D37C]">
          {lang === 'en'
            ? '"Thank you for coming. The ghost light stays on."'
            : '"উপস্থিত থাকার জন্য ধন্যবাদ। মঞ্চের ঘোস্ট লাইট সদা প্রজ্বলিত থাকবে।"'}
        </p>

        <p className="text-xs font-mono-code text-[#9E9AA0]">
          © {new Date().getFullYear()} Atiquzzaman Shiblu · Designed & Built as an Interactive 3D Theatre
        </p>
      </footer>
    </section>
  );
};
