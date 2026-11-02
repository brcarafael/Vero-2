import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { MessageSquareText, SlidersHorizontal, GitFork, ClipboardCheck, ArrowRight } from 'lucide-react';

const pillarIcons = [MessageSquareText, SlidersHorizontal, GitFork, ClipboardCheck];

export default function HowVeroHelps() {
  const { t, language } = useLanguage();
  const { scrollToInquiryForm } = useInquiry();

  const tLabels = {
    en: {
      reassuranceNote:
        'We work directly on verified parameters to eliminate redundant broker chains, unclear specifications, and slow communication.',
      reassuranceAction: 'Discuss parameters with our Canada desk',
      cardBadge: 'Canada Desk · Trade Support',
    },
    pt: {
      reassuranceNote:
        'Trabalhamos diretamente sobre os parâmetros reais da sua compra para evitar intermediários redundantes e demora de resposta.',
      reassuranceAction: 'Apresentar parâmetros ao desk no Canadá',
      cardBadge: 'Desk Canadá · Apoio Comercial',
    },
    es: {
      reassuranceNote:
        'Trabajamos directamente sobre especificaciones confirmadas para evitar intermediarios innecesarios y demoras de comunicación.',
      reassuranceAction: 'Presentar parámetros a nuestro desk en Canadá',
      cardBadge: 'Desk Canadá · Soporte Comercial',
    },
  }[language];

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 bg-[#FAF7EF] relative overflow-hidden border-b border-[#EFE3CF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#064E3B] bg-[#E2ECE3] px-3.5 py-1.5 rounded-full inline-block mb-3">
            {t.howItWorks.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] tracking-tight">
            {t.howItWorks.headline}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {t.howItWorks.subheadline}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.howItWorks.pillars.map(
            (
              pillar: { num: string; title: string; desc: string },
              idx: number
            ) => {
              const Icon = pillarIcons[idx % pillarIcons.length];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D8E0D2] shadow-xs hover:border-[#064E3B]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Bar with Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xl font-bold text-[#064E3B]">
                        {pillar.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#E2ECE3] text-[#064E3B] flex items-center justify-center">
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </div>
                    </div>

                    <h3 className="text-base font-bold font-heading text-[#111827] tracking-tight mb-2.5">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4B5563] font-normal leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] font-semibold text-[#064E3B] uppercase tracking-wider">
                    {tLabels.cardBadge}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Practical reassurance note */}
        <div className="mt-10 p-5 bg-[#F5EFE3] rounded-2xl border border-[#D8E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#374151] leading-relaxed font-normal">
            {tLabels.reassuranceNote}
          </p>
          <button
            type="button"
            onClick={scrollToInquiryForm}
            className="shrink-0 inline-flex items-center space-x-1.5 text-xs font-bold text-[#064E3B] hover:text-[#0B3D2E] underline underline-offset-4 cursor-pointer"
          >
            <span>{tLabels.reassuranceAction}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
