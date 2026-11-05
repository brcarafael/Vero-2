import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, Search, Sliders, CheckCircle2 } from 'lucide-react';

export default function CommercialProcess() {
  const { t } = useLanguage();

  const stepIcons = [Send, Search, Sliders, CheckCircle2];

  return (
    <section
      id="process"
      className="py-16 md:py-24 bg-[#0B3D2E] text-[#FAF7EF] relative overflow-hidden border-b border-[#072C21] scroll-mt-20"
    >
      {/* Subtle Circular Decoration in the Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full border border-white/5 opacity-50" />
        <div className="absolute -right-10 -top-10 w-[480px] h-[480px] rounded-full border border-white/5 opacity-30" />
        <div className="absolute -left-32 -bottom-32 w-[520px] h-[520px] rounded-full border border-white/5 opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-widest font-bold text-[#C9A24A] mb-2 font-mono">
            {t.process.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white tracking-tight">
            {t.process.headline}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D4DED9] leading-relaxed">
            {t.process.introduction}
          </p>
        </div>

        {/* Four Darker Green Cards in a Row on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6">
          {t.process.steps.map((step, index) => {
            const Icon = stepIcons[index] || Send;
            return (
              <div
                key={index}
                className="bg-[#062D22]/85 border border-[#164E3D] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#1F6A53] transition-colors"
              >
                <div>
                  {/* Top Row: Gold Accent Step Number & Outline Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C9A24A] tracking-widest uppercase">
                      Step 0{step.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#0F3D30] text-[#A3C4B6] flex items-center justify-center shrink-0 border border-white/5">
                      <Icon className="w-4 h-4 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-4">
                    <h3 className="text-base sm:text-lg font-heading font-semibold text-white leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D4DED9] leading-relaxed mt-2.5">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Compact Footer Label */}
                <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-medium text-[#A3C4B6]">
                  <span>{step.footerLabel}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24A]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Note */}
        <div className="mt-6 text-xs text-[#A3C4B6]/90 leading-relaxed max-w-3xl italic">
          {t.process.notice}
        </div>
      </div>
    </section>
  );
}
