import React, { useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Box, Tag, Globe, ArrowRight, FileText } from 'lucide-react';
import { ProductDetail } from '../data/copy';
import { useLanguage } from '../context/LanguageContext';

interface ProductModalProps {
  product: ProductDetail | null;
  onClose: () => void;
  onSelectForRfq: (product: ProductDetail) => void;
  onRequestSpecSheet: (product: ProductDetail) => void;
}

export default function ProductModal({
  product,
  onClose,
  onSelectForRfq,
  onRequestSpecSheet,
}: ProductModalProps) {
  const { language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const labels = {
    pt: {
      category: 'Parâmetros de Exportação',
      origin: 'Origem no Brasil:',
      grades: 'Especificações Usuais',
      packaging: 'Formatos de Embarque',
      inspection: 'Controle de Qualidade na Origem',
      notesTitle: 'Notas Comerciais & Viabilidade:',
      disclaimer: 'Todas as especificações técnicas definitivas, certificados de análise (COA), safras e cronogramas de embarque são alinhados conforme a disponibilidade dos parceiros de origem no Brasil.',
      requestSpec: 'Solicitar Ficha Técnica Completa',
      configureRfq: 'Consultar este Produto',
      verifiedOrigin: 'Origem agrícola brasileira verificada',
    },
    en: {
      category: 'Export Specifications',
      origin: 'Origin in Brazil:',
      grades: 'Standard Export Specifications',
      packaging: 'Export Packaging Formats',
      inspection: 'Origin Quality Verification',
      notesTitle: 'Commercial Notes & Sourcing Feasibility:',
      disclaimer: 'All final technical specifications, certificates of analysis (COA), crop years, and shipment schedules are confirmed according to supply availability with Brazilian origin partners.',
      requestSpec: 'Request Full Technical Specification',
      configureRfq: 'Inquire on this Product',
      verifiedOrigin: 'Verified Brazilian agricultural origin',
    },
    es: {
      category: 'Parámetros de Exportación',
      origin: 'Origen en Brasil:',
      grades: 'Especificaciones Habituales',
      packaging: 'Formatos de Embarque',
      inspection: 'Control de Calidad en Origen',
      notesTitle: 'Notas Comerciales y Factibilidad:',
      disclaimer: 'Todas las especificaciones técnicas definitivas, certificados de análisis (COA), cosechas y cronogramas de embarque se confirman según la disponibilidad con los socios de origen en Brasil.',
      requestSpec: 'Solicitar Ficha Técnica Completa',
      configureRfq: 'Consultar este Producto',
      verifiedOrigin: 'Origen agrícola brasileño verificado',
    },
  }[language] || {
    category: 'Export Specifications',
    origin: 'Origin in Brazil:',
    grades: 'Standard Export Specifications',
    packaging: 'Export Packaging Formats',
    inspection: 'Origin Quality Verification',
    notesTitle: 'Commercial Notes & Sourcing Feasibility:',
    disclaimer: 'All final technical specifications, certificates of analysis (COA), crop years, and shipment schedules are confirmed according to supply availability with Brazilian origin partners.',
    requestSpec: 'Request Full Technical Specification',
    configureRfq: 'Inquire on this Product',
    verifiedOrigin: 'Verified Brazilian agricultural origin',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#061F18]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#FAF7EF] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-[#EFE3CF]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-[#EFE3CF] bg-white">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-[#E2ECE3] px-3 py-1 rounded-md">
              {product.category}
            </span>
            <span className="text-xs text-gray-500 font-semibold hidden sm:inline">
              {labels.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Main Title & Media Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h3 id="modal-product-title" className="text-2xl sm:text-3xl font-display font-bold text-gray-900 tracking-tight">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal">
                {product.shortDesc}
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs text-gray-600">
                <Globe className="w-4 h-4 text-[#064E3B] shrink-0" />
                <span>{labels.origin} <strong className="font-semibold text-gray-900">{product.origin}</strong></span>
              </div>
            </div>

            <div className="md:col-span-5 h-48 sm:h-56 rounded-2xl overflow-hidden shadow-xs border border-gray-200 relative bg-[#F5EFE3]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs rounded-md p-2 text-white text-[11px] leading-tight">
                {labels.verifiedOrigin}
              </div>
            </div>
          </div>

          {/* Detailed Spec Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Grades */}
            <div className="bg-white p-5 rounded-xl border border-[#EFE3CF] shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-[#064E3B]">
                <Tag className="w-4 h-4" />
                <h4 className="font-bold text-sm text-gray-900">{labels.grades}</h4>
              </div>
              <ul className="space-y-2 text-xs text-gray-600 font-normal">
                {product.grades.map((g, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#064E3B] shrink-0 mt-0.5" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Packaging Formats */}
            <div className="bg-white p-5 rounded-xl border border-[#EFE3CF] shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-[#064E3B]">
                <Box className="w-4 h-4" />
                <h4 className="font-bold text-sm text-gray-900">{labels.packaging}</h4>
              </div>
              <ul className="space-y-2 text-xs text-gray-600 font-normal">
                {product.packaging.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24A] shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inspection & Compliance */}
            <div className="bg-white p-5 rounded-xl border border-[#EFE3CF] shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-[#064E3B]">
                <ShieldCheck className="w-4 h-4" />
                <h4 className="font-bold text-sm text-gray-900">{labels.inspection}</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3 font-normal">
                {product.inspection}
              </p>
              <div className="text-[11px] text-[#064E3B] font-semibold bg-[#E2ECE3]/70 p-2.5 rounded-lg">
                Inspeção SGS / Bureau Veritas coordenada no porto sob solicitação.
              </div>
            </div>
          </div>

          {/* Commercial Notes & Disclaimer */}
          <div className="bg-[#F5EFE3] p-4 sm:p-5 rounded-2xl border border-[#EFE3CF] text-xs text-gray-700 leading-relaxed">
            <strong className="text-gray-900 font-bold block mb-1">{labels.notesTitle}</strong>
            {product.verifiedNotes}
            <span className="block mt-2 text-[11px] text-gray-500 italic">
              {labels.disclaimer}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#EFE3CF] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onRequestSpecSheet(product);
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-3 border border-gray-300 text-gray-800 rounded-xl text-xs sm:text-sm font-semibold hover:border-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-gray-600" />
            <span>{labels.requestSpec}</span>
          </button>

          <button
            onClick={() => {
              onSelectForRfq(product);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#064E3B] hover:bg-[#0B3D2E] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 group"
          >
            <span>{labels.configureRfq}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
