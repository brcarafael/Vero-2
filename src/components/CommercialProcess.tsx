import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, ShieldCheck, Inbox, SearchCheck, Sliders, CheckSquare2 } from 'lucide-react';

const stepIcons = [Inbox, SearchCheck, Sliders, CheckSquare2];

export default function CommercialProcess() {
  const { t } = useLanguage();

  return (
    <section id="process" className="py-16 md:py-24 bg-[#0B3D2E] text-[#FAF7EF] relative overflow-hidden border-y border-[#061F18]">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3">
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke="#FAF7EF">
          <circle cx="200" cy="200" r="180" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="120" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="60" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24A] mb-2 block">
            {t.commercialProcess.tag}
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white tracking-tight mb-4 leading-tight">
            {t.commercialProcess.headline}
          </h2>
          <p className="text-base sm:text-lg text-[#F5EFE3]/80 font-normal leading-relaxed">
            {t.commercialProcess.subheadline}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {t.commercialProcess.steps.map((step: any, index: number) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <div
                key={index}
                className="bg-[#061F18]/70 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-[#FAF7EF]/10 shadow-lg flex flex-col justify-between hover:border-[#C9A24A]/40 transition-all duration-300 group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold tracking-wider text-[#C9A24A] uppercase">
                      {step.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FAF7EF] group-hover:bg-[#C9A24A] group-hover:text-[#061F18] transition-colors">
                      <Icon className="w-4 h-4" strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-base font-display font-bold text-white tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F5EFE3]/75 leading-relaxed font-normal mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Highlight Label */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-[#C9A24A]">
                  <span>{step.highlight}</span>
                  <span className="text-white/40 font-mono text-[10px]">0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest Commercial Process Notice (No false promises) */}
        <div className="mt-12 p-5 rounded-2xl bg-[#061F18]/85 border border-[#FAF7EF]/15 flex items-start gap-3.5 max-w-4xl">
          <ShieldCheck className="w-5 h-5 text-[#C9A24A] shrink-0 mt-0.5" />
          <p className="text-xs text-[#F5EFE3]/85 leading-relaxed font-normal">
            {t.commercialProcess.notice}
          </p>
        </div>

      </div>
    </section>
  );
}
