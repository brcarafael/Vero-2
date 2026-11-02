import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { heroImg } from '../data/products';
import { ArrowRight, ArrowDown, Globe2, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const { t, language } = useLanguage();
  const { scrollToInquiryForm } = useInquiry();

  const tLabels = {
    en: {
      deskTitle: 'Commercial Desk',
      deskVal: 'VERO (Canada)',
      originTitle: 'Brazilian Origination',
      originVal: 'Brasensa (Brazil)',
      operationalFocus: 'Commercial Scope: FCL Containers & Industrial Scale',
      originRoute: 'BRAZILIAN ORIGIN',
      destRoute: 'GLOBAL MARKETS',
      commoditiesList: 'Green Coffee · Cane Sugar · Dry Beans · Fresh Fruit · Grain Sorghum',
    },
    pt: {
      deskTitle: 'Desk Comercial',
      deskVal: 'VERO (Canadá)',
      originTitle: 'Originação no Brasil',
      originVal: 'Brasensa (Brasil)',
      operationalFocus: 'Atendimento: Contratos FCL e Escala Industrial',
      originRoute: 'ORIGEM BRASIL',
      destRoute: 'DESTINOS GLOBAIS',
      commoditiesList: 'Café Verde · Açúcar · Feijões · Frutas Frescas · Sorgo Granífero',
    },
    es: {
      deskTitle: 'Desk Comercial',
      deskVal: 'VERO (Canadá)',
      originTitle: 'Originación en Brasil',
      originVal: 'Brasensa (Brasil)',
      operationalFocus: 'Enfoque: Contratos FCL y Escala Industrial',
      originRoute: 'ORIGEN BRASIL',
      destRoute: 'MERCADOS GLOBALES',
      commoditiesList: 'Café Verde · Azúcar · Frijoles · Frutas Frescas · Sorgo Granífero',
    },
  }[language];

  return (
    <section className="relative overflow-hidden bg-[#FAF7EF] pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-24 border-b border-[#EFE3CF]">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#E2ECE3]/50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-[#F5EFE3] rounded-full blur-2xl opacity-70 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Typographic Label / Kicker */}
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-[#E2ECE3]/70 px-3 py-1 rounded-md">
              <span className="w-2 h-2 rounded-full bg-[#064E3B]" />
              <span>{t.hero.tag}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-heading font-bold text-[#111827] tracking-tight leading-[1.12]">
              {t.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl font-normal text-[#374151] leading-relaxed max-w-2xl">
              {t.hero.subheadline}
            </p>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-sm md:text-base text-[#4B5563] font-normal leading-relaxed max-w-xl">
              {t.hero.supporting}
            </p>

            {/* Dual Direct CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={scrollToInquiryForm}
                className="px-7 py-3.5 bg-[#064E3B] hover:bg-[#0B3D2E] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#products"
                className="px-7 py-3.5 bg-white hover:bg-gray-50 text-[#111827] border border-[#D8E0D2] hover:border-gray-400 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowDown className="w-4 h-4 text-[#4B5563]" />
              </a>
            </div>

            {/* 3 Core Highlights */}
            <div className="pt-6 border-t border-[#EFE3CF] grid grid-cols-1 sm:grid-cols-3 gap-4">
              {t.hero.features.map(
                (feature: { label: string; desc: string }, i: number) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#064E3B]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{feature.label}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#4B5563] leading-snug">
                      {feature.desc}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Visual Column (5 Cols): Trade Corridor Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-white p-4 sm:p-5 shadow-xl border border-[#D8E0D2] overflow-hidden group">
              {/* Photo of Export Port Logistics */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-[#061F18]">
                <img
                  src={heroImg}
                  alt="Brazilian agricultural commodities export vessel at port"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061F18]/90 via-[#061F18]/30 to-black/20" />

                {/* Overlaid Label */}
                <div className="absolute top-3 left-3 bg-[#FAF7EF]/95 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold text-[#064E3B] border border-white/60">
                  B2B Trade Channel
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px] text-gray-200 mb-1">
                    <span className="font-semibold text-[#FAF7EF]">
                      {tLabels.originRoute}
                    </span>
                    <span className="text-[#C9A24A]">⇄</span>
                    <span className="font-semibold text-[#FAF7EF]">
                      {tLabels.destRoute}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-light truncate">
                    {tLabels.commoditiesList}
                  </p>
                </div>
              </div>

              {/* Bilateral Trade Specs Grid */}
              <div className="mt-4 grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-[#FAF7EF] rounded-xl border border-[#EFE3CF]">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold block mb-1">
                    {tLabels.deskTitle}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-900">
                    <Globe2 className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
                    <span>{tLabels.deskVal}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7EF] rounded-xl border border-[#EFE3CF]">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold block mb-1">
                    {tLabels.originTitle}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-900">
                    <Building2 className="w-3.5 h-3.5 text-[#0B3D2E] shrink-0" />
                    <span>{tLabels.originVal}</span>
                  </div>
                </div>
              </div>

              {/* Operational Focus Banner */}
              <div className="mt-3 px-3.5 py-2.5 bg-[#E2ECE3]/70 rounded-xl flex items-center justify-between text-[11px] text-[#064E3B]">
                <span className="font-medium">{tLabels.operationalFocus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
