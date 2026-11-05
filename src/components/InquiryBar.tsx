import React, { useState, useEffect, useRef } from 'react';
import { useInquiry } from '../context/InquiryContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { getProductById } from '../data/products';
import { ShoppingBag, ArrowRight, X, Check, ChevronUp, ChevronDown } from 'lucide-react';

export default function InquiryBar() {
  const {
    selectedProductIds,
    removeProduct,
    clearInquiry,
    inquiryCount,
    notification,
    dismissNotification,
    scrollToInquiryForm,
  } = useInquiry();
  const { route, navigateToHome } = useRouter();
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const prevCountRef = useRef(inquiryCount);

  useEffect(() => {
    if (prevCountRef.current !== inquiryCount && inquiryCount > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 240);
      prevCountRef.current = inquiryCount;
      return () => clearTimeout(timer);
    }
    prevCountRef.current = inquiryCount;
  }, [inquiryCount]);

  const tLabels = {
    en: {
      inquiryTitle: 'Your Inquiry Selection',
      itemSingle: 'product selected',
      itemPlural: 'products selected',
      proceedBtn: 'Complete Inquiry',
      clearBtn: 'Clear all',
      otherLabel: 'Other / Not sure yet',
    },
    pt: {
      inquiryTitle: 'Sua Seleção de Consulta',
      itemSingle: 'produto selecionado',
      itemPlural: 'produtos selecionados',
      proceedBtn: 'Concluir Consulta',
      clearBtn: 'Limpar tudo',
      otherLabel: 'Outro / A definir',
    },
    es: {
      inquiryTitle: 'Su Selección de Consulta',
      itemSingle: 'producto seleccionado',
      itemPlural: 'productos seleccionados',
      proceedBtn: 'Completar Consulta',
      clearBtn: 'Limpiar todo',
      otherLabel: 'Otro / Por definir',
    },
  }[language];

  const getProductName = (id: string) => {
    if (id === 'other') return tLabels.otherLabel;
    const prod = getProductById(id);
    return prod ? prod.shortTitle[language] || prod.shortTitle.en : id;
  };

  // Toast notification for newly added item
  const renderToast = () => {
    if (!notification) return null;
    return (
      <div className="fixed bottom-24 right-4 sm:right-8 z-50 animate-bounce duration-300">
        <div className="bg-[#0B3D2E] text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 border border-[#E5DEC9]/30">
          <div className="w-5 h-5 rounded-full bg-white text-[#0B3D2E] flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{notification}</span>
          <button
            type="button"
            onClick={dismissNotification}
            className="text-white/70 hover:text-white ml-2 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  if (inquiryCount === 0 && !notification) {
    return null;
  }

  return (
    <>
      {renderToast()}

      {inquiryCount > 0 && (
        <aside
          aria-label="Inquiry Basket"
          className="fixed bottom-0 inset-x-0 z-40 bg-[#0B3D2E] text-[#FAF7EF] border-t border-white/15 shadow-2xl transition-all duration-200 backdrop-blur-md"
        >
          {/* Expanded Drawer preview */}
          {isExpanded && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-2 border-b border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest text-[#A3C4B6] font-semibold">
                  {tLabels.inquiryTitle} ({inquiryCount})
                </span>
                <button
                  type="button"
                  onClick={clearInquiry}
                  className="text-xs text-[#D4DED9] hover:text-white underline decoration-white/40 cursor-pointer"
                >
                  {tLabels.clearBtn}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pb-2 max-h-36 overflow-y-auto">
                {selectedProductIds.map((id) => (
                  <span
                    key={id}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs sm:text-sm font-medium text-white"
                  >
                    <span>{getProductName(id)}</span>
                    <button
                      type="button"
                      onClick={() => removeProduct(id)}
                      className="text-white/70 hover:text-white hover:bg-black/20 rounded p-0.5 cursor-pointer"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Compact Primary Bar */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3 min-w-0">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2.5 text-left group cursor-pointer"
                aria-expanded={isExpanded}
              >
                <div className={`relative w-8 h-8 rounded-lg bg-white text-[#0B3D2E] flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0 transition-transform ${isPulsing ? 'animate-counter-pulse' : ''}`}>
                  <ShoppingBag className="w-4 h-4 text-[#0B3D2E]" />
                  <span className={`absolute -top-1.5 -right-1.5 bg-[#0B3D2E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white transition-transform ${isPulsing ? 'animate-counter-pulse' : ''}`}>
                    {inquiryCount}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold truncate text-[#FAF7EF]">
                    {inquiryCount}{' '}
                    {inquiryCount === 1 ? tLabels.itemSingle : tLabels.itemPlural}
                  </p>
                  <p className="text-[11px] text-[#A3C4B6] hidden sm:block truncate">
                    {selectedProductIds.map(getProductName).join(' · ')}
                  </p>
                </div>
                <div className="text-white/60 group-hover:text-white pl-1">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </div>
              </button>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (route.view !== 'home') {
                    navigateToHome('inquiry-form');
                  } else {
                    scrollToInquiryForm();
                  }
                }}
                className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white text-[#0B3D2E] hover:bg-[#FAF7EF] text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <span>{tLabels.proceedBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
