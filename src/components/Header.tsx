import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { useRouter } from '../context/RouterContext';
import { CORE_PRODUCTS, SOURCING_ON_INQUIRY_PRODUCTS } from '../data/products';
import { Menu, X, Globe, ArrowRight, ChevronDown, Check, ShoppingBag } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { inquiryCount, scrollToInquiryForm } = useInquiry();
  const { route, navigateToHome, navigateToProduct } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setProductsDropdownOpen(false);
    if (route.view !== 'home') {
      e.preventDefault();
      navigateToHome();
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  };

  const navLinks = [
    { name: t.nav.howItWorks, href: '#how-it-works' },
    { name: t.nav.about, href: '#about-vero' },
    { name: t.nav.contact, href: '#inquiry-form' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#FAF7EF]/95 backdrop-blur-md shadow-xs border-[#E5DEC9] py-3'
          : 'bg-[#FAF7EF] border-[#E5DEC9] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <button
          onClick={navigateToHome}
          className="flex flex-col text-left group shrink-0 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-2xl tracking-tight text-[#0B3D2E] group-hover:text-[#064E3B] transition-colors">
              VERO
            </span>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-[#0B3D2E]/80 border-l border-[#0B3D2E]/25 pl-2 tracking-wide uppercase">
              Trading Co.
            </span>
          </div>
          <span className="text-[10px] tracking-wider text-[#6B7280] uppercase font-medium">
            Canada · Commercial Desk
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#2D3748]">
          {/* Products Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
              className="flex items-center gap-1 hover:text-[#0B3D2E] transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3D2E] rounded"
              aria-expanded={productsDropdownOpen}
              aria-haspopup="true"
            >
              <span>{t.nav.products}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  productsDropdownOpen ? 'rotate-180 text-[#0B3D2E]' : 'text-[#6B7280]'
                }`}
              />
            </button>

            {productsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#D8E0D2] p-4 text-[#111827] z-50 animate-fade-in">
                <div className="mb-3 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0B3D2E] uppercase tracking-wider">
                    {t.nav.coreCategoryLabel}
                  </span>
                  <a
                    href="#products"
                    onClick={(e) => handleNavClick(e, '#products')}
                    className="text-[11px] text-[#064E3B] hover:underline font-medium"
                  >
                    View All
                  </a>
                </div>

                {/* 5 Core Products */}
                <div className="space-y-1 mb-3">
                  {CORE_PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => {
                        setProductsDropdownOpen(false);
                        navigateToProduct(prod.id);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-800 hover:bg-[#FAF7EF] hover:text-[#0B3D2E] transition-colors flex items-center justify-between group"
                    >
                      <span>{prod.shortTitle[language] || prod.shortTitle.en}</span>
                      <span className="text-[10px] text-gray-400 group-hover:text-[#0B3D2E]">
                        →
                      </span>
                    </button>
                  ))}
                </div>

                {/* Additional Sourcing Section */}
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    {t.nav.additionalCategoryLabel}
                  </span>
                  <div className="space-y-1">
                    {SOURCING_ON_INQUIRY_PRODUCTS.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => {
                          setProductsDropdownOpen(false);
                          navigateToProduct(prod.id);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-700 hover:bg-[#FAF7EF] hover:text-[#0B3D2E] transition-colors flex items-center justify-between group"
                      >
                        <span>{prod.shortTitle[language] || prod.shortTitle.en}</span>
                        <span className="text-[10px] text-gray-400 group-hover:text-[#0B3D2E]">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Regular Nav Links */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-[#0B3D2E] transition-colors whitespace-nowrap py-1 relative group tracking-wide"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B3D2E] transition-all duration-200 group-hover:w-full" />
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
                language === 'en' ? 'bg-[#0B3D2E] text-white' : 'hover:text-[#111827]'
              }`}
            >
              EN
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'pt' ? 'bg-[#0B3D2E] text-white' : 'hover:text-[#111827]'
              }`}
            >
              PT
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'es' ? 'bg-[#0B3D2E] text-white' : 'hover:text-[#111827]'
              }`}
            >
              ES
            </button>
          </div>

          {/* Quick Inquiry Counter Badge */}
          {inquiryCount > 0 && (
            <button
              type="button"
              onClick={scrollToInquiryForm}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#E2ECE3] text-[#0B3D2E] text-xs font-semibold border border-[#0B3D2E]/20 hover:bg-[#D8E0D2] transition-colors cursor-pointer"
              title="View Inquiry Basket"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{inquiryCount}</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            type="button"
            onClick={scrollToInquiryForm}
            className="bg-[#0B3D2E] hover:bg-[#064E3B] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 group whitespace-nowrap cursor-pointer active:scale-98"
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
              className={language === 'en' ? 'text-[#0B3D2E] font-bold underline' : ''}
            >
              EN
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={language === 'pt' ? 'text-[#0B3D2E] font-bold underline' : ''}
            >
              PT
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={language === 'es' ? 'text-[#0B3D2E] font-bold underline' : ''}
            >
              ES
            </button>
          </div>

          {inquiryCount > 0 && (
            <button
              type="button"
              onClick={scrollToInquiryForm}
              className="relative p-2 rounded-lg bg-[#E2ECE3] text-[#0B3D2E]"
              aria-label="Inquiry Basket"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-[#0B3D2E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
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
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-[#E5DEC9]">
            <div>
              <span className="font-heading font-bold text-2xl text-[#0B3D2E] block">
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
            {/* Products with Sub-items */}
            <div>
              <div className="text-xs uppercase tracking-wider text-[#6B7280] font-bold mb-2">
                {t.nav.products}
              </div>
              <div className="space-y-1 pl-2 border-l-2 border-[#0B3D2E]/20">
                {CORE_PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToProduct(prod.id);
                    }}
                    className="block w-full text-left py-1.5 text-sm font-medium text-gray-800 hover:text-[#0B3D2E]"
                  >
                    {prod.shortTitle[language] || prod.shortTitle.en}
                  </button>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className="block text-lg font-heading font-semibold text-[#111827] hover:text-[#0B3D2E] py-2 border-b border-[#E5DEC9]/60"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4">
              <span className="text-xs uppercase tracking-wider text-[#6B7280] block mb-2 font-semibold">
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
                      ? 'bg-[#0B3D2E] text-white border-[#0B3D2E]'
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
                      ? 'bg-[#0B3D2E] text-white border-[#0B3D2E]'
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
                      ? 'bg-[#0B3D2E] text-white border-[#0B3D2E]'
                      : 'bg-white text-[#374151] border-gray-200'
                  }`}
                >
                  Español
                </button>
              </div>
            </div>
          </nav>

          <div className="p-6 border-t border-[#E5DEC9] bg-white">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToInquiryForm();
              }}
              className="w-full bg-[#0B3D2E] text-white py-3.5 rounded-xl font-semibold text-sm text-center block shadow-md cursor-pointer"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
