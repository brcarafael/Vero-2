import React, { useState } from 'react';
import { useInquiry } from '../context/InquiryContext';
import { useLanguage } from '../context/LanguageContext';
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
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const tLabels = {
    en: {
      inquiryTitle: 'Your Inquiry Basket',
      itemSingle: 'commodity selected',
      itemPlural: 'commodities selected',
      proceedBtn: 'Complete Inquiry',
      clearBtn: 'Clear all',
      noItems: 'No commodities selected yet',
      hint: 'Browse commodities and click "Add to inquiry" to combine multiple items.',
    },
    pt: {
      inquiryTitle: 'Sua Consulta Comercial',
      itemSingle: 'commodity selecionada',
      itemPlural: 'commodities selecionadas',
      proceedBtn: 'Concluir Consulta',
      clearBtn: 'Limpar',
      noItems: 'Nenhuma commodity selecionada',
      hint: 'Navegue pelos produtos e clique em "Adicionar à consulta" para combinar múltiplos itens.',
    },
    es: {
      inquiryTitle: 'Su Consulta Comercial',
      itemSingle: 'commodity seleccionada',
      itemPlural: 'commodities seleccionadas',
      proceedBtn: 'Completar Consulta',
      clearBtn: 'Limpiar',
      noItems: 'Ninguna commodity seleccionada',
      hint: 'Explore los productos y haga clic en "Añadir a consulta" para combinar varios productos.',
    },
  }[language];

  // Toast notification for newly added item
  const renderToast = () => {
    if (!notification) return null;
    return (
      <div className="fixed bottom-24 right-4 sm:right-8 z-50 animate-bounce duration-300">
        <div className="bg-[#064E3B] text-[#FAF7EF] px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 border border-[#E2ECE3]/30">
          <div className="w-5 h-5 rounded-full bg-[#FAF7EF] text-[#064E3B] flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{notification}</span>
          <button
            onClick={dismissNotification}
            className="text-[#FAF7EF]/70 hover:text-white ml-2"
            aria-label="Dismiss"
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
          className="fixed bottom-0 inset-x-0 z-40 bg-[#0B3D2E] text-[#FAF7EF] border-t border-[#FAF7EF]/20 shadow-2xl transition-all duration-300 backdrop-blur-md"
        >
          {/* Expanded Drawer preview */}
          {isExpanded && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-2 border-b border-[#FAF7EF]/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest text-[#FAF7EF]/60 font-medium">
                  {tLabels.inquiryTitle} ({inquiryCount})
                </span>
                <button
                  onClick={clearInquiry}
                  className="text-xs text-[#FAF7EF]/60 hover:text-[#FAF7EF] underline decoration-[#FAF7EF]/40"
                >
                  {tLabels.clearBtn}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pb-2 max-h-36 overflow-y-auto">
                {selectedProductIds.map((id) => {
                  const product = getProductById(id);
                  if (!product) return null;
                  const title = product.title[language] || product.title.en;
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7EF]/15 border border-[#FAF7EF]/20 text-xs sm:text-sm font-medium text-white"
                    >
                      <span>{title}</span>
                      <button
                        onClick={() => removeProduct(id)}
                        className="text-[#FAF7EF]/70 hover:text-white hover:bg-black/20 rounded p-0.5"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Compact Primary Bar */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3 min-w-0">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2 text-left group"
                aria-expanded={isExpanded}
              >
                <div className="relative w-8 h-8 rounded-lg bg-[#FAF7EF] text-[#064E3B] flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
                  <ShoppingBag className="w-4 h-4 text-[#064E3B]" />
                  <span className="absolute -top-1.5 -right-1.5 bg-[#C9A24A] text-[#111827] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {inquiryCount}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold truncate text-[#FAF7EF]">
                    {inquiryCount}{' '}
                    {inquiryCount === 1 ? tLabels.itemSingle : tLabels.itemPlural}
                  </p>
                  <p className="text-[11px] text-[#FAF7EF]/70 hidden sm:block truncate">
                    {selectedProductIds
                      .map((id) => getProductById(id)?.title[language] || id)
                      .join(' · ')}
                  </p>
                </div>
                <div className="text-[#FAF7EF]/60 group-hover:text-white pl-1">
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
                onClick={scrollToInquiryForm}
                className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-[#FAF7EF] text-[#064E3B] hover:bg-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
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
