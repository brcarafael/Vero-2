import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Building2, Globe2, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function OriginAndBrasensa() {
  const { t, language } = useLanguage();

  const tLabels = {
    en: {
      narrativeTitle:
        'A structured commercial bridge between international buyers and Brazilian origins',
      deskLabel: 'Canada Commercial Desk (VERO)',
      originationLabel: 'Brazilian Export Structure (Brasensa)',
      alignmentBadge: 'B2B Commercial Alignment',
      cooperationDesc:
        'Direct bilateral coordination connecting qualified international demands directly to established producers and mills in Brazil.',
      deskSubtitle: 'Canada · Commercial Intake & Coordination',
      originSubtitle: 'Brazil · Agricultural Origination & Export Structure',
    },
    pt: {
      narrativeTitle:
        'Uma ponte estruturada entre compradores internacionais e as origens agrícolas do Brasil',
      deskLabel: 'Desk Comercial no Canadá (VERO)',
      originationLabel: 'Estrutura de Exportação no Brasil (Brasensa)',
      alignmentBadge: 'Alinhamento B2B Direto',
      cooperationDesc:
        'Cooperação comercial direta para levar consultas qualificadas a produtores e usinas estruturados no Brasil.',
      deskSubtitle: 'Canadá · Desk Comercial e Interlocução',
      originSubtitle: 'Brasil · Estrutura de Exportação e Originação',
    },
    es: {
      narrativeTitle:
        'Un puente comercial estructurado entre compradores internacionales y los orígenes de Brasil',
      deskLabel: 'Desk Comercial en Canadá (VERO)',
      originationLabel: 'Estructura de Exportación en Brasil (Brasensa)',
      alignmentBadge: 'Alineación B2B Directa',
      cooperationDesc:
        'Coordinación bilateral para conectar demandas calificadas directamente con ingenios y productores en Brasil.',
      deskSubtitle: 'Canadá · Desk Comercial y Coordinación',
      originSubtitle: 'Brasil · Estructura de Exportación y Originación',
    },
  }[language];

  return (
    <section
      id="partnership"
      className="py-16 sm:py-24 bg-[#FAF7EF] relative overflow-hidden border-b border-[#EFE3CF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#064E3B] bg-[#E2ECE3] px-3.5 py-1.5 rounded-full inline-block mb-3">
            {t.partnership.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] tracking-tight">
            {t.partnership.headline}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {t.partnership.subheadline}
          </p>
        </div>

        {/* Narrative & Bilateral Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Main Narrative Explanation (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#D8E0D2] shadow-xs">
            <h3 className="text-lg sm:text-xl font-bold font-heading text-[#111827] tracking-tight">
              {tLabels.narrativeTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              {t.partnership.copy1}
            </p>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              {t.partnership.copy2}
            </p>

            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-xs font-semibold text-[#4B5563]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#064E3B]" />
                {tLabels.deskLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C9A24A]" />
                {tLabels.originationLabel}
              </span>
            </div>
          </div>

          {/* Operational Corridor Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#F5EFE3] p-6 sm:p-8 rounded-2xl border border-[#D8E0D2] space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E2ECE3] text-[#064E3B] flex items-center justify-center shrink-0">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#111827]">VERO Trading Co.</h4>
                <p className="text-xs text-[#6B7280]">{tLabels.deskSubtitle}</p>
              </div>
            </div>

            <div className="flex items-center justify-center py-1">
              <div className="w-full flex items-center gap-2">
                <div className="h-[1px] bg-[#064E3B]/20 flex-1" />
                <span className="text-[11px] font-mono font-bold text-[#064E3B] px-2.5 py-1 bg-white border border-[#D8E0D2] rounded-md shadow-2xs">
                  {tLabels.alignmentBadge}
                </span>
                <div className="h-[1px] bg-[#064E3B]/20 flex-1" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0B3D2E] flex items-center justify-center shrink-0 border border-[#D8E0D2]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#111827]">Brasensa</h4>
                <p className="text-xs text-[#6B7280]">{tLabels.originSubtitle}</p>
              </div>
            </div>

            <p className="text-xs text-[#4B5563] leading-relaxed pt-2 border-t border-[#D8E0D2]">
              {tLabels.cooperationDesc}
            </p>
          </div>
        </div>

        {/* 3 Practical Benefits for Buyers */}
        <div className="mb-12">
          <h3 className="text-lg sm:text-xl font-bold font-heading text-[#111827] tracking-tight mb-6">
            {t.partnership.benefitTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.partnership.benefits.map(
              (b: { title: string; desc: string }, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-[#D8E0D2] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[#064E3B] mb-2.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <h4 className="text-sm sm:text-base font-bold text-[#111827] tracking-tight">
                        {b.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4B5563] font-normal leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Factual Institutional Disclaimer */}
        <div className="p-5 sm:p-6 bg-[#F5EFE3] rounded-2xl border border-[#D8E0D2] flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-[#064E3B] shrink-0 mt-0.5" />
          <p className="text-xs text-[#4B5563] leading-relaxed font-normal">
            {t.partnership.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
