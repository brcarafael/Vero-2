import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { heroImg } from '../data/products';
import { ArrowDown, ArrowRight, ShieldCheck, MapPin, Compass } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const { scrollToInquiryForm } = useInquiry();

  return (
    <section className="relative overflow-hidden bg-[#FAF7EF] pt-10 sm:pt-14 md:pt-18 pb-16 md:pb-24 border-b border-[#E5DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (7 cols): Editorial Headline, Dual Supporting Copy, Actions & Benefits */}
          <div className="lg:col-span-7 space-y-6 order-1">
            {/* Introductory Label */}
            <div className="text-xs uppercase tracking-wider font-bold text-[#064E3B]">
              {t.hero.tag}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-heading font-bold text-[#111827] tracking-tight leading-[1.14]">
              {t.hero.headline}
            </h1>

            {/* Main & Secondary Supporting Paragraphs */}
            <div className="space-y-3 max-w-2xl">
              <p className="text-base sm:text-lg text-[#1F2937] font-medium leading-relaxed">
                {t.hero.mainSupporting}
              </p>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                {t.hero.secondarySupporting}
              </p>
            </div>

            {/* Dual Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={scrollToInquiryForm}
                className="px-7 py-3.5 bg-[#064E3B] hover:bg-[#0B3D2E] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#064E3B]"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/#products"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.hash !== '#products') {
                    window.history.pushState(null, '', '/#products');
                  }
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-white hover:bg-[#EEE7D8] text-[#111827] border border-[#E5DEC9] rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#064E3B]"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowDown className="w-4 h-4 text-[#064E3B]" />
              </a>
            </div>

            {/* Three Compact Benefits under a Subtle Divider */}
            <div className="pt-7 border-t border-[#E5DEC9]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {t.hero.benefits.map((b, idx) => (
                  <div key={idx} className="space-y-1">
                    <h2 className="text-xs sm:text-sm font-bold text-[#111827]">
                      {b.title}
                    </h2>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Framed Shipping Photograph with Relationship Panels */}
          <div className="lg:col-span-5 order-2">
            <div className="bg-white p-3 sm:p-3.5 rounded-2xl border border-[#E5DEC9] shadow-xl animate-hero-settle motion-reduce:animate-none">
              {/* Shipping Photograph */}
              <div className="relative rounded-xl overflow-hidden bg-[#0F2F24] aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={heroImg}
                  alt="Agricultural export vessel loading Brazilian commodities for international shipping"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Two Clearly Labeled Canada-Brazil Relationship Panels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                <div className="p-2.5 rounded-lg bg-[#FAF7EF] border border-[#E5DEC9] text-xs">
                  <div className="text-[10px] font-bold text-[#064E3B] uppercase tracking-wider">
                    Commercial Contact
                  </div>
                  <div className="font-semibold text-[#111827] mt-0.5">
                    VERO · Canada
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#FAF7EF] border border-[#E5DEC9] text-xs">
                  <div className="text-[10px] font-bold text-[#064E3B] uppercase tracking-wider">
                    Brazilian Origin
                  </div>
                  <div className="font-semibold text-[#111827] mt-0.5">
                    Brasensa · Brazil
                  </div>
                </div>
              </div>

              {/* Supporting Strip */}
              <div className="mt-2.5 pt-2 border-t border-gray-100 text-center text-[11px] text-[#6B7280]">
                {t.hero.supportingStrip}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
