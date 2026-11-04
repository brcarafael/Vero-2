import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { heroImg } from '../data/products';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const { scrollToInquiryForm } = useInquiry();

  return (
    <section className="relative overflow-hidden bg-[#FAF7EF] pt-10 sm:pt-14 md:pt-18 pb-16 md:pb-24 border-b border-[#E5DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (7 cols): Editorial Headline & Dual Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet Typographic Kicker (Zero-Pill Discipline) */}
            <div className="text-xs uppercase tracking-wider font-bold text-[#0B3D2E]">
              {t.hero.tag}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-heading font-bold text-[#111827] tracking-tight leading-[1.12]">
              {t.hero.headline}
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg md:text-xl text-[#374151] leading-relaxed max-w-2xl font-normal">
              {t.hero.supporting}
            </p>

            {/* Dual Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#products"
                className="px-7 py-3.5 bg-[#0B3D2E] hover:bg-[#064E3B] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={scrollToInquiryForm}
                className="px-7 py-3.5 bg-white hover:bg-[#F5EFE3] text-[#111827] border border-[#D8E0D2] rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer active:scale-98"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 text-[#0B3D2E]" />
              </button>
            </div>

            {/* Concise Origin & Trade Route Note */}
            <div className="pt-6 border-t border-[#E5DEC9] text-xs text-[#6B7280]">
              <span className="font-semibold text-[#111827]">Core Origins:</span> Brazil ·{' '}
              <span className="font-semibold text-[#111827]">Commercial Desk:</span> Canada ·{' '}
              <span className="font-semibold text-[#111827]">Languages:</span> English, Portuguese, Spanish
            </div>
          </div>

          {/* Right Column (5 cols): Prominent, Authentic Photography (Clean, No Nested Boxes) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#D8E0D2] shadow-lg bg-[#0F2F24] aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={heroImg}
                alt="Agricultural export vessel loading Brazilian commodities for international shipping"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white text-[11px] font-medium drop-shadow-sm flex items-center justify-between">
                <span>Brazilian Export Corridor</span>
                <span className="text-gray-300">Port of Santos & Center-South</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
