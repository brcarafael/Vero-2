import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { ArrowRight, UserCheck, FileText, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export default function HowVeroHelps() {
  const { t } = useLanguage();
  const { scrollToInquiryForm } = useInquiry();

  const cardIcons = [UserCheck, FileText, ArrowLeftRight, CheckCircle2];

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 bg-[#FAF7EF] border-b border-[#E5DEC9] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-wider font-bold text-[#064E3B] mb-2">
            {t.howVeroHelps.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] tracking-tight">
            {t.howVeroHelps.headline}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {t.howVeroHelps.introduction}
          </p>
        </div>

        {/* Four White Numbered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
          {t.howVeroHelps.cards.map((card, idx) => {
            const Icon = cardIcons[idx] || UserCheck;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#D8E0D2] p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Number on left, Pale-green Icon Tile on right */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#064E3B] tracking-wider">
                      {card.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#E2ECE3] text-[#064E3B] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-5">
                    <h3 className="text-base sm:text-lg font-heading font-semibold text-[#111827] leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mt-2.5">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Strip & Inquiry Link */}
        <div className="pt-8 border-t border-[#E5DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#4B5563]">
          <p className="max-w-2xl">
            {t.howVeroHelps.bottomStrip}
          </p>
          <button
            type="button"
            onClick={scrollToInquiryForm}
            className="inline-flex items-center space-x-1.5 font-semibold text-[#064E3B] hover:text-[#0B3D2E] underline underline-offset-4 cursor-pointer self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#064E3B] rounded-sm"
          >
            <span>{t.howVeroHelps.bottomLink}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
