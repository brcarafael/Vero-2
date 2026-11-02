import React, { useState } from 'react';
import { ProductItem, PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { useRouter } from '../context/RouterContext';
import {
  ArrowLeft,
  Check,
  Plus,
  Share2,
  Calendar,
  Package,
  Layers,
  MapPin,
  ShieldCheck,
  Building,
  Anchor,
  FileCheck2,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: ProductItem;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const { language } = useLanguage();
  const { addProduct, removeProduct, isProductSelected, scrollToInquiryForm } = useInquiry();
  const { navigateToHome, navigateToProduct } = useRouter();
  const [copiedLink, setCopiedLink] = useState(false);

  const isSelected = isProductSelected(product.id);

  const tLabels = {
    en: {
      backToCatalog: 'Back to all commodities',
      addToInquiry: 'Add to my inquiry',
      inInquiry: 'Included in your inquiry',
      removeFromInquiry: 'Remove from inquiry',
      inquireNow: 'Proceed to inquiry with this product',
      shareLink: 'Share technical page',
      linkCopied: 'Link copied to clipboard!',
      specsHeading: 'Export Specifications & Quality Grades',
      packagingHeading: 'Packaging & Containerization Formats',
      originsHeading: 'Primary Producing Regions',
      harvestHeading: 'Crop Harvest & Shipping Calendar',
      orderUnitHeading: 'Typical Minimum Order & Lot Size',
      logisticsHeading: 'Commercial & Maritime Terms',
      inspectionHeading: 'Quality Inspection & Phytosanitary Control',
      notesHeading: 'Commercial & Contracting Notes',
      applicationsHeading: 'Industrial & Wholesale Applications',
      relatedHeading: 'Explore other Brazilian commodities',
      sourcingNotice: 'Originated on inquiry based on buyer volume and target specifications.',
    },
    pt: {
      backToCatalog: 'Voltar a todas as commodities',
      addToInquiry: 'Adicionar à minha consulta',
      inInquiry: 'Incluído na sua consulta',
      removeFromInquiry: 'Remover da consulta',
      inquireNow: 'Avançar para consulta com este produto',
      shareLink: 'Compartilhar página técnica',
      linkCopied: 'Link copiado para a área de transferência!',
      specsHeading: 'Especificações Técnicas e Padrões de Exportação',
      packagingHeading: 'Formatos de Embalagem e Estufagem',
      originsHeading: 'Regiões Produtoras Principais',
      harvestHeading: 'Calendário de Safra e Janela de Embarque',
      orderUnitHeading: 'Lote Mínimo Típico e Escopo Operacional',
      logisticsHeading: 'Termos Comerciais e Marítimos',
      inspectionHeading: 'Controle de Qualidade e Fitossanitário',
      notesHeading: 'Observações Comerciais e Contratuais',
      applicationsHeading: 'Aplicações Industriais e Comerciais',
      relatedHeading: 'Conheça outras commodities brasileiras',
      sourcingNotice: 'Item originado sob consulta conforme volume e especificações do comprador.',
    },
    es: {
      backToCatalog: 'Volver a todas las commodities',
      addToInquiry: 'Añadir a mi consulta',
      inInquiry: 'Incluido en su consulta',
      removeFromInquiry: 'Eliminar de la consulta',
      inquireNow: 'Avanzar a consulta con este producto',
      shareLink: 'Compartir ficha técnica',
      linkCopied: '¡Enlace copiado al portapapeles!',
      specsHeading: 'Especificaciones Técnicas y Grados de Exportación',
      packagingHeading: 'Formatos de Empaque y Carga',
      originsHeading: 'Regiones Productoras Principales',
      harvestHeading: 'Calendario de Cosecha y Ventana de Embarque',
      orderUnitHeading: 'Lote Mínimo Típico y Escala Operativa',
      logisticsHeading: 'Términos Comerciales y Marítimos',
      inspectionHeading: 'Control de Calidad e Inspección Fitosanitaria',
      notesHeading: 'Notas Comerciales y Contractuales',
      applicationsHeading: 'Aplicaciones Industriales y Comerciales',
      relatedHeading: 'Conozca otras commodities brasileñas',
      sourcingNotice: 'Originado bajo consulta según volumen y especificaciones solicitadas.',
    },
  }[language];

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/products/${product.slug}`;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 3000);
      }
    } catch {
      // fallback
    }
  };

  const handleDirectInquiry = () => {
    if (!isSelected) {
      addProduct(product.id);
    }
    // Navigate home, then scroll to inquiry form
    navigateToHome();
    setTimeout(() => {
      scrollToInquiryForm();
    }, 150);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="w-full bg-[#FAF7EF] text-[#111827] min-h-screen pb-24">
      {/* Top Breadcrumb & Nav Bar */}
      <div className="bg-[#FAF7EF] border-b border-[#E2ECE3] sticky top-16 sm:top-20 z-20 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={navigateToHome}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-medium text-[#064E3B] hover:text-[#0B3D2E] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{tLabels.backToCatalog}</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#D8E0D2] bg-white text-xs font-medium text-[#4B5563] hover:text-[#111827] hover:border-[#064E3B] transition-colors"
              title={tLabels.shareLink}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? tLabels.linkCopied : tLabels.shareLink}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Main Product Showcase Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Product Image Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#D8E0D2] bg-[#F5EFE3] shadow-md group">
              <img
                src={product.image}
                alt={product.title[language] || product.title.en}
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#064E3B] text-[#FAF7EF] shadow-sm">
                  {product.category[language] || product.category.en}
                </span>
              </div>
            </div>

            {/* Quick Sourcing Notice if Origination on Inquiry */}
            {!product.isCore && (
              <div className="mt-4 p-4 rounded-xl bg-[#E2ECE3]/60 border border-[#D8E0D2] text-xs text-[#064E3B] leading-relaxed">
                <p className="font-semibold mb-1">Origination on Inquiry</p>
                <p>{tLabels.sourcingNotice}</p>
              </div>
            )}
          </div>

          {/* Core Technical & Commercial Identity */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#064E3B]">
                VERO · Canadian Commercial Desk
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] mt-1.5 mb-4 tracking-tight">
                {product.title[language] || product.title.en}
              </h1>

              <p className="text-base sm:text-lg text-[#374151] leading-relaxed mb-6">
                {product.shortDesc[language] || product.shortDesc.en}
              </p>

              <div className="p-4 sm:p-5 rounded-xl bg-[#F5EFE3] border border-[#EFE3CF] mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#064E3B] mb-2">
                  Market Context & Sourcing Structure
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {product.overview[language] || product.overview.en}
                </p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 border-t border-[#E2ECE3] flex flex-col sm:flex-row gap-3">
              {isSelected ? (
                <button
                  onClick={() => removeProduct(product.id)}
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-[#E2ECE3] text-[#064E3B] font-semibold text-sm hover:bg-[#D8E0D2] transition-colors border border-[#064E3B]/30"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>{tLabels.inInquiry}</span>
                  <span className="text-xs font-normal text-red-700 ml-1">
                    ({tLabels.removeFromInquiry})
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => addProduct(product.id)}
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-[#064E3B] text-[#FAF7EF] font-semibold text-sm hover:bg-[#0B3D2E] transition-all shadow-md active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  <span>{tLabels.addToInquiry}</span>
                </button>
              )}

              <button
                onClick={handleDirectInquiry}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-[#FAF7EF] border-2 border-[#064E3B] text-[#064E3B] font-semibold text-sm hover:bg-[#064E3B] hover:text-[#FAF7EF] transition-all"
              >
                <span>{tLabels.inquireNow}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deep Technical Specifications Grid */}
        <div className="mt-12 sm:mt-16 pt-10 border-t border-[#E2ECE3]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Grades & Specs */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#D8E0D2] shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#E2ECE3] text-[#064E3B] flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#111827]">
                  {tLabels.specsHeading}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {(product.grades[language] || product.grades.en).map((grade, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-[#374151]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#064E3B] mt-2 mr-2.5 flex-shrink-0" />
                    <span>{grade}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Packaging & Logistics */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#D8E0D2] shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#E2ECE3] text-[#064E3B] flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#111827]">
                  {tLabels.packagingHeading}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {(product.packaging[language] || product.packaging.en).map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-[#374151]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24A] mt-2 mr-2.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Producing Origins & Port Outlets */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#D8E0D2] shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#E2ECE3] text-[#064E3B] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#111827]">
                  {tLabels.originsHeading}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {(product.origins[language] || product.origins.en).map((region, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF7EF] border border-[#D8E0D2] text-xs font-medium text-[#111827]"
                  >
                    {region}
                  </span>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-100 text-xs sm:text-sm text-[#4B5563]">
                <span className="font-semibold text-[#111827]">
                  {tLabels.logisticsHeading}:
                </span>{' '}
                {product.shippingTerms[language] || product.shippingTerms.en}
              </div>
            </div>

            {/* Quality & Phytosanitary Protocol */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#D8E0D2] shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#E2ECE3] text-[#064E3B] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#111827]">
                  {tLabels.inspectionHeading}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed mb-4">
                {product.inspection[language] || product.inspection.en}
              </p>
              <div className="p-3 rounded-lg bg-[#FAF7EF] border border-[#EFE3CF] text-xs text-[#064E3B]">
                <span className="font-semibold">Compliance Note:</span>{' '}
                {product.complianceNotes[language] || product.complianceNotes.en}
              </div>
            </div>
          </div>
        </div>

        {/* Operating Terms Strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-[#F5EFE3] border border-[#D8E0D2]">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#064E3B] mb-1.5">
              <Calendar className="w-4 h-4" />
              <span>{tLabels.harvestHeading}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#111827] font-medium">
              {product.harvestWindow[language] || product.harvestWindow.en}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F5EFE3] border border-[#D8E0D2]">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#064E3B] mb-1.5">
              <Anchor className="w-4 h-4" />
              <span>{tLabels.orderUnitHeading}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#111827] font-medium">
              {product.typicalOrderUnit[language] || product.typicalOrderUnit.en}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F5EFE3] border border-[#D8E0D2]">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#064E3B] mb-1.5">
              <Building className="w-4 h-4" />
              <span>{tLabels.applicationsHeading}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#111827] font-medium">
              {(product.commercialUse[language] || product.commercialUse.en).slice(0, 2).join(' · ')}
            </p>
          </div>
        </div>

        {/* Related Commodities Section */}
        <div className="mt-16 pt-12 border-t border-[#E2ECE3]">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#111827] mb-6">
            {tLabels.relatedHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigateToProduct(rel.id)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#D8E0D2] hover:border-[#064E3B] transition-all hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={rel.image}
                    alt={rel.title[language] || rel.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#064E3B]">
                    {rel.category[language] || rel.category.en}
                  </span>
                  <h3 className="text-sm font-bold text-[#111827] mt-1 group-hover:text-[#064E3B] transition-colors truncate">
                    {rel.title[language] || rel.title.en}
                  </h3>
                  <p className="text-xs text-[#4B5563] mt-1 line-clamp-2">
                    {rel.shortDesc[language] || rel.shortDesc.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
