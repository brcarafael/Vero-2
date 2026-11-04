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
      backToCatalog: 'Back to products',
      productsBreadcrumb: 'Products',
      switchLabel: 'Switch product:',
      addToInquiry: 'Add to inquiry',
      inInquiry: 'In your inquiry',
      removeFromInquiry: 'Remove from inquiry',
      inquireNow: 'Continue to inquiry with this product',
      shareLink: 'Share product page',
      linkCopied: 'Link copied to clipboard!',
      specsHeading: 'Types & Commercial Varieties',
      packagingHeading: 'Packaging & Sourcing Logistics',
      originsHeading: 'Producing Origins',
      harvestHeading: 'Indicative Harvest Information',
      logisticsHeading: 'Shipping Ports & Terms',
      inspectionHeading: 'Quality Verification & Phytosanitary Control',
      notesHeading: 'Commercial & Contracting Notes',
      applicationsHeading: 'Applications',
      relatedHeading: 'Explore other Brazilian products',
      sourcingNotice: 'Sourcing can be discussed according to buyer requirements.',
    },
    pt: {
      backToCatalog: 'Voltar aos produtos',
      productsBreadcrumb: 'Produtos',
      switchLabel: 'Alternar produto:',
      addToInquiry: 'Adicionar à consulta',
      inInquiry: 'Na sua consulta',
      removeFromInquiry: 'Remover da consulta',
      inquireNow: 'Prosseguir para consulta com este produto',
      shareLink: 'Compartilhar página do produto',
      linkCopied: 'Link copiado para a área de transferência!',
      specsHeading: 'Tipos e Variedades Comerciais',
      packagingHeading: 'Embalagem e Logística de Fornecimento',
      originsHeading: 'Origens Produtoras',
      harvestHeading: 'Informações Indicativas de Safra',
      logisticsHeading: 'Portos e Termos de Embarque',
      inspectionHeading: 'Verificação de Qualidade e Fitossanitária',
      notesHeading: 'Observações Comerciais e Contratuais',
      applicationsHeading: 'Aplicações',
      relatedHeading: 'Conheça outros produtos brasileiros',
      sourcingNotice: 'Fornecimento discutido conforme os requisitos do comprador.',
    },
    es: {
      backToCatalog: 'Volver a productos',
      productsBreadcrumb: 'Productos',
      switchLabel: 'Cambiar producto:',
      addToInquiry: 'Añadir a consulta',
      inInquiry: 'En su consulta',
      removeFromInquiry: 'Eliminar de la consulta',
      inquireNow: 'Continuar a consulta con este producto',
      shareLink: 'Compartir página del producto',
      linkCopied: '¡Enlace copiado al portapapeles!',
      specsHeading: 'Tipos y Variedades Comerciales',
      packagingHeading: 'Empaque y Logística de Suministro',
      originsHeading: 'Orígenes Productores',
      harvestHeading: 'Información Indicativa de Cosecha',
      logisticsHeading: 'Puertos y Términos de Embarque',
      inspectionHeading: 'Verificación de Calidad y Control Fitosanitario',
      notesHeading: 'Notas Comerciales y Contractuales',
      applicationsHeading: 'Aplicaciones',
      relatedHeading: 'Conozca otros productos brasileños',
      sourcingNotice: 'El suministro se evalúa según los requisitos del comprador.',
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
    navigateToHome();
    setTimeout(() => {
      scrollToInquiryForm();
    }, 80);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  const currentShortName = product.shortTitle[language] || product.shortTitle.en;

  return (
    <div className="w-full bg-[#FAF7EF] text-[#111827] min-h-screen pb-24">
      {/* Top Breadcrumb & Product Switcher Bar */}
      <div className="bg-[#FAF7EF] border-b border-[#E5DEC9] sticky top-16 sm:top-20 z-20 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <button
                onClick={navigateToHome}
                className="inline-flex items-center space-x-1.5 font-semibold text-[#0B3D2E] hover:text-[#064E3B] transition-colors group cursor-pointer focus-visible:outline-none focus-visible:underline"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>{tLabels.backToCatalog}</span>
              </button>
              <span className="text-gray-300">/</span>
              <span className="text-[#6B7280] hidden sm:inline">{tLabels.productsBreadcrumb}</span>
              <span className="text-gray-300 hidden sm:inline">/</span>
              <span className="font-semibold text-[#111827] truncate max-w-[200px] sm:max-w-none">
                {currentShortName}
              </span>
            </div>

            {/* Share Control */}
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#D8E0D2] bg-white text-xs font-medium text-[#4B5563] hover:text-[#111827] hover:border-[#0B3D2E] transition-colors cursor-pointer"
              title={tLabels.shareLink}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? tLabels.linkCopied : tLabels.shareLink}</span>
            </button>
          </div>

          {/* Compact Product Switcher (Accessible near the top) */}
          <div className="pt-2 border-t border-[#E5DEC9]/60 flex items-center gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap shrink-0 hidden md:inline">
              {tLabels.switchLabel}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {PRODUCTS.map((item) => {
                const isActive = item.id === product.id;
                const shortName = item.shortTitle[language] || item.shortTitle.en;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateToProduct(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#0B3D2E] text-white shadow-2xs'
                        : 'bg-white border border-[#D8E0D2] text-[#374151] hover:border-[#0B3D2E] hover:text-[#0B3D2E]'
                    }`}
                  >
                    {shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Main Product Showcase Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Product Image Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#D8E0D2] bg-[#F5EFE3] shadow-md group">
              <img
                src={product.image}
                alt={product.title[language] || product.title.en}
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute top-3 left-3 bg-[#0B3D2E] text-white px-3 py-1 rounded-md text-xs font-semibold">
                {product.category[language] || product.category.en}
              </div>
            </div>

            {/* Sourcing notice if additional category */}
            {!product.isCore && (
              <div className="mt-4 p-4 rounded-xl bg-[#FAF7EF] border border-[#E5DEC9] text-xs text-[#0B3D2E] leading-relaxed">
                <p className="font-semibold mb-0.5">Additional Sourcing on Demand</p>
                <p className="text-gray-600">{tLabels.sourcingNotice}</p>
              </div>
            )}
          </div>

          {/* Core Technical & Commercial Identity */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-[#0B3D2E]">
                {product.cardVarieties?.[language] || product.cardVarieties?.en || product.category[language] || product.category.en}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] mt-1.5 mb-3 tracking-tight">
                {product.title[language] || product.title.en}
              </h1>

              <p className="text-base sm:text-lg text-[#374151] leading-relaxed mb-6">
                {product.shortDesc[language] || product.shortDesc.en}
              </p>

              <div className="p-4 sm:p-5 rounded-xl bg-[#F5EFE3] border border-[#EFE3CF] mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B3D2E] mb-2">
                  Overview & Sourcing Context
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {product.overview[language] || product.overview.en}
                </p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 border-t border-[#E5DEC9] flex flex-col sm:flex-row gap-3">
              {isSelected ? (
                <button
                  type="button"
                  onClick={() => removeProduct(product.id)}
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-[#E2ECE3] text-[#0B3D2E] font-semibold text-sm hover:bg-[#D8E0D2] transition-colors border border-[#0B3D2E]/30 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>{tLabels.inInquiry}</span>
                  <span className="text-xs font-normal text-red-700 ml-1">
                    ({tLabels.removeFromInquiry})
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => addProduct(product.id)}
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-[#0B3D2E] text-white font-semibold text-sm hover:bg-[#064E3B] transition-all shadow-sm active:scale-98 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{tLabels.addToInquiry}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleDirectInquiry}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-white border border-[#0B3D2E] text-[#0B3D2E] font-semibold text-sm hover:bg-[#FAF7EF] transition-all cursor-pointer"
              >
                <span>{tLabels.inquireNow}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Technical & Sourcing Information Grid */}
        <div className="mt-12 sm:mt-16 pt-10 border-t border-[#E5DEC9]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Types & Commercial Varieties */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#D8E0D2] shadow-xs">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#E2ECE3] text-[#0B3D2E] flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#111827]">
                  {tLabels.specsHeading}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {(product.grades[language] || product.grades.en).map((grade, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-[#374151]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B3D2E] mt-2 mr-2.5 flex-shrink-0" />
                    <span>{grade}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Packaging & Logistics */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#D8E0D2] shadow-xs">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#E2ECE3] text-[#0B3D2E] flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#111827]">
                  {tLabels.packagingHeading}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {(product.packaging[language] || product.packaging.en).map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-[#374151]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B3D2E] mt-2 mr-2.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Origins & Shipping Ports */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#D8E0D2] shadow-xs">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#E2ECE3] text-[#0B3D2E] flex items-center justify-center flex-shrink-0">
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

            {/* Quality & Inspection Protocols */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#D8E0D2] shadow-xs">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#E2ECE3] text-[#0B3D2E] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#111827]">
                  {tLabels.inspectionHeading}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed mb-4">
                {product.inspection[language] || product.inspection.en}
              </p>
              <div className="p-3 rounded-lg bg-[#FAF7EF] border border-[#EFE3CF] text-xs text-[#0B3D2E]">
                <span className="font-semibold">Compliance Note:</span>{' '}
                {product.complianceNotes[language] || product.complianceNotes.en}
              </div>
            </div>
          </div>
        </div>

        {/* Indicative Harvest & Applications Strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#F5EFE3] border border-[#D8E0D2]">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0B3D2E] mb-1.5">
              <Calendar className="w-4 h-4" />
              <span>{tLabels.harvestHeading}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#111827] font-medium">
              {product.harvestWindow[language] || product.harvestWindow.en}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F5EFE3] border border-[#D8E0D2]">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0B3D2E] mb-1.5">
              <Building className="w-4 h-4" />
              <span>{tLabels.applicationsHeading}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#111827] font-medium">
              {(product.commercialUse[language] || product.commercialUse.en).join(' · ')}
            </p>
          </div>
        </div>

        {/* Related Brazilian Products Section */}
        <div className="mt-16 pt-12 border-t border-[#E5DEC9]">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#111827] mb-6">
            {tLabels.relatedHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigateToProduct(rel.id)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#D8E0D2] hover:border-[#0B3D2E] transition-all hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={rel.image}
                    alt={rel.title[language] || rel.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0B3D2E]">
                    {rel.category[language] || rel.category.en}
                  </span>
                  <h3 className="text-sm font-bold text-[#111827] mt-1 group-hover:text-[#0B3D2E] transition-colors truncate">
                    {rel.shortTitle[language] || rel.shortTitle.en}
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
