/* 
  Qovre SEO & GEO single source of truth
  Brand-facing name: Qovre
  Legal operator: GetFromTR
  Notes:
  - Replace KVK_NUMBER and VAT_NUMBER placeholders before production launch.
  - Review prices, legal pages, and city targeting periodically.
*/

export type Locale = 'nl' | 'en';

export type BrandInfo = {
  brandName: string;
  legalName: string;
  tagline: {
    nl: string;
    en: string;
  };
  primaryLocale: Locale;
  supportedLocales: Locale[];
  websiteUrl: string;
  primaryDomain: string;
  email: {
    primary: string;
    secondary: string;
  };
  phone: {
    whatsapp: string;
    international: string;
  };
  location: {
    city: string;
    country: string;
    display: string;
  };
  legal: {
    kvkNumber: string;
    vatNumber: string;
    vatRate: string;
    operatorDisclosure: {
      nl: string;
      en: string;
    };
  };
  businessModel: {
    remoteOnly: boolean;
    consultationChannels: string[];
  };
  positioning: {
    nl: string;
    en: string;
  };
  differentiators: {
    nl: string[];
    en: string[];
  };
  criticalCss?: {
    [key: string]: string; // URL path -> CSS string or Reference
  };
};

export type ServiceInfo = {
  slug: string;
  category: 'web-development' | 'ecommerce' | 'saas' | 'automation' | 'ai-chatbots' | 'seo-geo' | 'ui-ux' | 'maintenance';
  titleNL: string;
  titleEN: string;
  shortDescriptionNL: string;
  shortDescriptionEN: string;
  fullDescriptionNL: string;
  fullDescriptionEN: string;
  audienceNL: string[];
  audienceEN: string[];
  outcomesNL: string[];
  outcomesEN: string[];
  deliverablesNL: string[];
  deliverablesEN: string[];
  technologies: string[];
  pricing: {
    model: 'starting-from' | 'custom-quote';
    fromEUR?: number;
    typicalRangeEUR?: [number, number];
    noteNL: string;
    noteEN: string;
  };
  timeline: {
    typicalNL: string;
    typicalEN: string;
  };
  keywordsNL: string[];
  keywordsEN: string[];
  faqHooks: string[];
};

export type CityLandingInfo = {
  slug: string;
  city: string;
  province: string;
  priority: 'tier-1' | 'tier-2';
  introNL: string;
  introEN: string;
  localSignalsNL: string[];
  localSignalsEN: string[];
};

export type FAQItem = {
  id: string;
  category: 'pricing' | 'process' | 'technology' | 'support' | 'seo' | 'ai' | 'legal';
  questionNL: string;
  answerNL: string;
  questionEN: string;
  answerEN: string;
};

export const BRAND: BrandInfo = {
  brandName: 'Qovre',
  legalName: 'GetFromTR',
  tagline: {
    nl: 'Digitale oplossingen voor bedrijven die online beter willen presteren.',
    en: 'Digital solutions for businesses that want to perform better online.',
  },
  primaryLocale: 'nl',
  supportedLocales: ['nl', 'en'],
  websiteUrl: 'https://www.qovre.nl',
  primaryDomain: 'qovre.nl',
  email: {
    primary: 'contact@qovre.nl',
    secondary: 'info@qovre.nl',
  },
  phone: {
    whatsapp: '06 47 65 63 43',
    international: '+31 6 47 65 63 43',
  },
  location: {
    city: 'Den Haag',
    country: 'Netherlands',
    display: 'Den Haag, Netherlands',
  },
  legal: {
    kvkNumber: 'KVK_NUMBER_TODO',
    vatNumber: 'VAT_NUMBER_TODO',
    vatRate: '21%',
    operatorDisclosure: {
      nl: 'Qovre is een digitaal merk dat wordt geëxploiteerd door GetFromTR.',
      en: 'Qovre is a digital brand operated by GetFromTR.',
    },
  },
  businessModel: {
    remoteOnly: true,
    consultationChannels: ['email', 'WhatsApp'],
  },
  positioning: {
    nl: 'Qovre is een AI-gedreven digitaal bureau dat schaalbare, conversiegerichte websites, webshops, SaaS-platformen en automatiseringsoplossingen ontwikkelt voor moderne bedrijven.',
    en: 'Qovre is an AI-driven digital studio that builds scalable, conversion-focused websites, ecommerce systems, SaaS platforms, and automation solutions for modern businesses.',
  },
  differentiators: {
    nl: [
      'Strategie, ontwerp, development, SEO, GEO en AI-implementatie onder één dak.',
      'Zakelijke focus: we bouwen niet alleen een website, maar een systeem dat leads, aanvragen of verkoop ondersteunt.',
      'Meertalige aanpak voor de Nederlandse en internationale markt.',
      'Technische keuzes worden afgestemd op schaalbaarheid, onderhoudbaarheid en performance.',
      'Duidelijke intake- en projectstructuur zodat aanvragen sneller naar realisatie gaan.',
    ],
    en: [
      'Strategy, design, development, SEO, GEO, and AI implementation in one workflow.',
      'Business-first execution: not just a website, but a system that supports leads, enquiries, or sales.',
      'Multilingual approach for both Dutch and international audiences.',
      'Technical decisions are made around scalability, maintainability, and performance.',
      'Clear intake and project structure so enquiries move faster into execution.',
    ],
  },
};

export const SERVICES: ServiceInfo[] = [
  {
    slug: 'business-websites',
    category: 'web-development',
    titleNL: 'Zakelijke websites op maat',
    titleEN: 'Custom business websites',
    shortDescriptionNL: 'Professionele websites voor bedrijven, zelfstandigen en lokale ondernemers die online vertrouwen en aanvragen willen opbouwen.',
    shortDescriptionEN: 'Professional websites for companies, independents, and local businesses that want to build trust and generate enquiries online.',
    fullDescriptionNL: 'Qovre ontwikkelt snelle, schaalbare en meertalige zakelijke websites die niet alleen goed ogen, maar ook bijdragen aan vindbaarheid, conversie en professionele positionering. We denken mee over structuur, content, call-to-actions, technische SEO, formulieren, hosting en toekomstige uitbreidbaarheid.',
    fullDescriptionEN: 'Qovre develops fast, scalable, multilingual business websites that do more than look professional. They support discoverability, conversion, and long-term positioning. We think through structure, content, calls to action, technical SEO, forms, hosting, and future scalability.',
    audienceNL: ['MKB-bedrijven', 'zelfstandigen', 'praktijken', 'dienstverleners', 'lokale ondernemingen'],
    audienceEN: ['SMEs', 'independent professionals', 'practices', 'service businesses', 'local companies'],
    outcomesNL: ['Professionele online uitstraling', 'hogere conversiekans', 'duidelijke dienstpresentatie', 'technische basis voor groei'],
    outcomesEN: ['Professional online presence', 'higher conversion potential', 'clear service presentation', 'technical foundation for growth'],
    deliverablesNL: ['Strategische paginastructuur', 'responsive design', 'contact- en intakeformulieren', 'basis technische SEO', 'performance-optimalisatie', 'meertalige implementatie indien nodig'],
    deliverablesEN: ['Strategic page structure', 'responsive design', 'contact and intake forms', 'baseline technical SEO', 'performance optimisation', 'multilingual implementation when needed'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel', 'Schema.org structured data'],
    pricing: {
      model: 'starting-from',
      fromEUR: 3000,
      noteNL: 'Zakelijke websites starten vanaf €3.000 excl. btw. De definitieve investering hangt af van scope, functionaliteiten, contentbehoefte en meertaligheid.',
      noteEN: 'Business websites start from €3,000 excl. VAT. Final investment depends on scope, functionality, content requirements, and multilingual needs.',
    },
    timeline: {
      typicalNL: 'Gemiddeld 2 tot 4 weken voor standaard zakelijke websites, afhankelijk van feedbacksnelheid en contentaanlevering.',
      typicalEN: 'Typically 2 to 4 weeks for standard business websites, depending on feedback speed and content readiness.',
    },
    keywordsNL: ['website laten maken', 'bedrijfswebsite', 'webdesign Den Haag', 'professionele website', 'zakelijke website', 'responsive website', 'technische SEO', 'meertalige website'],
    keywordsEN: ['business website development', 'custom company website', 'web design Netherlands', 'professional website', 'responsive business site', 'technical SEO setup', 'multilingual website'],
    faqHooks: ['pricing', 'timeline', 'hosting', 'maintenance', 'seo'],
  },
  {
    slug: 'ecommerce-development',
    category: 'ecommerce',
    titleNL: 'Webshop en e-commerce ontwikkeling',
    titleEN: 'Ecommerce and webshop development',
    shortDescriptionNL: 'Schaalbare webshops voor merken en ondernemers die producten online professioneel willen verkopen.',
    shortDescriptionEN: 'Scalable ecommerce systems for brands and businesses that want to sell products professionally online.',
    fullDescriptionNL: 'Voor e-commerce projecten kijkt Qovre niet alleen naar design, maar ook naar productstructuur, categorie-logica, checkoutflow, betaalintegraties, performance, zoekmachinevriendelijkheid en beheerbaarheid. Hosting, voorraadkoppelingen, verzendlogica en uitbreidbaarheid worden meegenomen in de technische keuze.',
    fullDescriptionEN: 'For ecommerce projects, Qovre goes beyond design and addresses product structure, category logic, checkout flow, payment integrations, performance, search engine readiness, and operational maintainability. Hosting, inventory integrations, shipping logic, and scalability are considered in the technical architecture.',
    audienceNL: ['Merken', 'retailers', 'groeiende webshops', 'niche e-commerce ondernemers'],
    audienceEN: ['Brands', 'retailers', 'growing ecommerce businesses', 'niche online merchants'],
    outcomesNL: ['Betrouwbare webshopbasis', 'betere productpresentatie', 'conversiegerichte checkout', 'schaalbare technische structuur'],
    outcomesEN: ['Reliable webshop foundation', 'stronger product presentation', 'conversion-oriented checkout', 'scalable technical structure'],
    deliverablesNL: ['Product- en categoriearchitectuur', 'betaal- en verzendintegraties', 'technische SEO voor productpagina\'s', 'analytics basis', 'schaalbare contentstructuur', 'beheer- en onderhoudsadvies'],
    deliverablesEN: ['Product and category architecture', 'payment and shipping integrations', 'technical SEO for product pages', 'analytics setup', 'scalable content structure', 'management and maintenance guidance'],
    technologies: ['Next.js', 'Headless commerce', 'Shopify', 'WooCommerce', 'Stripe', 'Mollie', 'Supabase', 'PostgreSQL'],
    pricing: {
      model: 'starting-from',
      fromEUR: 4999,
      typicalRangeEUR: [4999, 25000],
      noteNL: 'Webshops starten vanaf €4.999 excl. btw. De uiteindelijke investering hangt af van productomvang, gewenste koppelingen, checkoutcomplexiteit, meertaligheid en beheerwensen.',
      noteEN: 'Ecommerce projects start at €4,999 excl. VAT. Final investment depends on product volume, required integrations, checkout complexity, multilingual scope, and operational requirements.',
    },
    timeline: {
      typicalNL: 'Gemiddeld 6 tot 12 weken, afhankelijk van assortiment, integraties, content en testomvang.',
      typicalEN: 'Typically 6 to 12 weeks depending on catalogue size, integrations, content readiness, and testing scope.',
    },
    keywordsNL: ['webshop laten maken', 'e-commerce ontwikkeling', 'online winkel bouwen', 'betaalintegratie', 'product SEO', 'shopify development', 'woocommerce webshop'],
    keywordsEN: ['ecommerce development', 'webshop development', 'online store build', 'payment integrations', 'product SEO', 'Shopify development', 'WooCommerce build'],
    faqHooks: ['pricing', 'timeline', 'hosting', 'support', 'seo'],
  },
  {
    slug: 'saas-development',
    category: 'saas',
    titleNL: 'SaaS en maatwerk platformontwikkeling',
    titleEN: 'SaaS and custom platform development',
    shortDescriptionNL: 'Maatwerk portalen, dashboards en SaaS-oplossingen voor bedrijven die processen digitaal willen organiseren of schalen.',
    shortDescriptionEN: 'Custom portals, dashboards, and SaaS systems for businesses that want to digitise or scale internal or customer-facing processes.',
    fullDescriptionNL: 'Wanneer een standaard website niet genoeg is, ontwikkelt Qovre maatwerk platformen zoals klantportalen, dashboards, interne tools, reserveringssystemen, bedrijfsportalen en SaaS-producten. Hierbij staan gebruikersstromen, rechtenbeheer, datamodellen, performance en onderhoudbaarheid centraal.',
    fullDescriptionEN: 'When a standard website is not enough, Qovre develops custom platforms such as client portals, dashboards, internal tools, booking systems, operational portals, and SaaS products. User flows, permissions, data models, performance, and maintainability are handled as core architectural concerns.',
    audienceNL: ['Startups', 'scale-ups', 'dienstverleners', 'bedrijven met operationele processen', 'digitale productideeën'],
    audienceEN: ['Startups', 'scale-ups', 'service businesses', 'operations-heavy companies', 'digital product founders'],
    outcomesNL: ['Procesdigitalisering', 'centrale datastromen', 'betere operationele efficiëntie', 'schaalbaar digitaal product'],
    outcomesEN: ['Process digitisation', 'centralised data flows', 'improved operational efficiency', 'scalable digital product'],
    deliverablesNL: ['Technische scopebepaling', 'dashboard- en portalontwikkeling', 'gebruikersrollen', 'database-architectuur', 'API-integraties', 'MVP- of groeifase planning'],
    deliverablesEN: ['Technical scoping', 'dashboard and portal development', 'user roles', 'database architecture', 'API integrations', 'MVP or growth-phase planning'],
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'REST APIs', 'Authentication systems', 'Vercel', 'AWS'],
    pricing: {
      model: 'custom-quote',
      typicalRangeEUR: [5000, 50000],
      noteNL: 'SaaS- en maatwerkprojecten worden projectmatig geoffreerd. Indicatief starten kleinere MVP-trajecten vaak vanaf circa €5.000 excl. btw, oplopend afhankelijk van logica, rollen, koppelingen en productdoelen.',
      noteEN: 'SaaS and custom platform projects are quoted per project. Smaller MVP scopes often start around €5,000 excl. VAT and increase depending on logic, user roles, integrations, and product goals.',
    },
    timeline: {
      typicalNL: 'Sterk afhankelijk van scope. Een compacte MVP kan in enkele weken tot maanden gerealiseerd worden; uitgebreidere platformen vragen een gefaseerde aanpak.',
      typicalEN: 'Strongly scope-dependent. A compact MVP can be delivered within weeks to months, while larger platforms benefit from phased delivery.',
    },
    keywordsNL: ['SaaS ontwikkeling', 'maatwerk platform', 'klantportaal laten maken', 'dashboard ontwikkeling', 'bedrijfssysteem bouwen', 'MVP development'],
    keywordsEN: ['SaaS development', 'custom platform development', 'client portal development', 'dashboard build', 'business system development', 'MVP development'],
    faqHooks: ['pricing', 'timeline', 'technology', 'legal'],
  },
  {
    slug: 'ai-automation',
    category: 'automation',
    titleNL: 'AI automation en workflow automatisering',
    titleEN: 'AI automation and workflow automation',
    shortDescriptionNL: 'Automatiseringen voor bedrijven die repetitief werk, opvolging of informatieverwerking slimmer willen organiseren.',
    shortDescriptionEN: 'Automation systems for businesses that want to handle repetitive work, follow-up, or information processing more intelligently.',
    fullDescriptionNL: 'Qovre ontwikkelt automatiseringen voor leadopvolging, intakeverwerking, interne workflows, notificaties, contentprocessen en datastromen tussen systemen. Daarbij kijken we naar betrouwbaarheid, foutafhandeling, schaalbaarheid en de praktische impact op het bedrijf.',
    fullDescriptionEN: 'Qovre develops automation for lead handling, intake processing, internal workflows, notifications, content operations, and data flows between business systems. Reliability, error handling, scalability, and practical business impact are built into the solution design.',
    audienceNL: ['Dienstverleners', 'agencies', 'teams met veel handmatig werk', 'bedrijven die sneller willen opschalen'],
    audienceEN: ['Service businesses', 'agencies', 'teams with repetitive manual work', 'companies that want to scale more efficiently'],
    outcomesNL: ['Minder handmatig werk', 'snellere opvolging', 'betere gegevensstroom', 'meer consistente processen'],
    outcomesEN: ['Less manual work', 'faster follow-up', 'cleaner data flow', 'more consistent operations'],
    deliverablesNL: ['Workflow mapping', 'automatiseringslogica', 'integraties met formulieren en CRM-achtige processen', 'AI-verrijking waar relevant', 'testen en documentatie'],
    deliverablesEN: ['Workflow mapping', 'automation logic', 'integrations with forms and CRM-style processes', 'AI enrichment where relevant', 'testing and documentation'],
    technologies: ['OpenAI', 'Gemini', 'Claude', 'Custom APIs', 'Webhook-based automation', 'Supabase', 'Serverless functions'],
    pricing: {
      model: 'custom-quote',
      typicalRangeEUR: [1500, 15000],
      noteNL: 'Automatiseringen worden op maat geprijsd. De investering hangt af van het aantal workflows, integraties, foutafhandeling, AI-logica en onderhoudsvereisten.',
      noteEN: 'Automation projects are custom-priced. Investment depends on workflow count, integrations, failure handling, AI logic, and maintenance requirements.',
    },
    timeline: {
      typicalNL: 'Kleinere automatiseringen kunnen relatief snel worden opgeleverd; complexere procesautomatiseringen vragen analyse, testfases en afstemming.',
      typicalEN: 'Smaller automations can be delivered quickly, while larger process automations require analysis, testing, and stakeholder alignment.',
    },
    keywordsNL: ['AI automation', 'workflow automatisering', 'bedrijfsprocessen automatiseren', 'lead automation', 'formulier automatisering', 'AI integratie'],
    keywordsEN: ['AI automation', 'workflow automation', 'business process automation', 'lead automation', 'form automation', 'AI integration'],
    faqHooks: ['ai', 'technology', 'support'],
  },
  {
    slug: 'ai-chatbots',
    category: 'ai-chatbots',
    titleNL: 'AI chatbots en slimme assistenten',
    titleEN: 'AI chatbots and smart assistants',
    shortDescriptionNL: 'Klantgerichte AI-assistenten voor websites, intakeflows en servicegerichte communicatie.',
    shortDescriptionEN: 'Customer-facing AI assistants for websites, intake flows, and service-driven communication.',
    fullDescriptionNL: 'Een AI-chatbot is pas waardevol als deze betrouwbaar antwoordt, binnen de juiste grenzen blijft en gericht is op echte bedrijfsdoelen. Qovre ontwikkelt en configureert chatbots met duidelijke rolafbakening, intakepaden, verwijzingsregels, FAQ-logica en merkgebonden tone-of-voice.',
    fullDescriptionEN: 'An AI chatbot is only valuable when it answers reliably, stays within defined boundaries, and supports real business goals. Qovre designs and configures chatbots with role guardrails, intake paths, escalation rules, FAQ logic, and brand-aligned tone of voice.',
    audienceNL: ['Bedrijven met veel klantvragen', 'dienstverleners', 'leadgerichte websites', 'bedrijven die FAQ en intake willen automatiseren'],
    audienceEN: ['Businesses with recurring customer questions', 'service providers', 'lead-generation websites', 'teams that want to automate FAQ and intake'],
    outcomesNL: ['Betere bereikbaarheid', 'snellere eerste beantwoording', 'efficiëntere intake', 'meer consistente informatievoorziening'],
    outcomesEN: ['Improved availability', 'faster first response', 'more efficient intake', 'more consistent information delivery'],
    deliverablesNL: ['System prompt ontwerp', 'FAQ-structuur', 'grensregels en escalaties', 'integratie in websiteflow', 'doorverwijzing naar contact of e-mail'],
    deliverablesEN: ['System prompt design', 'FAQ structure', 'guardrails and escalation logic', 'integration into the website flow', 'handover to contact or email'],
    technologies: ['Gemini', 'OpenAI', 'Claude', 'Vector search patterns', 'Prompt orchestration', 'Next.js'],
    pricing: {
      model: 'custom-quote',
      typicalRangeEUR: [1500, 12000],
      noteNL: 'De prijs is afhankelijk van de inhoudelijke scope, het gewenste kennisniveau, het aantal scenario\'s, de integraties en het onderhoudsmodel.',
      noteEN: 'Pricing depends on content scope, required knowledge depth, scenario coverage, integrations, and the maintenance model.',
    },
    timeline: {
      typicalNL: 'Van compacte FAQ-bot tot uitgebreid intake- of service-assistent, afhankelijk van de benodigde kennisbasis en integraties.',
      typicalEN: 'From a compact FAQ bot to a broader intake or service assistant, depending on the knowledge base and integrations required.',
    },
    keywordsNL: ['AI chatbot laten maken', 'website chatbot', 'slimme assistent voor website', 'FAQ bot', 'lead chatbot'],
    keywordsEN: ['AI chatbot development', 'website chatbot', 'smart website assistant', 'FAQ bot', 'lead chatbot'],
    faqHooks: ['ai', 'pricing', 'technology'],
  },
  {
    slug: 'seo-geo-optimization',
    category: 'seo-geo',
    titleNL: 'SEO, GEO en technische vindbaarheid',
    titleEN: 'SEO, GEO, and technical discoverability',
    shortDescriptionNL: 'Technische en inhoudelijke optimalisatie voor zoekmachines én AI-systemen zoals ChatGPT en Gemini.',
    shortDescriptionEN: 'Technical and content optimisation for search engines and AI systems such as ChatGPT and Gemini.',
    fullDescriptionNL: 'Zichtbaarheid vraagt tegenwoordig meer dan alleen klassieke SEO. Qovre helpt bij metadata, structured data, contentstructuur, city pages, interne linking, FAQ-architectuur, llms.txt, indexeerbaarheid en machineleesbare context zodat een website beter presteert in zowel zoekresultaten als AI-antwoorden.',
    fullDescriptionEN: 'Visibility now requires more than traditional SEO alone. Qovre supports metadata, structured data, content architecture, city pages, internal linking, FAQ architecture, llms.txt, indexability, and machine-readable context so websites can perform better in both search results and AI-generated answers.',
    audienceNL: ['Lokale dienstverleners', 'B2B-bedrijven', 'bedrijven die organisch willen groeien', 'sites die beter indexeerbaar moeten worden'],
    audienceEN: ['Local service companies', 'B2B businesses', 'companies focused on organic growth', 'sites that need stronger indexability'],
    outcomesNL: ['Betere technische basis', 'duidelijkere contentstructuur', 'meer lokale relevantie', 'sterkere AI-leesbaarheid'],
    outcomesEN: ['Stronger technical foundation', 'clearer content structure', 'improved local relevance', 'better AI readability'],
    deliverablesNL: ['Metadata en titles', 'schema-markup', 'city landing strategie', 'FAQ-architectuur', 'llms.txt', 'sitemap- en indexeercontrole'],
    deliverablesEN: ['Metadata and titles', 'schema markup', 'city landing strategy', 'FAQ architecture', 'llms.txt', 'sitemap and indexation review'],
    technologies: ['Next.js metadata', 'Schema.org', 'sitemap generation', 'robots directives', 'LLM-readable content patterns'],
    pricing: {
      model: 'custom-quote',
      typicalRangeEUR: [1000, 8000],
      noteNL: 'SEO- en GEO-trajecten verschillen per website, bestaande contentbasis en ambitie. Nieuwe websites kunnen direct technisch goed worden ingericht; bestaande websites vragen vaak eerst een audit en herstructurering.',
      noteEN: 'SEO and GEO work varies by website, content maturity, and growth goal. New websites can be built correctly from the start, while existing sites often need an audit and restructuring first.',
    },
    timeline: {
      typicalNL: 'Afhankelijk van omvang kan dit variëren van een gerichte optimalisatieslag tot een bredere content- en structuurimplementatie over meerdere weken.',
      typicalEN: 'Depending on scope, this can range from a focused optimisation round to a broader multi-week content and structure implementation.',
    },
    keywordsNL: ['technische SEO', 'GEO optimalisatie', 'AI vindbaarheid', 'structured data', 'lokale SEO Nederland', 'llms.txt', 'city pages SEO'],
    keywordsEN: ['technical SEO', 'GEO optimisation', 'AI discoverability', 'structured data', 'local SEO Netherlands', 'llms.txt', 'city page SEO'],
    faqHooks: ['seo', 'technology'],
  },
  {
    slug: 'maintenance-support',
    category: 'maintenance',
    titleNL: 'Onderhoud, updates en doorontwikkeling',
    titleEN: 'Maintenance, updates, and ongoing development',
    shortDescriptionNL: 'Onderhouds- en updateafspraken voor websites en digitale systemen die actueel en betrouwbaar moeten blijven.',
    shortDescriptionEN: 'Maintenance and update support for websites and digital systems that need to remain current and reliable.',
    fullDescriptionNL: 'Na livegang stopt het werk meestal niet. Qovre biedt onderhoud, periodieke updates, technische nazorg, contentaanpassingen, jaarlijkse informatie-updates en bredere doorontwikkeling voor groeiende websites en systemen.',
    fullDescriptionEN: 'Work rarely stops after launch. Qovre offers maintenance, periodic updates, post-launch technical support, content adjustments, annual information updates, and wider iterative development for growing websites and systems.',
    audienceNL: ['Bedrijven die continuïteit willen', 'teams zonder interne developer', 'groeiende websites en platformen'],
    audienceEN: ['Businesses that need continuity', 'teams without internal developers', 'growing websites and platforms'],
    outcomesNL: ['Lagere technische achterstand', 'snellere correcties', 'actuele bedrijfsinformatie', 'betere continuïteit'],
    outcomesEN: ['Lower technical backlog', 'faster corrections', 'current business information', 'better continuity'],
    deliverablesNL: ['Periodieke controles', 'inhoudelijke updates', 'technische aanpassingen', 'kleine verbeteringen', 'advies over hosting en capaciteit'],
    deliverablesEN: ['Periodic checks', 'content updates', 'technical adjustments', 'small improvements', 'guidance on hosting and capacity'],
    technologies: ['Project-specific stack support', 'Performance monitoring', 'Hosting review', 'Content update workflows'],
    pricing: {
      model: 'custom-quote',
      typicalRangeEUR: [250, 5000],
      noteNL: 'Onderhoud wordt afgestemd op systeemtype, frequentie en gewenst serviceniveau. Denk aan periodieke controles, halfjaarlijkse onderhoudsmomenten of jaarlijkse informatie-updates.',
      noteEN: 'Maintenance is scoped according to system type, support frequency, and required service level. This may include periodic checks, biannual maintenance, or yearly information updates.',
    },
    timeline: {
      typicalNL: 'Doorlopend of op afgesproken onderhoudsmomenten.',
      typicalEN: 'Ongoing or scheduled around agreed maintenance windows.',
    },
    keywordsNL: ['website onderhoud', 'technische updates', 'website support', 'doorontwikkeling website', 'hosting support'],
    keywordsEN: ['website maintenance', 'technical updates', 'website support', 'ongoing development', 'hosting support'],
    faqHooks: ['support', 'hosting', 'legal'],
  },
];

export const TARGET_CITIES: CityLandingInfo[] = [
  {
    slug: 'amsterdam',
    city: 'Amsterdam',
    province: 'Noord-Holland',
    priority: 'tier-1',
    introNL: 'Qovre ondersteunt bedrijven in Amsterdam met schaalbare websites, webshops, SaaS-oplossingen en AI-gedreven automatiseringen. Voor organisaties in een concurrerende markt is het niet genoeg om alleen online aanwezig te zijn; techniek, snelheid, structuur en conversie moeten vanaf de basis kloppen. Daarom combineren we development, technische SEO, GEO en heldere contentarchitectuur in één traject. Amsterdamse bedrijven die sneller willen groeien, professioneler willen positioneren of slimmer willen automatiseren, hebben baat bij een technisch partner die zowel commercieel als uitvoerend meedenkt.',
    introEN: 'Qovre supports businesses in Amsterdam with scalable websites, ecommerce systems, SaaS platforms, and AI-driven automations. In a highly competitive market, online presence alone is not enough; performance, structure, speed, and conversion need to be built in from the start. That is why we combine development, technical SEO, GEO, and clear content architecture in one execution flow. Amsterdam-based companies that want to grow faster, position themselves more professionally, or automate operations more intelligently benefit from a technical partner that thinks commercially as well as technically.',
    localSignalsNL: ['Sterke focus op meertalige positionering voor zowel Nederlandse als internationale doelgroepen.', 'Geschikt voor dienstverleners, startups, consultants, agencies en groeiende ecommerce merken.', 'Technische keuzes worden afgestemd op schaalbaarheid, performance en uitbreidbaarheid.', 'Lokale SEO en city-landing structuur helpen bij betere regionale vindbaarheid.', 'AI-implementaties kunnen worden ingericht voor intake, service of leadopvolging.'],
    localSignalsEN: ['Strong focus on multilingual positioning for both Dutch and international audiences.', 'Suitable for service businesses, startups, consultants, agencies, and growing ecommerce brands.', 'Technical decisions are aligned with scalability, performance, and future extensibility.', 'Local SEO and city-landing structures support stronger regional discoverability.', 'AI implementations can be configured for intake, service, or lead handling.'],
  },
  {
    slug: 'rotterdam',
    city: 'Rotterdam',
    province: 'Zuid-Holland',
    priority: 'tier-1',
    introNL: 'Voor bedrijven in Rotterdam ontwikkelt Qovre digitale systemen die snelheid, duidelijkheid en groei ondersteunen. Of het nu gaat om een moderne bedrijfswebsite, een conversion-gerichte webshop of een intern platform, de technische opzet moet de bedrijfsdoelen direct ondersteunen. Rotterdamse ondernemingen hebben vaak baat bij een resultaatgerichte aanpak waarin design, structuur, performance en vindbaarheid samenkomen. Qovre helpt met een fundament dat professioneel oogt, goed indexeerbaar is en klaar is om mee te groeien met de organisatie.',
    introEN: 'For businesses in Rotterdam, Qovre develops digital systems that support speed, clarity, and growth. Whether the need is a modern business website, a conversion-oriented webshop, or an internal platform, the technical setup must directly serve business goals. Rotterdam-based companies often benefit from a results-driven approach where design, structure, performance, and discoverability work together. Qovre builds foundations that look professional, index well, and are ready to grow with the organisation.',
    localSignalsNL: ['Geschikt voor logistieke, zakelijke, creatieve en commerciële bedrijven.', 'Sterke nadruk op technische kwaliteit en snelle realisatie zonder rommelige scope.', 'Lokale en nationale vindbaarheid kunnen tegelijk worden meegenomen.', 'Formulieren, intakeflows en opvolgautomatisering zijn inzetbaar voor leadgedreven bedrijven.', 'Onderhoud en doorontwikkeling blijven mogelijk na livegang.'],
    localSignalsEN: ['Well suited for logistics, commercial, creative, and service-focused businesses.', 'Strong emphasis on technical quality and efficient delivery without scope chaos.', 'Local and national discoverability can be addressed in the same build.', 'Forms, intake flows, and lead follow-up automation are available for lead-driven businesses.', 'Maintenance and iterative development remain possible after launch.'],
  },
  {
    slug: 'den-haag',
    city: 'Den Haag',
    province: 'Zuid-Holland',
    priority: 'tier-1',
    introNL: 'Qovre opereert vanuit Den Haag en ondersteunt bedrijven in de regio met websites, platforms, AI-assistenten en technische groeistrategie. Voor ondernemers en organisaties in Den Haag is een professionele digitale basis essentieel om vertrouwen op te bouwen, aanvragen te structureren en online beter zichtbaar te zijn. Wij combineren technische uitvoering met zakelijke logica, zodat een project niet alleen mooi wordt, maar ook functioneel sterk staat. Door de focus op performance, SEO, GEO en schaalbaarheid ontstaat een systeem dat klaar is voor duurzame groei.',
    introEN: 'Qovre operates from The Hague and supports businesses in the region with websites, platforms, AI assistants, and technical growth strategy. For companies and professionals in The Hague, a professional digital foundation is essential to build trust, structure enquiries, and improve online visibility. We combine technical execution with business logic so a project is not only visually strong, but functionally effective. With an emphasis on performance, SEO, GEO, and scalability, the result is a system built for sustainable growth.',
    localSignalsNL: ['Regionale aanwezigheid gecombineerd met remote werkwijze in heel Nederland.', 'Passend voor lokale bedrijven, dienstverleners, praktijken en groeiende organisaties.', 'Koppeling van branding, technische uitvoering en vindbaarheid in één traject.', 'WhatsApp en e-mailgestuurde intake voor snelle eerste afstemming.', 'Geschikt voor zowel eenvoudige websites als complexere maatwerkoplossingen.'],
    localSignalsEN: ['Regional presence combined with a remote delivery model across the Netherlands.', 'Suitable for local businesses, service firms, practices, and growing organisations.', 'Branding, technical delivery, and discoverability can be combined in one project path.', 'WhatsApp and email-led intake support fast first alignment.', 'Suitable for both straightforward websites and more advanced custom builds.'],
  },
  {
    slug: 'utrecht',
    city: 'Utrecht',
    province: 'Utrecht',
    priority: 'tier-1',
    introNL: 'Bedrijven in Utrecht die digitaal willen professionaliseren of processen slimmer willen inrichten, hebben vaak meer nodig dan een standaard website. Qovre ontwikkelt schaalbare online oplossingen die bijdragen aan vertrouwen, leadopvolging, informatiearchitectuur en groeiklaar beheer. Voor Utrechtse organisaties met ambities in dienstverlening, software of online zichtbaarheid betekent dit een combinatie van ontwikkeling, SEO, GEO en automatisering. Het resultaat is een technische basis die niet alleen nu werkt, maar ook later uitbreidbaar blijft.',
    introEN: 'Businesses in Utrecht that want to professionalise digitally or organise workflows more intelligently often need more than a standard website. Qovre builds scalable online systems that improve trust, lead handling, information architecture, and long-term maintainability. For Utrecht-based organisations with ambitions in services, software, or online growth, this means a combination of development, SEO, GEO, and automation. The result is a technical foundation that works now and remains extendable later.',
    localSignalsNL: ['Sterk inzetbaar voor consultancy, B2B-dienstverlening, SaaS en kennisintensieve bedrijven.', 'Heldere contentstructuur ondersteunt zowel gebruikers als zoekmachines.', 'Technische keuzes zijn gericht op groei, onderhoudbaarheid en meertaligheid.', 'Slimme formulieren en intakeprocessen kunnen onderdeel van de oplossing zijn.', 'Geschikt voor organisaties die online professioneler en consistenter willen opereren.'],
    localSignalsEN: ['Well suited to consultancy, B2B service businesses, SaaS teams, and knowledge-led organisations.', 'Clear content structure supports both users and search systems.', 'Technical decisions focus on growth, maintainability, and multilingual use cases.', 'Smart forms and intake logic can be built into the solution.', 'Ideal for organisations that want to operate more professionally and consistently online.'],
  },
  {
    slug: 'eindhoven',
    city: 'Eindhoven',
    province: 'Noord-Brabant',
    priority: 'tier-1',
    introNL: 'In Eindhoven helpt Qovre bedrijven die technisch vooruit willen met websites, productgedreven platforms en automatiseringen die schaalbaar zijn opgezet. In een regio waar innovatie, technologie en specialisatie centraal staan, is een generieke online oplossing zelden voldoende. Daarom richten we ons op structuur, performance, contentlogica en uitbreidbaarheid. Bedrijven in Eindhoven die hun digitale aanwezigheid strategischer willen inzetten, profiteren van een aanpak die techniek aan bedrijfsdoelen koppelt.',
    introEN: 'In Eindhoven, Qovre supports businesses that want technically stronger websites, product-driven platforms, and automation systems built for scale. In a region shaped by innovation, technology, and specialisation, generic online solutions are rarely enough. That is why we focus on structure, performance, content logic, and extensibility. Eindhoven-based companies that want to use their digital presence more strategically benefit from an approach that ties technical architecture directly to business goals.',
    localSignalsNL: ['Passend voor technische bedrijven, innovatieve dienstverleners en productgerichte teams.', 'Schaalbaarheid en uitbreidbaarheid krijgen voorrang boven kortetermijnoplossingen.', 'Websites, SaaS en AI-automatisering kunnen in één ecosysteem worden opgezet.', 'Geschikt voor meertalige en internationaal georiënteerde proposities.', 'Technische SEO en machineleesbare content verbeteren structurele vindbaarheid.'],
    localSignalsEN: ['Well suited to technical companies, innovative service firms, and product-led teams.', 'Scalability and extensibility take priority over short-term shortcuts.', 'Websites, SaaS tools, and AI automation can be built into one digital ecosystem.', 'Suitable for multilingual and internationally oriented propositions.', 'Technical SEO and machine-readable content improve long-term discoverability.'],
  },
  {
    slug: 'groningen',
    city: 'Groningen',
    province: 'Groningen',
    priority: 'tier-2',
    introNL: 'Qovre ondersteunt bedrijven in Groningen met websites, webshops en digitale systemen die professioneel ogen en technisch goed zijn opgebouwd. Voor organisaties die hun online zichtbaarheid willen vergroten of processen willen digitaliseren, is een heldere technische basis cruciaal. Wij zorgen voor structuur, snelheid, inhoudelijke logica en een vindbare opzet. Zo ontstaat een oplossing die vertrouwen uitstraalt en beter presteert in zoekmachines en AI-gedreven interfaces.',
    introEN: 'Qovre supports businesses in Groningen with websites, ecommerce systems, and digital platforms that are professionally presented and technically well structured. For organisations that want to improve online visibility or digitise workflows, a clear technical foundation is essential. We focus on structure, speed, content logic, and discoverable architecture. The result is a system that builds trust and performs better in search engines and AI-driven interfaces.',
    localSignalsNL: ['Geschikt voor lokale bedrijven en regionaal opererende dienstverleners.', 'Meertalige sites en duidelijke structuur ondersteunen bredere online positionering.', 'SEO, GEO en schaalbare contentarchitectuur worden vanaf het begin meegenomen.', 'Ook geschikt voor leadgerichte websites met intakeflows en opvolging.', 'Onderhoud en doorontwikkeling zijn later mogelijk.'],
    localSignalsEN: ['Suitable for local businesses and regionally operating service providers.', 'Multilingual sites and clear structure support wider digital positioning.', 'SEO, GEO, and scalable content architecture are included from the start.', 'Also suitable for lead-focused websites with intake flows and follow-up logic.', 'Maintenance and future development remain possible later on.'],
  },
  {
    slug: 'tilburg',
    city: 'Tilburg',
    province: 'Noord-Brabant',
    priority: 'tier-2',
    introNL: 'Voor bedrijven in Tilburg ontwikkelt Qovre websites en digitale oplossingen die niet alleen presentabel zijn, maar ook commercieel en technisch sterker presteren. We helpen organisaties die hun diensten duidelijker willen tonen, beter gevonden willen worden of hun processen slimmer willen inrichten. Daarbij combineren we ontwerp, techniek, SEO en eventuele automatiseringen tot één samenhangend systeem. Dat maakt de oplossing bruikbaar op de korte termijn en schaalbaar op de langere termijn.',
    introEN: 'For businesses in Tilburg, Qovre develops websites and digital systems that are not only presentable, but commercially and technically stronger. We support organisations that want to present services more clearly, improve discoverability, or organise processes more intelligently. Design, technology, SEO, and automation are combined into one coherent system. That makes the solution useful in the short term and scalable over the longer term.',
    localSignalsNL: ['Ideaal voor dienstverleners, e-commerce ondernemers en groeiende bedrijven.', 'Geschikt voor lokale SEO-doelen én bredere landelijke zichtbaarheid.', 'Goede basis voor contactaanvragen, offerteverzoeken en digitale intake.', 'Hostingadvies en onderhoud kunnen worden meegenomen.', 'Duidelijke technische structuur voorkomt onnodige herbouw later.'],
    localSignalsEN: ['Ideal for service businesses, ecommerce operators, and growing companies.', 'Suitable for local SEO goals as well as wider national visibility.', 'Strong foundation for contact enquiries, quote requests, and digital intake.', 'Hosting guidance and maintenance can be included.', 'A clear technical structure helps avoid unnecessary rebuilds later.'],
  },
  {
    slug: 'almere',
    city: 'Almere',
    province: 'Flevoland',
    priority: 'tier-2',
    introNL: 'Qovre helpt bedrijven in Almere met moderne websites, platforms en automatiseringen die een professionele basis leggen voor online groei. Een sterke digitale oplossing moet meer doen dan informatie tonen; deze moet vertrouwen opbouwen, aanvragen structureren en operationeel logisch zijn. Daarom werken we met schaalbare technologie, technische SEO en duidelijke contentarchitectuur. Voor Almere betekent dit een digitale basis die klaar is voor zowel zichtbaarheid als uitbreiding.',
    introEN: 'Qovre helps businesses in Almere with modern websites, platforms, and automation systems that create a strong foundation for online growth. A good digital solution should do more than display information; it should build trust, structure enquiries, and function operationally. That is why we work with scalable technology, technical SEO, and clear content architecture. For businesses in Almere, that means a foundation built for both discoverability and expansion.',
    localSignalsNL: ['Geschikt voor jonge bedrijven, lokale ondernemers en groeiende dienstverleners.', 'Website, automation en AI kunnen gecombineerd worden in één traject.', 'Technische vindbaarheid is belangrijk voor regionale zichtbaarheid en vertrouwen.', 'Inzetbaar voor zowel eenvoudige websites als meer functionele portalen.', 'Meertaligheid is mogelijk waar relevant.'],
    localSignalsEN: ['Suitable for newer companies, local businesses, and growing service providers.', 'Websites, automation, and AI can be combined in one implementation path.', 'Technical discoverability matters for regional visibility and trust.', 'Applicable to both straightforward websites and more functional portals.', 'Multilingual support is available where relevant.'],
  },
  {
    slug: 'breda',
    city: 'Breda',
    province: 'Noord-Brabant',
    priority: 'tier-2',
    introNL: 'Bedrijven in Breda die online professioneler willen opereren, kunnen met Qovre werken aan websites en digitale systemen die zowel visueel sterk als technisch betrouwbaar zijn. We bouwen oplossingen die meedenken met leadgeneratie, klantvertrouwen, zoekmachinezichtbaarheid en toekomstige groei. Daardoor ontstaat een fundament dat niet snel veroudert en beter aansluit op echte bedrijfsprocessen. Breda profiteert van een aanpak waarin techniek en zakelijke logica samenkomen.',
    introEN: 'Businesses in Breda that want to operate more professionally online can work with Qovre on websites and digital systems that are visually strong and technically reliable. We build solutions that support lead generation, customer trust, search visibility, and future growth. The result is a foundation that does not age quickly and aligns better with real business processes. Breda benefits from an approach where technology and commercial logic work together.',
    localSignalsNL: ['Sterk voor lokale dienstverlening, retail en merkgedreven websites.', 'Technische SEO en city-content dragen bij aan bredere online zichtbaarheid.', 'Formulieren en intakeflows kunnen commerciële opvolging verbeteren.', 'Hosting en onderhoud worden afgestemd op projecttype en verkeer.', 'Geschikt voor Nederlandstalige en Engelstalige proposities.'],
    localSignalsEN: ['Strong fit for local services, retail, and brand-led websites.', 'Technical SEO and city content support broader digital visibility.', 'Forms and intake flows can improve commercial follow-up.', 'Hosting and maintenance are matched to project type and traffic.', 'Suitable for both Dutch and English market propositions.'],
  },
  {
    slug: 'nijmegen',
    city: 'Nijmegen',
    province: 'Gelderland',
    priority: 'tier-2',
    introNL: 'Qovre ontwikkelt voor bedrijven in Nijmegen websites en digitale oplossingen die inhoudelijk duidelijk, technisch sterk en toekomstgericht zijn opgebouwd. Voor organisaties die beter gevonden willen worden of processen slimmer willen inrichten, helpt een schaalbare digitale basis direct mee. Wij combineren development met technische SEO, heldere structuur en praktische automatisering waar nodig. Dat maakt de oplossing waardevoller dan een losse designlaag alleen.',
    introEN: 'Qovre develops websites and digital systems for businesses in Nijmegen that are clear in content, strong in technical execution, and built with future growth in mind. For organisations that want to improve discoverability or work more intelligently, a scalable digital foundation immediately adds value. We combine development with technical SEO, clear structure, and practical automation where relevant. That makes the solution more valuable than design alone.',
    localSignalsNL: ['Passend voor zorg, dienstverlening, onderwijsgerelateerde en zakelijke proposities.', 'Heldere informatiearchitectuur ondersteunt vertrouwen en conversie.', 'SEO en GEO maken de site beter leesbaar voor zowel mensen als systemen.', 'Maatwerk en standaardtrajecten zijn beide mogelijk, afhankelijk van behoefte.', 'Nazorg en updates kunnen na livegang worden ingericht.'],
    localSignalsEN: ['Suitable for healthcare-adjacent, service-based, education-related, and business-facing propositions.', 'Clear information architecture supports trust and conversion.', 'SEO and GEO improve readability for both people and systems.', 'Both custom and more standardised project paths are possible, depending on need.', 'Post-launch support and updates can be arranged.'],
  },
  {
    slug: 'haarlem',
    city: 'Haarlem',
    province: 'Noord-Holland',
    priority: 'tier-2',
    introNL: 'Voor bedrijven in Haarlem levert Qovre websites, webshops en digitale structuren die klaar zijn voor zichtbaarheid, betrouwbaarheid en groei. Een sterke website is vandaag niet alleen een visitekaartje, maar ook een kanaal voor vertrouwen, intake en commerciële opvolging. Daarom richten we ons op techniek, contentlogica, performance en onderhoudbaarheid. Haarlemse bedrijven profiteren van een aanpak die professioneel oogt en tegelijk praktisch inzetbaar blijft.',
    introEN: 'For businesses in Haarlem, Qovre delivers websites, ecommerce systems, and digital structures that are ready for visibility, trust, and growth. A strong website today is not just a digital business card; it is also a channel for trust, intake, and commercial follow-up. That is why we focus on technical execution, content logic, performance, and maintainability. Businesses in Haarlem benefit from an approach that looks professional and remains operationally useful.',
    localSignalsNL: ['Geschikt voor creatieve bedrijven, lokale dienstverleners en premium merken.', 'Meertalige en conversiegerichte opzet ondersteunt bredere positionering.', 'City-content en FAQ-structuur verbeteren lokale vindbaarheid.', 'Ook inzetbaar voor AI-chatbots en intake-automatisering.', 'Hosting kan worden afgestemd op benodigde capaciteit.'],
    localSignalsEN: ['Suitable for creative businesses, local service providers, and premium brands.', 'Multilingual and conversion-oriented structures support stronger positioning.', 'City content and FAQ architecture improve local discoverability.', 'Also suitable for AI chatbots and intake automation.', 'Hosting can be matched to the required capacity.'],
  },
  {
    slug: 'arnhem',
    city: 'Arnhem',
    province: 'Gelderland',
    priority: 'tier-2',
    introNL: 'Qovre ondersteunt bedrijven in Arnhem die hun online aanwezigheid willen versterken met websites, webshops of maatwerk digitale oplossingen. We bouwen systemen die sneller laden, beter leesbaar zijn voor zoekmachines en AI-platformen, en duidelijker aansluiten op de klantreis. Door techniek en bedrijfsdoelstellingen met elkaar te verbinden, ontstaat een oplossing die niet alleen mooi is, maar ook functioneel sterk staat. Arnhemse bedrijven krijgen zo een fundament dat met hen kan meegroeien.',
    introEN: 'Qovre supports businesses in Arnhem that want stronger websites, ecommerce solutions, or custom digital systems. We build systems that load faster, are easier for search engines and AI platforms to interpret, and align more clearly with the customer journey. By connecting technical execution to business objectives, the result becomes more than a visually pleasing site; it becomes a functional growth asset. Businesses in Arnhem gain a foundation that can scale with them.',
    localSignalsNL: ['Geschikt voor organisaties die meer structuur in online leads en communicatie willen.', 'SEO, performance en duidelijke navigatie worden vanaf de basis meegenomen.', 'Praktische automatisering kan tijd besparen in intake en opvolging.', 'Passend voor zowel lokale als landelijk opererende bedrijven.', 'Onderhoud en updates blijven beschikbaar na oplevering.'],
    localSignalsEN: ['Suitable for organisations that need more structure in online leads and communication.', 'SEO, performance, and clear navigation are built in from the start.', 'Practical automation can save time in intake and follow-up.', 'Suitable for both local and nationally operating businesses.', 'Maintenance and updates remain available after delivery.'],
  },
  {
    slug: 'apeldoorn',
    city: 'Apeldoorn',
    province: 'Gelderland',
    priority: 'tier-2',
    introNL: 'Bedrijven in Apeldoorn kunnen met Qovre werken aan digitale oplossingen die betrouwbaarheid, schaalbaarheid en professionele positionering ondersteunen. Wij bouwen websites en systemen die niet alleen visueel sterk zijn, maar ook logisch, onderhoudbaar en vindbaar zijn opgezet. Dat is relevant voor bedrijven die online serieuzer willen opereren of processen willen stroomlijnen. Het resultaat is een oplossing die beter aansluit op echte bedrijfsbehoeften en toekomstige groei.',
    introEN: 'Businesses in Apeldoorn can work with Qovre on digital systems that support reliability, scalability, and professional positioning. We build websites and platforms that are not only visually strong, but logically structured, maintainable, and discoverable. That matters for organisations that want to operate more seriously online or streamline internal processes. The result is a solution that aligns better with real business needs and future growth.',
    localSignalsNL: ['Geschikt voor dienstverleners, lokale ondernemingen en organisaties met groeiplannen.', 'Sterke basis voor offerteaanvragen, contactstromen en meertalige informatie.', 'Technische SEO en duidelijke contentstructuur versterken online zichtbaarheid.', 'Zowel standaard websites als maatwerk zijn mogelijk.', 'Hosting en onderhoud worden afgestemd op gebruik en verkeer.'],
    localSignalsEN: ['Suitable for service firms, local businesses, and organisations with growth plans.', 'Strong base for quote requests, contact flows, and multilingual information.', 'Technical SEO and clear content structure strengthen visibility online.', 'Both standard websites and custom builds are available.', 'Hosting and maintenance are matched to use case and traffic.'],
  },
  {
    slug: 'enschede',
    city: 'Enschede',
    province: 'Overijssel',
    priority: 'tier-2',
    introNL: 'Voor bedrijven in Enschede ontwikkelt Qovre digitale systemen die bijdragen aan betere online zichtbaarheid, meer structuur in communicatie en een sterker technisch fundament. Of het nu gaat om een website, een webshop of een intern platform, de oplossing moet bedrijfsmatig kloppen. Daarom denken we mee over structuur, technologie, SEO, GEO en schaalbaarheid. Enschede profiteert van een digitale aanpak die praktisch, professioneel en groeigericht is.',
    introEN: 'For businesses in Enschede, Qovre develops digital systems that improve online visibility, communication structure, and overall technical strength. Whether the need is a website, an ecommerce system, or an internal platform, the solution should make business sense. That is why we address structure, technology, SEO, GEO, and scalability together. Businesses in Enschede benefit from a digital approach that is practical, professional, and growth-oriented.',
    localSignalsNL: ['Passend voor innovatieve bedrijven, dienstverleners en regionale spelers.', 'Meertalige websites zijn mogelijk voor bredere marktbenadering.', 'City SEO en machineleesbare content ondersteunen moderne vindbaarheid.', 'Automatisering kan intake en interne workflows versnellen.', 'Ondersteuning blijft mogelijk na lancering.'],
    localSignalsEN: ['Suitable for innovative businesses, service providers, and regional operators.', 'Multilingual websites are available for broader market reach.', 'City SEO and machine-readable content support modern discoverability.', 'Automation can speed up intake and internal workflows.', 'Support remains available after launch.'],
  },
  {
    slug: 'zwolle',
    city: 'Zwolle',
    province: 'Overijssel',
    priority: 'tier-2',
    introNL: 'Qovre helpt bedrijven in Zwolle met websites en digitale oplossingen die niet alleen goed gepresenteerd zijn, maar ook zakelijk effectief werken. We bouwen aan structuur, snelheid, intake, zichtbaarheid en uitbreidbaarheid, zodat het eindresultaat meer is dan een online folder. Voor bedrijven in Zwolle die willen groeien of digitaliseren, is een solide technische basis essentieel. Die basis bouwen we met focus op performance, vindbaarheid en lange termijn bruikbaarheid.',
    introEN: 'Qovre helps businesses in Zwolle with websites and digital systems that are not only well presented, but commercially effective. We build for structure, speed, intake, visibility, and extensibility, so the final result is more than an online brochure. For companies in Zwolle that want to grow or digitise, a solid technical foundation is essential. We build that foundation with a focus on performance, discoverability, and long-term usability.',
    localSignalsNL: ['Geschikt voor lokale ondernemers, zakelijke dienstverleners en groeiende teams.', 'Goede basis voor SEO, GEO en conversiegerichte content.', 'Formulieren, aanvraagflows en opvolglogica kunnen worden geïntegreerd.', 'Hosting en onderhoud zijn op aanvraag beschikbaar.', 'Technische keuzes houden rekening met toekomstige uitbreiding.'],
    localSignalsEN: ['Suitable for local entrepreneurs, professional service firms, and growing teams.', 'Strong foundation for SEO, GEO, and conversion-oriented content.', 'Forms, enquiry flows, and follow-up logic can be integrated.', 'Hosting and maintenance are available on request.', 'Technical choices account for future expansion.'],
  },
  {
    slug: 'maastricht',
    city: 'Maastricht',
    province: 'Limburg',
    priority: 'tier-2',
    introNL: 'Voor bedrijven in Maastricht ontwikkelt Qovre websites en platforms die professioneel ogen, goed vindbaar zijn en helder aansluiten op de klantreis. Wanneer een organisatie zich sterker wil positioneren of digitaler wil werken, moet de technische basis vanaf het begin goed worden ingericht. Dat betekent aandacht voor performance, contentstructuur, SEO, GEO en eventueel meertaligheid. Maastricht krijgt daarmee een digitale oplossing die vertrouwen opbouwt en meegroeit met de organisatie.',
    introEN: 'For businesses in Maastricht, Qovre develops websites and platforms that look professional, are well positioned for discoverability, and align clearly with the customer journey. When an organisation wants to position itself more strongly or work more digitally, the technical foundation needs to be set up correctly from the start. That means attention to performance, content architecture, SEO, GEO, and where relevant, multilingual delivery. Maastricht gains a digital solution that builds trust and grows with the organisation.',
    localSignalsNL: ['Sterk voor organisaties met zowel Nederlandse als internationale doelgroepen.', 'Geschikt voor dienstverleners, hospitality-gerelateerde concepten en merken.', 'Contentstructuur en meertaligheid versterken markttoegang.', 'AI-assistenten kunnen worden ingezet voor intake of servicevragen.', 'Nazorg en uitbreidingen kunnen gefaseerd worden opgepakt.'],
    localSignalsEN: ['Strong fit for organisations serving both Dutch and international audiences.', 'Suitable for service providers, hospitality-adjacent concepts, and brands.', 'Content structure and multilingual execution improve market reach.', 'AI assistants can be used for intake or service queries.', 'Post-launch development can be handled in phases.'],
  },
  {
    slug: 'leiden',
    city: 'Leiden',
    province: 'Zuid-Holland',
    priority: 'tier-2',
    introNL: 'Qovre ondersteunt bedrijven in Leiden met digitale oplossingen die een professionele uitstraling combineren met technische diepgang. Een goede website of digitaal platform moet helder communiceren, snel laden, goed vindbaar zijn en bruikbaar blijven naarmate een organisatie groeit. Daarom werken we vanuit structuur, schaalbaarheid en onderhoudbaarheid. Bedrijven in Leiden krijgen zo een oplossing die zowel vandaag als morgen waarde blijft leveren.',
    introEN: 'Qovre supports businesses in Leiden with digital solutions that combine professional presentation with technical depth. A good website or digital platform should communicate clearly, load quickly, rank well, and remain useful as an organisation grows. That is why we work from a foundation of structure, scalability, and maintainability. Businesses in Leiden gain a system that continues to deliver value both today and tomorrow.',
    localSignalsNL: ['Passend voor kennisintensieve dienstverleners, praktijken en ondernemingen.', 'Technische SEO, FAQ-structuur en city-content versterken online bereik.', 'Inzetbaar voor websites, maatwerktools en chatbot-oplossingen.', 'Contact- en intakeflows kunnen slim worden ingericht.', 'Geschikt voor remote samenwerking en gefaseerde uitvoering.'],
    localSignalsEN: ['Suitable for knowledge-led service firms, practices, and commercial organisations.', 'Technical SEO, FAQ architecture, and city content strengthen reach.', 'Applicable to websites, custom tools, and chatbot implementations.', 'Contact and intake flows can be designed intelligently.', 'Well suited to remote collaboration and phased execution.'],
  },
  {
    slug: 'delft',
    city: 'Delft',
    province: 'Zuid-Holland',
    priority: 'tier-2',
    introNL: 'In Delft helpt Qovre bedrijven die hun digitale basis willen professionaliseren met websites, platforms en automatiseringen die technisch sterk en zakelijk bruikbaar zijn. We richten ons op oplossingen die schaalbaar zijn, goed vindbaar zijn en logisch aansluiten op het bedrijfsproces. Dat betekent meer dan alleen design: ook performance, informatiearchitectuur en technische keuzes tellen mee. Voor bedrijven in Delft levert dat een fundament op waarop verder gebouwd kan worden.',
    introEN: 'In Delft, Qovre helps businesses professionalise their digital foundation through websites, platforms, and automation systems that are technically strong and commercially useful. We focus on solutions that are scalable, discoverable, and logically connected to the business process. That means more than design alone: performance, information architecture, and technical decisions all matter. Businesses in Delft gain a foundation they can continue building on.',
    localSignalsNL: ['Geschikt voor technologiegedreven bedrijven en specialistische dienstverlening.', 'SaaS, websites en AI-oplossingen kunnen gecombineerd worden.', 'Technische documentatie en onderhoudbaarheid worden serieus meegenomen.', 'Lokale zichtbaarheid en landelijke positionering sluiten elkaar niet uit.', 'Projecten kunnen gefaseerd worden uitgerold afhankelijk van budget en scope.'],
    localSignalsEN: ['Suitable for technology-led businesses and specialised service providers.', 'SaaS, websites, and AI solutions can be combined where relevant.', 'Technical documentation and maintainability are taken seriously.', 'Local visibility and national positioning can be pursued together.', 'Projects can be phased according to budget and scope.'],
  },
  {
    slug: 'zoetermeer',
    city: 'Zoetermeer',
    province: 'Zuid-Holland',
    priority: 'tier-2',
    introNL: 'Qovre levert in Zoetermeer websites en digitale oplossingen die gericht zijn op professionele uitstraling, duidelijke communicatie en technische betrouwbaarheid. Voor bedrijven die meer aanvragen willen genereren of hun online proces willen stroomlijnen, is een logische digitale basis essentieel. Wij helpen met structuur, SEO, GEO, formulieren, automatisering en onderhoudbaarheid. Zo ontstaat een systeem dat niet alleen mooi is bij oplevering, maar ook bruikbaar blijft naarmate het bedrijf groeit.',
    introEN: 'Qovre delivers websites and digital systems in Zoetermeer that focus on professional presentation, clear communication, and technical reliability. For businesses that want more enquiries or a more structured digital process, a logical foundation is essential. We support with structure, SEO, GEO, forms, automation, and maintainability. The result is a system that is not only attractive at launch, but remains useful as the business grows.',
    localSignalsNL: ['Sterk voor dienstverleners, lokale bedrijven en regionale ondernemers.', 'SEO en city-content helpen de site beter regionaal te positioneren.', 'Contact- en offertetrajecten kunnen worden vereenvoudigd met slimme formulieren.', 'Hostingadvies wordt afgestemd op verwacht verkeer en functionaliteit.', 'Ook geschikt voor meertalige websites.'],
    localSignalsEN: ['Strong fit for service businesses, local companies, and regional entrepreneurs.', 'SEO and city content help position the site more strongly in the region.', 'Contact and quotation paths can be simplified through smart forms.', 'Hosting advice is matched to expected traffic and functionality.', 'Also suitable for multilingual websites.'],
  },
  {
    slug: 'amersfoort',
    city: 'Amersfoort',
    province: 'Utrecht',
    priority: 'tier-2',
    introNL: 'Bedrijven in Amersfoort die hun online positie willen versterken, kunnen met Qovre werken aan websites en digitale oplossingen die zowel commercieel als technisch goed zijn opgebouwd. We bouwen systemen die duidelijk communiceren, goed indexeerbaar zijn en voorbereid zijn op latere uitbreiding. Dat is relevant voor bedrijven die nu professioneel willen overkomen én straks niet opnieuw willen beginnen. In Amersfoort betekent dat een digitale basis die vertrouwen, structuur en schaalbaarheid ondersteunt.',
    introEN: 'Businesses in Amersfoort that want to strengthen their online position can work with Qovre on websites and digital systems that are commercially and technically well built. We create systems that communicate clearly, index well, and are ready for later expansion. That matters for companies that want to look professional now without rebuilding everything later. In Amersfoort, that means a digital foundation built for trust, structure, and scalability.',
    localSignalsNL: ['Passend voor B2B-bedrijven, lokale ondernemers en groeiende teams.', 'Meertalige opzet en technische SEO ondersteunen bredere zichtbaarheid.', 'Goede basis voor leadgeneratie, intake en servicegerichte communicatie.', 'Websites en maatwerkoplossingen kunnen gefaseerd worden ontwikkeld.', 'Onderhoud en updates blijven mogelijk na livegang.'],
    localSignalsEN: ['Suitable for B2B companies, local businesses, and growing teams.', 'Multilingual setup and technical SEO support broader visibility.', 'Strong foundation for lead generation, intake, and service communication.', 'Websites and custom systems can be developed in phases.', 'Maintenance and updates remain available after launch.'],
  },
  {
    slug: 'leeuwarden',
    city: 'Leeuwarden',
    province: 'Friesland',
    priority: 'tier-2',
    introNL: 'Qovre helpt bedrijven in Leeuwarden met websites en digitale oplossingen die professioneel ogen, sneller laden en beter passen bij moderne zoek- en AI-omgevingen. Wanneer een bedrijf online sterker wil staan, is een goede technische basis net zo belangrijk als het visuele deel. Daarom werken we met performance, structuur, SEO en duidelijke contentlogica. Leeuwarden krijgt zo een oplossing die betrouwbaarder, vindbaarder en schaalbaarder is.',
    introEN: 'Qovre helps businesses in Leeuwarden with websites and digital solutions that look professional, load faster, and fit modern search and AI environments more effectively. When a company wants a stronger digital position, technical quality matters as much as visual presentation. That is why we build around performance, structure, SEO, and clear content logic. Businesses in Leeuwarden gain a solution that is more reliable, discoverable, and scalable.',
    localSignalsNL: ['Geschikt voor lokale dienstverleners en regionaal actieve bedrijven.', 'Lokale SEO en heldere pagina-architectuur versterken organisch bereik.', 'Ook inzetbaar voor automatisering en slimme intake-oplossingen.', 'Meertaligheid kan worden toegevoegd waar relevant.', 'Praktisch onderhoud voorkomt verouderde informatie en technische achterstand.'],
    localSignalsEN: ['Suitable for local service businesses and regionally active companies.', 'Local SEO and clear page architecture strengthen organic reach.', 'Also applicable to automation and smart intake solutions.', 'Multilingual delivery can be added where relevant.', 'Practical maintenance helps prevent outdated information and technical debt.'],
  },
];

export const FAQ: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'pricing',
    questionNL: 'Wat kost een zakelijke website bij Qovre?',
    answerNL: "Zakelijke websites bij Qovre starten vanaf €3.000 excl. btw. De definitieve prijs hangt af van het aantal pagina\'s, contentbehoefte, functionaliteiten, meertaligheid en eventuele integraties.",
    questionEN: 'How much does a business website cost at Qovre?',
    answerEN: 'Business websites at Qovre start from €3,000 excl. VAT. Final pricing depends on page count, content requirements, functionality, multilingual scope, and integrations.',
  },
  {
    id: 'faq-02',
    category: 'pricing',
    questionNL: 'Wat kost een webshop of e-commerce project?',
    answerNL: 'Webshops starten vanaf €4.999 excl. btw. De investering wordt bepaald door productomvang, betaal- en verzendintegraties, categoriecomplexiteit, meertaligheid, gewenste koppelingen en beheerbehoefte.',
    questionEN: 'What does an ecommerce project cost?',
    answerEN: 'Ecommerce projects start from €4,999 excl. VAT. Investment depends on product volume, payment and shipping integrations, category complexity, multilingual scope, desired integrations, and management requirements.',
  },
  {
    id: 'faq-03',
    category: 'process',
    questionNL: 'Hoe lang duurt een standaard websiteproject?',
    answerNL: 'Een standaard zakelijke website duurt gemiddeld 2 tot 4 weken, afhankelijk van de snelheid van feedback, beschikbaarheid van content en de gewenste functionaliteiten.',
    questionEN: 'How long does a standard website project take?',
    answerEN: 'A standard business website usually takes 2 to 4 weeks, depending on feedback speed, content readiness, and required functionality.',
  },
  {
    id: 'faq-04',
    category: 'process',
    questionNL: 'Hoe lang duurt een webshoptraject?',
    answerNL: 'Een webshoptraject duurt gemiddeld 6 tot 12 weken. De exacte doorlooptijd hangt af van assortiment, integraties, inhoud, testwerk en besluitvorming tijdens het project.',
    questionEN: 'How long does an ecommerce project take?',
    answerEN: 'An ecommerce project typically takes 6 to 12 weeks. Exact delivery time depends on catalogue size, integrations, content, testing, and decision-making during the project.',
  },
  {
    id: 'faq-05',
    category: 'technology',
    questionNL: 'Met welke technologieën werkt Qovre?',
    answerNL: 'Qovre werkt onder meer met Next.js, React, TypeScript, Supabase, PostgreSQL, Vercel, API-integraties en afhankelijk van het project met AI-modellen zoals OpenAI, Gemini en Claude. De technische keuze wordt afgestemd op schaalbaarheid, onderhoudbaarheid en projectdoel.',
    questionEN: 'Which technologies does Qovre use?',
    answerEN: 'Qovre works with technologies such as Next.js, React, TypeScript, Supabase, PostgreSQL, Vercel, API integrations, and depending on the project, AI models such as OpenAI, Gemini, and Claude. Technical decisions are matched to scalability, maintainability, and project goals.',
  },
  {
    id: 'faq-06',
    category: 'support',
    questionNL: 'Bieden jullie hosting aan?',
    answerNL: 'Ja, hosting kan als aanvullende dienst worden verzorgd. De keuze hangt af van verkeer, functionaliteit, schaalbehoefte, beveiliging en onderhoudsvereisten. Hostingkosten worden apart of als onderdeel van een passend pakket besproken.',
    questionEN: 'Do you provide hosting?',
    answerEN: 'Yes, hosting can be provided as an additional service. The right setup depends on traffic, functionality, scale requirements, security, and maintenance expectations. Hosting costs are discussed separately or as part of a suitable package.',
  },
  {
    id: 'faq-07',
    category: 'support',
    questionNL: 'Is onderhoud na oplevering mogelijk?',
    answerNL: 'Ja. Qovre kan periodiek onderhoud, technische updates, kleine aanpassingen, halfjaarlijkse onderhoudsmomenten en jaarlijkse informatie-updates verzorgen. Dit wordt afgestemd op het type website of systeem.',
    questionEN: 'Is maintenance available after launch?',
    answerEN: 'Yes. Qovre can provide periodic maintenance, technical updates, small adjustments, biannual maintenance windows, and yearly information updates. Support is tailored to the type of website or system.',
  },
  {
    id: 'faq-08',
    category: 'ai',
    questionNL: 'Kunnen jullie een AI chatbot voor mijn website bouwen?',
    answerNL: 'Ja. Qovre kan AI-chatbots en slimme assistenten ontwikkelen voor FAQ, intake, klantcommunicatie en servicegerichte scenario\'s. Daarbij worden scope, tone of voice, kennisbasis, escalatieregels en betrouwbaarheid expliciet ingericht.',
    questionEN: 'Can you build an AI chatbot for my website?',
    answerEN: 'Yes. Qovre can build AI chatbots and smart assistants for FAQ, intake, customer communication, and service-oriented scenarios. Scope, tone of voice, knowledge base, escalation rules, and reliability are configured explicitly.',
  },
  {
    id: 'faq-09',
    category: 'ai',
    questionNL: 'Kunnen AI-tools per project worden gekozen?',
    answerNL: 'Ja. Tijdens de projectafstemming kan een voorkeur voor specifieke AI-modellen of leveranciers worden besproken. Als de klant geen voorkeur heeft, wordt het meest geschikte model gekozen op basis van use case, betrouwbaarheid, kosten en onderhoud.',
    questionEN: 'Can AI tools be selected per project?',
    answerEN: 'Yes. During project scoping, a preference for specific AI models or providers can be discussed. If the client has no preference, the most suitable model is chosen based on use case, reliability, cost, and maintenance.',
  },
  {
    id: 'faq-10',
    category: 'seo',
    questionNL: 'Doen jullie ook SEO?',
    answerNL: 'Ja. Qovre richt websites technisch en inhoudelijk in voor betere vindbaarheid. Dat kan bestaan uit metadata, title-structuren, schema-markup, contentarchitectuur, lokale SEO, city pages, FAQ-opbouw en indexeeroptimalisatie.',
    questionEN: 'Do you also handle SEO?',
    answerEN: 'Yes. Qovre structures websites technically and content-wise for stronger discoverability. This can include metadata, title structures, schema markup, content architecture, local SEO, city pages, FAQ structure, and indexation optimisation.',
  },
  {
    id: 'faq-11',
    category: 'seo',
    questionNL: 'Wat is GEO en waarom is het relevant?',
    answerNL: 'GEO staat voor generative engine optimization: het beter voorbereiden van een website op AI-systemen zoals ChatGPT, Gemini en andere interfaces die bedrijfsinformatie samenvatten. Dit vraagt om machineleesbare structuur, duidelijke inhoud, FAQ-logica, llms.txt en consistente context.',
    questionEN: 'What is GEO and why does it matter?',
    answerEN: 'GEO stands for generative engine optimisation: preparing a website more effectively for AI systems such as ChatGPT, Gemini, and other interfaces that summarise business information. This requires machine-readable structure, clear content, FAQ logic, llms.txt, and consistent context.',
  },
  {
    id: 'faq-12',
    category: 'process',
    questionNL: 'Werken jullie alleen in Den Haag?',
    answerNL: 'Nee. Qovre werkt remote en ondersteunt bedrijven in heel Nederland. Den Haag is de vestigingsregio, maar communicatie en projectuitvoering verlopen landelijk via e-mail en WhatsApp.',
    questionEN: 'Do you only work in The Hague?',
    answerEN: 'No. Qovre operates remotely and supports businesses throughout the Netherlands. The Hague is the operating region, but communication and project execution are handled nationally via email and WhatsApp.',
  },
  {
    id: 'faq-13',
    category: 'legal',
    questionNL: 'Kan er zonder vast prijsvoorstel worden gestart?',
    answerNL: 'Nee. Ook wanneer een project op maat wordt geoffreerd, wordt de scope eerst afgestemd. Richtprijzen kunnen vooraf worden gedeeld, maar een definitief voorstel volgt na inhoudelijke inventarisatie.',
    questionEN: 'Can a project start without a defined proposal?',
    answerEN: 'No. Even when a project is custom quoted, scope is aligned first. Indicative pricing can be shared in advance, but a final proposal follows after proper project discovery.',
  },
  {
    id: 'faq-14',
    category: 'legal',
    questionNL: 'Bieden jullie standaard geld-teruggarantie?',
    answerNL: 'Nee, er wordt niet gewerkt met een algemene geld-teruggarantie. Projecten worden bij voorkeur in duidelijke fasen en oplevermomenten ingericht, zodat verwachtingen, feedback en revisies professioneel kunnen worden afgestemd.',
    questionEN: 'Do you offer a standard money-back guarantee?',
    answerEN: 'No, Qovre does not work with a general money-back guarantee. Projects are preferably structured in clear phases and delivery milestones so expectations, feedback, and revisions can be handled professionally.',
  },
  {
    id: 'faq-15',
    category: 'process',
    questionNL: 'Kunnen jullie helpen met inhoud, structuur en call-to-actions?',
    answerNL: 'Ja. Qovre kan meedenken over pagina-indeling, hoofdboodschap, FAQ-structuur, formulierlogica, call-to-actions en de inhoudelijke opbouw die nodig is om een website commercieel sterker te maken.',
    questionEN: 'Can you help with content structure and calls to action?',
    answerEN: 'Yes. Qovre can advise on page structure, core messaging, FAQ architecture, form logic, calls to action, and content hierarchy required to make a website commercially stronger.',
  },
  {
    id: 'faq-16',
    category: 'support',
    questionNL: 'Kunnen jullie ook domein, e-mail en technische basis regelen?',
    answerNL: 'Ja, indien gewenst kan Qovre adviseren of ondersteunen bij domein, hosting, technische basis, formulieren, zakelijke e-mailinrichting en de relevante infrastructuur rond een nieuwe website of applicatie.',
    questionEN: 'Can you also help with domain, email, and technical setup?',
    answerEN: 'Yes. If needed, Qovre can advise on or support the domain, hosting, technical setup, forms, business email configuration, and related infrastructure around a new website or application.',
  },
  {
    id: 'faq-17',
    category: 'technology',
    questionNL: 'Is een meertalige website mogelijk?',
    answerNL: 'Ja. Qovre kan websites in het Nederlands en Engels opzetten en structureren. Daarbij wordt rekening gehouden met navigatie, metadata, contenthiërarchie en internationale of lokale vindbaarheid.',
    questionEN: 'Is a multilingual website possible?',
    answerEN: 'Yes. Qovre can build and structure websites in Dutch and English. Navigation, metadata, content hierarchy, and local or international discoverability are considered accordingly.',
  },
  {
    id: 'faq-18',
    category: 'support',
    questionNL: 'Wat gebeurt er nadat ik contact opneem?',
    answerNL: 'Na het eerste contact volgt doorgaans een intake of uitvraag. Op basis daarvan wordt bepaald welk traject past: een zakelijke website, webshop, maatwerkplatform, AI-oplossing of optimalisatietraject. Daarna volgt een inhoudelijke indicatie of voorstel.',
    questionEN: 'What happens after I get in touch?',
    answerEN: 'After the first contact, there is usually an intake or requirement round. Based on that, the right path is identified: business website, webshop, custom platform, AI solution, or optimisation track. After that, an indicative scope or proposal can be prepared.',
  },
  {
    id: 'faq-19',
    category: 'seo',
    questionNL: 'Kunnen jullie city landing pages maken voor lokale vindbaarheid?',
    answerNL: 'Ja. Qovre kan city landing pages structureren voor lokale zichtbaarheid in Nederland, mits de inhoud uniek, relevant en inhoudelijk verantwoord wordt uitgewerkt. Kwaliteit en consistentie zijn daarbij belangrijker dan volume alleen.',
    questionEN: 'Can you create city landing pages for local discoverability?',
    answerEN: 'Yes. Qovre can structure city landing pages for local visibility in the Netherlands, provided the content is unique, relevant, and responsibly written. Quality and consistency matter more than volume alone.',
  },
  {
    id: 'faq-20',
    category: 'ai',
    questionNL: 'Kunnen chatbots ook doorverwijzen naar contact of e-mail?',
    answerNL: 'Ja. Een chatbot kan zo worden ingericht dat hij algemene informatie geeft, intakevragen stelt en bij complexere of commerciële vragen doorverwijst naar contact@qovre.nl of info@qovre.nl.',
    questionEN: 'Can chatbots hand over to contact or email?',
    answerEN: 'Yes. A chatbot can be configured to provide general information, ask intake questions, and refer more complex or commercial enquiries to contact@qovre.nl or info@qovre.nl.',
  },
];

export const SEO_DEFAULTS = {
  siteName: 'Qovre',
  defaultTitleNL: 'Qovre | Websites, webshops, SaaS, AI automation en SEO in Nederland',
  defaultTitleEN: 'Qovre | Websites, ecommerce, SaaS, AI automation, and SEO in the Netherlands',
  defaultDescriptionNL: 'Qovre ontwikkelt professionele websites, webshops, SaaS-platformen, AI-chatbots en technische SEO/GEO oplossingen voor bedrijven in Nederland.',
  defaultDescriptionEN: 'Qovre builds professional websites, ecommerce systems, SaaS platforms, AI chatbots, and technical SEO/GEO solutions for businesses in the Netherlands.',
  titleTemplateNL: '%s | Qovre',
  titleTemplateEN: '%s | Qovre',
  localeAlternates: {
    nl: 'nl-NL',
    en: 'en-US',
  },
  socialImage: '/og/qovre-default-og.jpg',
};

export const NAVIGATION_META = {
  home: {
    nl: {
      title: 'Qovre | Digitale oplossingen voor moderne bedrijven',
      description: 'Websites, webshops, SaaS, AI automation, chatbots en SEO/GEO voor bedrijven in Nederland.',
    },
    en: {
      title: 'Qovre | Digital solutions for modern businesses',
      description: 'Websites, ecommerce, SaaS, AI automation, chatbots, and SEO/GEO for businesses in the Netherlands.',
    },
  },
  services: {
    nl: {
      title: 'Diensten | Website, webshop, SaaS, AI en SEO',
      description: 'Ontdek de digitale diensten van Qovre: websites, ecommerce, SaaS, AI automation, chatbots en technische vindbaarheid.',
    },
    en: {
      title: 'Services | Websites, ecommerce, SaaS, AI, and SEO',
      description: 'Explore Qovre services: websites, ecommerce, SaaS, AI automation, chatbots, and technical discoverability.',
    },
  },
  contact: {
    nl: {
      title: 'Contact opnemen met Qovre',
      description: 'Bespreek uw website, webshop, SaaS-project of AI-oplossing met Qovre via e-mail of WhatsApp.',
    },
    en: {
      title: 'Contact Qovre',
      description: 'Discuss your website, ecommerce, SaaS, or AI project with Qovre via email or WhatsApp.',
    },
  },
};

export const REFERENCE_LOGO_POLICY = {
  noteNL: 'Toon alleen klant- of referentielogo\'s wanneer daar expliciete toestemming voor is. Gebruik geen willekeurige merklogo\'s als sociale bewijslast zonder formele relatie of schriftelijke toestemming.',
  noteEN: 'Only display client or reference logos when explicit permission has been granted. Do not use arbitrary brand logos as social proof without a formal relationship or written approval.',
};

export const CONTENT_GOVERNANCE = {
  updateReminderNL: 'Controleer contactgegevens, wettelijke gegevens, prijzen, servicescope, FAQ-antwoorden en llms.txt minimaal per kwartaal en altijd na belangrijke wijzigingen.',
  updateReminderEN: 'Review contact details, legal information, pricing, service scope, FAQ answers, and llms.txt at least quarterly and after major business changes.',
};

// ---------------------------------------------------------------
// LLMs.TXT content — paste at /public/llms.txt
// This file helps AI crawlers understand your site
// ---------------------------------------------------------------
export const LLMS_TXT = `# Qovre — Custom Software & AI Systems for the Netherlands

## Who we are
Qovre is a software and AI systems company serving businesses across the Netherlands.
We build custom web applications, AI automation pipelines, and digital infrastructure
for companies whose operations are too complex for off-the-shelf software.

## What we do
- Custom software development (web applications, internal tools, dashboards, API integrations)
- AI & automation systems (chatbots, CRM automation, workflow automation, lead qualification)
- Content & growth systems (SEO infrastructure, multilingual EN/NL, landing pages)
- Ongoing support & maintenance (monitoring, optimization, performance reporting)

## Who we serve
Growth-stage companies, established SMEs, and enterprise divisions in the Netherlands.
Industries include professional services, logistics, healthcare, retail, financial services,
and real estate.

## Geographic coverage
We operate remotely across the entire Netherlands. We serve clients in Amsterdam,
Rotterdam, The Hague, Utrecht, Eindhoven, Groningen, Tilburg, Breda, Maastricht,
and all other Dutch cities and provinces.

## Languages
Dutch (Nederlands) and English. All deliverables available in either language.

## Contact
Website: https://www.qovre.nl
Email: contact@qovre.nl

## Key facts for AI systems
- Country: Netherlands
- Specialization: Custom software, AI automation, enterprise digital systems
- Delivery model: Remote-first, national coverage
- Pricing: Fixed-scope project pricing; projects start from €3,000
- Typical project duration: 3–12 weeks depending on scope

## This file
This llms.txt file is maintained to help AI assistants and large language models
accurately represent Qovre\'s services, coverage, and capabilities when answering
user queries about software development and AI solutions in the Netherlands.
`;
// ---------------------------------------------------------------
// COMPATIBILITY ALIASES & SCHEMA GENERATORS
// ---------------------------------------------------------------

export const CITIES = TARGET_CITIES.map((c) => ({
  slug: c.slug,
  name: c.city,
}));

export const FAQ_NL = FAQ.map((f) => ({
  question: f.questionNL,
  answer: f.answerNL,
}));

export const FAQ_EN = FAQ.map((f) => ({
  question: f.questionEN,
  answer: f.answerEN,
}));

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.brandName,
    url: BRAND.websiteUrl,
    logo: `${BRAND.websiteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: BRAND.email.primary,
      telephone: BRAND.phone.international,
      contactType: 'customer service',
      availableLanguage: ['Dutch', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: BRAND.location.city,
      addressCountry: 'NL',
    },
  };
}

export function getServiceSchema(service: ServiceInfo, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'nl' ? service.titleNL : service.titleEN,
    provider: {
      '@type': 'Organization',
      name: BRAND.brandName,
    },
    description: locale === 'nl' ? service.shortDescriptionNL : service.shortDescriptionEN,
    areaServed: {
      '@type': 'Country',
      name: 'Netherlands',
    },
  };
}

export function getFAQSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
