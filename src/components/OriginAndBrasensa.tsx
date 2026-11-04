import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe2, Building2, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export default function OriginAndBrasensa() {
  const { language } = useLanguage();
  const [approachOpen, setApproachOpen] = useState(false);

  const tLabels = {
    en: {
      tag: 'Commercial Structure',
      headline: 'Your contact in Canada. Connected to Brazilian origin.',
      intro:
        'VERO is your point of contact for exploring Brazilian product opportunities. We coordinate your requirements with Brasensa in Brazil and help clarify the next commercial steps.',
      veroRoleTitle: 'VERO — Canada',
      veroRoleDesc:
        'Your commercial contact for discussing product interests, understanding requirements and coordinating follow-up.',
      brasensaRoleTitle: 'Brasensa — Brazil',
      brasensaRoleDesc:
        'The Brazilian business focused on origination and export, with whom VERO coordinates sourcing discussions.',
      disclosureTitle: 'Learn about our approach',
      approachSteps: [
        {
          title: 'How requirements are discussed',
          desc: 'We review target commodities, volumes, target ports and packaging formats directly in your language and time zone.',
        },
        {
          title: 'How availability and specifications are checked',
          desc: 'We verify seasonal crop timelines, volume readiness and origin inspection parameters with Brasensa in Brazil.',
        },
        {
          title: 'How next steps are coordinated',
          desc: 'Following initial qualification, formal commercial proposals and operational terms are aligned with Brazilian origin.',
        },
      ],
    },
    pt: {
      tag: 'Estrutura Comercial',
      headline: 'Seu contato no Canadá. Conectado à origem brasileira.',
      intro:
        'A VERO é o seu ponto de contato para explorar oportunidades de produtos brasileiros. Coordenamos seus requisitos com a Brasensa no Brasil e ajudamos a esclarecer os próximos passos comerciais.',
      veroRoleTitle: 'VERO — Canadá',
      veroRoleDesc:
        'Seu contato comercial para conversar sobre interesses de produtos, entender requisitos e coordenar o acompanhamento.',
      brasensaRoleTitle: 'Brasensa — Brasil',
      brasensaRoleDesc:
        'A empresa brasileira focada em originação e exportação, com quem a VERO coordena as discussões de fornecimento.',
      disclosureTitle: 'Conheça nossa abordagem',
      approachSteps: [
        {
          title: 'Como os requisitos são conversados',
          desc: 'Avaliamos commodities de interesse, volumes previstos, porto de destino e formatos de embalagem no seu fuso horário.',
        },
        {
          title: 'Como disponibilidade e especificações são checadas',
          desc: 'Conferimos janelas de safra vigentes, viabilidade de lote e parâmetros de inspeção na origem com a Brasensa no Brasil.',
        },
        {
          title: 'Como os próximos passos são coordenados',
          desc: 'Após a qualificação inicial da demanda, alinhamos as tratativas comerciais formais e termos operacionais junto à origem.',
        },
      ],
    },
    es: {
      tag: 'Estructura Comercial',
      headline: 'Su contacto en Canadá. Conectado al origen brasileño.',
      intro:
        'VERO es su punto de contacto para explorar oportunidades de productos brasileños. Coordinamos sus requisitos con Brasensa en Brasil y ayudamos a clarificar los próximos pasos comerciales.',
      veroRoleTitle: 'VERO — Canadá',
      veroRoleDesc:
        'Su contacto comercial para conversar sobre intereses de productos, entender requisitos y coordinar el seguimiento.',
      brasensaRoleTitle: 'Brasensa — Brasil',
      brasensaRoleDesc:
        'La empresa brasileña enfocada en originación y exportación, con quien VERO coordina las conversaciones de suministro.',
      disclosureTitle: 'Conozca nuestro enfoque',
      approachSteps: [
        {
          title: 'Cómo se conversan los requisitos',
          desc: 'Evaluamos commodities de interés, volumen estimado, puerto de destino y empaques en su zona horaria e idioma.',
        },
        {
          title: 'Cómo se verifican disponibilidad y especificaciones',
          desc: 'Revisamos calendarios de cosecha, disponibilidad de lote y parámetros de inspección con Brasensa en Brasil.',
        },
        {
          title: 'Cómo se coordinan los próximos pasos',
          desc: 'Tras la calificación inicial, formalizamos las condiciones comerciales y operativas en conjunto con el origen.',
        },
      ],
    },
  }[language];

  return (
    <section
      id="partnership"
      className="py-16 sm:py-24 bg-[#FAF7EF] border-b border-[#EFE3CF]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#064E3B] bg-[#E2ECE3] px-3.5 py-1.5 rounded-full inline-block mb-3">
            {tLabels.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] tracking-tight">
            {tLabels.headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#374151] leading-relaxed">
            {tLabels.intro}
          </p>
        </div>

        {/* Clean 2-Column Role Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-10 border-b border-[#E2ECE3]">
          {/* VERO Role */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5 text-[#064E3B]">
              <div className="w-8 h-8 rounded-lg bg-[#E2ECE3] flex items-center justify-center">
                <Globe2 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#111827]">
                {tLabels.veroRoleTitle}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {tLabels.veroRoleDesc}
            </p>
          </div>

          {/* Brasensa Role */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5 text-[#064E3B]">
              <div className="w-8 h-8 rounded-lg bg-[#E2ECE3] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#111827]">
                {tLabels.brasensaRoleTitle}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {tLabels.brasensaRoleDesc}
            </p>
          </div>
        </div>

        {/* Secondary Approach Disclosure */}
        <div className="pt-8">
          <button
            type="button"
            onClick={() => setApproachOpen(!approachOpen)}
            className="flex items-center justify-between w-full text-left py-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#064E3B] rounded-lg"
            aria-expanded={approachOpen}
          >
            <span className="text-sm font-semibold text-[#064E3B] group-hover:text-[#0B3D2E] transition-colors">
              {tLabels.disclosureTitle}
            </span>
            <span className="p-1.5 rounded-md bg-[#E2ECE3] text-[#064E3B] group-hover:bg-[#D8E0D2] transition-colors ml-2">
              {approachOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </span>
          </button>

          {approachOpen && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white border border-[#D8E0D2] shadow-xs animate-fade-in">
              {tLabels.approachSteps.map((step, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
