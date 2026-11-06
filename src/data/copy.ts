import { COMMERCIAL_EMAIL } from '../constants/contact';

export type Language = 'en' | 'pt' | 'es';

export interface CopyTranslations {
  nav: {
    products: string;
    howItWorks: string;
    about: string;
    contact: string;
    cta: string;
    productsMenuTitle: string;
    coreCategoryLabel: string;
    additionalCategoryLabel: string;
  };
  hero: {
    tag: string;
    headline: string;
    mainSupporting: string;
    secondarySupporting: string;
    supporting?: string;
    ctaPrimary: string;
    ctaSecondary: string;
    benefits: Array<{
      title: string;
      desc: string;
    }>;
    panelCommercial: string;
    panelOrigin: string;
    supportingStrip: string;
  };
  products: {
    tag: string;
    headline: string;
    subheadline: string;
    viewDetails: string;
    addToInquiry: string;
    addedToInquiry: string;
    additionalHeading: string;
    additionalSub: string;
  };
  howVeroHelps: {
    tag: string;
    headline: string;
    introduction: string;
    cards: Array<{
      num: string;
      title: string;
      desc: string;
    }>;
    bottomStrip: string;
    bottomLink: string;
  };
  process: {
    tag: string;
    headline: string;
    introduction: string;
    steps: Array<{
      num: string;
      title: string;
      desc: string;
      footerLabel: string;
    }>;
    notice: string;
  };
  partnership: {
    tag: string;
    headline: string;
    intro: string;
    veroTitle: string;
    veroDesc: string;
    brasensaTitle: string;
    brasensaDesc: string;
    disclosureTitle: string;
    approachSteps: Array<{
      title: string;
      desc: string;
    }>;
  };
  footer: {
    brandDesc: string;
    quickLinksTitle: string;
    productsTitle: string;
    contactTitle: string;
    contactNotice: string;
    privacyNotice: string;
    allRightsReserved: string;
  };
}

export const translations: Record<Language, CopyTranslations> = {
  en: {
    nav: {
      products: 'Products',
      howItWorks: 'How it works',
      about: 'About VERO',
      contact: 'Contact',
      cta: 'Talk to VERO',
      productsMenuTitle: 'Brazilian Commodities',
      coreCategoryLabel: '5 Core Product Categories',
      additionalCategoryLabel: 'Additional Sourcing on Demand',
    },
    hero: {
      tag: 'CANADA COMMERCIAL DESK · BRAZILIAN ORIGIN',
      headline: 'Direct access to Brazilian commodities for international B2B buyers.',
      mainSupporting:
        'VERO connects your sourcing requirements with Brasensa in Brazil, coordinating commercial discussions from Canada.',
      secondarySupporting:
        'Explore our products, share what you need, and work with a clear point of contact to discuss specifications, supply options and next steps.',
      supporting:
        'VERO connects your sourcing requirements with Brasensa in Brazil, coordinating commercial discussions from Canada.',
      ctaPrimary: 'Discuss my demand',
      ctaSecondary: 'Explore products',
      benefits: [
        {
          title: 'Canada-based contact',
          desc: 'A clear point of contact for your sourcing conversation.',
        },
        {
          title: 'Coordination with Brasensa',
          desc: 'Connecting buyer requirements with Brazilian origin.',
        },
        {
          title: 'Requirements-led sourcing',
          desc: 'Product, packaging and shipment options discussed around your needs.',
        },
      ],
      panelCommercial: 'COMMERCIAL CONTACT — VERO · Canada',
      panelOrigin: 'BRAZILIAN ORIGIN — Brasensa · Brazil',
      supportingStrip: 'B2B sourcing · Specifications and supply terms by agreement',
    },
    products: {
      tag: 'Commodity Portfolio',
      headline: 'Explore our Brazilian products.',
      subheadline:
        'Five core agricultural categories with structured Brazilian origination, plus additional commodities evaluated according to buyer requirements.',
      viewDetails: 'View details',
      addToInquiry: 'Add to inquiry',
      addedToInquiry: 'In your inquiry',
      additionalHeading: 'Additional Sourcing on Demand',
      additionalSub:
        'Soybeans, yellow corn, and açaí can be discussed for sourcing according to buyer requirements.',
    },
    howVeroHelps: {
      tag: 'HOW VERO HELPS',
      headline: 'How VERO supports your sourcing.',
      introduction:
        'A commercial point of contact in Canada, helping your purchasing team clarify requirements and coordinate discussions with Brasensa in Brazil.',
      cards: [
        {
          num: '01',
          title: 'An accessible point of contact',
          desc: 'Keep your sourcing conversation organized through VERO in Canada, with clear communication as your requirements develop.',
        },
        {
          num: '02',
          title: 'Clear sourcing requirements',
          desc: 'We help organize product specifications, intended volumes, packaging preferences, destination and delivery expectations.',
        },
        {
          num: '03',
          title: 'Coordination with Brasensa',
          desc: 'We communicate your requirements to Brasensa in Brazil and coordinate the information needed to assess suitable supply options.',
        },
        {
          num: '04',
          title: 'Information for your decision',
          desc: 'We coordinate discussion of availability, technical information, relevant documentation and preliminary shipment options for your inquiry.',
        },
      ],
      bottomStrip:
        'Start with the products you need. We can clarify the commercial and technical details together.',
      bottomLink: 'Discuss your requirements',
    },
    process: {
      tag: 'COMMERCIAL PROCESS',
      headline: 'A straightforward four-step commercial pathway.',
      introduction:
        'From your first inquiry to agreed commercial next steps, understand how VERO coordinates your requirements with Brasensa in Brazil.',
      steps: [
        {
          num: '1',
          title: 'Share your demand',
          desc: 'Select the products that interest you and leave your contact details. Add any requirements you already know; detailed specifications can follow.',
          footerLabel: 'Initial inquiry',
        },
        {
          num: '2',
          title: 'Review with origin',
          desc: 'We coordinate with Brasensa to assess product fit, seasonal availability and the information needed to progress your inquiry.',
          footerLabel: 'Origin review',
        },
        {
          num: '3',
          title: 'Align specifications and terms',
          desc: 'Together, we clarify quality requirements, volumes, packaging, destination, proposed delivery terms and logistics.',
          footerLabel: 'Commercial alignment',
        },
        {
          num: '4',
          title: 'Define next steps',
          desc: 'Where a suitable supply option is identified, we coordinate the proposed commercial terms and clarify documentation and contracting next steps.',
          footerLabel: 'Agreed next steps',
        },
      ],
      notice:
        'Timing, samples and supply arrangements depend on the product, buyer requirements and commercial qualification.',
    },
    partnership: {
      tag: 'Commercial Roles',
      headline: 'Brazilian products. Your commercial contact in Canada.',
      intro:
        'VERO is your point of contact for exploring Brazilian product opportunities. We coordinate your requirements with Brasensa in Brazil and help clarify the next commercial steps.',
      veroTitle: 'VERO — Canada',
      veroDesc:
        'Commercial contact, understanding requirements and coordinating follow-up directly with international buyers.',
      brasensaTitle: 'Brasensa — Brazil',
      brasensaDesc:
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
    footer: {
      brandDesc:
        'VERO connects B2B buyers with Brazilian agricultural sourcing opportunities and coordinates requirements with Brasensa in Brazil.',
      quickLinksTitle: 'Navigation',
      productsTitle: 'Core Products',
      contactTitle: 'Commercial Desk',
      contactNotice:
        'All inquiries are processed by the VERO trade desk in Canada and coordinated with origin.',
      privacyNotice:
        'Information submitted is used solely to evaluate your B2B sourcing demand and coordinate commercial follow-up.',
      allRightsReserved: 'VERO Trading Co. All rights reserved.',
    },
  },

  pt: {
    nav: {
      products: 'Produtos',
      howItWorks: 'Como a VERO ajuda',
      about: 'Sobre a VERO',
      contact: 'Contato',
      cta: 'Falar com a VERO',
      productsMenuTitle: 'Commodities Brasileiras',
      coreCategoryLabel: '5 Categorias Centrais',
      additionalCategoryLabel: 'Originação Adicional sob Consulta',
    },
    hero: {
      tag: 'MESA COMERCIAL NO CANADÁ · ORIGEM BRASILEIRA',
      headline: 'Acesso direto a commodities brasileiras para compradores B2B internacionais.',
      mainSupporting:
        'A VERO conecta suas demandas de suprimento à Brasensa no Brasil, coordenando as conversas comerciais a partir do Canadá.',
      secondarySupporting:
        'Explore nossos produtos, informe o que você precisa e conte com um ponto de contato claro para discutir especificações, opções de fornecimento e próximos passos.',
      supporting:
        'A VERO conecta suas demandas de suprimento à Brasensa no Brasil, coordenando as conversas comerciais a partir do Canadá.',
      ctaPrimary: 'Discutir minha demanda',
      ctaSecondary: 'Explorar produtos',
      benefits: [
        {
          title: 'Contato no Canadá',
          desc: 'Um ponto de contato claro para sua conversa de suprimento.',
        },
        {
          title: 'Coordenação com a Brasensa',
          desc: 'Conectando as demandas do comprador à origem brasileira.',
        },
        {
          title: 'Suprimento orientado a requisitos',
          desc: 'Opções de produto, embalagem e embarque alinhadas às suas necessidades.',
        },
      ],
      panelCommercial: 'CONTATO COMERCIAL — VERO · Canadá',
      panelOrigin: 'ORIGEM BRASILEIRA — Brasensa · Brasil',
      supportingStrip: 'Suprimento B2B · Especificações e termos de fornecimento sob acordo',
    },
    products: {
      tag: 'Portfólio de Produtos',
      headline: 'Explore nossos produtos brasileiros.',
      subheadline:
        'Cinco categorias agrícolas centrais com originação estruturada no Brasil, além de commodities adicionais avaliadas conforme a demanda do comprador.',
      viewDetails: 'Ver detalhes',
      addToInquiry: 'Adicionar à consulta',
      addedToInquiry: 'Na sua consulta',
      additionalHeading: 'Originação Adicional sob Consulta',
      additionalSub:
        'Soja, milho amarelo e açaí podem ser discutidos para fornecimento conforme as exigências do comprador.',
    },
    howVeroHelps: {
      tag: 'COMO A VERO AJUDA',
      headline: 'Como a VERO apoia seu suprimento.',
      introduction:
        'Um ponto de contato comercial no Canadá, ajudando sua equipe de compras a esclarecer requisitos e coordenar conversas com a Brasensa no Brasil.',
      cards: [
        {
          num: '01',
          title: 'Um ponto de contato acessível',
          desc: 'Mantenha suas conversas de suprimento organizadas através da VERO no Canadá, com comunicação clara conforme suas demandas evoluem.',
        },
        {
          num: '02',
          title: 'Requisitos claros de suprimento',
          desc: 'Ajudamos a estruturar especificações de produto, volumes planejados, preferências de embalagem, destino e expectativas de entrega.',
        },
        {
          num: '03',
          title: 'Coordenação com a Brasensa',
          desc: 'Comunicamos suas necessidades à Brasensa no Brasil e coordenamos as informações necessárias para avaliar opções adequadas de fornecimento.',
        },
        {
          num: '04',
          title: 'Informações para sua decisão',
          desc: 'Coordenamos discussões sobre disponibilidade, fichas técnicas, documentação pertinente e opções preliminares de embarque para sua consulta.',
        },
      ],
      bottomStrip:
        'Comece pelos produtos que você procura. Podemos esclarecer os detalhes comerciais e técnicos juntos.',
      bottomLink: 'Discutir seus requisitos',
    },
    process: {
      tag: 'PROCESSO COMERCIAL',
      headline: 'Uma rota comercial clara em quatro etapas.',
      introduction:
        'Da primeira consulta aos próximos passos comerciais acordados, entenda como a VERO coordena suas demandas com a Brasensa no Brasil.',
      steps: [
        {
          num: '1',
          title: 'Compartilhe sua demanda',
          desc: 'Selecione os produtos de interesse e informe seus dados de contato. Adicione os requisitos que já souber; especificações detalhadas virão a seguir.',
          footerLabel: 'Consulta inicial',
        },
        {
          num: '2',
          title: 'Avaliação com a origem',
          desc: 'Coordenamos com a Brasensa para avaliar a adequação do produto, a disponibilidade da safra e as informações necessárias para avançar sua consulta.',
          footerLabel: 'Análise na origem',
        },
        {
          num: '3',
          title: 'Alinhamento de especificações e termos',
          desc: 'Juntos, esclarecemos requisitos de qualidade, volumes, embalagens, destino, termos de entrega propostos e logística.',
          footerLabel: 'Alineação comercial',
        },
        {
          num: '4',
          title: 'Definição dos próximos passos',
          desc: 'Identificada uma opção de fornecimento viável, coordenamos os termos comerciais propostos e esclarecemos os passos de documentação e contratação.',
          footerLabel: 'Próximos passos acordados',
        },
      ],
      notice:
        'Prazos, amostras e arranjos de fornecimento dependem do produto, dos requisitos do comprador e da qualificação comercial.',
    },
    partnership: {
      tag: 'Papéis Comerciais',
      headline: 'Produtos brasileiros. Seu contato comercial no Canadá.',
      intro:
        'A VERO é o seu ponto de contato para explorar oportunidades de produtos brasileiros. Coordenamos seus requisitos com a Brasensa no Brasil e ajudamos a esclarecer os próximos passos comerciais.',
      veroTitle: 'VERO — Canadá',
      veroDesc:
        'Contato comercial, entendimento de requisitos e coordenação de acompanhamento junto a compradores internacionais.',
      brasensaTitle: 'Brasensa — Brasil',
      brasensaDesc:
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
    footer: {
      brandDesc:
        'A VERO conecta compradores B2B a oportunidades de fornecimento agrícola brasileiro e coordena requisitos com a Brasensa no Brasil.',
      quickLinksTitle: 'Navegação',
      productsTitle: 'Produtos Principais',
      contactTitle: 'Desk Comercial',
      contactNotice:
        'Todas as consultas são recebidas pelo desk comercial da VERO no Canadá e coordenadas com a origem.',
      privacyNotice:
        'Os dados informados são utilizados exclusivamente para avaliar sua demanda de fornecimento B2B e coordenar o contato comercial.',
      allRightsReserved: 'VERO Trading Co. Todos os direitos reservados.',
    },
  },

  es: {
    nav: {
      products: 'Productos',
      howItWorks: 'Cómo funciona',
      about: 'Acerca de VERO',
      contact: 'Contacto',
      cta: 'Hablar con VERO',
      productsMenuTitle: 'Commodities Brasileñas',
      coreCategoryLabel: '5 Categorías Principales',
      additionalCategoryLabel: 'Originación Adicional bajo Consulta',
    },
    hero: {
      tag: 'MESA COMERCIAL EN CANADÁ · ORIGEN BRASILEÑO',
      headline: 'Acceso directo a commodities brasileñas para compradores B2B internacionales.',
      mainSupporting:
        'VERO conecta sus requerimientos de suministro con Brasensa en Brasil, coordinando las conversaciones comerciales desde Canadá.',
      secondarySupporting:
        'Explore nuestros productos, comparta lo que necesita y cuente con un punto de contacto claro para evaluar especificaciones, opciones de suministro y próximos pasos.',
      supporting:
        'VERO conecta sus requerimientos de suministro con Brasensa en Brasil, coordinando las conversaciones comerciales desde Canadá.',
      ctaPrimary: 'Conversar sobre mi demanda',
      ctaSecondary: 'Explorar productos',
      benefits: [
        {
          title: 'Contacto en Canadá',
          desc: 'Un punto de contacto claro para su conversación de suministro.',
        },
        {
          title: 'Coordinación con Brasensa',
          desc: 'Conectando los requerimientos del comprador con el origen brasileño.',
        },
        {
          title: 'Suministro basado en requisitos',
          desc: 'Opciones de producto, empaque y embarque evaluadas según sus necesidades.',
        },
      ],
      panelCommercial: 'CONTACTO COMERCIAL — VERO · Canadá',
      panelOrigin: 'ORIGEN BRASILEÑO — Brasensa · Brasil',
      supportingStrip: 'Suministro B2B · Especificaciones y términos de suministro bajo acuerdo',
    },
    products: {
      tag: 'Portafolio de Productos',
      headline: 'Explore nuestros productos brasileños.',
      subheadline:
        'Cinco categorías agrícolas principales con originación estructurada en Brasil, además de commodities adicionales evaluadas según requerimientos.',
      viewDetails: 'Ver detalles',
      addToInquiry: 'Añadir a consulta',
      addedToInquiry: 'En su consulta',
      additionalHeading: 'Originación Adicional bajo Consulta',
      additionalSub:
        'Soja, maíz amarillo y açaí pueden evaluarse para suministro según las necesidades del comprador.',
    },
    howVeroHelps: {
      tag: 'CÓMO AYUDA VERO',
      headline: 'Cómo apoya VERO su aprovisionamiento.',
      introduction:
        'Un punto de contacto comercial en Canadá, que ayuda a su equipo de compras a clarificar requerimientos y coordinar conversaciones con Brasensa en Brasil.',
      cards: [
        {
          num: '01',
          title: 'Un punto de contacto accesible',
          desc: 'Mantenga sus conversaciones de suministro organizadas a través de VERO en Canadá, con comunicación clara según evolucionan sus demandas.',
        },
        {
          num: '02',
          title: 'Requerimientos claros de suministro',
          desc: 'Ayudamos a organizar especificaciones de producto, volúmenes previstos, preferencias de empaque, destino y expectativas de entrega.',
        },
        {
          num: '03',
          title: 'Coordinación con Brasensa',
          desc: 'Comunicamos sus requerimientos a Brasensa en Brasil y coordinamos la información necesaria para evaluar opciones adecuadas de suministro.',
        },
        {
          num: '04',
          title: 'Información para su decisión',
          desc: 'Coordinamos discusiones sobre disponibilidad, fichas técnicas, documentación pertinente y opciones preliminares de embarque para su consulta.',
        },
      ],
      bottomStrip:
        'Comience con los productos que necesita. Podemos clarificar los detalles comerciales y técnicos juntos.',
      bottomLink: 'Conversar sobre sus requerimientos',
    },
    process: {
      tag: 'PROCESO COMERCIAL',
      headline: 'Una ruta comercial clara en cuatro etapas.',
      introduction:
        'Desde su primera consulta hasta los próximos pasos comerciales acordados, entienda cómo coordina VERO sus requerimientos con Brasensa en Brasil.',
      steps: [
        {
          num: '1',
          title: 'Comparta su demanda',
          desc: 'Seleccione los productos de interés e ingrese sus datos de contacto. Agregue los requerimientos que ya conozca; las especificaciones detalladas vendrán a continuación.',
          footerLabel: 'Consulta inicial',
        },
        {
          num: '2',
          title: 'Revisión con el origen',
          desc: 'Coordinamos con Brasensa para evaluar la adecuación del producto, la disponibilidad de temporada y la información necesaria para avanzar su consulta.',
          footerLabel: 'Revisión en origen',
        },
        {
          num: '3',
          title: 'Alineación de especificaciones y términos',
          desc: 'Juntos, clarificamos requisitos de calidad, volúmenes, empaques, destino, términos de entrega propuestos y logística.',
          footerLabel: 'Alineación comercial',
        },
        {
          num: '4',
          title: 'Definición de los próximos pasos',
          desc: 'Identificada una opción de suministro viable, coordinamos los términos comerciales propuestos y clarificamos los pasos de documentación y contratación.',
          footerLabel: 'Próximos pasos acordados',
        },
      ],
      notice:
        'Plazos, muestras y acuerdos de suministro dependen del producto, de los requerimientos del comprador y de la calificación comercial.',
    },
    partnership: {
      tag: 'Roles Comerciales',
      headline: 'Productos brasileños. Su contacto comercial en Canadá.',
      intro:
        'VERO es su punto de contacto para explorar oportunidades de productos brasileños. Coordinamos sus requisitos con Brasensa en Brasil y ayudamos a clarificar los próximos pasos comerciales.',
      veroTitle: 'VERO — Canadá',
      veroDesc:
        'Contacto comercial, comprensión de requisitos y coordinación de seguimiento directo con compradores internacionales.',
      brasensaTitle: 'Brasensa — Brasil',
      brasensaDesc:
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
    footer: {
      brandDesc:
        'VERO conecta compradores B2B con oportunidades de suministro agrícola brasileño y coordina requisitos con Brasensa en Brasil.',
      quickLinksTitle: 'Navegación',
      productsTitle: 'Productos Principales',
      contactTitle: 'Desk Comercial',
      contactNotice:
        'Todas las consultas son recibidas por el desk comercial de VERO en Canadá y coordinadas con origen.',
      privacyNotice:
        'La información provista se utiliza exclusivamente para evaluar su demanda de suministro B2B y coordinar el contacto comercial.',
      allRightsReserved: 'VERO Trading Co. Todos los derechos reservados.',
    },
  },
};

export const content = translations;
