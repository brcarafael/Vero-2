import heroImg from '../assets/images/hero_brazilian_trade_1793411368869.jpg';
import greenCoffeeImg from '../assets/images/unroasted_green_coffee_1793411369423.jpg';
import sugarImg from '../assets/images/sugar_vhp_icumsa_1793411370589.jpg';
import beansPulsesImg from '../assets/images/brazilian_beans_pulses_1793411369870.jpg';
import freshFruitImg from '../assets/images/fresh_fruits_export_1793411388455.jpg';
import grainSorghumImg from '../assets/images/grain_sorghum_field_1793411390248.jpg';
import soybeansImg from '../assets/images/soybeans_export_crop_1793411388737.jpg';
import cornImg from '../assets/images/corn_yellow_feed_1793411404299.jpg';
import acaiImg from '../assets/images/acai_pulp_amazon_1793411389805.jpg';

export { heroImg };

export type ProductId =
  | 'green-coffee'
  | 'sugar'
  | 'beans-pulses'
  | 'fresh-fruits'
  | 'grain-sorghum'
  | 'soybeans'
  | 'corn'
  | 'acai';

export interface LocalizedString {
  en: string;
  pt: string;
  es: string;
}

export interface LocalizedStringList {
  en: string[];
  pt: string[];
  es: string[];
}

export interface ProductFact {
  icon: 'map-pin' | 'calendar' | 'package' | 'layers' | 'ship' | 'sliders';
  label: LocalizedString;
  value: LocalizedString;
}

export interface ProductItem {
  id: ProductId;
  slug: string;
  isCore: boolean;
  image: string;
  title: LocalizedString;
  shortTitle: LocalizedString;
  category: LocalizedString;
  shortDesc: LocalizedString;
  overview: LocalizedString;
  grades: LocalizedStringList;
  packaging: LocalizedStringList;
  commercialUse: LocalizedStringList;
  origins: LocalizedStringList;
  harvestWindow: LocalizedString;
  typicalOrderUnit: LocalizedString;
  shippingTerms: LocalizedString;
  inspection: LocalizedString;
  complianceNotes: LocalizedString;
  cardVarieties?: LocalizedString;
  cardSummary?: LocalizedString;
  atAGlance?: ProductFact[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'green-coffee',
    slug: 'green-coffee',
    isCore: true,
    image: greenCoffeeImg,
    title: {
      en: 'Brazilian Green Coffee (Arabica & Conilon)',
      pt: 'Café Verde Brasileiro (Arábica & Conilon)',
      es: 'Café Verde Brasileño (Arábica y Conilón)',
    },
    shortTitle: {
      en: 'Green Coffee',
      pt: 'Café Verde',
      es: 'Café Verde',
    },
    category: {
      en: 'Green Coffee',
      pt: 'Café Verde',
      es: 'Café Verde',
    },
    cardVarieties: {
      en: 'Arabica · Conilon',
      pt: 'Arábica · Conilon',
      es: 'Arábica · Conilón',
    },
    cardSummary: {
      en: 'Brazilian green coffee for roasters and importers, with commercial and specialty profiles selected according to buyer requirements.',
      pt: 'Café verde brasileiro para torrefadores e importadores, com perfis comerciais e especiais selecionados conforme os requisitos do comprador.',
      es: 'Café verde brasileño para tostadores e importadores, con perfiles comerciales y de especialidad seleccionados según los requerimientos del comprador.',
    },
    atAGlance: [
      {
        icon: 'map-pin',
        label: { en: 'Origins', pt: 'Origens', es: 'Orígenes' },
        value: {
          en: 'Minas Gerais, São Paulo, Espírito Santo & Rondônia',
          pt: 'Minas Gerais, São Paulo, Espírito Santo e Rondônia',
          es: 'Minas Gerais, São Paulo, Espírito Santo y Rondônia',
        },
      },
      {
        icon: 'calendar',
        label: { en: 'Harvest', pt: 'Safra', es: 'Cosecha' },
        value: {
          en: 'April–September*',
          pt: 'Abril–Setembro*',
          es: 'Abril–Septiembre*',
        },
      },
      {
        icon: 'package',
        label: { en: 'Packaging', pt: 'Embalagem', es: 'Empaque' },
        value: {
          en: '60 kg bags or big bags, by agreement',
          pt: 'Sacas de 60 kg ou big bags, sob acordo',
          es: 'Sacos de 60 kg o big bags, bajo acuerdo',
        },
      },
    ],
    shortDesc: {
      en: 'Export-grade raw unroasted Arabica and Conilon (Robusta) beans for commercial roasters, specialty importers, and extractors.',
      pt: 'Origens selecionadas de café verde arábica e conilon cru para torrefadores, importadores e processadores industriais.',
      es: 'Granos de café verde crudo arábica y conilón para tostadores comerciales, importadores e industria de extractos.',
    },
    overview: {
      en: 'Brazil is the world’s leading producer and exporter of green coffee. We source both high-altitude Arabica lots and dense Conilon (Robusta) from verified cooperative and estate origins across Minas Gerais, São Paulo, and Espírito Santo.',
      pt: 'O Brasil é o maior produtor e exportador mundial de café verde. Conectamos sua torrefação a lotes de Arábica de altitude e Conilon estruturado com rastreabilidade de cooperativas em Minas Gerais, São Paulo e Espírito Santo.',
      es: 'Brasil es el principal productor y exportador mundial de café verde. Conectamos su operación con lotes de Arábica de altura y Conilón estructurado de cooperativas en Minas Gerais, São Paulo y Espírito Santo.',
    },
    grades: {
      en: [
        'Arabica Strictly Soft (Fine Cup / Good Cup, Screen 17/18 & Screen 15/16)',
        'Arabica Natural & Pulped Natural (Commercial & Micro-lots)',
        'Conilon / Robusta (Type 2/3, Type 4, 13-up screen for soluble & espresso blends)',
        'Custom cup profiles evaluated against specific roaster requirements',
      ],
      pt: [
        'Arábica Strictly Soft (Fine Cup / Good Cup, Peneiras 17/18 e 15/16)',
        'Arábica Natural e Cereja Descascado (Comercial e Lotes Especiais)',
        'Conilon / Robusta (Tipo 2/3, Tipo 4 para blends de espresso e solúvel)',
        'Perfis sensoriais alinhados conforme a curva de torra do comprador',
      ],
      es: [
        'Arábica Strictly Soft (Fine Cup / Good Cup, Zarandas 17/18 y 15/16)',
        'Arábica Natural y Cereza Descascarado (Comercial y Lotes Especiales)',
        'Conilón / Robusta (Tipo 2/3, Tipo 4 para mezclas industriales y solubles)',
        'Perfiles de taza adaptados a las especificaciones del comprador',
      ],
    },
    packaging: {
      en: [
        'Traditional 60 kg export jute bags with GrainPro hermetic protective liners',
        '1,000 kg industrial Big Bags for high-capacity continuous roasting plants',
        'Bulk container liners (20ft FCL) available upon operational agreement',
      ],
      pt: [
        'Sacas de juta de 60 kg padrão exportação com liner hermético GrainPro',
        'Big Bags de 1.000 kg para instalações industriais de torra contínua',
        'Liners a granel em contêiner de 20 pés mediante alinhamento operacional',
      ],
      es: [
        'Sacos tradicionales de yute de 60 kg con bolsa hermética protectora GrainPro',
        'Big Bags de 1.000 kg para plantas industriales de tostado continuo',
        'Liner a granel en contenedor de 20 pies bajo acuerdo operativo',
      ],
    },
    commercialUse: {
      en: [
        'Commercial & specialty roasting brands',
        'Instant coffee (soluble) manufacturing & RTD beverages',
        'Cold brew concentrates & food flavorings',
      ],
      pt: [
        'Torrefação comercial e marcas de cafés especiais',
        'Indústria de solúvel e bebidas prontas (RTD)',
        'Concentrados de cold brew e extratos aromáticos',
      ],
      es: [
        'Tostadurías comerciales y marcas de café de especialidad',
        'Industria de café soluble y bebidas listas para tomar (RTD)',
        'Concentrados de cold brew y extractos alimentarios',
      ],
    },
    origins: {
      en: ['Sul de Minas', 'Cerrado Mineiro', 'Matas de Minas', 'Alta Mogiana (SP)', 'Espírito Santo', 'Rondônia'],
      pt: ['Sul de Minas', 'Cerrado Mineiro', 'Matas de Minas', 'Alta Mogiana (SP)', 'Espírito Santo', 'Rondônia'],
      es: ['Sul de Minas', 'Cerrado Mineiro', 'Matas de Minas', 'Alta Mogiana (SP)', 'Espírito Santo', 'Rondônia'],
    },
    harvestWindow: {
      en: 'April to September (Peak shipments: July through December)',
      pt: 'Abril a Setembro (Pico de embarques: Julho a Dezembro)',
      es: 'Abril a Septiembre (Pico de embarques: Julio a Diciembre)',
    },
    typicalOrderUnit: {
      en: '1 FCL 20ft (approx. 320 to 350 bags of 60 kg / ~19.2 to 21 MT)',
      pt: '1 FCL 20ft (cerca de 320 a 350 sacas de 60 kg / ~19,2 a 21 ton)',
      es: '1 FCL 20ft (aprox. 320 a 350 sacos de 60 kg / ~19,2 a 21 ton)',
    },
    shippingTerms: {
      en: 'FOB (Port of Santos / Vitória) or CIF to destination discharge port',
      pt: 'FOB (Porto de Santos / Vitória) ou CIF no porto de destino',
      es: 'FOB (Puerto de Santos / Vitória) o CIF en puerto de destino',
    },
    inspection: {
      en: 'Physical classification certificate, origin cupping score report, and official MAPA phytosanitary certificate.',
      pt: 'Laudo físico de classificação, pontuação de xícara e certificado fitossanitário oficial do MAPA.',
      es: 'Certificado de clasificación física, puntaje de catación y certificado fitosanitario oficial del MAPA.',
    },
    complianceNotes: {
      en: 'Shipments prepared strictly against agreed cup grade, screen calibration, and moisture content (max 12.0%).',
      pt: 'Embarques calibrados rigorosamente conforme padrão de xícara, peneira e umidade máxima contratada (até 12%).',
      es: 'Embarques calibrados estrictamente según grado de taza, zaranda y humedad máxima contratada (hasta 12%).',
    },
  },

  {
    id: 'sugar',
    slug: 'sugar',
    isCore: true,
    image: sugarImg,
    title: {
      en: 'Brazilian Cane Sugar (ICUMSA 45 & VHP)',
      pt: 'Açúcar de Cana Brasileiro (ICUMSA 45 & VHP)',
      es: 'Azúcar de Caña Brasileño (ICUMSA 45 y VHP)',
    },
    shortTitle: {
      en: 'Cane Sugar',
      pt: 'Açúcar de Cana',
      es: 'Azúcar de Caña',
    },
    category: {
      en: 'Cane Sugar',
      pt: 'Açúcar de Cana',
      es: 'Azúcar de Caña',
    },
    cardVarieties: {
      en: 'ICUMSA 45 · VHP',
      pt: 'ICUMSA 45 · VHP',
      es: 'ICUMSA 45 · VHP',
    },
    cardSummary: {
      en: 'Refined white sugar for food applications and VHP raw sugar for further refining.',
      pt: 'Açúcar branco refinado para a indústria alimentícia e açúcar bruto VHP para refino adicional.',
      es: 'Azúcar blanco refinado para la industria alimentaria y azúcar crudo VHP para refinación posterior.',
    },
    atAGlance: [
      {
        icon: 'layers',
        label: { en: 'Types', pt: 'Tipos', es: 'Tipos' },
        value: {
          en: 'Refined white & raw sugar',
          pt: 'Açúcar branco refinado e bruto',
          es: 'Azúcar blanco refinado y crudo',
        },
      },
      {
        icon: 'calendar',
        label: { en: 'Harvest', pt: 'Safra', es: 'Zafra' },
        value: {
          en: 'April–November*',
          pt: 'Abril–Novembro*',
          es: 'Abril–Noviembre*',
        },
      },
      {
        icon: 'ship',
        label: { en: 'Shipment format', pt: 'Formato de embarque', es: 'Formato de embarque' },
        value: {
          en: 'Bulk or container, by agreement',
          pt: 'A granel ou contêiner, sob acordo',
          es: 'A granel o contenedor, bajo acuerdo',
        },
      },
    ],
    shortDesc: {
      en: 'Refined white cane sugar (ICUMSA 45) and raw centrifugal VHP bulk sugar directly from São Paulo and Center-South mills.',
      pt: 'Açúcar branco refinado (ICUMSA 45) e açúcar bruto centrifugado VHP a granel das principais usinas do Centro-Sul.',
      es: 'Azúcar blanco refinado (ICUMSA 45) y azúcar crudo a granel VHP de los principales ingenios del Centro-Sur de Brasil.',
    },
    overview: {
      en: 'Brazil is the global benchmark for sugarcane processing efficiency. We coordinate supply of both food-grade refined crystal sugar (ICUMSA 45) in containerized 50kg bags and bulk vessel raw sugar (VHP) for overseas refineries.',
      pt: 'O Brasil é a referência global na produção sucroalcooleira. Coordenamos o fornecimento de açúcar branco refinado para alimentos e bebidas em sacas de 50 kg (FCL) e açúcar bruto VHP a granel para refinarias no exterior.',
      es: 'Brasil es el referente mundial en producción de azúcar de caña. Coordinamos suministro de azúcar refinado para alimentos y bebidas en sacos de 50 kg (FCL) y azúcar crudo VHP a granel para refinerías internacionales.',
    },
    grades: {
      en: [
        'Refined White Cane Sugar (ICUMSA 45, Polarization 99.8% min, Moisture 0.04% max)',
        'Raw Centrifugal Sugar (VHP - Very High Polarization, Pol 99.0% to 99.5%)',
        'White Crystal Sugar (ICUMSA 150 for regional food manufacturing)',
      ],
      pt: [
        'Açúcar Branco Refinado de Cana (ICUMSA 45, Polarização mín. 99,8%, Umidade máx. 0,04%)',
        'Açúcar Bruto Centrifugado (VHP - Very High Polarization, Pol 99,0% a 99,5%)',
        'Açúcar Cristal Branco (ICUMSA 150 para processamento industrial)',
      ],
      es: [
        'Azúcar Blanco Refinado de Caña (ICUMSA 45, Polarización mín. 99,8%, Humedad máx. 0,04%)',
        'Azúcar Crudo Centrifugado (VHP - Very High Polarization, Pol 99,0% a 99,5%)',
        'Azúcar Cristal Blanco (ICUMSA 150 para transformación industrial)',
      ],
    },
    packaging: {
      en: [
        '50 kg multi-ply woven polypropylene (PP) bags with internal polyethylene (PE) liner',
        '1,000 kg / 1,200 kg heavy-duty industrial Big Bags on export pallets',
        'Bulk vessel loading (breakbulk / Panamax) for commercial raw VHP sugar contracts',
      ],
      pt: [
        'Sacas de 50 kg em polipropileno tecido com liner interno de polietileno',
        'Big Bags de 1.000 kg a 1.200 kg paletizados para plantas industriais',
        'Carregamento a granel em navio (vessel breakbulk) para açúcar bruto VHP',
      ],
      es: [
        'Sacos de 50 kg de polipropileno tejido con bolsa interior de polietileno',
        'Big Bags de 1.000 kg a 1.200 kg paletizados para plantas industriales',
        'Carga a granel en buque (breakbulk / Panamax) para azúcar crudo VHP',
      ],
    },
    commercialUse: {
      en: [
        'Beverage, confectionery & bakery manufacturing',
        'Dairy & food preservation industries',
        'Overseas sugar refining and retail repackaging',
      ],
      pt: [
        'Indústria de bebidas, confeitaria e panificação',
        'Laticínios e processamento de alimentos conservados',
        'Refinarias no destino e reempacotamento para varejo',
      ],
      es: [
        'Industria de bebidas, confitería y panadería',
        'Lácteos y conservas alimenticias',
        'Refinerías en destino y fraccionamiento para consumo minorista',
      ],
    },
    origins: {
      en: ['São Paulo State Sugar Belt', 'Paraná', 'Minas Gerais (Triângulo Mineiro)'],
      pt: ['Polo Sucroalcooleiro de São Paulo', 'Paraná', 'Minas Gerais (Triângulo Mineiro)'],
      es: ['Polo Azucarero de São Paulo', 'Paraná', 'Minas Gerais (Triángulo Minero)'],
    },
    harvestWindow: {
      en: 'Center-South harvest runs April to November/December',
      pt: 'Safra Centro-Sul de Abril a Novembro/Dezembro',
      es: 'Zafra Centro-Sur de Abril a Noviembre/Diciembre',
    },
    typicalOrderUnit: {
      en: 'FCL Containers (min. 5 FCLs / ~135 MT) or Vessel Bulk (12,500 to 50,000 MT)',
      pt: 'Contêineres FCL (mín. 5 FCLs / ~135 ton) ou Navio Granel (12.500 a 50.000 ton)',
      es: 'Contenedores FCL (mín. 5 FCLs / ~135 ton) o Buque a Granel (12.500 a 50.000 ton)',
    },
    shippingTerms: {
      en: 'FOB (Port of Santos / Paranaguá) or CIF destination port under international charter terms',
      pt: 'FOB (Porto de Santos / Paranaguá) ou CIF no porto de destino',
      es: 'FOB (Puerto de Santos / Paranaguá) o CIF puerto de destino',
    },
    inspection: {
      en: 'Independent pre-shipment inspection (SGS, Bureau Veritas, or equivalent) at port of loading.',
      pt: 'Inspeção independente de pré-embarque (SGS, Bureau Veritas ou equivalente) no porto de carregamento.',
      es: 'Inspección independiente previa al embarque (SGS, Bureau Veritas o equivalente) en puerto de carga.',
    },
    complianceNotes: {
      en: 'Formal technical data sheets and supply commitments issued upon verified corporate buyer review.',
      pt: 'Ficha técnica formal e confirmação de alocação de usina emitidas após validação da demanda.',
      es: 'Ficha técnica formal y confirmación de asignación de ingenio emitidas tras validar la demanda comercial.',
    },
  },

  {
    id: 'beans-pulses',
    slug: 'beans-pulses',
    isCore: true,
    image: beansPulsesImg,
    title: {
      en: 'Brazilian Beans & Pulses (Edible Legumes)',
      pt: 'Feijões e Pulses Secos Brasileiros',
      es: 'Frijoles y Legumbres Secas Brasileñas',
    },
    shortTitle: {
      en: 'Beans & Pulses',
      pt: 'Feijões & Pulses',
      es: 'Frijoles y Legumbres',
    },
    category: {
      en: 'Beans & Pulses',
      pt: 'Feijões & Pulses',
      es: 'Frijoles y Legumbres',
    },
    cardVarieties: {
      en: 'Carioca · Black beans · Cowpea · Mung',
      pt: 'Carioca · Feijão preto · Caupi · Mungo',
      es: 'Carioca · Frijol negro · Caupí · Mungo',
    },
    cardSummary: {
      en: 'Brazilian beans and pulses for distributors and food processors, with variety and quality requirements matched to the destination market.',
      pt: 'Feijões e leguminosas brasileiros para distribuidores e processadores de alimentos, com variedades e requisitos de qualidade adequados ao mercado de destino.',
      es: 'Frijoles y legumbres brasileños para distribuidores y procesadores de alimentos, con variedades y requisitos de calidad adaptados al mercado de destino.',
    },
    atAGlance: [
      {
        icon: 'map-pin',
        label: { en: 'Origins', pt: 'Origens', es: 'Orígenes' },
        value: {
          en: 'Paraná, Minas Gerais, Goiás & Bahia',
          pt: 'Paraná, Minas Gerais, Goiás e Bahia',
          es: 'Paraná, Minas Gerais, Goiás y Bahía',
        },
      },
      {
        icon: 'package',
        label: { en: 'Packaging', pt: 'Embalagem', es: 'Empaque' },
        value: {
          en: '60 kg bags, big bags or bulk, by agreement',
          pt: 'Sacas de 60 kg, big bags ou granel, sob acordo',
          es: 'Sacos de 60 kg, big bags o granel, bajo acuerdo',
        },
      },
      {
        icon: 'calendar',
        label: { en: 'Seasonality', pt: 'Sazonalidade', es: 'Estacionalidad' },
        value: {
          en: 'Varies by variety and region',
          pt: 'Varia conforme a variedade e região',
          es: 'Varía según variedad y región',
        },
      },
    ],
    shortDesc: {
      en: 'Commercial and human-consumption dry beans: Carioca, Black, Dark Red Kidney, Cranberry, Fradinho (Cowpea), and Mung.',
      pt: 'Feijões secos para alimentação humana: Carioca, Preto, Vermelho Dark Red, Fradinho (Caupi) e Mungo.',
      es: 'Frijoles secos para consumo humano: Carioca, Negro, Rojo Oscuro, Fradinho (Caupí) y Mungo.',
    },
    overview: {
      en: 'Brazil is one of the world’s major producers of edible dry pulses, offering three annual harvest cycles across different agricultural regions. We connect food canners, packers, and wholesale distributors directly to calibrated export beans.',
      pt: 'O Brasil conta com até três safras anuais de leguminosas secas em diferentes bacias agrícolas. Conectamos empacotadores, enlatadoras e distribuidores a lotes selecionados e calibrados com padrão de exportação.',
      es: 'Brasil cuenta con hasta tres cosechas anuales de legumbres secas en diversas regiones agrícolas. Conectamos empacadores, enlatadoras y distribuidores a lotes seleccionados y calibrados con estándar de exportación.',
    },
    grades: {
      en: [
        'Carioca Beans (Pinto-type striped dry beans, high grading)',
        'Brazilian Black Beans (Feijão Preto, dense, uniform color)',
        'Dark Red Kidney Beans (DRK) & Light Speckled Kidney (Cranberry)',
        'Cowpeas / Black-Eyed Peas (Feijão Fradinho / Caupi)',
        'Black Matpe (Mungo Preto) and Green Mung Beans',
      ],
      pt: [
        'Feijão Carioca (padrão exportação tipo 1, peneira uniforme)',
        'Feijão Preto Brasileiro (brilho e cocção uniformes para conserva e empacotamento)',
        'Feijão Vermelho Dark Red Kidney e Rajado (Cranberry)',
        'Feijão Caupi / Fradinho (Black-eyed peas)',
        'Mungo Preto (Black Matpe) e Mungo Verde',
      ],
      es: [
        'Frijol Carioca (calidad exportación tipo 1, zaranda uniforme)',
        'Frijol Negro Brasileño (color uniforme y excelente cocción)',
        'Frijol Rojo Oscuro (Dark Red Kidney) y Jaspeado (Cranberry)',
        'Frijol Caupí / Ojo Negro (Fradinho)',
        'Frijol Mungo Negro (Black Matpe) y Mungo Verde',
      ],
    },
    packaging: {
      en: [
        '25 kg & 50 kg woven polypropylene bags with export marking',
        '1,000 kg industrial Big Bags for automated sorting and canning facilities',
        '20ft FCL container loads (~24 to 26 MT per container)',
      ],
      pt: [
        'Sacas de 25 kg e 50 kg em polipropileno trançado com padronização de exportação',
        'Big Bags de 1.000 kg para instalações de reempacotamento e enlatamento',
        'Estufagem em contêineres de 20 pés FCL (cerca de 24 a 26 toneladas)',
      ],
      es: [
        'Sacos de 25 kg y 50 kg de polipropileno tejido con marcas de exportación',
        'Big Bags de 1.000 kg para plantas de envasado y conserveras',
        'Carga en contenedores de 20 pies FCL (aprox. 24 a 26 toneladas)',
      ],
    },
    commercialUse: {
      en: [
        'Retail dry packaging under distributor brands',
        'Commercial canning & ready-to-eat legume processing',
        'Wholesale foodservice & institutional distribution',
      ],
      pt: [
        'Empacotamento para marcas de varejo e supermercados',
        'Indústria de conservas e processamento de leguminosas prontas',
        'Atacado distribuidor e alimentação institucional',
      ],
      es: [
        'Envasado minorista para marcas de distribución',
        'Industria de conservas y legumbres listas para consumir',
        'Canales mayoristas e instituciones alimentarias',
      ],
    },
    origins: {
      en: ['Paraná', 'Goiás', 'Mato Grosso', 'Minas Gerais', 'Bahia'],
      pt: ['Paraná', 'Goiás', 'Mato Grosso', 'Minas Gerais', 'Bahia'],
      es: ['Paraná', 'Goiás', 'Mato Grosso', 'Minas Gerais', 'Bahía'],
    },
    harvestWindow: {
      en: 'Seasonal availability varies by variety and crop cycle (3 harvests: Summer, Autumn, and Winter crops)',
      pt: 'Disponibilidade varia conforme a variedade e região (3 safras anuais: águas, seca e inverno)',
      es: 'La disponibilidad varía según variedad y región (3 cosechas anuales: verano, seca e invierno)',
    },
    typicalOrderUnit: {
      en: '1 FCL 20ft (approx. 24 to 26 MT)',
      pt: '1 FCL 20ft (cerca de 24 a 26 toneladas)',
      es: '1 FCL 20ft (aprox. 24 a 26 toneladas)',
    },
    shippingTerms: {
      en: 'FOB (Santos / Paranaguá) or CIF destination port',
      pt: 'FOB (Santos / Paranaguá) ou CIF no porto de destino',
      es: 'FOB (Santos / Paranaguá) o CIF en puerto de destino',
    },
    inspection: {
      en: 'Official grain classification report, moisture check (max 14%), and MAPA phytosanitary certificate.',
      pt: 'Laudo oficial de classificação de grãos, controle de umidade (<14%) e certificado fitossanitário do MAPA.',
      es: 'Certificado oficial de clasificación de granos, control de humedad (<14%) y certificado fitosanitario del MAPA.',
    },
    complianceNotes: {
      en: 'Calibrated by gravity table and optical sorting machines. Color, defects, and sizing confirmed prior to contract.',
      pt: 'Processamento por mesa densimétrica e selecionadoras ópticas. Parâmetros de defeitos e peneira fixados em contrato.',
      es: 'Procesamiento por mesa densimétrica y selección óptica. Parámetros de defectos y tamaño fijados por contrato.',
    },
  },

  {
    id: 'fresh-fruits',
    slug: 'fresh-fruits',
    isCore: true,
    image: freshFruitImg,
    title: {
      en: 'Brazilian Fresh Fruits (Cold-Chain Export)',
      pt: 'Frutas Frescas Brasileiras (Cadeia de Frio)',
      es: 'Frutas Frescas Brasileñas (Cadena de Frío)',
    },
    shortTitle: {
      en: 'Fresh Fruits',
      pt: 'Frutas Frescas',
      es: 'Frutas Frescas',
    },
    category: {
      en: 'Fresh Fruits',
      pt: 'Frutas Frescas',
      es: 'Frutas Frescas',
    },
    cardVarieties: {
      en: 'Selection by variety & season',
      pt: 'Seleção por variedade e safra',
      es: 'Selección por variedad y temporada',
    },
    cardSummary: {
      en: 'Fresh-fruit sourcing guided by the buyer’s destination market, seasonal options and handling requirements.',
      pt: 'Originação de frutas frescas orientada pelo mercado de destino do comprador, opções sazonais e requisitos de manuseio.',
      es: 'Originación de fruta fresca guiada por el mercado de destino del comprador, opciones de temporada y requerimientos de manejo.',
    },
    atAGlance: [
      {
        icon: 'sliders',
        label: { en: 'Product requirements', pt: 'Requisitos do produto', es: 'Requisitos del producto' },
        value: {
          en: 'Variety, size & maturity',
          pt: 'Variedade, calibre e maturação',
          es: 'Variedad, calibre y maduración',
        },
      },
      {
        icon: 'package',
        label: { en: 'Packing requirements', pt: 'Embalagem e rotulagem', es: 'Empaque y rotulado' },
        value: {
          en: 'Packaging & labeling for the destination market',
          pt: 'Embalagem e rotulagem para o mercado de destino',
          es: 'Empaque y etiquetado para el mercado de destino',
        },
      },
    ],
    shortDesc: {
      en: 'Export-grade whole fresh fruits (Tahiti limes, mangoes, seedless table grapes, melons) with temperature-controlled reefer logistics.',
      pt: 'Frutas frescas inteiras para exportação (limão tahiti, mangas, uvas sem sementes e melões) com cadeia de frio controlada.',
      es: 'Frutas frescas enteras para exportación (limón tahití, mangos, uvas sin semilla y melones) con logística refrigerada.',
    },
    overview: {
      en: 'Brazil’s irrigated fruit basins—especially the São Francisco Valley—deliver premium fresh produce year-round. We connect retail distributors and fresh produce importers with strictly inspected whole fruits packed in heavy-duty export cartons.',
      pt: 'Os polos irrigados de fruticultura do Brasil, especialmente o Vale do São Francisco, oferecem frutas frescas de alto padrão. Conectamos importadores e redes de supermercados a frutas inteiras inspecionadas e embaladas em caixas telescópicas resistentes.',
      es: 'Los valles irrigados de Brasil, especialmente el Valle del São Francisco, producen fruta fresca de alta calidad. Conectamos importadores y cadenas de supermercados a fruta fresca entera seleccionada con trazabilidad y empaque reforzado.',
    },
    grades: {
      en: [
        'Tahiti Limes (Citrus latifolia, sizes 42 to 60, green skin, high juice content)',
        'Export Table Grapes (Seedless White, Red, and Black varieties including Autumn Crisp and Crimson)',
        'Mangoes (Palmer, Tommy Atkins, Keitt, and Kent varieties, calibrated maturity)',
        'Melons (Yellow Honeydew, Cantaloupe, and Galia) & Formosa Papaya',
      ],
      pt: [
        'Limão Tahiti (calibres 42 a 60, coloração verde uniforme e alto rendimento)',
        'Uvas de Mesa sem Sementes (variedades brancas, vermelhas e pretas: Autumn Crisp, Crimson)',
        'Mangas tipo exportação (Palmer, Tommy Atkins, Kent e Keitt, ponto de maturação calibrado)',
        'Melões (Amarelo, Cantaloupe, Galia) e Mamão Formosa',
      ],
      es: [
        'Limón Tahití (calibres 42 a 60, piel verde uniforme y alto rendimiento de jugo)',
        'Uvas de Mesa sin Semilla (variedades blancas, rojas y negras: Autumn Crisp, Crimson)',
        'Mangos de exportación (Palmer, Tommy Atkins, Kent y Keitt con madurez calibrada)',
        'Melones (Amarillo, Cantaloupe, Galia) y Papaya Formosa',
      ],
    },
    packaging: {
      en: [
        'Heavy-duty corrugated telescopic export cartons (4.0 kg, 4.5 kg, 5.0 kg standardized per fruit type)',
        'Palletized with corner-post protection and secure maritime cross-strapping',
        'Shipped in 40ft High-Cube Reefer containers with controlled atmosphere (CA) and digital temperature dataloggers',
      ],
      pt: [
        'Caixas telescópicas de papelão ondulado de alta resistência (4 kg, 4,5 kg ou 5 kg conforme a fruta)',
        'Paletização com cantoneiras de proteção e amarração náutica reforçada',
        'Contêineres refrigerados (40ft High Cube Reefer) com atmosfera controlada e dataloggers contínuos',
      ],
      es: [
        'Cajas telescópicas de cartón corrugado de alta resistencia (4 kg, 4,5 kg o 5 kg según la fruta)',
        'Paletizado con esquineros de protección y zunchado reforzado para navegación marítima',
        'Contenedores refrigerados (40ft High Cube Reefer) con atmósfera controlada y registradores térmicos',
      ],
    },
    commercialUse: {
      en: [
        'Supermarket retail chains and international fresh produce wholesalers',
        'Specialized tropical fruit importers and distributors',
        'Commercial foodservice and catering networks',
      ],
      pt: [
        'Redes de supermercados e atacados internacionais de hortifrúti',
        'Importadores e distribuidores especializados em frutas tropicais',
        'Redes de foodservice e serviços de alimentação',
      ],
      es: [
        'Cadenas de supermercados y distribuidores mayoristas de perecederos',
        'Importadores especializados en frutas tropicales',
        'Redes de foodservice y gastronomía comercial',
      ],
    },
    origins: {
      en: ['São Francisco Valley (Petrolina / Juazeiro)', 'Rio Grande do Norte / Ceará', 'São Paulo State Citrus Belt'],
      pt: ['Vale do São Francisco (Petrolina / Juazeiro)', 'Rio Grande do Norte / Ceará', 'Cinturão Cítrico de São Paulo'],
      es: ['Valle del São Francisco (Petrolina / Juazeiro)', 'Rio Grande do Norte / Ceará', 'Cinturón Citrícola de São Paulo'],
    },
    harvestWindow: {
      en: 'Varies by fruit variety; Tahiti limes and irrigated table grapes offer extended export seasons',
      pt: 'Varia por fruta; limão tahiti e uvas irrigadas possuem janelas extensas de fornecimento',
      es: 'Varía por fruta; limón tahití y uvas irrigadas cuentan con ventanas amplias de exportación',
    },
    typicalOrderUnit: {
      en: '1 Reefer Container (40ft High Cube / approx. 20 to 22 MT net cargo)',
      pt: '1 Contêiner Reefer (40ft HC / cerca de 20 a 22 toneladas líquidas)',
      es: '1 Contenedor Reefer (40ft HC / aprox. 20 a 22 toneladas netas)',
    },
    shippingTerms: {
      en: 'FOB (Port of Natal / Salvador / Santos) or CIF destination port (air freight available for urgent programs)',
      pt: 'FOB (Natal / Salvador / Santos) ou CIF no porto de destino (aéreo sob demanda pontual)',
      es: 'FOB (Natal / Salvador / Santos) o CIF puerto de destino (flete aéreo para programas urgentes)',
    },
    inspection: {
      en: 'Cold-chain audit, continuous temperature loggers, maximum residue limit (MRL) compliance, and official phytosanitary inspection.',
      pt: 'Auditoria de cadeia de frio, termógrafos contínuos, conformidade com Limite Máximo de Resíduos (LMR) e laudo do MAPA.',
      es: 'Auditoría de cadena de frío, termógrafos digitales, cumplimiento de límites de residuos (LMR) y certificado del MAPA.',
    },
    complianceNotes: {
      en: 'Subject to bilateral phytosanitary market access protocols between Brazil and the destination country.',
      pt: 'Fornecimento condicionado aos protocolos fitossanitários bilaterais vigentes entre Brasil e o país de destino.',
      es: 'Suministro sujeto a los protocolos fitosanitarios bilaterales vigentes entre Brasil y el país de destino.',
    },
  },

  {
    id: 'grain-sorghum',
    slug: 'grain-sorghum',
    isCore: true,
    image: grainSorghumImg,
    title: {
      en: 'Brazilian Grain Sorghum (Feed & Energy Grain)',
      pt: 'Sorgo Granífero Brasileiro (Ração & Energia)',
      es: 'Sorgo Granífero Brasileño (Alimento Animal y Energía)',
    },
    shortTitle: {
      en: 'Sorghum',
      pt: 'Sorgo',
      es: 'Sorgo',
    },
    category: {
      en: 'Feed Grains',
      pt: 'Grãos Forrageiros',
      es: 'Granos Forrajeros',
    },
    cardVarieties: {
      en: 'Feed · Grain ethanol · Baijiu',
      pt: 'Nutrição animal · Etanol de grão · Baijiu',
      es: 'Nutrición animal · Etanol de grano · Baijiu',
    },
    cardSummary: {
      en: 'Brazilian sorghum sourced to the buyer’s intended application and agreed quality requirements.',
      pt: 'Sorgo brasileiro originado conforme a aplicação pretendida pelo comprador e padrões de qualidade acordados.',
      es: 'Sorgo brasileño originado según la aplicación requerida por el comprador y estándares de calidad acordados.',
    },
    atAGlance: [
      {
        icon: 'map-pin',
        label: { en: 'Origins', pt: 'Origens', es: 'Orígenes' },
        value: {
          en: 'Goiás, Minas Gerais, Mato Grosso do Sul, Bahia & São Paulo',
          pt: 'Goiás, Minas Gerais, Mato Grosso do Sul, Bahia e São Paulo',
          es: 'Goiás, Minas Gerais, Mato Grosso do Sul, Bahía y São Paulo',
        },
      },
      {
        icon: 'calendar',
        label: { en: 'Harvest', pt: 'Safra', es: 'Cosecha' },
        value: {
          en: 'June–September*',
          pt: 'Junho–Setembro*',
          es: 'Junio–Septiembre*',
        },
      },
      {
        icon: 'ship',
        label: { en: 'Shipment format', pt: 'Formato de embarque', es: 'Formato de embarque' },
        value: {
          en: 'Bulk or container, by agreement',
          pt: 'A granel ou contêiner, sob acordo',
          es: 'A granel o contenedor, bajo acuerdo',
        },
      },
    ],
    shortDesc: {
      en: 'High-energy red and bronze grain sorghum for animal nutrition, compound feed mills, and grain ethanol manufacturing.',
      pt: 'Grão forrageiro vermelho e bronze com alto teor energético para nutrição animal, fábricas de ração e etanol de grãos.',
      es: 'Grano forrajero rojo y bronce con alto valor energético para nutrición animal, plantas de alimento y etanol.',
    },
    overview: {
      en: 'Brazilian grain sorghum (Sorghum bicolor) is an authentic agricultural feed grain produced in expanding volumes across the Center-West and South. It serves as an efficient, starch-rich alternative to corn in poultry, swine, and dairy feed formulas.',
      pt: 'O sorgo granífero brasileiro é um grão forrageiro cultivado nos polos agrícolas do Centro-Oeste e Sul do país. É uma fonte energética de amido e proteína para avicultura, suinocultura, pecuária leiteira e produção de etanol.',
      es: 'El sorgo granífero brasileño es un grano forrajero producido a gran escala en el Centro-Oeste y Sur. Proporciona una fuente eficiente de energía y almidón para avicultura, porcicultura, ganadería y etanol.',
    },
    grades: {
      en: [
        'Export-Grade Red/Bronze Grain Sorghum (Commercial standard)',
        'Low-tannin / controlled-tannin profile optimized for animal feed digestibility',
        'Bulk feed grain meeting standard moisture (max 14.0%) and foreign matter (max 2.0%) thresholds',
      ],
      pt: [
        'Sorgo Granífero Tipo Exportação Vermelho/Bronze (Padrão comercial)',
        'Baixo teor de tanino / Tanino controlado para alta digestibilidade animal',
        'Umidade máxima de 14% e impurezas controladas para nutrição animal e etanol',
      ],
      es: [
        'Sorgo Granífero Calidad Exportación Rojo/Bronce (Estándar comercial)',
        'Bajo contenido de taninos / tanino controlado para alta digestibilidad',
        'Humedad máxima 14% e impurezas máximas 2% para nutrición animal y etanol',
      ],
    },
    packaging: {
      en: [
        'Bulk container liners (20ft / 40ft FCL bulk stowing, ~25 to 27 MT per container)',
        '1,000 kg heavy woven Big Bags for multimodal handling',
        '50 kg polypropylene bags for targeted regional feed operations',
      ],
      pt: [
        'Contêineres marítimos com bulk liner (cerca de 25 a 27 toneladas por contêiner)',
        'Big Bags de 1.000 kg para transporte multimodal e armazenagem intermediária',
        'Sacas de 50 kg em polipropileno para demandas regionais específicas',
      ],
      es: [
        'Contenedores marítimos con liner a granel (aprox. 25 a 27 toneladas por contenedor)',
        'Big Bags de 1.000 kg para transporte multimodal y almacenaje en planta',
        'Sacos de 50 kg de polipropileno para operaciones de alimento balanceado',
      ],
    },
    commercialUse: {
      en: [
        'Compound feed manufacturing (poultry, swine, beef cattle, and aquaculture)',
        'Grain-based bioethanol & starch extraction plants',
        'Industrial brewing and fermentation adjuncts',
      ],
      pt: [
        'Fábricas de rações balanceadas (avicultura, suinocultura, bovinocultura e piscicultura)',
        'Usinas de etanol de grãos e extração de amido',
        'Adjunto industrial de fermentação e cervejarias',
      ],
      es: [
        'Plantas de alimentos balanceados (avicultura, porcicultura, ganadería y acuicultura)',
        'Destilerías de bioetanol a base de granos y almidón',
        'Adjuntos de fermentación industrial y cervecería',
      ],
    },
    origins: {
      en: ['Goiás', 'Minas Gerais', 'Mato Grosso do Sul', 'Bahia', 'São Paulo'],
      pt: ['Goiás', 'Minas Gerais', 'Mato Grosso do Sul', 'Bahia', 'São Paulo'],
      es: ['Goiás', 'Minas Gerais', 'Mato Grosso do Sul', 'Bahía', 'São Paulo'],
    },
    harvestWindow: {
      en: 'Second-crop (Safrinha) harvest primarily between June and September',
      pt: 'Safra de safrinha colhida principalmente entre Junho e Setembro',
      es: 'Cosecha de safrinha recolectada principalmente entre Junio y Septiembre',
    },
    typicalOrderUnit: {
      en: 'Container lots (min. 2 to 5 FCLs / ~50 to 135 MT) or dedicated bulk batches',
      pt: 'Lotes em contêineres (mín. 2 a 5 FCLs / ~50 a 135 ton) ou lotes a granel',
      es: 'Lotes en contenedores (mín. 2 a 5 FCLs / ~50 a 135 ton) o lotes a granel',
    },
    shippingTerms: {
      en: 'FOB (Port of Santos / Paranaguá / Barcarena) or CIF destination port',
      pt: 'FOB (Porto de Santos / Paranaguá / Barcarena) ou CIF no porto de destino',
      es: 'FOB (Puerto de Santos / Paranaguá / Barcarena) o CIF en puerto de destino',
    },
    inspection: {
      en: 'Official grain classification grading certificate, moisture analysis, and export phytosanitary certificate.',
      pt: 'Laudo oficial de classificação de grãos, certificado de pureza e inspeção fitossanitária de exportação.',
      es: 'Certificado oficial de clasificación de granos, análisis de pureza y certificado fitosanitario de exportación.',
    },
    complianceNotes: {
      en: 'Export lots verified against destination country cereal import standards and biosecurity regulations.',
      pt: 'Lotes conferidos conforme as exigências fitossanitárias e de biossegurança do mercado comprador.',
      es: 'Lotes verificados contra las normas fitosanitarias y de bioseguridad del país importador.',
    },
  },

  {
    id: 'soybeans',
    slug: 'soybeans',
    isCore: false,
    image: soybeansImg,
    title: {
      en: 'Brazilian Soybeans (Commercial & Non-GMO)',
      pt: 'Soja Brasileira (Comercial & Não-OGM)',
      es: 'Soja Brasileña (Comercial y No-OGM)',
    },
    shortTitle: {
      en: 'Soybeans',
      pt: 'Soja',
      es: 'Soja',
    },
    category: {
      en: 'Sourcing on Inquiry',
      pt: 'Originação sob Consulta',
      es: 'Originación bajo Consulta',
    },
    cardSummary: {
      en: 'Brazilian soybeans for crushing and export markets, arranged on inquiry according to commercial specifications.',
      pt: 'Soja brasileira para esmagamento e mercados de exportação, estruturada sob consulta conforme padrões comerciais.',
      es: 'Soja brasileña para molienda y mercados de exportación, gestionada bajo consulta según especificaciones comerciales.',
    },
    shortDesc: {
      en: 'Export-grade soybeans for crushing, animal protein feed, and Identity Preserved (IP) Non-GMO food applications.',
      pt: 'Soja tipo exportação para esmagamento, nutrição animal e lotes Não-OGM (IP) para consumo humano.',
      es: 'Soja de exportación para molienda, nutrición animal y lotes No-OGM (IP) para consumo humano.',
    },
    overview: {
      en: 'Brazil is the world’s foremost soybean exporter. We coordinate tailored sourcing for buyers seeking specialized container shipments or non-GMO identity-preserved lots for food manufacturing.',
      pt: 'O Brasil é o maior exportador global de soja. Coordenamos originação estruturada para compradores que demandam embarques em contêineres ou lotes Não-OGM rastreados para a indústria alimentícia.',
      es: 'Brasil es el mayor exportador mundial de soja. Coordinamos originación especializada para compradores que buscan embarques en contenedores o lotes No-OGM certificados para la industria de alimentos.',
    },
    grades: {
      en: [
        'Commercial Export Soybeans (ANEC 41 Standard, Oil min 18.5%, Protein min 34.0%)',
        'Identity Preserved (IP) Non-GMO Soybeans for tofu, soymilk, and human foods',
      ],
      pt: [
        'Soja Comercial de Exportação (Padrão ANEC 41, Óleo mín. 18,5%, Proteína mín. 34,0%)',
        'Soja Não-OGM / IP (Identity Preserved) com rastreabilidade para alimentação humana',
      ],
      es: [
        'Soja Comercial de Exportación (Estándar ANEC 41, Aceite mín. 18,5%, Proteína mín. 34,0%)',
        'Soja No-OGM / IP (Identidad Preservada) para tofu, bebidas y alimentos humanos',
      ],
    },
    packaging: {
      en: ['Bulk container liners (20ft FCL ~25 to 26 MT)', '1,000 kg industrial Big Bags'],
      pt: ['Contêiner com liner granel (20ft FCL ~25 a 26 ton)', 'Big Bags de 1.000 kg'],
      es: ['Contenedor con liner a granel (20ft FCL ~25 a 26 ton)', 'Big Bags de 1.000 kg'],
    },
    commercialUse: {
      en: ['Crushing, oil extraction & high-protein meal', 'Soy milk, tofu & plant-based foods (Non-GMO)', 'Animal feed formulas'],
      pt: ['Esmagamento, extração de óleo e farelo proteico', 'Bebidas de soja, tofu e alimentos vegetais (Não-OGM)', 'Formulação de rações'],
      es: ['Molienda, extracción de aceite y harina proteica', 'Bebidas de soja, tofu y alimentos vegetales (No-OGM)', 'Nutrición animal'],
    },
    origins: {
      en: ['Mato Grosso', 'Paraná', 'Goiás', 'Rio Grande do Sul'],
      pt: ['Mato Grosso', 'Paraná', 'Goiás', 'Rio Grande do Sul'],
      es: ['Mato Grosso', 'Paraná', 'Goiás', 'Rio Grande do Sul'],
    },
    harvestWindow: {
      en: 'Main crop harvest from January to May',
      pt: 'Colheita principal de Janeiro a Maio',
      es: 'Cosecha principal de Enero a Mayo',
    },
    typicalOrderUnit: {
      en: 'Containerized FCLs (min. 5 FCLs) or dedicated vessel allocations',
      pt: 'Contêineres FCL (mín. 5 FCLs) ou lotes dedicados de navio',
      es: 'Contenedores FCL (mín. 5 FCLs) o contratos de buque',
    },
    shippingTerms: {
      en: 'FOB (Santos / Paranaguá / Arco Norte) or CIF destination port',
      pt: 'FOB (Santos / Paranaguá / Arco Norte) ou CIF no porto de destino',
      es: 'FOB (Santos / Paranaguá / Arco Norte) o CIF en puerto de destino',
    },
    inspection: {
      en: 'ANEC quality certificates, GMO testing certificates, and MAPA phytosanitary clearance.',
      pt: 'Certificados ANEC de classificação, laudos de PCR para não-transgenia e atestado fitossanitário.',
      es: 'Certificados ANEC de calidad, análisis PCR de no-transgenia y certificado fitosanitario.',
    },
    complianceNotes: {
      en: 'Origination is aligned strictly based on volume specifications and destination regulatory clearance.',
      pt: 'Originação coordenada sob consulta conforme volume e exigências do país comprador.',
      es: 'Originación alineada según especificaciones de volumen y normativas del país destino.',
    },
  },

  {
    id: 'corn',
    slug: 'corn',
    isCore: false,
    image: cornImg,
    title: {
      en: 'Brazilian Yellow Corn (Feed Grade)',
      pt: 'Milho Amarelo Brasileiro (Grau Ração)',
      es: 'Maíz Amarillo Brasileño (Grado Alimento)',
    },
    shortTitle: {
      en: 'Yellow Corn',
      pt: 'Milho Amarelo',
      es: 'Maíz Amarillo',
    },
    category: {
      en: 'Sourcing on Inquiry',
      pt: 'Originação sob Consulta',
      es: 'Originación bajo Consulta',
    },
    cardSummary: {
      en: 'Brazilian yellow corn for animal feed and industrial processing, with terms aligned per operation.',
      pt: 'Milho amarelo brasileiro para nutrição animal e processamento industrial, com termos alinhados por operação.',
      es: 'Maíz amarillo brasileño para nutrición animal y procesamiento industrial, con términos alineados por operación.',
    },
    shortDesc: {
      en: 'High-density yellow feed corn for livestock nutrition, dry milling, and commercial ethanol processing.',
      pt: 'Milho amarelo em grão com alta densidade para indústria de ração, moagem e processamento de etanol.',
      es: 'Maíz amarillo de alta densidad para nutrición animal, molienda seca y procesamiento de etanol.',
    },
    overview: {
      en: 'Brazil’s winter crop (Safrinha) is a pillar of international cereal trade. We coordinate containerized and multi-lot yellow corn supply for international feed manufacturers and milling operations.',
      pt: 'A safrinha de milho do Brasil é um pilar do comércio global de cereais. Coordenamos originação em contêineres e lotes estruturados para fabricantes de ração e plantas industriais.',
      es: 'La zafra de invierno (safrinha) brasileña es un pilar del comercio de cereales. Coordinamos suministro en contenedores y lotes dedicados para fabricantes de alimento balanceado y molineras.',
    },
    grades: {
      en: [
        'Commercial Export Yellow Corn (ANEC 43 Standard / Grade 2, Moisture max 14.5%)',
        'Controlled aflatoxin and mycotoxin parameters for dedicated animal feed programs',
      ],
      pt: [
        'Milho Amarelo Exportação (Padrão ANEC 43 / Grau 2, Umidade máx. 14,5%)',
        'Parâmetros controlados de micotoxinas e aflatoxinas para programas específicos de ração',
      ],
      es: [
        'Maíz Amarillo Exportación (Estándar ANEC 43 / Grado 2, Humedad máx. 14,5%)',
        'Parámetros controlados de micotoxinas y aflatoxinas para nutrición animal exigente',
      ],
    },
    packaging: {
      en: ['Bulk container liners (20ft FCL ~25 to 26 MT)', '1,000 kg industrial Big Bags'],
      pt: ['Contêiner com liner granel (20ft FCL ~25 a 26 ton)', 'Big Bags de 1.000 kg'],
      es: ['Contenedor con liner a granel (20ft FCL ~25 a 26 ton)', 'Big Bags de 1.000 kg'],
    },
    commercialUse: {
      en: ['Poultry, swine & dairy animal feed production', 'Dry and wet corn milling', 'Bioethanol & grain-starch manufacturing'],
      pt: ['Fabricação de rações para avicultura, suinocultura e pecuária', 'Moagem seca e úmida de milho', 'Usinas de etanol e amido de grãos'],
      es: ['Producción de alimento balanceado para aves, cerdos y vacunos', 'Molienda seca y húmeda de maíz', 'Plantas de bioetanol y almidón'],
    },
    origins: {
      en: ['Mato Grosso', 'Paraná', 'Goiás', 'Mato Grosso do Sul'],
      pt: ['Mato Grosso', 'Paraná', 'Goiás', 'Mato Grosso do Sul'],
      es: ['Mato Grosso', 'Paraná', 'Goiás', 'Mato Grosso do Sul'],
    },
    harvestWindow: {
      en: 'Safrinha harvest runs June to September (major export window: July through December)',
      pt: 'Safra de safrinha colhida de Junho a Setembro (janela de exportação: Julho a Dezembro)',
      es: 'Cosecha de safrinha entre Junio y Septiembre (ventana de exportación: Julio a Diciembre)',
    },
    typicalOrderUnit: {
      en: 'Containerized FCLs (min. 5 FCLs / ~130 MT) or bulk batches',
      pt: 'Contêineres FCL (mín. 5 FCLs / ~130 ton) ou lotes a granel',
      es: 'Contenedores FCL (mín. 5 FCLs / ~130 ton) o lotes a granel',
    },
    shippingTerms: {
      en: 'FOB (Santos / Paranaguá / Barcarena) or CIF destination port',
      pt: 'FOB (Santos / Paranaguá / Barcarena) ou CIF no porto de destino',
      es: 'FOB (Santos / Paranaguá / Barcarena) o CIF en puerto de destino',
    },
    inspection: {
      en: 'ANEC classification reports, moisture certificates, and official export phytosanitary documentation.',
      pt: 'Laudos de classificação ANEC, teor de umidade e documentação fitossanitária oficial.',
      es: 'Certificados de clasificación ANEC, control de humedad y documentación fitosanitaria oficial.',
    },
    complianceNotes: {
      en: 'Availability is aligned closely with the Brazilian harvest calendar and inland freight dynamics.',
      pt: 'Disponibilidade e frete interno alinhados com as janelas da safra e safrinha brasileira.',
      es: 'Disponibilidad y flete interno coordinados según el calendario de cosecha brasileño.',
    },
  },

  {
    id: 'acai',
    slug: 'acai',
    isCore: false,
    image: acaiImg,
    title: {
      en: 'Brazilian Açaí & Frozen Fruit Pulps',
      pt: 'Açaí e Polpas Congeladas Brasileiras',
      es: 'Açaí y Pulpas Congeladas Brasileñas',
    },
    shortTitle: {
      en: 'Açaí & Pulps',
      pt: 'Açaí e Polpas',
      es: 'Açaí y Pulpas',
    },
    category: {
      en: 'Sourcing on Inquiry',
      pt: 'Originação sob Consulta',
      es: 'Originación bajo Consulta',
    },
    cardSummary: {
      en: 'Brazilian açaí and tropical fruit pulps for beverage and food manufacturers, sourced to buyer requirements.',
      pt: 'Açaí e polpas de frutas tropicais brasileiras para fabricantes de alimentos e bebidas, originados sob demanda.',
      es: 'Açaí y pulpas de frutas tropicales brasileñas para fabricantes de alimentos e bebidas, originados según requerimientos.',
    },
    shortDesc: {
      en: 'Industrial pure pasteurized frozen açaí pulp (Medium & Special solids) and IQF fruit ingredients from Pará.',
      pt: 'Polpa de açaí puro pasteurizado congelado (Médio e Especial) e derivados de frutas da Amazônia.',
      es: 'Pulpa de açaí puro pasteurizado congelado (Medio y Especial) y frutas amazónicas para la industria.',
    },
    overview: {
      en: 'Pure açaí from the Amazon basin is a high-value superfood ingredient. We coordinate supply of pasteurized, additive-free frozen pulp in industrial aseptic drums and bag-in-box cartons for global food and beverage manufacturers.',
      pt: 'O açaí puro da bacia amazônica é um ingrediente nobre para a indústria mundial. Coordenamos o fornecimento de polpa pasteurizada pura sem aditivos em tambores industriais assépticos e caixas bag-in-box sob rigorosa cadeia de frio.',
      es: 'El açaí puro de la cuenca amazónica es un ingrediente de alto valor nutricional. Coordinamos suministro de pulpa pasteurizada pura sin aditivos en tambores industriales asépticos y cajas bag-in-box con control térmico estricto.',
    },
    grades: {
      en: [
        'Pure Açaí Medium Grade (11% to 12% total solids, unadulterated pasteurized pulp)',
        'Pure Açaí Special / Thick Grade (14% or higher total solids for dense texture)',
        'Organic Certified (NOP/EU) & Conventional grades',
      ],
      pt: [
        'Açaí Puro Médio (11% a 12% de sólidos totais, pasteurizado e sem conservantes)',
        'Açaí Puro Especial / Grosso (14% ou mais de sólidos totais)',
        'Lotes com certificação orgânica (NOP/EU) ou convencional',
      ],
      es: [
        'Açaí Puro Medio (11% a 12% de sólidos totales, pasteurizado y sin aditivos)',
        'Açaí Puro Especial / Grueso (14% o más de sólidos totales)',
        'Lotes con certificación orgánica (NOP/EU) o convencional',
      ],
    },
    packaging: {
      en: [
        '200 kg steel drums with aseptic protective food-grade inner liners (-18°C frozen)',
        '10 kg & 20 kg bag-in-box cartons for flexible food processing',
        'Shipped in 40ft High-Cube Reefer containers maintained strictly at -18°C',
      ],
      pt: [
        'Tambores de aço de 200 kg com liner asséptico alimentar congelado a -18°C',
        'Caixas bag-in-box de 10 kg e 20 kg para processamento flexível',
        'Contêineres marítimos Reefer de 40 pés mantidos a -18°C com monitoramento contínuo',
      ],
      es: [
        'Tambores de acero de 200 kg con bolsa aséptica alimentaria congelada a -18°C',
        'Cajas bag-in-box de 10 kg y 20 kg para dosificación industrial flexible',
        'Contenedores marítimos Reefer de 40 pies a -18°C con registro continuo',
      ],
    },
    commercialUse: {
      en: [
        'Beverage, juice, and smoothie manufacturing',
        'Dairy, ice cream, and frozen dessert formulations',
        'Nutraceutical and functional ingredient processing',
      ],
      pt: [
        'Indústria de sucos, bebidas prontas e smoothies',
        'Sorvetes, sobremesas lácteas e bowls de açaí',
        'Indústria nutracêutica e ingredientes funcionais',
      ],
      es: [
        'Industria de jugos, bebidas funcionales y batidos',
        'Helados, postres lácteos y bowls de açaí',
        'Ingredientes nutracéuticos y extractos funcionales',
      ],
    },
    origins: {
      en: ['Pará State (Belém / Castanhal / Lower Amazon Basin)'],
      pt: ['Estado do Pará (Belém / Castanhal / Baixo Amazonas)'],
      es: ['Estado de Pará (Belém / Castanhal / Bajo Amazonas)'],
    },
    harvestWindow: {
      en: 'Year-round processing with peak wild harvest between August and December',
      pt: 'Processamento contínuo com pico de safra de Agosto a Dezembro',
      es: 'Procesamiento continuo con temporada alta de Agosto a Diciembre',
    },
    typicalOrderUnit: {
      en: '1 Reefer Container (approx. 18 to 20 MT net in drums or boxes)',
      pt: '1 Contêiner Reefer (cerca de 18 a 20 toneladas líquidas)',
      es: '1 Contenedor Reefer (aprox. 18 a 20 toneladas netas)',
    },
    shippingTerms: {
      en: 'FOB (Port of Belém / Vila do Conde) or CIF destination port (-18°C cold chain)',
      pt: 'FOB (Porto de Belém / Vila do Conde) ou CIF no porto de destino (-18°C)',
      es: 'FOB (Puerto de Belém / Vila do Conde) o CIF puerto de destino (-18°C)',
    },
    inspection: {
      en: 'Microbiological laboratory certificate, pasteurization validation, and continuous cold-chain data log.',
      pt: 'Laudo microbiológico de pasteurização, ausência de contaminantes e atestado de cadeia de frio.',
      es: 'Certificado microbiológico de pasteurización, control de contaminantes y trazabilidad térmica.',
    },
    complianceNotes: {
      en: 'Technical data sheets, solids level, and organic certification certificates supplied upon inquiry review.',
      pt: 'Especificação técnica detalhada, percentual de sólidos e laudos fornecidos na consulta.',
      es: 'Ficha técnica detallada, porcentaje de sólidos y certificados remitidos con la consulta.',
    },
  },
];

export const CORE_PRODUCTS = PRODUCTS.filter((p) => p.isCore);
export const SOURCING_ON_INQUIRY_PRODUCTS = PRODUCTS.filter((p) => !p.isCore);

export function getProductById(id: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.id === id || p.slug === id);
}
