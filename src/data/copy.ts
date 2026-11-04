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
    supporting: string;
    ctaPrimary: string;
    ctaSecondary: string;
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
    subheadline: string;
    points: Array<{
      num: string;
      title: string;
      desc: string;
    }>;
  };
  process: {
    tag: string;
    headline: string;
    subheadline: string;
    steps: Array<{
      num: string;
      title: string;
      desc: string;
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
      tag: 'Canadian Commercial Desk · Brazilian Origin',
      headline: 'Brazilian agricultural products. A direct conversation from Canada.',
      supporting:
        'Explore coffee, sugar, beans and pulses, fresh fruit and sorghum. Tell us what interests you—we’ll coordinate the next steps with Brasensa in Brazil.',
      ctaPrimary: 'Explore products',
      ctaSecondary: 'Talk to VERO',
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
      tag: 'Practical Assistance',
      headline: 'How VERO assists B2B buyers.',
      subheadline:
        'We provide direct, knowledgeable commercial coordination from Canada, working hand-in-hand with Brasensa in Brazil.',
      points: [
        {
          num: '01',
          title: 'Commercial contact based in Canada',
          desc: 'Direct communication in your time zone across English, Spanish, and Portuguese, without bureaucratic communication barriers.',
        },
        {
          num: '02',
          title: 'Help clarifying buyer requirements',
          desc: 'We assist in reviewing product specifications, volume feasibility, packaging preferences, and target destination ports.',
        },
        {
          num: '03',
          title: 'Coordination with Brasensa in Brazil',
          desc: 'Your demand is coordinated directly with Brasensa’s export and origination desk in Brazil, eliminating opaque intermediary layers.',
        },
        {
          num: '04',
          title: 'Discussion of product information and potential availability',
          desc: 'We clarify seasonal crop timing, origin parameters, and logistics considerations before formal commitments.',
        },
        {
          num: '05',
          title: 'Clear follow-up and next steps',
          desc: 'Transparent progress updates and aligned operational next steps as your commercial discussion moves forward.',
        },
      ],
    },
    process: {
      tag: 'Commercial Flow',
      headline: 'A straightforward 3-step process.',
      subheadline:
        'Transparent commercial steps designed for international B2B agricultural trade.',
      steps: [
        {
          num: '1',
          title: 'Tell us what interests you.',
          desc: 'Select the Brazilian products that match your commercial demand and share your basic contact details and requirements.',
        },
        {
          num: '2',
          title: 'We discuss your requirements and evaluate options with origin.',
          desc: 'We clarify your specifications and review seasonal crop availability, logistics feasibility, and operational parameters with Brasensa in Brazil.',
        },
        {
          num: '3',
          title: 'We align the next commercial steps.',
          desc: 'Following initial qualification, formal commercial terms, inspection requirements, and contract sequence are coordinated with origin.',
        },
      ],
      notice:
        'Notice: VERO does not promise guaranteed quotes, samples, response times, or shipment schedules without prior requirement review.',
    },
    partnership: {
      tag: 'Commercial Roles',
      headline: 'Your contact in Canada. Connected to Brazilian origin.',
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
      tag: 'Desk Comercial no Canadá · Origem Brasileira',
      headline: 'Produtos agrícolas brasileiros. Uma conversa direta a partir do Canadá.',
      supporting:
        'Explore café, açúcar, feijões e leguminosas, frutas frescas e sorgo. Conte-nos o que interessa à sua empresa—nós coordenamos os próximos passos com a Brasensa no Brasil.',
      ctaPrimary: 'Explorar produtos',
      ctaSecondary: 'Falar com a VERO',
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
      tag: 'Apoio Prático',
      headline: 'Como a VERO ajuda compradores B2B.',
      subheadline:
        'Oferecemos coordenação comercial direta e fundamentada a partir do Canadá, trabalhando em conjunto com a Brasensa no Brasil.',
      points: [
        {
          num: '01',
          title: 'Contato comercial sediado no Canadá',
          desc: 'Comunicação direta no seu fuso horário em português, inglês e espanhol, sem barreiras de interlocução.',
        },
        {
          num: '02',
          title: 'Apoio no esclarecimento de requisitos',
          desc: 'Auxiliamos na estruturação de especificações técnicas, volumes viáveis, opções de embalagem e porto de destino.',
        },
        {
          num: '03',
          title: 'Coordenação com a Brasensa no Brasil',
          desc: 'Sua demanda é tratada diretamente com o desk de originação e exportação da Brasensa no Brasil, sem camadas opacas.',
        },
        {
          num: '04',
          title: 'Discussão de informações e disponibilidade potencial',
          desc: 'Esclarecemos janelas de safra, parâmetros de origem e condições logísticas antes de compromissos formais.',
        },
        {
          num: '05',
          title: 'Acompanhamento claro e próximos passos',
          desc: 'Acompanhamento transparente e sequência formal alinhada à medida que as tratativas comerciais avançam.',
        },
      ],
    },
    process: {
      tag: 'Fluxo Comercial',
      headline: 'Um processo simples em três etapas.',
      subheadline:
        'Etapas comerciais transparentes e alinhadas às práticas do comércio agrícola internacional.',
      steps: [
        {
          num: '1',
          title: 'Conte-nos o que interessa à sua empresa.',
          desc: 'Selecione os produtos brasileiros relevantes para sua operação e compartilhe seus dados de contato e necessidades preliminares.',
        },
        {
          num: '2',
          title: 'Conversamos sobre seus requisitos e avaliamos opções com a origem.',
          desc: 'Esclarecemos suas especificações e checamos disponibilidade de safra, viabilidade logística e parâmetros com a Brasensa no Brasil.',
        },
        {
          num: '3',
          title: 'Alinhamos os próximos passos comerciais.',
          desc: 'Após a qualificação inicial, termos comerciais formais, laudos e sequência contratual são alinhados junto à origem.',
        },
      ],
      notice:
        'Nota: A VERO não promete cotações imediatas, envio prévio de amostras ou prazos de embarque sem avaliação prévia dos requisitos.',
    },
    partnership: {
      tag: 'Papéis Comerciais',
      headline: 'Seu contato no Canadá. Conectado à origem brasileira.',
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
      tag: 'Desk Comercial en Canadá · Origen Brasileño',
      headline: 'Productos agrícolas brasileños. Una conversación directa desde Canadá.',
      supporting:
        'Explore café, azúcar, legumbres, fruta fresca y sorgo. Cuéntenos su interés y coordinaremos los siguientes pasos con Brasensa en Brasil.',
      ctaPrimary: 'Explorar productos',
      ctaSecondary: 'Hablar con VERO',
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
      tag: 'Asistencia Práctica',
      headline: 'Cómo VERO asiste a compradores B2B.',
      subheadline:
        'Brindamos coordinación comercial directa y técnica desde Canadá, colaborando estrechamente con Brasensa en Brasil.',
      points: [
        {
          num: '01',
          title: 'Contacto comercial basado en Canadá',
          desc: 'Comunicación directa en su huso horario en español, inglés y portugués, sin intermediarios innecesarios.',
        },
        {
          num: '02',
          title: 'Clarificación de requisitos de compra',
          desc: 'Ayudamos a definir especificaciones técnicas, volúmenes realistas, empaques adecuados y puerto de destino.',
        },
        {
          num: '03',
          title: 'Coordinación con Brasensa en Brasil',
          desc: 'Su demanda se gestiona directamente con la estructura de exportación y origen de Brasensa en Brasil.',
        },
        {
          num: '04',
          title: 'Evaluación de disponibilidad e información técnica',
          desc: 'Revisamos temporadas de cosecha, parámetros de origen y logística preliminar antes de compromisos formales.',
        },
        {
          num: '05',
          title: 'Seguimiento transparente y próximos pasos',
          desc: 'Acompañamiento claro y formalización ordenada a medida que avanza la conversación comercial.',
        },
      ],
    },
    process: {
      tag: 'Flujo Comercial',
      headline: 'Un proceso directo en tres pasos.',
      subheadline:
        'Pasos comerciales claros y adaptados a las exigencias del comercio exterior agrícola B2B.',
      steps: [
        {
          num: '1',
          title: 'Cuéntenos lo que le interesa.',
          desc: 'Seleccione los productos brasileños relevantes y comparta sus datos de contacto y necesidades preliminares.',
        },
        {
          num: '2',
          title: 'Conversamos sobre sus requisitos y evaluamos opciones con origen.',
          desc: 'Analizamos sus especificaciones y revisamos disponibilidad de zafra, factibilidad logística y parámetros con Brasensa en Brasil.',
        },
        {
          num: '3',
          title: 'Alineamos los próximos pasos comerciales.',
          desc: 'Tras la calificación inicial, las condiciones comerciales formales, inspecciones y secuencia contractual se definen con origen.',
        },
      ],
      notice:
        'Aviso: VERO no promete cotizaciones inmediatas, muestras previas ni plazos de despacho sin evaluación previa de requisitos.',
    },
    partnership: {
      tag: 'Roles Comerciales',
      headline: 'Su contacto en Canadá. Conectado al origen brasileño.',
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

