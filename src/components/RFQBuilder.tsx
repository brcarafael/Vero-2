import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { coreProducts, originationOnInquiryProducts, ProductDetail } from '../data/copy';
import { Layers, CheckCircle2, ArrowRight, RotateCcw, ShieldCheck, MapPin, Box, Send } from 'lucide-react';

export interface RFQData {
  productId: string;
  productTitle: string;
  grade: string;
  customGrade: string;
  volume: string;
  frequency: string;
  incoterm: string;
  destination: string;
}

interface RFQBuilderProps {
  initialProductId?: string | null;
  onApplyToForm: (data: RFQData) => void;
}

const allBuilderProducts: ProductDetail[] = [...coreProducts, ...originationOnInquiryProducts];

export default function RFQBuilder({ initialProductId, onApplyToForm }: RFQBuilderProps) {
  const { t } = useLanguage();

  const [selectedProduct, setSelectedProduct] = useState<ProductDetail>(coreProducts[0]);
  const [selectedGrade, setSelectedGrade] = useState<string>(coreProducts[0].grades[0]);
  const [customGrade, setCustomGrade] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>(t.rfqBuilder.frequencies[0]);
  const [customVolume, setCustomVolume] = useState<string>('');
  const [selectedIncoterm, setSelectedIncoterm] = useState<string>(t.rfqBuilder.incoterms[0]);
  const [destination, setDestination] = useState<string>('');
  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);

  useEffect(() => {
    if (initialProductId) {
      const match = allBuilderProducts.find((p) => p.id === initialProductId);
      if (match) {
        setSelectedProduct(match);
        setSelectedGrade(match.grades[0]);
      }
    }
  }, [initialProductId]);

  const handleProductChange = (prod: ProductDetail) => {
    setSelectedProduct(prod);
    setSelectedGrade(prod.grades[0]);
    setCustomGrade('');
  };

  const handleReset = () => {
    setSelectedProduct(coreProducts[0]);
    setSelectedGrade(coreProducts[0].grades[0]);
    setCustomGrade('');
    setSelectedFrequency(t.rfqBuilder.frequencies[0]);
    setCustomVolume('');
    setSelectedIncoterm(t.rfqBuilder.incoterms[0]);
    setDestination('');
    setAppliedNotice(false);
  };

  const handleTransfer = () => {
    const payload: RFQData = {
      productId: selectedProduct.id,
      productTitle: selectedProduct.title,
      grade: selectedGrade,
      customGrade: customGrade.trim(),
      volume: customVolume.trim(),
      frequency: selectedFrequency,
      incoterm: selectedIncoterm,
      destination: destination.trim(),
    };
    onApplyToForm(payload);
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 4000);

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="rfq-builder" className="py-16 md:py-24 bg-[#E2ECE3]/70 relative overflow-hidden border-t border-[#D8E0D2]">
      {/* Background Subtle Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#064E3B 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] mb-2 block">
            {t.rfqBuilder.tag}
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 tracking-tight mb-4">
            {t.rfqBuilder.headline}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 font-normal leading-relaxed">
            {t.rfqBuilder.subheadline}
          </p>
        </div>

        {/* Configurator 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Steps (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#D8E0D2] space-y-8">
            
            {/* Step 1: Product Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#064E3B] text-white text-[11px] font-bold flex items-center justify-center">1</span>
                  {t.rfqBuilder.step1}
                </label>
                <span className="text-xs text-gray-500 font-medium">5 Categorias Principais + Originação sob Consulta</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {allBuilderProducts.map((p) => {
                  const isSelected = selectedProduct.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleProductChange(p)}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-[#064E3B] bg-[#064E3B] text-white shadow-xs'
                          : 'border-gray-200 bg-gray-50/70 text-gray-700 hover:border-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <p className="truncate font-bold">{p.title.split('(')[0].trim()}</p>
                      <p className={`text-[10px] mt-1 truncate ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                        {p.category}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Grade Selection */}
            <div className="pt-2 border-t border-gray-100">
              <label className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#064E3B] text-white text-[11px] font-bold flex items-center justify-center">2</span>
                {t.rfqBuilder.step2}
              </label>

              <div className="space-y-2 mb-4">
                {selectedProduct.grades.map((grade) => (
                  <label
                    key={grade}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedGrade === grade
                        ? 'border-[#064E3B] bg-[#E2ECE3]/40 text-gray-900 font-semibold'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="rfq_grade"
                      value={grade}
                      checked={selectedGrade === grade}
                      onChange={() => setSelectedGrade(grade)}
                      className="mt-1 text-[#064E3B] focus:ring-[#064E3B]"
                    />
                    <span className="text-xs sm:text-sm leading-relaxed">{grade}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1.5 font-medium">
                  {t.rfqBuilder.labels.customGrade}
                </label>
                <input
                  type="text"
                  value={customGrade}
                  onChange={(e) => setCustomGrade(e.target.value)}
                  placeholder="ex: Arábica Peneira 17/18 Good Cup, ou lote específico com laudo"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/40 bg-gray-50/50"
                />
              </div>
            </div>

            {/* Step 3: Volume & Purchasing Scope */}
            <div className="pt-2 border-t border-gray-100">
              <label className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#064E3B] text-white text-[11px] font-bold flex items-center justify-center">3</span>
                {t.rfqBuilder.step3}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {t.rfqBuilder.frequencies.map((freq: string) => (
                  <label
                    key={freq}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer text-xs transition-all ${
                      selectedFrequency === freq
                        ? 'border-[#064E3B] bg-[#E2ECE3]/40 text-gray-900 font-bold'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="rfq_frequency"
                      value={freq}
                      checked={selectedFrequency === freq}
                      onChange={() => setSelectedFrequency(freq)}
                      className="text-[#064E3B] focus:ring-[#064E3B]"
                    />
                    <span className="leading-snug">{freq}</span>
                  </label>
                ))}
              </div>

              <div className="mt-3">
                <label className="block text-xs text-gray-600 mb-1.5 font-medium">
                  {t.rfqBuilder.labels.volume}
                </label>
                <input
                  type="text"
                  value={customVolume}
                  onChange={(e) => setCustomVolume(e.target.value)}
                  placeholder="ex: 500 MT, 3 a 5 FCLs/mês, 15.000 sacas (opcional)"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/40 bg-gray-50/50"
                />
              </div>
            </div>

            {/* Step 4: Destination & Incoterms */}
            <div className="pt-2 border-t border-gray-100">
              <label className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-[#064E3B] text-white text-[11px] font-bold flex items-center justify-center">4</span>
                {t.rfqBuilder.step4}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {t.rfqBuilder.labels.incoterm}
                  </label>
                  <select
                    value={selectedIncoterm}
                    onChange={(e) => setSelectedIncoterm(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/40 bg-gray-50/50 text-gray-800"
                  >
                    {t.rfqBuilder.incoterms.map((term: string) => (
                      <option key={term} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {t.rfqBuilder.labels.destination}
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="ex: Porto de Montreal, Roterdã, Hamburgo"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/40 bg-gray-50/50"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Parameter Summary & Bridge to Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF7EF] rounded-2xl p-6 sm:p-8 border border-[#D8E0D2] shadow-xs sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-[#EFE3CF]">
                <div className="flex items-center gap-2 text-[#064E3B]">
                  <Layers className="w-5 h-5" />
                  <h3 className="font-display font-bold text-lg text-gray-900 tracking-tight">
                    {t.rfqBuilder.summaryTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
                  title="Limpar seleções"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.rfqBuilder.resetBtn}</span>
                </button>
              </div>

              {/* Structured Parameter List */}
              <div className="py-5 space-y-4 text-xs">
                <div>
                  <span className="text-gray-500 block uppercase tracking-wider text-[10px] mb-1 font-bold">
                    Produto & Categoria
                  </span>
                  <div className="text-sm font-bold text-gray-900 flex items-center justify-between">
                    <span>{selectedProduct.title.split('(')[0]}</span>
                    <span className="text-xs font-semibold text-gray-600 bg-[#E2ECE3] px-2 py-0.5 rounded">
                      {selectedProduct.category}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 block uppercase tracking-wider text-[10px] mb-1 font-bold">
                    Especificação Selecionada
                  </span>
                  <p className="font-semibold text-gray-800 leading-snug">
                    {customGrade ? `${selectedGrade} (${customGrade})` : selectedGrade}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-gray-500 block uppercase tracking-wider text-[10px] mb-1 font-bold">
                      Frequência / Escopo
                    </span>
                    <p className="font-semibold text-gray-800">
                      {selectedFrequency}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-500 block uppercase tracking-wider text-[10px] mb-1 font-bold">
                      Volume Informado
                    </span>
                    <p className="font-semibold text-gray-800">
                      {customVolume || 'A definir na consulta'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-gray-500 block uppercase tracking-wider text-[10px] mb-1 font-bold">
                      Incoterm Preferido
                    </span>
                    <p className="font-semibold text-gray-800">
                      {selectedIncoterm}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-500 block uppercase tracking-wider text-[10px] mb-1 font-bold">
                      Destino
                    </span>
                    <p className="font-semibold text-gray-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
                      <span>{destination || 'A informar no formulário'}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action: Transfer to LeadForm */}
              <div className="pt-4 border-t border-[#EFE3CF] space-y-3">
                <button
                  type="button"
                  onClick={handleTransfer}
                  className="w-full bg-[#064E3B] hover:bg-[#0B3D2E] text-white py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>{t.rfqBuilder.applyToForm}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {appliedNotice && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Parâmetros transferidos com sucesso para o formulário abaixo!</span>
                  </div>
                )}

                <div className="flex items-start gap-2 text-[11px] text-gray-500 pt-1 leading-snug">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#064E3B] shrink-0 mt-0.5" />
                  <span>{t.rfqBuilder.commercialDisclaimer}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
