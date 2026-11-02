import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { useRouter } from '../context/RouterContext';
import {
  CORE_PRODUCTS,
  SOURCING_ON_INQUIRY_PRODUCTS,
  ProductItem,
} from '../data/products';
import {
  ArrowRight,
  Plus,
  Check,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function Products() {
  const { language } = useLanguage();
  const { addProduct, removeProduct, isProductSelected } = useInquiry();
  const { navigateToProduct } = useRouter();

  const tLabels = {
    en: {
      tag: 'Commodity Portfolio · Direct Brazilian Origins',
      headline: 'Structured Brazilian commodities for international B2B buyers.',
      subheadline:
        'Explore our 5 core export commodity groups with established supply channels, plus 3 strategic origination categories available on commercial inquiry.',
      coreHeading: '5 Core Confirmed Commodity Groups',
      coreSub:
        'Consolidated agricultural supply with standard commercial specifications, origin quality certificates, and established container/bulk logistics.',
      inquiryHeading: 'Additional Sourcing on Inquiry',
      inquirySub:
        'Targeted origination for containerized feed grains, non-GMO identity-preserved lots, and Amazonian fruit pulps.',
      viewSpecs: 'Technical Specifications',
      addToInquiry: 'Add to inquiry',
      addedToInquiry: 'In your inquiry',
      harvestLabel: 'Harvest Window:',
      orderUnitLabel: 'Standard Unit:',
      gradesLabel: 'Key Grades:',
    },
    pt: {
      tag: 'Portfólio de Commodities · Origens do Brasil',
      headline: 'Commodities brasileiras estruturadas para compradores B2B.',
      subheadline:
        'Conheça os 5 grupos centrais de exportação com canais consolidados e as 3 categorias adicionais de originação sob consulta técnica.',
      coreHeading: '5 Grupos Centrais Confirmados',
      coreSub:
        'Fornecimento agrícola com especificações comerciais usuais, laudos de qualidade na origem e logística estruturada.',
      inquiryHeading: 'Originação Estruturada sob Consulta',
      inquirySub:
        'Atendimento dedicado para grãos forrageiros, lotes Não-OGM rastreados e polpas tropicais da Amazônia.',
      viewSpecs: 'Ficha Técnica Completa',
      addToInquiry: 'Adicionar à consulta',
      addedToInquiry: 'Na sua consulta',
      harvestLabel: 'Janela de Safra:',
      orderUnitLabel: 'Escopo Típico:',
      gradesLabel: 'Principais Padrões:',
    },
    es: {
      tag: 'Portafolio de Commodities · Orígenes de Brasil',
      headline: 'Commodities brasileñas estructuradas para compradores B2B.',
      subheadline:
        'Conozca nuestros 5 grupos principales de exportación con canales consolidados y 3 categorías adicionales de originación bajo consulta.',
      coreHeading: '5 Grupos Principales Confirmados',
      coreSub:
        'Suministro agrícola con especificaciones comerciales estándar, certificación en origen y logística en contenedor o granel.',
      inquiryHeading: 'Originación Especializada bajo Consulta',
      inquirySub:
        'Atención dedicada para granos forrajeros en contenedor, lotes No-OGM trazados y pulpas amazónicas.',
      viewSpecs: 'Ficha Técnica Completa',
      addToInquiry: 'Añadir a consulta',
      addedToInquiry: 'En su consulta',
      harvestLabel: 'Ventana de Cosecha:',
      orderUnitLabel: 'Escala Típica:',
      gradesLabel: 'Grados Principales:',
    },
  }[language];

  const renderProductCard = (product: ProductItem) => {
    const isSelected = isProductSelected(product.id);
    const title = product.title[language] || product.title.en;
    const category = product.category[language] || product.category.en;
    const shortDesc = product.shortDesc[language] || product.shortDesc.en;
    const harvest = product.harvestWindow[language] || product.harvestWindow.en;
    const grades = product.grades[language] || product.grades.en;

    return (
      <article
        key={product.id}
        className="bg-white rounded-2xl border border-[#D8E0D2] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
      >
        {/* Product Photography Container */}
        <div
          onClick={() => navigateToProduct(product.id)}
          className="relative aspect-[16/10] overflow-hidden bg-[#F5EFE3] cursor-pointer"
        >
          <img
            src={product.image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Category Tag */}
          <div className="absolute top-3 left-3 bg-[#FAF7EF]/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-[#064E3B] tracking-wide uppercase border border-[#EFE3CF] shadow-xs">
            {category}
          </div>

          {/* Title on Overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 className="font-heading font-semibold text-base sm:text-lg leading-snug drop-shadow-sm">
              {title}
            </h3>
          </div>
        </div>

        {/* Card Editorial Body */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
          <div>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
              {shortDesc}
            </p>

            {/* Factual Bullet Specs */}
            <div className="pt-3 border-t border-gray-100 space-y-2 mb-4">
              <div className="text-xs text-[#374151]">
                <span className="font-bold text-[#111827]">{tLabels.gradesLabel}</span>{' '}
                <span className="text-[#4B5563]">{grades.slice(0, 2).join(' · ')}</span>
              </div>
              <div className="text-xs text-[#374151] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#064E3B] flex-shrink-0" />
                <span className="text-[#4B5563] truncate">{harvest}</span>
              </div>
            </div>
          </div>

          {/* Card Action Controls */}
          <div className="pt-4 border-t border-[#E2ECE3] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => navigateToProduct(product.id)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#064E3B] hover:text-[#0B3D2E] py-2 px-2.5 rounded-lg hover:bg-[#FAF7EF] transition-colors"
            >
              <span>{tLabels.viewSpecs}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {isSelected ? (
              <button
                type="button"
                onClick={() => removeProduct(product.id)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#E2ECE3] text-[#064E3B] hover:bg-[#D8E0D2] transition-colors border border-[#064E3B]/20"
                title="Click to remove from inquiry"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{tLabels.addedToInquiry}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => addProduct(product.id)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#064E3B] text-white hover:bg-[#0B3D2E] transition-colors shadow-xs active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{tLabels.addToInquiry}</span>
              </button>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#F5EFE3] border-b border-[#EFE3CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#064E3B] bg-[#E2ECE3] px-3.5 py-1.5 rounded-full inline-block mb-3">
            {tLabels.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] tracking-tight">
            {tLabels.headline}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {tLabels.subheadline}
          </p>
        </div>

        {/* 5 Core Confirmed Products Grid */}
        <div className="mb-16">
          <div className="mb-6 pb-3 border-b border-[#D8E0D2]">
            <h3 className="text-lg sm:text-xl font-bold font-heading text-[#111827]">
              {tLabels.coreHeading}
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
              {tLabels.coreSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CORE_PRODUCTS.map((prod) => renderProductCard(prod))}
          </div>
        </div>

        {/* 3 Sourcing on Inquiry Products */}
        <div>
          <div className="mb-6 pb-3 border-b border-[#D8E0D2] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#111827]">
                {tLabels.inquiryHeading}
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                {tLabels.inquirySub}
              </p>
            </div>
            <span className="text-xs font-semibold text-[#064E3B] uppercase tracking-wider">
              Origination on Demand
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {SOURCING_ON_INQUIRY_PRODUCTS.map((prod) => renderProductCard(prod))}
          </div>
        </div>
      </div>
    </section>
  );
}
