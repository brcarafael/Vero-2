import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { useRouter } from '../context/RouterContext';
import { CORE_PRODUCTS, SOURCING_ON_INQUIRY_PRODUCTS } from '../data/products';
import { Menu, X, Globe, ArrowRight, ChevronDown, ShoppingBag } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { inquiryCount, scrollToInquiryForm } = useInquiry();
  const { route, navigateToHome, navigateToProduct } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const prevCountRef = useRef(inquiryCount);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevCountRef.current !== inquiryCount && inquiryCount > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 240);
      prevCountRef.current = inquiryCount;
      return () => clearTimeout(timer);
    }
    prevCountRef.current = inquiryCount;
  }, [inquiryCount]);

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

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setProductsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open, preserving scroll position
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);
    const targetId = href.replace(/^\/?#/, '');

    if (route.view !== 'home') {
      e.preventDefault();
      navigateToHome(targetId);
    } else {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        if (window.location.hash !== `#${targetId}`) {
          window.history.pushState(null, '', `/#${targetId}`);
        }
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: t.nav.howItWorks, href: '/#how-it-works' },
    { name: t.nav.about, href: '/#about-vero' },
    { name: t.nav.contact, href: '/#inquiry-form' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}
      >
        {/* Isolated background layer: prevents backdrop-filter from creating a containing block on header */}
        <div
          className={`absolute inset-0 -z-10 pointer-events-none transition-all duration-200 ${
            isScrolled
              ? 'bg-[#072C21]/95 backdrop-blur-md shadow-md border-b border-[#0B3D2E]'
              : 'bg-[#072C21] border-b border-[#0B3D2E]'
          }`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <button
            onClick={navigateToHome}
            className="flex flex-col text-left group shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7EF] rounded"
          >
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl tracking-tight text-[#FAF7EF] group-hover:text-white transition-colors">
                VERO
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold text-[#D9E5DC] border-l border-white/20 pl-2 tracking-wide uppercase">
                Trading Co.
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-[#D9E5DC]/80 uppercase font-medium">
              Canada · Commercial Desk
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#FAF7EF]">
            {/* Products Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProductsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 hover:text-white transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7EF] rounded"
                aria-expanded={productsDropdownOpen}
                aria-controls="products-dropdown-menu"
                aria-haspopup="true"
              >
                <span>{t.nav.products}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    productsDropdownOpen ? 'rotate-180 text-[#FAF7EF]' : 'text-[#D9E5DC]'
                  }`}
                />
              </button>

              {productsDropdownOpen && (
                <div
                  id="products-dropdown-menu"
                  className="absolute top-full left-0 mt-2 w-80 bg-[#FFFDF8] rounded-xl shadow-xl border border-[#CBD8CE] p-4 text-[#072C21] z-50 animate-fade-in"
                >
                  <div className="mb-3 pb-2 border-b border-[#E5DEC9] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#072C21] uppercase tracking-wider">
                      {t.nav.coreCategoryLabel}
                    </span>
                    <a
                      href="/#products"
                      onClick={(e) => handleNavClick(e, '/#products')}
                      className="text-[11px] text-[#064E3B] hover:text-[#0B3D2E] hover:underline font-semibold"
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
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#072C21] hover:bg-[#FAF7EF] hover:text-[#0B3D2E] transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span>{prod.shortTitle[language] || prod.shortTitle.en}</span>
                        <span className="text-[10px] text-[#0B3D2E]/60 group-hover:text-[#0B3D2E]">
                          →
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Additional Sourcing Section */}
                  <div className="pt-2 border-t border-[#E5DEC9]">
                    <span className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider block mb-1.5">
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
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#374151] hover:bg-[#FAF7EF] hover:text-[#0B3D2E] transition-colors flex items-center justify-between group cursor-pointer"
                        >
                          <span>{prod.shortTitle[language] || prod.shortTitle.en}</span>
                          <span className="text-[10px] text-[#0B3D2E]/60 group-hover:text-[#0B3D2E]">
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
                className="hover:text-white transition-colors whitespace-nowrap py-1 relative group tracking-wide cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7EF] rounded"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FAF7EF] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Actions: Lang Switcher + Inquiry Badge + Primary CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Trilingual Selector */}
            <div className="flex items-center gap-1 text-xs font-semibold text-[#D9E5DC] border border-white/20 bg-[#0B3D2E]/60 px-2 py-1 rounded-lg shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-[#D9E5DC]" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                  language === 'en' ? 'bg-[#FAF7EF] text-[#072C21] font-bold' : 'hover:text-[#FAF7EF]'
                }`}
              >
                EN
              </button>
              <span className="text-white/20">|</span>
              <button
                type="button"
                onClick={() => setLanguage('pt')}
                className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                  language === 'pt' ? 'bg-[#FAF7EF] text-[#072C21] font-bold' : 'hover:text-[#FAF7EF]'
                }`}
              >
                PT
              </button>
              <span className="text-white/20">|</span>
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                  language === 'es' ? 'bg-[#FAF7EF] text-[#072C21] font-bold' : 'hover:text-[#FAF7EF]'
                }`}
              >
                ES
              </button>
            </div>

            {/* Quick Inquiry Counter Badge */}
            {inquiryCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (route.view !== 'home') {
                    navigateToHome('inquiry-form');
                  } else {
                    scrollToInquiryForm();
                  }
                }}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0B3D2E] text-[#FAF7EF] text-xs font-semibold border border-white/20 hover:bg-[#0B3D2E]/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7EF] ${
                  isPulsing ? 'animate-counter-pulse' : ''
                }`}
                title="View Inquiry Basket"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#FAF7EF]" />
                <span>{inquiryCount}</span>
              </button>
            )}

            {/* Primary CTA: Talk to VERO with #FAF7EF background and #072C21 text, hover #EEE7D8 */}
            <button
              type="button"
              onClick={() => {
                if (route.view !== 'home') {
                  navigateToHome('inquiry-form');
                } else {
                  scrollToInquiryForm();
                }
              }}
              className="bg-[#FAF7EF] hover:bg-[#EEE7D8] text-[#072C21] px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 group whitespace-nowrap cursor-pointer active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7EF]"
            >
              <span>{t.nav.cta}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger & Language Selector */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#D9E5DC] bg-[#0B3D2E]/60 border border-white/20 px-2 py-1 rounded-md">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`cursor-pointer ${language === 'en' ? 'text-[#FAF7EF] font-bold underline' : 'hover:text-[#FAF7EF]'}`}
              >
                EN
              </button>
              <span className="text-white/20">/</span>
              <button
                type="button"
                onClick={() => setLanguage('pt')}
                className={`cursor-pointer ${language === 'pt' ? 'text-[#FAF7EF] font-bold underline' : 'hover:text-[#FAF7EF]'}`}
              >
                PT
              </button>
              <span className="text-white/20">/</span>
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`cursor-pointer ${language === 'es' ? 'text-[#FAF7EF] font-bold underline' : 'hover:text-[#FAF7EF]'}`}
              >
                ES
              </button>
            </div>

            {inquiryCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (route.view !== 'home') {
                    navigateToHome('inquiry-form');
                  } else {
                    scrollToInquiryForm();
                  }
                }}
                className={`relative p-2 rounded-lg bg-[#0B3D2E] text-[#FAF7EF] border border-white/20 cursor-pointer ${
                  isPulsing ? 'animate-counter-pulse' : ''
                }`}
                aria-label="Inquiry Basket"
              >
                <ShoppingBag className="w-4 h-4 text-[#FAF7EF]" />
                <span className="absolute -top-1 -right-1 bg-[#FAF7EF] text-[#072C21] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {inquiryCount}
                </span>
              </button>
            )}

            <button
              type="button"
              className="p-2 text-[#FAF7EF] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7EF] rounded-lg cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer rendered via Portal directly into document.body */}
      {mobileMenuOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[100] bg-[#072C21] text-[#FAF7EF] flex flex-col h-dvh max-h-screen overflow-y-auto animate-fade-in"
          >
            <div className="p-4 sm:p-6 flex items-center justify-between border-b border-[#0B3D2E] bg-[#072C21] sticky top-0 z-10">
              <div>
                <span className="font-heading font-bold text-2xl text-[#FAF7EF] block">
                  VERO
                </span>
                <span className="text-[10px] text-[#D9E5DC] uppercase tracking-wider">
                  Canada · Commercial Desk
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#D9E5DC] hover:text-[#FAF7EF] rounded-lg hover:bg-[#0B3D2E]/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7EF]"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
              {/* Products with Sub-items */}
              <div>
                <div className="text-xs uppercase tracking-wider text-[#D9E5DC] font-bold mb-2">
                  {t.nav.products}
                </div>
                <div className="space-y-1 pl-2 border-l-2 border-[#0B3D2E]">
                  {CORE_PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateToProduct(prod.id);
                      }}
                      className="block w-full text-left py-1.5 text-sm font-medium text-[#FAF7EF] hover:text-white transition-colors cursor-pointer"
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
                    handleNavClick(e, link.href);
                  }}
                  className="block text-lg font-heading font-semibold text-[#FAF7EF] hover:text-[#D9E5DC] py-2 border-b border-[#0B3D2E] cursor-pointer"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4">
                <span className="text-xs uppercase tracking-wider text-[#D9E5DC] block mb-2 font-semibold">
                  Language / Idioma
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('en');
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 text-center text-xs font-semibold rounded-lg border cursor-pointer transition-colors ${
                      language === 'en'
                        ? 'bg-[#FAF7EF] text-[#072C21] font-bold border-[#FAF7EF]'
                        : 'bg-[#0B3D2E] text-[#D9E5DC] border-white/20 hover:text-[#FAF7EF]'
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
                    className={`py-2 text-center text-xs font-semibold rounded-lg border cursor-pointer transition-colors ${
                      language === 'pt'
                        ? 'bg-[#FAF7EF] text-[#072C21] font-bold border-[#FAF7EF]'
                        : 'bg-[#0B3D2E] text-[#D9E5DC] border-white/20 hover:text-[#FAF7EF]'
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
                    className={`py-2 text-center text-xs font-semibold rounded-lg border cursor-pointer transition-colors ${
                      language === 'es'
                        ? 'bg-[#FAF7EF] text-[#072C21] font-bold border-[#FAF7EF]'
                        : 'bg-[#0B3D2E] text-[#D9E5DC] border-white/20 hover:text-[#FAF7EF]'
                    }`}
                  >
                    Español
                  </button>
                </div>
              </div>
            </nav>

            <div className="p-6 border-t border-[#0B3D2E] bg-[#072C21] mt-auto">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (route.view !== 'home') {
                    navigateToHome('inquiry-form');
                  } else {
                    scrollToInquiryForm();
                  }
                }}
                className="w-full bg-[#FAF7EF] hover:bg-[#EEE7D8] text-[#072C21] py-3.5 rounded-xl font-bold text-sm text-center block shadow-md cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7EF]"
              >
                {t.nav.cta}
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

