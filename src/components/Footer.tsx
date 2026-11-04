import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { CORE_PRODUCTS } from '../data/products';
import { COMMERCIAL_EMAIL } from '../constants/contact';
import { Mail, Globe } from 'lucide-react';

export default function Footer() {
  const { t, language, setLanguage } = useLanguage();
  const { route, navigateToHome, navigateToProduct } = useRouter();

  const handleFooterLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (route.view !== 'home') {
      e.preventDefault();
      navigateToHome();
      setTimeout(() => {
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  };

  return (
    <footer className="bg-[#072C21] text-[#FAF7EF] py-14 lg:py-18 border-t border-[#0B3D2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                VERO
              </span>
              <span className="text-xs font-semibold text-[#A3C4B6] tracking-wider uppercase border-l border-white/20 pl-2">
                Trading Co.
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#D4DED9] font-normal leading-relaxed max-w-sm">
              {t.footer.brandDesc}
            </p>
            <div className="pt-2 text-xs text-[#A3C4B6]">
              Canada · Commercial Coordination
            </div>
          </div>

          {/* Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#A3C4B6] uppercase tracking-wider">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs text-[#D4DED9]">
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
                  href="#about-vero"
                  onClick={(e) => handleFooterLink(e, '#about-vero')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.about}
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

          {/* Core Products (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#A3C4B6] uppercase tracking-wider">
              {t.footer.productsTitle}
            </h4>
            <ul className="space-y-2 text-xs text-[#D4DED9]">
              {CORE_PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <button
                    type="button"
                    onClick={() => navigateToProduct(prod.id)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {prod.shortTitle[language] || prod.shortTitle.en}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial Contact & Languages (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-[#A3C4B6] uppercase tracking-wider mb-2">
                {t.footer.contactTitle}
              </h4>
              <a
                href={`mailto:${COMMERCIAL_EMAIL}`}
                className="text-white hover:text-[#A3C4B6] font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{COMMERCIAL_EMAIL}</span>
              </a>
              <p className="text-[11px] text-[#D4DED9] mt-2 leading-relaxed">
                {t.footer.contactNotice}
              </p>
            </div>

            {/* Language Selection */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#A3C4B6] uppercase tracking-wider block mb-2">
                Language / Idioma
              </span>
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    language === 'en'
                      ? 'bg-[#0B3D2E] text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <span className="text-gray-600">·</span>
                <button
                  type="button"
                  onClick={() => setLanguage('pt')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    language === 'pt'
                      ? 'bg-[#0B3D2E] text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  PT
                </button>
                <span className="text-gray-600">·</span>
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    language === 'es'
                      ? 'bg-[#0B3D2E] text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ES
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accurate Privacy & Compliance Notice */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#D4DED9]">
          <p className="max-w-xl text-center sm:text-left leading-relaxed">
            {t.footer.privacyNotice}
          </p>
          <p className="shrink-0">{t.footer.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
}
