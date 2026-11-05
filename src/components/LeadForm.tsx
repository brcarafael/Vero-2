import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInquiry } from '../context/InquiryContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { COMMERCIAL_EMAIL } from '../constants/contact';
import { PRODUCTS, ProductId, getProductById } from '../data/products';
import { Check, AlertCircle, Copy, RotateCcw, Mail } from 'lucide-react';

interface SubmissionResult {
  inquiryId: string;
  receivedAt: string;
  message: string;
}

export default function LeadForm() {
  const { language } = useLanguage();
  const { selectedProductIds, toggleProduct, isProductSelected, clearInquiry } = useInquiry();

  const [headingRef, isHeadingVisible] = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px',
    exitBufferPx: 50,
  });

  // Required Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  // Optional Fields
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Honeypot spam trap (hidden from humans)
  const [honeypot, setHoneypot] = useState('');
  const loadTimestampRef = useRef<number>(Date.now());

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const tLabels = {
    en: {
      tag: 'Commercial Sourcing Conversation',
      heading: 'Start a commercial sourcing conversation.',
      subheading:
        'Tell us what interests you—we’ll coordinate the next steps with Brasensa in Brazil.',
      reqBadge: 'Required',
      optBadge: 'Optional',
      productsLabel: 'Products of interest',
      productsHelper: 'Select one or more Brazilian products. You can also select Other / Not sure yet.',
      otherOptionLabel: 'Other / Not sure yet',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Sarah Jenkins',
      emailLabel: 'Work Email',
      emailPlaceholder: 'e.g. s.jenkins@company.com',
      companyLabel: 'Company Name',
      companyPlaceholder: 'e.g. Jenkins Foods Ltd.',
      countryLabel: 'Destination Country / Market',
      countryPlaceholder: 'e.g. Canada or United States',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: 'e.g. +1 416 555-0199',
      messageLabel: 'Anything you’d like us to know?',
      messageHelper:
        'You can mention quantities, destination or questions for any of your selected products.',
      messagePlaceholder: 'For example: coffee for roasting and sugar for distribution.',
      submitBtn: 'Send inquiry',
      submittingBtn: 'Sending inquiry...',
      successTag: 'Inquiry Received',
      successHeading: 'Your inquiry has been registered.',
      successSub:
        'Our Canadian trade desk has received your request and will coordinate the review with Brasensa in Brazil.',
      refNumber: 'Reference ID',
      timestampLabel: 'Received At (UTC)',
      selectedProductsLabel: 'Selected Products',
      newInquiryBtn: 'Submit another inquiry',
      copySummaryBtn: 'Copy inquiry summary',
      copiedText: 'Copied to clipboard!',
      openMailBtn: 'Open in email app',
      errorHeading: 'Submission could not be completed',
      errorFallbackPrompt:
        'Your information has been preserved above. You can retry or email us directly at',
    },
    pt: {
      tag: 'Conversa Comercial',
      heading: 'Inicie uma conversa sobre sua demanda de fornecimento.',
      subheading:
        'Conte-nos o que interessa à sua empresa—nós coordenamos os próximos passos com a Brasensa no Brasil.',
      reqBadge: 'Obrigatório',
      optBadge: 'Opcional',
      productsLabel: 'Produtos de interesse',
      productsHelper: 'Selecione um ou mais produtos brasileiros. Você também pode marcar Outro / A definir.',
      otherOptionLabel: 'Outro / A definir',
      nameLabel: 'Nome Completo',
      namePlaceholder: 'ex: Carlos Silva',
      emailLabel: 'E-mail Corporativo',
      emailPlaceholder: 'ex: c.silva@distribuidora.com',
      companyLabel: 'Nome da Empresa',
      companyPlaceholder: 'ex: Alimentos do Atlântico S.A.',
      countryLabel: 'País / Mercado de Destino',
      countryPlaceholder: 'ex: Canadá ou Estados Unidos',
      phoneLabel: 'Telefone / WhatsApp',
      phonePlaceholder: 'ex: +55 11 99999-0000',
      messageLabel: 'Algo que gostaria de nos informar?',
      messageHelper:
        'Você pode mencionar quantidades, destino ou dúvidas para qualquer um dos produtos selecionados.',
      messagePlaceholder: 'Por exemplo: café para torrefação e açúcar para distribuição.',
      submitBtn: 'Enviar consulta',
      submittingBtn: 'Enviando consulta...',
      successTag: 'Consulta Recebida',
      successHeading: 'Sua consulta comercial foi registrada.',
      successSub:
        'Nosso desk comercial no Canadá recebeu sua demanda e iniciará a coordenação com a Brasensa no Brasil.',
      refNumber: 'Código de Referência',
      timestampLabel: 'Recebido em (UTC)',
      selectedProductsLabel: 'Produtos Selecionados',
      newInquiryBtn: 'Enviar nova consulta',
      copySummaryBtn: 'Copiar resumo da consulta',
      copiedText: 'Copiado para a área de transferência!',
      openMailBtn: 'Abrir no aplicativo de e-mail',
      errorHeading: 'Não foi possível concluir o envio',
      errorFallbackPrompt:
        'Seus dados foram preservados acima. Você pode tentar novamente ou escrever diretamente para',
    },
    es: {
      tag: 'Conversación Comercial',
      heading: 'Inicie una conversación sobre su demanda de suministro.',
      subheading:
        'Cuéntenos su interés y coordinaremos los siguientes pasos con Brasensa en Brasil.',
      reqBadge: 'Obligatorio',
      optBadge: 'Opcional',
      productsLabel: 'Productos de interés',
      productsHelper: 'Seleccione uno o más productos brasileños. También puede elegir Otro / Por definir.',
      otherOptionLabel: 'Otro / Por definir',
      nameLabel: 'Nombre Completo',
      namePlaceholder: 'ej: Alejandro Gómez',
      emailLabel: 'Correo Electrónico Corporativo',
      emailPlaceholder: 'ej: a.gomez@empresa.com',
      companyLabel: 'Nombre de la Empresa',
      companyPlaceholder: 'ej: Distribuidora Andina S.A.',
      countryLabel: 'País / Mercado de Destino',
      countryPlaceholder: 'ej: Canadá o Estados Unidos',
      phoneLabel: 'Teléfono / WhatsApp',
      phonePlaceholder: 'ej: +1 555 000-0000',
      messageLabel: '¿Algo que le gustaría informarnos?',
      messageHelper:
        'Puede mencionar cantidades, destino o dudas para cualquiera de sus productos seleccionados.',
      messagePlaceholder: 'Por ejemplo: café para tostar y azúcar para distribución.',
      submitBtn: 'Enviar consulta',
      submittingBtn: 'Enviando consulta...',
      successTag: 'Consulta Recibida',
      successHeading: 'Su consulta comercial ha sido registrada.',
      successSub:
        'Nuestro desk en Canadá ha recibido su solicitud y coordinará la revisión con Brasensa en Brasil.',
      refNumber: 'Código de Referencia',
      timestampLabel: 'Recibido en (UTC)',
      selectedProductsLabel: 'Productos Seleccionados',
      newInquiryBtn: 'Enviar otra consulta',
      copySummaryBtn: 'Copiar resumen de la consulta',
      copiedText: '¡Copiado al portapapeles!',
      openMailBtn: 'Abrir en aplicación de correo',
      errorHeading: 'No fue posible completar el envío',
      errorFallbackPrompt:
        'Sus datos se han conservado arriba. Puede reintentar o escribir directamente a',
    },
  }[language];

  // Options list: 8 products + 1 "Other / Not sure yet"
  const commodityOptions: Array<{ id: ProductId | 'other'; label: string }> = [
    ...PRODUCTS.map((p) => ({
      id: p.id,
      label: p.shortTitle[language] || p.shortTitle.en,
    })),
    {
      id: 'other',
      label: tLabels.otherOptionLabel,
    },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (selectedProductIds.length === 0) {
      newErrors.products =
        language === 'pt'
          ? 'Por favor, selecione ao menos um produto de interesse.'
          : language === 'es'
          ? 'Por favor, seleccione al menos un producto de interés.'
          : 'Please select at least one product of interest.';
    }
    if (!name.trim()) {
      newErrors.name =
        language === 'pt'
          ? 'Por favor, informe seu nome completo.'
          : language === 'es'
          ? 'Por favor, ingrese su nombre completo.'
          : 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email =
        language === 'pt'
          ? 'Por favor, informe um e-mail corporativo válido.'
          : language === 'es'
          ? 'Por favor, ingrese un correo corporativo válido.'
          : 'Please enter a valid work email address.';
    }
    if (!company.trim()) {
      newErrors.company =
        language === 'pt'
          ? 'Por favor, informe o nome da sua empresa.'
          : language === 'es'
          ? 'Por favor, ingrese el nombre de su empresa.'
          : 'Please enter your company name.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    const elapsedSeconds = (Date.now() - loadTimestampRef.current) / 1000;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      country: country.trim() || undefined,
      phone: phone.trim() || undefined,
      message: message.trim() || undefined,
      products: selectedProductIds.map((id) => {
        if (id === 'other') return { id: 'other', name: tLabels.otherOptionLabel };
        const prod = getProductById(id);
        return {
          id,
          name: prod ? prod.title[language] || prod.title.en : id,
        };
      }),
      honeypot,
      elapsedSeconds,
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server error while registering inquiry.');
      }

      setSubmissionResult({
        inquiryId: data.inquiryId,
        receivedAt: data.receivedAt,
        message: data.message,
      });
    } catch (err: any) {
      console.error('[INQUIRY_SUBMISSION_FAILED]', err);
      setSubmissionError(err.message || 'Submission failed. Please check your connection or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedNames = selectedProductIds.map((id) => {
    if (id === 'other') return tLabels.otherOptionLabel;
    const p = getProductById(id);
    return p ? p.shortTitle[language] || p.shortTitle.en : id;
  });

  const generateSummaryText = () => {
    return [
      `=== VERO TRADING INQUIRY ===`,
      submissionResult ? `Reference ID: ${submissionResult.inquiryId}` : '',
      `Contact: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      country ? `Destination: ${country}` : '',
      phone ? `Phone: ${phone}` : '',
      `Products: ${selectedNames.join(', ')}`,
      message ? `Notes: ${message}` : '',
      `Sent to: ${COMMERCIAL_EMAIL}`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const mailtoUrl = `mailto:${COMMERCIAL_EMAIL}?subject=${encodeURIComponent(
    `Trade Inquiry - ${company || name || 'VERO'}`
  )}&body=${encodeURIComponent(generateSummaryText())}`;

  // If successfully submitted, display verified receipt
  if (submissionResult) {
    return (
      <section id="inquiry-form" className="py-16 sm:py-24 bg-[#FAF7EF] border-b border-[#E5DEC9] scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#0B3D2E] p-6 sm:p-10 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B3D2E] mb-2">
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{tLabels.successTag}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#111827] tracking-tight mb-2">
              {tLabels.successHeading}
            </h2>

            <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
              {tLabels.successSub}
            </p>

            {/* Receipt Summary Card */}
            <div className="p-5 rounded-xl bg-[#FAF7EF] border border-[#E5DEC9] space-y-3 mb-6 text-xs text-[#374151]">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5DEC9]">
                <span className="font-semibold text-[#111827]">{tLabels.refNumber}:</span>
                <span className="font-mono font-bold text-[#0B3D2E] text-sm">
                  {submissionResult.inquiryId}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-[#E5DEC9]">
                <span className="font-semibold text-[#111827]">{tLabels.timestampLabel}:</span>
                <span className="font-mono text-gray-600">
                  {new Date(submissionResult.receivedAt).toUTCString()}
                </span>
              </div>

              <div className="pb-2 border-b border-[#E5DEC9]">
                <span className="font-semibold text-[#111827] block mb-1">
                  {tLabels.selectedProductsLabel}:
                </span>
                <span className="text-[#0B3D2E] font-medium">
                  {selectedNames.join(' · ')}
                </span>
              </div>

              {message && (
                <div>
                  <span className="font-semibold text-[#111827] block mb-1">Message:</span>
                  <p className="text-gray-600 italic">"{message}"</p>
                </div>
              )}
            </div>

            {/* Actions: Copy Summary & Open in Mail */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="px-5 py-2.5 rounded-lg border border-[#D8E0D2] hover:bg-gray-50 text-xs font-semibold text-gray-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? tLabels.copiedText : tLabels.copySummaryBtn}</span>
              </button>

              <a
                href={mailtoUrl}
                className="px-5 py-2.5 rounded-lg border border-[#D8E0D2] hover:bg-gray-50 text-xs font-semibold text-gray-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-4 h-4 text-[#0B3D2E]" />
                <span>{tLabels.openMailBtn}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setSubmissionResult(null);
                  clearInquiry();
                  setName('');
                  setEmail('');
                  setCompany('');
                  setCountry('');
                  setPhone('');
                  setMessage('');
                }}
                className="px-5 py-2.5 rounded-lg bg-[#0B3D2E] hover:bg-[#064E3B] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{tLabels.newInquiryBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry-form" className="py-16 sm:py-24 bg-[#FAF7EF] border-b border-[#E5DEC9] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with consistent heading reveal */}
        <div
          ref={headingRef}
          className={`max-w-3xl mb-10 sm:mb-14 heading-reveal ${
            isHeadingVisible ? 'is-visible' : ''
          }`}
        >
          <div className="text-xs uppercase tracking-wider font-bold text-[#0B3D2E] mb-2">
            {tLabels.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111827] tracking-tight">
            {tLabels.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {tLabels.subheading}
          </p>
        </div>

        {/* Error Notification Banner if submission failed */}
        {submissionError && (
          <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-800">{tLabels.errorHeading}</p>
                <p className="text-red-700 mt-1">{submissionError}</p>
                <p className="mt-2 text-gray-700">
                  {tLabels.errorFallbackPrompt}{' '}
                  <a
                    href={`mailto:${COMMERCIAL_EMAIL}`}
                    className="font-semibold text-[#0B3D2E] underline"
                  >
                    {COMMERCIAL_EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl border border-[#E5DEC9] p-6 sm:p-10 shadow-xs space-y-8"
        >
          {/* Honeypot field for bot spam prevention */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="company_tax_id"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* 1. Products of Interest Multi-Selection */}
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111827]">
                {tLabels.productsLabel}{' '}
                <span className="text-[#0B3D2E] lowercase font-normal">
                  ({tLabels.reqBadge})
                </span>
              </label>
              <span className="text-xs text-gray-500">
                {selectedProductIds.length} selected
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mb-4">
              {tLabels.productsHelper}
            </p>

            {/* Clickable Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {commodityOptions.map((opt) => {
                const checked = isProductSelected(opt.id);
                const inputId = `inquiry-product-${opt.id}`;

                return (
                  <label
                    key={opt.id}
                    htmlFor={inputId}
                    className={`relative flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-150 ${
                      checked
                        ? 'bg-[#FAF7EF] border-[#0B3D2E] ring-1 ring-[#0B3D2E] text-[#111827]'
                        : 'bg-white border-[#D8E0D2] hover:border-gray-400 text-gray-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={inputId}
                      checked={checked}
                      onChange={() => toggleProduct(opt.id)}
                      className="w-4 h-4 text-[#0B3D2E] border-gray-300 rounded focus:ring-[#0B3D2E] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none cursor-pointer shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-medium leading-snug">
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.products && (
              <p className="mt-2 text-xs text-red-600">{errors.products}</p>
            )}
          </div>

          {/* 2. Contact Information: 3 Required Fields */}
          <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-1.5"
              >
                {tLabels.nameLabel}{' '}
                <span className="text-[#0B3D2E] lowercase font-normal">
                  ({tLabels.reqBadge})
                </span>
              </label>
              <input
                id="inquiry-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                placeholder={tLabels.namePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] focus:border-[#0B3D2E] focus:ring-1 focus:ring-[#0B3D2E] text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none transition-colors"
                required
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Work Email */}
            <div>
              <label
                htmlFor="inquiry-email"
                className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-1.5"
              >
                {tLabels.emailLabel}{' '}
                <span className="text-[#0B3D2E] lowercase font-normal">
                  ({tLabels.reqBadge})
                </span>
              </label>
              <input
                id="inquiry-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder={tLabels.emailPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] focus:border-[#0B3D2E] focus:ring-1 focus:ring-[#0B3D2E] text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none transition-colors"
                required
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Company Name */}
            <div>
              <label
                htmlFor="inquiry-company"
                className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-1.5"
              >
                {tLabels.companyLabel}{' '}
                <span className="text-[#0B3D2E] lowercase font-normal">
                  ({tLabels.reqBadge})
                </span>
              </label>
              <input
                id="inquiry-company"
                type="text"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (errors.company) setErrors((prev) => ({ ...prev, company: '' }));
                }}
                placeholder={tLabels.companyPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] focus:border-[#0B3D2E] focus:ring-1 focus:ring-[#0B3D2E] text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none transition-colors"
                required
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-600">{errors.company}</p>
              )}
            </div>
          </div>

          {/* 3. Optional Fields: Destination Market & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Destination Country / Market */}
            <div>
              <label
                htmlFor="inquiry-country"
                className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-1.5"
              >
                {tLabels.countryLabel}{' '}
                <span className="text-gray-400 lowercase font-normal">
                  ({tLabels.optBadge})
                </span>
              </label>
              <input
                id="inquiry-country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder={tLabels.countryPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] focus:border-[#0B3D2E] focus:ring-1 focus:ring-[#0B3D2E] text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none transition-colors"
              />
            </div>

            {/* Phone / WhatsApp */}
            <div>
              <label
                htmlFor="inquiry-phone"
                className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-1.5"
              >
                {tLabels.phoneLabel}{' '}
                <span className="text-gray-400 lowercase font-normal">
                  ({tLabels.optBadge})
                </span>
              </label>
              <input
                id="inquiry-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={tLabels.phonePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] focus:border-[#0B3D2E] focus:ring-1 focus:ring-[#0B3D2E] text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* 4. Unified Optional Notes Textarea */}
          <div>
            <label
              htmlFor="inquiry-message"
              className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-1"
            >
              {tLabels.messageLabel}{' '}
              <span className="text-gray-400 lowercase font-normal">
                ({tLabels.optBadge})
              </span>
            </label>
            <p className="text-xs text-[#6B7280] mb-2">{tLabels.messageHelper}</p>
            <textarea
              id="inquiry-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={tLabels.messagePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E0D2] focus:border-[#0B3D2E] focus:ring-1 focus:ring-[#0B3D2E] text-xs sm:text-sm text-[#111827] font-medium placeholder:text-gray-400 placeholder:font-normal focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 bg-[#0B3D2E] hover:bg-[#064E3B] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? tLabels.submittingBtn : tLabels.submitBtn}
            </button>

            <span className="text-xs text-[#6B7280]">
              Commercial Contact: <strong className="text-[#111827]">{COMMERCIAL_EMAIL}</strong>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
