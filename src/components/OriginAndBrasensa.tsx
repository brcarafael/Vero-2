import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function OriginAndBrasensa() {
  const { t } = useLanguage();
  const [approachOpen, setApproachOpen] = useState(false);

  const [headingRef, isHeadingVisible] = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px',
    exitBufferPx: 50,
  });

  const [rolesRef, isRolesVisible] = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px',
    exitBufferPx: 50,
  });

  return (
    <section
      id="about-vero"
      className="py-16 sm:py-24 bg-[#FAF7EF] border-b border-[#E5DEC9] scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with consistent heading reveal */}
        <div
          ref={headingRef}
          className={`max-w-3xl mb-12 heading-reveal ${
            isHeadingVisible ? 'is-visible' : ''
          }`}
        >
          <div className="text-xs uppercase tracking-wider font-bold text-[#0B3D2E] mb-2">
            {t.partnership.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] tracking-tight">
            {t.partnership.headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#374151] leading-relaxed">
            {t.partnership.intro}
          </p>
        </div>

        {/* Clean 2-Column Role Composition with reading order reveal of VERO & Brasensa labels */}
        <div
          ref={rolesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-10 border-b border-[#E5DEC9]"
        >
          {/* VERO — Canada (First in reading order) */}
          <div className="space-y-3">
            <div
              className={`text-xs font-mono font-bold uppercase tracking-wider text-[#0B3D2E] role-label-settle ${
                isRolesVisible ? 'is-settled' : ''
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              North American Coordination
            </div>
            <h3 className="text-xl font-bold font-heading text-[#111827]">
              {t.partnership.veroTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {t.partnership.veroDesc}
            </p>
          </div>

          {/* Brasensa — Brazil (Second in reading order, 120ms stagger) */}
          <div className="space-y-3">
            <div
              className={`text-xs font-mono font-bold uppercase tracking-wider text-[#0B3D2E] role-label-settle ${
                isRolesVisible ? 'is-settled' : ''
              }`}
              style={{ transitionDelay: '120ms' }}
            >
              Origin Sourcing & Export
            </div>
            <h3 className="text-xl font-bold font-heading text-[#111827]">
              {t.partnership.brasensaTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {t.partnership.brasensaDesc}
            </p>
          </div>
        </div>

        {/* Secondary Approach Disclosure with gentle expansion and immediate close */}
        <div className="pt-8">
          <button
            type="button"
            onClick={() => setApproachOpen(!approachOpen)}
            className="flex items-center justify-between w-full text-left py-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3D2E] rounded-lg"
            aria-expanded={approachOpen}
            aria-controls="approach-disclosure-content"
          >
            <span className="text-sm font-semibold text-[#0B3D2E] group-hover:text-[#064E3B] transition-colors">
              {t.partnership.disclosureTitle}
            </span>
            <span className="p-1.5 rounded-md bg-[#E2ECE3] text-[#0B3D2E] group-hover:bg-[#D8E0D2] transition-colors ml-2">
              {approachOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </span>
          </button>

          {/* Gentle expansion container */}
          <div
            id="approach-disclosure-content"
            className={`grid transition-all duration-300 ease-out overflow-hidden ${
              approachOpen
                ? 'grid-rows-[1fr] opacity-100 mt-6'
                : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
            }`}
            aria-hidden={!approachOpen}
          >
            <div className="min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white border border-[#D8E0D2] shadow-xs">
                {t.partnership.approachSteps.map((step, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
