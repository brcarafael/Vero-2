import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import AmericasMap from './AmericasMap';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function OriginAndBrasensa() {
  const { t, language } = useLanguage();
  const [approachOpen, setApproachOpen] = useState(false);

  // Single-owner scroll reveal that triggers once when the section enters view
  // Natural re-arming with 50px buffer prevents restarts on slight scrolling
  const [sectionRef, isSectionVisible] = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px',
    exitBufferPx: 50,
  });

  // Localized role classification eyebrows
  const roleLabels = {
    en: {
      vero: 'North American Coordination',
      brasensa: 'Origin Sourcing & Export',
    },
    pt: {
      vero: 'Coordenação na América do Norte',
      brasensa: 'Originação e Exportação no Brasil',
    },
    es: {
      vero: 'Coordinación en América del Norte',
      brasensa: 'Originación y Exportación en Brasil',
    },
  }[language] || {
    vero: 'North American Coordination',
    brasensa: 'Origin Sourcing & Export',
  };

  return (
    <section
      id="about-vero"
      className="py-16 sm:py-24 bg-[#FFFDF8] border-b border-[#E5DEC9] scroll-mt-20"
    >
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Two-Column Opening: Heading/Intro on the Left, Americas Vector Map on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column (6 cols): Eyebrow, Editorial Headline & Clear Commercial Narrative */}
          <div
            className={`lg:col-span-6 space-y-4 max-w-xl order-1 heading-reveal ${
              isSectionVisible ? 'is-visible' : ''
            }`}
          >
            <div className="text-xs uppercase tracking-wider font-bold text-[#0B3D2E]">
              {t.partnership.tag}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] tracking-tight leading-[1.18] text-balance">
              {t.partnership.headline}
            </h2>
            <p className="text-base sm:text-lg text-[#374151] leading-relaxed pt-1">
              {t.partnership.intro}
            </p>
          </div>

          {/* Right Column (6 cols): Custom Vector Map of the Americas directly on the cream background */}
          <div className="lg:col-span-6 order-2 flex items-center justify-center">
            <AmericasMap
              isRevealed={isSectionVisible}
              language={language}
            />
          </div>
        </div>

        {/* Compact Role Descriptions Band Directly Beneath Opening */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#E5DEC9]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 md:divide-x md:divide-[#E5DEC9]">
            {/* VERO — Canada (North American Coordination) */}
            <div className="md:pr-10 lg:pr-14 space-y-2.5">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3D2E]">
                {roleLabels.vero}
              </div>
              <h3 className="text-xl font-bold font-heading text-[#111827]">
                {t.partnership.veroTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                {t.partnership.veroDesc}
              </p>
            </div>

            {/* Brasensa — Brazil (Origin Sourcing & Export) */}
            <div className="md:pl-10 lg:pl-14 space-y-2.5">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3D2E]">
                {roleLabels.brasensa}
              </div>
              <h3 className="text-xl font-bold font-heading text-[#111827]">
                {t.partnership.brasensaTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                {t.partnership.brasensaDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Approach Disclosure brought closer with entire row clickable */}
        <div className="mt-8 pt-6 border-t border-[#E5DEC9]">
          <button
            type="button"
            onClick={() => setApproachOpen(!approachOpen)}
            className="flex items-center justify-between w-full text-left py-3 px-3.5 -mx-3.5 rounded-xl hover:bg-[#FAF7EF] transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3D2E]"
            aria-expanded={approachOpen}
            aria-controls="approach-disclosure-content"
          >
            <span className="text-sm font-semibold text-[#0B3D2E] group-hover:text-[#064E3B] transition-colors">
              {t.partnership.disclosureTitle}
            </span>
            <span className="p-1.5 rounded-md bg-[#E2ECE3] text-[#0B3D2E] group-hover:bg-[#D9E5DC] transition-colors ml-2">
              {approachOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </span>
          </button>

          {/* Gentle expansion container for approach steps */}
          <div
            id="approach-disclosure-content"
            className={`grid transition-all duration-300 ease-out overflow-hidden ${
              approachOpen
                ? 'grid-rows-[1fr] opacity-100 mt-4'
                : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
            }`}
            aria-hidden={!approachOpen}
          >
            <div className="min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white border border-[#E5DEC9] shadow-2xs">
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
