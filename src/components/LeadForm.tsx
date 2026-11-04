import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { COMMERCIAL_EMAIL } from '../constants/contact';
import { PRODUCTS, ProductId, getProductById } from '../data/products';
import {
  Mail,
  Check,
  Copy,
  AlertCircle,
  Send,
  ExternalLink,
  Clock,
  RotateCcw,
} from 'lucide-react';

interface SubmissionResult {
  inquiryId: string;
  receivedAt: string;
  message: string;
}

export default function LeadForm() {
  const { language } = useLanguage();
  const { selectedProductIds, addProduct, removeProduct, clearInquiry } = useInquiry();

  // 4 Required Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  // Optional Fields
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Honeypot spam trap (hidden from real users)
  const [honeypot, setHoneypot] = useState('');
  const loadTimestampRef = useRef<number>(Date.now());

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showFallbackManual, setShowFallbackManual] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);

  const tLabels = {
    en: {
      tag: 'Commercial Intake · Canada Desk',
      heading: 'Start a commercial sourcing conversation.',
      subheading:
        'Select the commodities of interest, leave your basic details, and our Canadian trade desk will coordinate the commercial evaluation.',
      reqBadge: 'Required',
      optBadge: 'Optional',
      productsLabel: 'Select commodities of interest:',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Sarah Jenkins',
      emailLabel: 'Corporate Work Email',
      emailPlaceholder: 'e.g. s.jenkins@company.com',
      companyLabel: 'Company Name',
      companyPlaceholder: 'e.g. Jenkins Foods Ltd.',
      countryLabel: 'Destination Country / Market',
      countryPlaceholder: 'e.g. Canada',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: 'e.g. +1 555 000-0000',
      messageLabel: 'Anything you’d like us to know?',
      messageHelper:
        'You can mention quantities, destination or questions for any of your selected products.',
      messagePlaceholder: 'For example: coffee for roasting and sugar for distribution.',
      submitBtn: 'Register Commercial Inquiry',
      submittingBtn: 'Registering Inquiry...',
      directEmailNotice:
        'All inquiries are processed by the VERO trade desk in Canada and coordinated with Brasensa in Brazil.',
      successTag: 'Inquiry Registered',
      successHeading: 'Your commercial inquiry has been registered.',
      successSub:
        'A trade desk record has been created and logged for commercial review. Here are your verified reference details:',
      refNumber: 'Trade Inquiry Reference',
      timestampLabel: 'Registered At (UTC)',
      commoditiesSelected: 'Target Commodities',
      nextSteps:
        'What happens next: Our Canadian trade desk will review your requirements with origin operations and follow up directly via email.',
      newInquiryBtn: 'Submit Another Inquiry',
      openEmailBtn: 'Open in My Email App',
      copySummaryBtn: 'Copy Full Inquiry Text',
      copiedText: 'Copied to clipboard!',
      emailFallbackTitle: 'Direct Email & Manual Transmission',
      emailFallbackDesc:
        'If you prefer to maintain a record in your own mail client, or if you need to dispatch via your corporate email system, use the direct transmission tools below:',
    },
    pt: {
      tag: 'Atendimento Comercial · Desk Canadá',
      heading: 'Inicie uma conversa sobre sua demanda de fornecimento.',
      subheading:
        'Selecione as commodities de interesse, informe os dados básicos da sua empresa e nosso desk comercial no Canadá iniciará a avaliação.',
      reqBadge: 'Obrigatório',
      optBadge: 'Opcional',
      productsLabel: 'Selecione as commodities de interesse:',
      nameLabel: 'Nome Completo',
      namePlaceholder: 'ex: Carlos Eduardo Silva',
      emailLabel: 'E-mail Corporativo',
      emailPlaceholder: 'ex: c.silva@distribuidora.com',
      companyLabel: 'Nome da Empresa',
      companyPlaceholder: 'ex: Alimentos do Atlântico S.A.',
      countryLabel: 'País / Mercado de Destino',
      countryPlaceholder: 'ex: Canadá',
      phoneLabel: 'Telefone / WhatsApp',
      phonePlaceholder: 'ex: +55 11 99999-0000',
      messageLabel: 'Algo que gostaria de nos informar?',
      messageHelper:
        'Você pode mencionar quantidades, destino ou dúvidas para qualquer um dos produtos selecionados.',
      messagePlaceholder: 'Por exemplo: café para torrefação e açúcar para distribuição.',
      submitBtn: 'Registrar Consulta Comercial',
      submittingBtn: 'Registrando Consulta...',
      directEmailNotice:
        'Todas as consultas são avaliadas pelo desk comercial da VERO no Canadá e coordenadas com a Brasensa no Brasil.',
      successTag: 'Consulta Registrada',
      successHeading: 'Sua consulta comercial foi registrada com sucesso.',
      successSub:
        'O registro foi gravado na base do desk comercial para análise. Confira os dados oficiais da sua demanda:',
      refNumber: 'Número de Protocolo',
      timestampLabel: 'Data e Hora de Registro (UTC)',
      commoditiesSelected: 'Commodities Selecionadas',
      nextSteps:
        'Próximos passos: Nossa equipe no Canadá analisará a demanda junto à estrutura de originação no Brasil e responderá diretamente pelo seu e-mail.',
      newInquiryBtn: 'Nova Consulta',
      openEmailBtn: 'Abrir no meu Aplicativo de E-mail',
      copySummaryBtn: 'Copiar Texto da Consulta',
      copiedText: 'Copiado para a área de transferência!',
      emailFallbackTitle: 'Envio Direto por E-mail',
      emailFallbackDesc:
        'Se preferir manter registro no seu próprio programa de e-mail corporativo, você pode abrir diretamente o aplicativo ou copiar a íntegra abaixo:',
    },
    es: {
      tag: 'Atención Comercial · Desk Canadá',
      heading: 'Inicie una conversación sobre su demanda de suministro.',
      subheading:
        'Seleccione las commodities de interés, deje sus datos básicos y nuestro desk en Canadá coordinará la evaluación comercial.',
      reqBadge: 'Obligatorio',
      optBadge: 'Opcional',
      productsLabel: 'Seleccione las commodities de interés:',
      nameLabel: 'Nombre Completo',
      namePlaceholder: 'ej: Alejandro Gómez',
      emailLabel: 'Correo Electrónico Corporativo',
      emailPlaceholder: 'ej: a.gomez@empresa.com',
      companyLabel: 'Nombre de la Empresa',
      companyPlaceholder: 'ej: Distribuidora Andina S.A.',
      countryLabel: 'País / Mercado de Destino',
      countryPlaceholder: 'ej: Canadá',
      phoneLabel: 'Teléfono / WhatsApp',
      phonePlaceholder: 'ej: +1 555 000-0000',
      messageLabel: '¿Algo que le gustaría informarnos?',
      messageHelper:
        'Puede mencionar cantidades, destino o dudas para cualquiera de sus productos seleccionados.',
      messagePlaceholder: 'Por ejemplo: café para tostar y azúcar para distribución.',
      submitBtn: 'Registrar Consulta Comercial',
      submittingBtn: 'Registrando Consulta...',
      directEmailNotice:
        'Todas las consultas son evaluadas por el desk de VERO en Canadá y coordinadas con Brasensa en Brasil.',
      successTag: 'Consulta Registrada',
      successHeading: 'Su consulta comercial ha sido registrada.',
      successSub:
        'Se ha creado el registro oficial para análisis comercial. A continuación los datos de referencia:',
      refNumber: 'Número de Protocolo',
      timestampLabel: 'Fecha y Hora de Registro (UTC)',
      commoditiesSelected: 'Commodities Seleccionadas',
      nextSteps:
        'Próximos pasos: Nuestro equipo en Canadá revisará los parámetros con origen y le contactará directamente por correo electrónico.',
      newInquiryBtn: 'Nueva Consulta',
      openEmailBtn: 'Abrir en mi Programa de Correo',
      copySummaryBtn: 'Copiar Texto de Consulta',
      copiedText: '¡Copiado al portapapeles!',
      emailFallbackTitle: 'Envío Directo por Correo',
      emailFallbackDesc:
        'Si desea conservar constancia en su programa de correo habitual, use los botones directos a continuación:',
    },
  }[language];

  // Native Checkbox handler ensuring single clean toggle without double events
  const handleProductCheckboxChange = (id: ProductId, isChecked: boolean) => {
    if (isChecked) {
      addProduct(id);
    } else {
      removeProduct(id);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid corporate email.';
    }
    if (!company.trim()) errs.company = 'Please provide your company name.';
    if (selectedProductIds.length === 0) errs.products = 'Please select at least one commodity.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildSummaryText = () => {
    const lines: string[] = [];
    lines.push('==================================================');
    lines.push('VERO TRADING CO. — COMMERCIAL INQUIRY');
    lines.push(`Contact Trade Desk: ${COMMERCIAL_EMAIL}`);
    lines.push('==================================================');
    lines.push('');
    lines.push('1. BUYER PROFILE:');
    lines.push(`Name: ${name.trim()}`);
    lines.push(`Company: ${company.trim()}`);
    lines.push(`Work Email: ${email.trim()}`);
    lines.push(`Country / Market: ${country.trim() || 'Not specified'}`);
    lines.push(`Phone / WhatsApp: ${phone.trim() || 'Not provided'}`);
    lines.push('');
    lines.push('2. SELECTED COMMODITIES:');
    selectedProductIds.forEach((id) => {
      const p = getProductById(id);
      const title = p ? p.title[language] || p.title.en : id;
      lines.push(`• ${title} [ID: ${id}]`);
    });
    lines.push('');
    lines.push('3. BUYER MESSAGE & REQUIREMENTS:');
    lines.push(message.trim() ? message.trim() : 'No additional notes provided.');
    lines.push('');
    lines.push('==================================================');
    lines.push('Commercial Coordination: VERO (Canada)');
    lines.push('Origin Structure: Brasensa (Brazil)');
    lines.push(`Direct Desk: ${COMMERCIAL_EMAIL}`);
    lines.push('==================================================');
    return lines.join('\n');
  };

  const summaryText = buildSummaryText();
  const productNamesStr = selectedProductIds
    .map((id) => getProductById(id)?.shortTitle?.[language] || id)
    .join(', ');
  const emailSubject = `VERO Trade Inquiry — ${company.trim() || 'Commercial Buyer'} — ${productNamesStr}`;
  const normalizedBody = summaryText.replace(/\r?\n/g, '\r\n');
  const mailtoUrl = `mailto:${COMMERCIAL_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(normalizedBody)}`;

  const handleCopyText = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(summaryText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      summaryRef.current?.focus();
      summaryRef.current?.select();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validate()) return;

    setSubmitting(true);
    const elapsedSeconds = (Date.now() - loadTimestampRef.current) / 1000;

    // Full list of selected products with IDs and names
    const fullProductsList = selectedProductIds.map((id) => {
      const p = getProductById(id);
      return {
        id,
        name: p ? p.title[language] || p.title.en : id,
      };
    });

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      products: fullProductsList,
      country: country.trim() || null,
      phone: phone.trim() || null,
      message: message.trim() || null,
      honeypot,
      elapsedSeconds,
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server rejected the inquiry registration.');
      }

      setSubmissionResult({
        inquiryId: data.inquiryId,
        receivedAt: data.receivedAt,
        message: data.message,
      });

      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (err: any) {
      console.warn('Backend inquiry registration issue:', err);
      setSubmissionError(
        'The online registration desk could not complete automatic recording. You can transmit your inquiry directly via your email client below.'
      );
      setShowFallbackManual(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setSubmissionError(null);
    setShowFallbackManual(false);
    clearInquiry();
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setCountry('');
    setPhone('');
  };

  return (
    <section
      id="inquiry-form"
      ref={formRef}
      className="py-16 sm:py-24 bg-[#FAF7EF] border-t border-[#E2ECE3]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#064E3B] bg-[#E2ECE3] px-3.5 py-1.5 rounded-full inline-block mb-3">
            {tLabels.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] tracking-tight">
            {tLabels.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {tLabels.subheading}
          </p>
        </div>

        {/* Success Confirmation State */}
        {submissionResult ? (
          <div className="bg-white rounded-2xl border-2 border-[#064E3B] p-6 sm:p-10 shadow-xl animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#064E3B] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#064E3B]">
                  {tLabels.successTag}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827]">
                  {tLabels.successHeading}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#4B5563] mb-6 leading-relaxed">
              {tLabels.successSub}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-[#F5EFE3] border border-[#EFE3CF] mb-6">
              <div>
                <span className="text-xs text-[#064E3B] font-semibold uppercase tracking-wider block">
                  {tLabels.refNumber}
                </span>
                <span className="text-base sm:text-lg font-mono font-bold text-[#111827]">
                  {submissionResult.inquiryId}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#064E3B] font-semibold uppercase tracking-wider block">
                  {tLabels.timestampLabel}
                </span>
                <span className="text-xs sm:text-sm font-mono text-[#374151]">
                  {new Date(submissionResult.receivedAt).toUTCString()}
                </span>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-[#E2ECE3]">
                <span className="text-xs text-[#064E3B] font-semibold uppercase tracking-wider block mb-1">
                  {tLabels.commoditiesSelected}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProductIds.map((id) => (
                    <span
                      key={id}
                      className="px-2.5 py-1 rounded bg-[#064E3B] text-white text-xs font-medium"
                    >
                      {getProductById(id)?.shortTitle?.[language] || id}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#E2ECE3]/60 border border-[#D8E0D2] mb-6 flex items-start space-x-3 text-xs sm:text-sm text-[#064E3B]">
              <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{tLabels.nextSteps}</span>
            </div>

            {/* Direct transmission actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <a
                href={mailtoUrl}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-[#064E3B] text-white font-semibold text-xs sm:text-sm hover:bg-[#0B3D2E] transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{tLabels.openEmailBtn}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <button
                onClick={handleCopyText}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-[#D8E0D2] bg-[#FAF7EF] text-[#111827] font-semibold text-xs sm:text-sm hover:bg-[#F5EFE3] transition-colors cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? tLabels.copiedText : tLabels.copySummaryBtn}</span>
              </button>

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl text-xs sm:text-sm text-[#4B5563] hover:text-[#111827] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                <span>{tLabels.newInquiryBtn}</span>
              </button>
            </div>
          </div>
        ) : (
          /* The Clean 1-Step Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-[#D8E0D2] p-6 sm:p-10 shadow-sm"
          >
            {/* Honeypot field (hidden from sight and screen-readers) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company_website_url">Leave empty</label>
              <input
                id="company_website_url"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Product Multi-Select Group: Fully Clickable Native Options */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs sm:text-sm font-bold text-[#111827]">
                  {tLabels.productsLabel}
                </label>
                <span className="text-[11px] font-semibold text-[#064E3B] bg-[#E2ECE3] px-2 py-0.5 rounded">
                  {tLabels.reqBadge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PRODUCTS.map((prod) => {
                  const checked = selectedProductIds.includes(prod.id);
                  const shortName = prod.shortTitle?.[language] || prod.title[language] || prod.title.en;
                  const inputId = `product-option-${prod.id}`;

                  return (
                    <label
                      key={prod.id}
                      htmlFor={inputId}
                      className={`relative flex items-center space-x-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer select-none transition-all ${
                        checked
                          ? 'border-[#064E3B] bg-[#E2ECE3]/40 text-[#064E3B] font-semibold shadow-xs ring-1 ring-[#064E3B]'
                          : 'border-[#D8E0D2] bg-white text-[#374151] hover:border-gray-400 hover:bg-[#FAF7EF]/40'
                      } has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#064E3B] has-[:focus-visible]:ring-offset-2`}
                    >
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => handleProductCheckboxChange(prod.id, e.target.checked)}
                        className="w-4 h-4 rounded text-[#064E3B] accent-[#064E3B] focus-visible:outline-none cursor-pointer flex-shrink-0"
                      />
                      <span className="truncate">{shortName}</span>
                    </label>
                  );
                })}
              </div>

              {errors.products && (
                <p className="text-xs text-red-600 mt-2 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.products}</span>
                </p>
              )}
            </div>

            {/* The 3 Core Required Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="inquiry-full-name"
                  className="block text-xs font-bold text-[#111827] mb-1.5"
                >
                  {tLabels.nameLabel} <span className="text-red-500 font-normal">*</span>
                </label>
                <input
                  id="inquiry-full-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={tLabels.namePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] bg-white text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent transition-colors"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              {/* Corporate Email */}
              <div>
                <label
                  htmlFor="inquiry-email"
                  className="block text-xs font-bold text-[#111827] mb-1.5"
                >
                  {tLabels.emailLabel} <span className="text-red-500 font-normal">*</span>
                </label>
                <input
                  id="inquiry-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tLabels.emailPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] bg-white text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent transition-colors"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="inquiry-company"
                  className="block text-xs font-bold text-[#111827] mb-1.5"
                >
                  {tLabels.companyLabel} <span className="text-red-500 font-normal">*</span>
                </label>
                <input
                  id="inquiry-company"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={tLabels.companyPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] bg-white text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent transition-colors"
                />
                {errors.company && <p className="text-xs text-red-600 mt-1">{errors.company}</p>}
              </div>
            </div>

            {/* Optional Fast Details (Country & Phone) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="inquiry-country"
                    className="block text-xs font-bold text-[#111827]"
                  >
                    {tLabels.countryLabel}
                  </label>
                  <span className="text-[11px] text-[#6B7280]">{tLabels.optBadge}</span>
                </div>
                <input
                  id="inquiry-country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={tLabels.countryPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] bg-white text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-xs font-bold text-[#111827]"
                  >
                    {tLabels.phoneLabel}
                  </label>
                  <span className="text-[11px] text-[#6B7280]">{tLabels.optBadge}</span>
                </div>
                <input
                  id="inquiry-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={tLabels.phonePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] bg-white text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Simplified Optional Textarea (Single unified message for all selected products) */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="inquiry-message"
                  className="block text-xs font-bold text-[#111827]"
                >
                  {tLabels.messageLabel}
                </label>
                <span className="text-[11px] text-[#6B7280]">{tLabels.optBadge}</span>
              </div>
              <p className="text-xs text-[#6B7280] mb-2 font-normal">
                {tLabels.messageHelper}
              </p>
              <textarea
                id="inquiry-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={tLabels.messagePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] bg-white text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent resize-y transition-colors"
              />
            </div>

            {/* Server Error Warning (if any) */}
            {submissionError && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-800 flex items-start space-x-2.5">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-semibold">{submissionError}</p>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-[11px] sm:text-xs text-[#6B7280] leading-relaxed max-w-sm">
                {tLabels.directEmailNotice}
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-[#064E3B] text-[#FAF7EF] font-semibold text-sm hover:bg-[#0B3D2E] transition-all shadow-md active:scale-98 disabled:opacity-60 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    <span>{tLabels.submittingBtn}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{tLabels.submitBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* Manual fallback toggle if buyer wants to transmit via client email */}
            {(showFallbackManual || errors.general) && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
                  {tLabels.emailFallbackTitle}
                </h4>
                <p className="text-xs text-[#4B5563] mb-4">
                  {tLabels.emailFallbackDesc}
                </p>
                <textarea
                  ref={summaryRef}
                  readOnly
                  rows={6}
                  value={summaryText}
                  className="w-full p-3 font-mono text-xs bg-[#FAF7EF] border border-[#D8E0D2] rounded-lg mb-3"
                />
                <div className="flex gap-3">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#064E3B] text-white text-xs font-medium"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{tLabels.openEmailBtn}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg border border-[#D8E0D2] text-xs font-medium"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? tLabels.copiedText : tLabels.copySummaryBtn}</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
