import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { ArrowRight } from 'lucide-react';

export default function HowVeroHelps() {
  const { t } = useLanguage();
  const { scrollToInquiryForm } = useInquiry();

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 bg-[#FAF7EF] border-b border-[#E5DEC9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-wider font-bold text-[#0B3D2E] mb-2">
            {t.howVeroHelps.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] tracking-tight">
            {t.howVeroHelps.headline}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {t.howVeroHelps.subheadline}
          </p>
        </div>

        {/* 5 Points in a Clean Editorial Layout (Varied Composition, Not Repetitive Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-12 border-b border-[#E5DEC9]">
          {t.howVeroHelps.points.map((point, idx) => (
            <div
              key={idx}
              className={`space-y-3 ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="font-mono text-xs font-bold text-[#0B3D2E] tracking-wider">
                [{point.num}]
              </div>
              <h3 className="text-base sm:text-lg font-heading font-semibold text-[#111827] leading-snug">
                {point.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quiet Direct Link to Inquiry */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#4B5563]">
          <p>
            Have a specific Brazilian commodity requirement? Our commercial desk is ready to review your parameters.
          </p>
          <button
            type="button"
            onClick={scrollToInquiryForm}
            className="inline-flex items-center space-x-1.5 font-semibold text-[#0B3D2E] hover:text-[#064E3B] underline underline-offset-4 cursor-pointer self-start sm:self-auto"
          >
            <span>Start a commercial conversation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
