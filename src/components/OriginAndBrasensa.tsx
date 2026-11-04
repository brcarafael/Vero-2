import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function OriginAndBrasensa() {
  const { t } = useLanguage();
  const [approachOpen, setApproachOpen] = useState(false);

  return (
    <section
      id="about-vero"
      className="py-16 sm:py-24 bg-[#FAF7EF] border-b border-[#E5DEC9]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
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

        {/* Clean 2-Column Role Composition with Restrained Connection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-10 border-b border-[#E5DEC9]">
          {/* VERO — Canada */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3D2E]">
              North American Coordination
            </div>
            <h3 className="text-xl font-bold font-heading text-[#111827]">
              {t.partnership.veroTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {t.partnership.veroDesc}
            </p>
          </div>

          {/* Brasensa — Brazil */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3D2E]">
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

        {/* Secondary Approach Disclosure (Closed by Default) */}
        <div className="pt-8">
          <button
            type="button"
            onClick={() => setApproachOpen(!approachOpen)}
            className="flex items-center justify-between w-full text-left py-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3D2E] rounded-lg"
            aria-expanded={approachOpen}
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

          {approachOpen && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white border border-[#D8E0D2] shadow-xs animate-fade-in">
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
          )}
        </div>
      </div>
    </section>
  );
}
