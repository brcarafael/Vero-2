import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function CommercialProcess() {
  const { t } = useLanguage();

  return (
    <section
      id="process"
      className="py-16 md:py-24 bg-[#0B3D2E] text-[#FAF7EF] relative overflow-hidden border-b border-[#072C21]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-wider font-bold text-[#A3C4B6] mb-2">
            {t.process.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
            {t.process.headline}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D4DED9] leading-relaxed">
            {t.process.subheadline}
          </p>
        </div>

        {/* 3 Visible, Easy to Scan Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pb-12 border-b border-white/15">
          {t.process.steps.map((step, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#A3C4B6] tracking-widest uppercase">
                  Step 0{step.num}
                </span>
                <span className="h-px flex-1 bg-white/15" />
              </div>

              <h3 className="text-lg font-heading font-semibold text-white leading-snug">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#D4DED9] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Honest Commercial Process Notice (No Guaranteed Quotes / Shipment Times) */}
        <div className="mt-8 text-xs text-[#A3C4B6]/90 leading-relaxed max-w-3xl">
          {t.process.notice}
        </div>
      </div>
    </section>
  );
}
