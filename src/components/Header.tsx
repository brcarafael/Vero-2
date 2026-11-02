import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { useRouter } from '../context/RouterContext';
import { Menu, X, Globe, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { inquiryCount, scrollToInquiryForm } = useInquiry();
  const { route, navigateToHome } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (route.view !== 'home') {
      e.preventDefault();
      navigateToHome();
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navLinks = [
    { name: t.nav.products, href: '#products' },
    { name: t.nav.howItWorks, href: '#how-it-works' },
    { name: t.nav.process, href: '#process' },
    { name: t.nav.partnership, href: '#partnership' },
    { name: t.nav.contact, href: '#inquiry-form' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#FAF7EF]/95 backdrop-blur-md shadow-xs border-[#EFE3CF] py-3'
          : 'bg-[#FAF7EF] border-[#EFE3CF] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <button
          onClick={navigateToHome}
          className="flex flex-col text-left group shrink-0 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-2xl tracking-tight text-[#064E3B] group-hover:text-[#0B3D2E] transition-colors">
              VERO
            </span>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-[#064E3B]/80 border-l border-[#064E3B]/30 pl-2 tracking-wide uppercase">
              Trading Co.
            </span>
          </div>
          <span className="text-[10px] tracking-wider text-[#6B7280] uppercase font-medium">
            Canada · Commercial Desk
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold text-[#374151]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-[#064E3B] transition-colors whitespace-nowrap py-1 relative group tracking-wide"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#064E3B] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions: Lang Switcher + Inquiry Badge + Primary CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Trilingual Selector */}
          <div className="flex items-center gap-1 text-xs font-semibold text-[#4B5563] border border-[#D8E0D2] bg-white px-2 py-1 rounded-lg shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-[#6B7280]" />
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'en' ? 'bg-[#064E3B] text-white' : 'hover:text-[#111827]'
              }`}
            >
              EN
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'pt' ? 'bg-[#064E3B] text-white' : 'hover:text-[#111827]'
              }`}
            >
              PT
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'es' ? 'bg-[#064E3B] text-white' : 'hover:text-[#111827]'
              }`}
            >
              ES
            </button>
          </div>

          {/* Quick Inquiry Counter Badge if items added */}
          {inquiryCount > 0 && (
            <button
              onClick={scrollToInquiryForm}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#E2ECE3] text-[#064E3B] text-xs font-semibold border border-[#064E3B]/20 hover:bg-[#D8E0D2] transition-colors"
              title="View Inquiry Basket"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{inquiryCount}</span>
            </button>
          )}

          <button
            onClick={scrollToInquiryForm}
            className="bg-[#064E3B] hover:bg-[#0B3D2E] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 group whitespace-nowrap cursor-pointer active:scale-98"
          >
            <span>{t.nav.cta}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger & Language Selector */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#4B5563] bg-white border border-[#D8E0D2] px-2 py-1 rounded-md">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={language === 'en' ? 'text-[#064E3B] font-bold underline' : ''}
            >
              EN
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={language === 'pt' ? 'text-[#064E3B] font-bold underline' : ''}
            >
              PT
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={language === 'es' ? 'text-[#064E3B] font-bold underline' : ''}
            >
              ES
            </button>
          </div>

          {inquiryCount > 0 && (
            <button
              onClick={scrollToInquiryForm}
              className="relative p-2 rounded-lg bg-[#E2ECE3] text-[#064E3B]"
              aria-label="Inquiry Basket"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-[#C9A24A] text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {inquiryCount}
              </span>
            </button>
          )}

          <button
            type="button"
            className="p-2 text-[#374151] hover:text-[#111827] focus:outline-none rounded-lg"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF7EF] flex flex-col overflow-y-auto">
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-[#EFE3CF]">
            <div>
              <span className="font-heading font-bold text-2xl text-[#064E3B] block">
                VERO
              </span>
              <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">
                Canada · Commercial Desk
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#4B5563] hover:text-[#111827] rounded-lg hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className="block text-lg font-heading font-semibold text-[#111827] hover:text-[#064E3B] py-2.5 border-b border-[#EFE3CF]/50"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-6">
              <span className="text-xs uppercase tracking-wider text-[#6B7280] block mb-3 font-semibold">
                Language / Idioma
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('en');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 text-center text-xs font-semibold rounded-lg border ${
                    language === 'en'
                      ? 'bg-[#064E3B] text-white border-[#064E3B]'
                      : 'bg-white text-[#374151] border-gray-200'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('pt');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 text-center text-xs font-semibold rounded-lg border ${
                    language === 'pt'
                      ? 'bg-[#064E3B] text-white border-[#064E3B]'
                      : 'bg-white text-[#374151] border-gray-200'
                  }`}
                >
                  Português
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('es');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 text-center text-xs font-semibold rounded-lg border ${
                    language === 'es'
                      ? 'bg-[#064E3B] text-white border-[#064E3B]'
                      : 'bg-white text-[#374151] border-gray-200'
                  }`}
                >
                  Español
                </button>
              </div>
            </div>
          </nav>

          <div className="p-6 border-t border-[#EFE3CF] bg-white">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToInquiryForm();
              }}
              className="w-full bg-[#064E3B] text-white py-3.5 rounded-xl font-semibold text-sm text-center block shadow-md cursor-pointer"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
