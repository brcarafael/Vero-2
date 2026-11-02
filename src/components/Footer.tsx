import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { ShieldCheck, Mail, MapPin } from 'lucide-react';
import { COMMERCIAL_EMAIL } from '../constants/contact';

export default function Footer() {
  const { t, language, setLanguage } = useLanguage();
  const { route, navigateToHome } = useRouter();

  const handleFooterLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (route.view !== 'home') {
      e.preventDefault();
      navigateToHome();
      setTimeout(() => {
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-[#061F18] text-[#FAF7EF] py-14 lg:py-18 border-t border-[#0B3D2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                VERO
              </span>
              <span className="text-xs font-semibold text-[#C9A24A] tracking-wider uppercase">
                Trading Co.
              </span>
            </div>
            <p className="text-xs text-[#C9A24A] font-bold uppercase tracking-wider">
              {t.footer.brandTag}
            </p>
            <p className="text-xs sm:text-sm text-[#F5EFE3]/75 font-normal leading-relaxed max-w-sm">
              {t.footer.aboutShort}
            </p>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-[#C9A24A] uppercase tracking-wider mb-4">
              {t.footer.linksHeading}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5EFE3]/80">
              <li>
                <a
                  href="#products"
                  onClick={(e) => handleFooterLink(e, '#products')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.products}
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleFooterLink(e, '#how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleFooterLink(e, '#process')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.process}
                </a>
              </li>
              <li>
                <a
                  href="#partnership"
                  onClick={(e) => handleFooterLink(e, '#partnership')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.partnership}
                </a>
              </li>
              <li>
                <a
                  href="#inquiry-form"
                  onClick={(e) => handleFooterLink(e, '#inquiry-form')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Languages & Commercial Office (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <h4 className="text-xs font-bold text-[#C9A24A] uppercase tracking-wider mb-3">
                Language / Idioma
              </h4>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    language === 'en'
                      ? 'bg-[#064E3B] text-white border-[#064E3B] font-bold'
                      : 'border-white/20 text-[#F5EFE3]/70 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('pt')}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    language === 'pt'
                      ? 'bg-[#064E3B] text-white border-[#064E3B] font-bold'
                      : 'border-white/20 text-[#F5EFE3]/70 hover:text-white'
                  }`}
                >
                  Português
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    language === 'es'
                      ? 'bg-[#064E3B] text-white border-[#064E3B] font-bold'
                      : 'border-white/20 text-[#F5EFE3]/70 hover:text-white'
                  }`}
                >
                  Español
                </button>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#F5EFE3]/70">
              <span className="block font-semibold text-white mb-0.5">
                Canada Commercial Desk:
              </span>
              <a
                href={`mailto:${COMMERCIAL_EMAIL}`}
                className="text-[#C9A24A] hover:underline font-mono font-bold flex items-center gap-1.5 mt-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{COMMERCIAL_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Regulatory & Commercial Disclaimer */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          <div className="flex items-start gap-2.5 text-xs text-[#F5EFE3]/60 leading-relaxed max-w-5xl">
            <ShieldCheck className="w-4 h-4 text-[#C9A24A] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white/90 block mb-1">
                {t.footer.legalHeading}
              </span>
              <p className="font-normal">{t.footer.legalText}</p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F5EFE3]/40">
            <p>{t.footer.rights}</p>
            <p>Canada Commercial Desk · Brazilian Origination with Brasensa</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
