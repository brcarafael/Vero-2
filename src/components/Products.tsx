import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { useRouter } from '../context/RouterContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  CORE_PRODUCTS,
  SOURCING_ON_INQUIRY_PRODUCTS,
  ProductItem,
} from '../data/products';
import {
  ArrowRight,
  Plus,
  Check,
  MapPin,
  Calendar,
  Package,
  Layers,
  Ship,
  Sliders,
} from 'lucide-react';

interface MainProductCardProps {
  key?: React.Key;
  product: ProductItem;
  index: number;
  language: 'en' | 'pt' | 'es';
  tLabels: any;
  renderFactIcon: (name: string) => React.ReactNode;
  isSelected: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onNavigate: () => void;
}

function MainProductCard({
  product,
  index,
  language,
  tLabels,
  renderFactIcon,
  isSelected,
  onAdd,
  onRemove,
  onNavigate,
}: MainProductCardProps) {
  const [cardRef, isCardVisible] = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px',
    exitBufferPx: 50,
  });

  const shortName = product.shortTitle[language] || product.shortTitle.en;
  const varieties = product.cardVarieties?.[language] || product.cardVarieties?.en;
  const summary = product.cardSummary?.[language] || product.cardSummary?.en;
  const staggerDelay = (index % 3) * 50;

  return (
    <article
      ref={cardRef}
      className="bg-white rounded-2xl border border-[#D8E0D2] overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col md:grid md:grid-rows-subgrid md:row-span-5 md:gap-y-0"
    >
      {/* Track 1: Photograph - subtle zoom strictly inside its existing frame on pointer hover, with scroll-triggered crop settle */}
      <a
        href={`/products/${product.slug}`}
        onClick={(e) => {
          e.preventDefault();
          onNavigate();
        }}
        className="relative aspect-[16/10] overflow-hidden bg-[#F5EFE3] block cursor-pointer group/photo"
        aria-label={`${shortName} - ${tLabels.viewDetails}`}
      >
        <div
          className={`w-full h-full photo-settle ${isCardVisible ? 'is-settled' : ''}`}
          style={{ transitionDelay: `${staggerDelay}ms` }}
        >
          <img
            src={product.image}
            alt={shortName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-105 motion-reduce:transform-none"
            loading="lazy"
          />
        </div>
      </a>

      {/* Track 2: Title & Variety Subtitle (Photo to title: ~18px) */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 md:pt-[18px] md:pb-0">
        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#111827] tracking-tight">
          {shortName}
        </h3>
        {varieties && (
          <p className="text-xs sm:text-sm font-semibold text-[#064E3B] mt-1 tracking-wide">
            {varieties}
          </p>
        )}
      </div>

      {/* Track 3: Content-aware Description (Variety to description: ~10px; Description to divider: ~14px below longest description) */}
      <div className="px-5 sm:px-6 pt-2 pb-2 md:pt-2.5 md:pb-3.5">
        <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed">
          {summary}
        </p>
      </div>

      {/* Track 4: First Divider & At-a-glance Facts (Facts to actions: ~14px below tallest facts list) */}
      <div className="px-5 sm:px-6 pt-3.5 pb-2 md:pb-3.5 border-t border-[#EFE3CF] mt-auto md:mt-0 flex flex-col justify-start">
        {product.atAGlance && product.atAGlance.length > 0 && (
          <div className="space-y-2.5">
            {product.atAGlance.map((fact, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-snug"
              >
                <span
                  className="w-4 h-4 flex items-center justify-center shrink-0 pt-0.5 text-[#064E3B]"
                  aria-hidden="true"
                >
                  {renderFactIcon(fact.icon)}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-[#111827]">
                    {fact.label[language] || fact.label.en}:
                  </span>{' '}
                  <span className="text-[#4B5563]">
                    {fact.value[language] || fact.value.en}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Track 5: Bottom Divider & Action Controls (aligned along bottom, fixed button width so neighboring link stays still) */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 md:py-3.5 border-t border-[#E2ECE3] flex items-center justify-between gap-3 mt-auto">
        {/* Secondary Action: View details with 2.5px arrow shift on hover/focus */}
        <a
          id={`product-detail-trigger-${product.id}`}
          href={`/products/${product.slug}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate();
          }}
          className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-[#064E3B] hover:text-[#0B3D2E] py-2 px-2 rounded-lg hover:bg-[#FAF7EF] focus-visible:ring-2 focus-visible:ring-[#064E3B] focus-visible:outline-none transition-colors cursor-pointer group/link shrink-0"
        >
          <span>{tLabels.viewDetails}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-[2.5px] group-focus-visible/link:translate-x-[2.5px] motion-reduce:transform-none" />
        </a>

        {/* Primary Action: Add to inquiry with stable width to avoid layout shift */}
        {isSelected ? (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center justify-center space-x-1.5 text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg bg-[#E2ECE3] text-[#064E3B] hover:bg-[#D8E0D2] transition-colors border border-[#064E3B]/20 focus-visible:ring-2 focus-visible:ring-[#064E3B] focus-visible:outline-none cursor-pointer w-[148px] sm:w-[168px] shrink-0 text-center whitespace-nowrap"
            aria-pressed="true"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5] animate-settle-check motion-reduce:animate-none" />
            <span>{tLabels.addedToInquiry}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center justify-center space-x-1.5 text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg bg-[#064E3B] text-white hover:bg-[#0B3D2E] transition-colors shadow-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-[#064E3B] focus-visible:outline-none cursor-pointer w-[148px] sm:w-[168px] shrink-0 text-center whitespace-nowrap"
            aria-pressed="false"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{tLabels.addToInquiry}</span>
          </button>
        )}
      </div>
    </article>
  );
}

interface AdditionalProductCardProps {
  key?: React.Key;
  product: ProductItem;
  index: number;
  language: 'en' | 'pt' | 'es';
  tLabels: any;
  isSelected: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onNavigate: () => void;
}

function AdditionalProductCard({
  product,
  index,
  language,
  tLabels,
  isSelected,
  onAdd,
  onRemove,
  onNavigate,
}: AdditionalProductCardProps) {
  const [cardRef, isCardVisible] = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px',
    exitBufferPx: 50,
  });

  const shortName = product.shortTitle[language] || product.shortTitle.en;
  const summary = product.cardSummary?.[language] || product.cardSummary?.en;
  const staggerDelay = (index % 3) * 50;

  return (
    <article
      ref={cardRef}
      className="bg-white rounded-xl border border-[#D8E0D2] overflow-hidden shadow-2xs hover:shadow-sm transition-shadow duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Compact photograph - subtle zoom inside its frame with scroll-triggered crop settle */}
        <a
          href={`/products/${product.slug}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate();
          }}
          className="relative aspect-[16/9] overflow-hidden bg-[#F5EFE3] block cursor-pointer group/photo"
          aria-label={`${shortName} - ${tLabels.viewDetails}`}
        >
          <div
            className={`w-full h-full photo-settle ${isCardVisible ? 'is-settled' : ''}`}
            style={{ transitionDelay: `${staggerDelay}ms` }}
          >
            <img
              src={product.image}
              alt={shortName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-105 motion-reduce:transform-none"
              loading="lazy"
            />
          </div>
        </a>

        {/* Compact body */}
        <div className="p-4 sm:p-5">
          <h4 className="text-base sm:text-lg font-bold font-heading text-[#111827] tracking-tight">
            {shortName}
          </h4>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mt-2">
            {summary}
          </p>
        </div>
      </div>

      {/* Actions with stable button width and arrow transition */}
      <div className="mx-4 sm:mx-5 mb-4 sm:mb-5 pt-3.5 border-t border-[#E2ECE3] flex items-center justify-between gap-2">
        <a
          id={`product-detail-trigger-${product.id}`}
          href={`/products/${product.slug}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate();
          }}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-[#064E3B] hover:text-[#0B3D2E] py-1.5 px-2 rounded-md hover:bg-[#FAF7EF] focus-visible:ring-2 focus-visible:ring-[#064E3B] focus-visible:outline-none transition-colors cursor-pointer group/link shrink-0"
        >
          <span>{tLabels.viewDetails}</span>
          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-[2.5px] group-focus-visible/link:translate-x-[2.5px] motion-reduce:transform-none" />
        </a>

        {isSelected ? (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center justify-center space-x-1 text-xs font-semibold px-2 py-1.5 rounded-md bg-[#E2ECE3] text-[#064E3B] hover:bg-[#D8E0D2] transition-colors border border-[#064E3B]/20 focus-visible:ring-2 focus-visible:ring-[#064E3B] focus-visible:outline-none cursor-pointer w-[124px] sm:w-[136px] shrink-0 text-center whitespace-nowrap"
            aria-pressed="true"
          >
            <Check className="w-3 h-3 stroke-[2.5] animate-settle-check motion-reduce:animate-none" />
            <span>{tLabels.addedToInquiry}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center justify-center space-x-1 text-xs font-semibold px-2 py-1.5 rounded-md bg-[#064E3B] text-white hover:bg-[#0B3D2E] transition-colors shadow-2xs active:scale-95 focus-visible:ring-2 focus-visible:ring-[#064E3B] focus-visible:outline-none cursor-pointer w-[124px] sm:w-[136px] shrink-0 text-center whitespace-nowrap"
            aria-pressed="false"
          >
            <Plus className="w-3 h-3" />
            <span>{tLabels.addToInquiry}</span>
          </button>
        )}
      </div>
    </article>
  );
}

export default function Products() {
  const { language } = useLanguage();
  const { addProduct, removeProduct, isProductSelected } = useInquiry();
  const { navigateToProduct } = useRouter();

  const [headingRef, isHeadingVisible] = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px',
    exitBufferPx: 50,
  });

  const [additionalHeadingRef, isAdditionalHeadingVisible] = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px',
    exitBufferPx: 50,
  });

  const tLabels = {
    en: {
      eyebrow: 'BRAZILIAN ORIGINS',
      heading: 'Explore our products.',
      supporting: 'Discover our main product categories and tell us what interests you.',
      harvestDisclaimer:
        '*Harvest windows are indicative and do not confirm stock or shipment availability. Specifications, packaging and supply arrangements are agreed for each inquiry.',
      additionalHeading: 'Additional sourcing',
      additionalIntro:
        'Looking for soybeans, yellow corn or açaí? Share your requirements with us.',
      viewDetails: 'View details',
      addToInquiry: 'Add to inquiry',
      addedToInquiry: 'In your inquiry',
    },
    pt: {
      eyebrow: 'ORIGENS BRASILEIRAS',
      heading: 'Conheça nossos produtos.',
      supporting:
        'Descubra nossas principais categorias de produtos e nos conte o que você procura.',
      harvestDisclaimer:
        '*As janelas de safra são indicativas e não confirmam disponibilidade de estoque ou embarque. Especificações, embalagens e arranjos de fornecimento são alinhados para cada consulta.',
      additionalHeading: 'Originação adicional',
      additionalIntro:
        'Procura soja, milho amarelo ou açaí? Compartilhe seus requisitos conosco.',
      viewDetails: 'Ver detalhes',
      addToInquiry: 'Adicionar à consulta',
      addedToInquiry: 'Na sua consulta',
    },
    es: {
      eyebrow: 'ORÍGENES BRASILEÑOS',
      heading: 'Conozca nuestros productos.',
      supporting:
        'Descubra nuestras principales categorías de productos y cuéntenos qué le interesa.',
      harvestDisclaimer:
        '*Las ventanas de cosecha son indicativas y no confirman disponibilidad de stock o embarque. Las especificaciones, empaques y acuerdos de suministro se definen para cada consulta.',
      additionalHeading: 'Originación adicional',
      additionalIntro:
        '¿Busca soja, maíz amarillo o açaí? Comparta sus requisitos con nosotros.',
      viewDetails: 'Ver detalhes',
      addToInquiry: 'Añadir a consulta',
      addedToInquiry: 'En su consulta',
    },
  }[language];

  const renderFactIcon = (iconName: string) => {
    const iconProps = {
      className: 'w-4 h-4 text-[#064E3B] stroke-[1.75]',
      'aria-hidden': true,
    };
    switch (iconName) {
      case 'map-pin':
        return <MapPin {...iconProps} />;
      case 'calendar':
        return <Calendar {...iconProps} />;
      case 'package':
        return <Package {...iconProps} />;
      case 'layers':
        return <Layers {...iconProps} />;
      case 'ship':
        return <Ship {...iconProps} />;
      case 'sliders':
        return <Sliders {...iconProps} />;
      default:
        return <MapPin {...iconProps} />;
    }
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#F5EFE3] border-b border-[#EFE3CF] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with consistent heading reveal */}
        <div
          ref={headingRef}
          className={`max-w-3xl mb-10 sm:mb-14 heading-reveal ${
            isHeadingVisible ? 'is-visible' : ''
          }`}
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-[#064E3B] bg-[#E2ECE3] px-3.5 py-1.5 rounded-full inline-block mb-3">
            {tLabels.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] tracking-tight">
            {tLabels.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {tLabels.supporting}
          </p>
        </div>

        {/* 5 Main Product Cards Grid with Subgrid Row Alignment & Row-level photograph settle */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6">
          {CORE_PRODUCTS.map((prod, idx) => (
            <MainProductCard
              key={prod.id}
              product={prod}
              index={idx}
              language={language}
              tLabels={tLabels}
              renderFactIcon={renderFactIcon}
              isSelected={isProductSelected(prod.id)}
              onAdd={() => addProduct(prod.id)}
              onRemove={() => removeProduct(prod.id)}
              onNavigate={() => navigateToProduct(prod.id)}
            />
          ))}
        </div>

        {/* Understated Harvest Windows Note */}
        <div className="mb-14 sm:mb-16">
          <p className="text-xs sm:text-[13px] text-[#6B7280] italic leading-relaxed max-w-3xl">
            {tLabels.harvestDisclaimer}
          </p>
        </div>

        {/* Additional Sourcing Section */}
        <div className="pt-10 sm:pt-12 border-t border-[#D8E0D2]">
          <div
            ref={additionalHeadingRef}
            className={`max-w-2xl mb-8 heading-reveal ${
              isAdditionalHeadingVisible ? 'is-visible' : ''
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827] tracking-tight">
              {tLabels.additionalHeading}
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1.5 leading-relaxed">
              {tLabels.additionalIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {SOURCING_ON_INQUIRY_PRODUCTS.map((prod, idx) => (
              <AdditionalProductCard
                key={prod.id}
                product={prod}
                index={idx}
                language={language}
                tLabels={tLabels}
                isSelected={isProductSelected(prod.id)}
                onAdd={() => addProduct(prod.id)}
                onRemove={() => removeProduct(prod.id)}
                onNavigate={() => navigateToProduct(prod.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
