/*
  Qovre Blog / Inzichten — static article data
  Each article has a shared slug, NL + EN content.
  No CMS required — add articles here, rebuild to publish.
*/

export type BlogPost = {
  slug: string
  category: 'web-development' | 'ai' | 'saas' | 'seo' | 'automation'
  publishedAt: string // ISO date string
  readingTimeMinutes: number
  titleNL: string
  titleEN: string
  teaserNL: string
  teaserEN: string
  contentNL: string
  contentEN: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'maatwerk-website-vs-template',
    category: 'web-development',
    publishedAt: '2025-11-18',
    readingTimeMinutes: 5,
    titleNL: 'Waarom een maatwerk website meer oplevert dan een template',
    titleEN: 'Why a custom website outperforms a template',
    teaserNL: 'Templates zijn goedkoop en snel, maar ze kosten u op termijn meer dan u beseft. Ontdek waarom bedrijven die investeren in maatwerk consistent meer conversies, meer vertrouwen en lagere onderhoudslast rapporteren.',
    teaserEN: 'Templates are cheap and fast, but they cost more than you think in the long run. Discover why businesses that invest in custom development consistently report higher conversions, stronger trust, and lower maintenance overhead.',
    contentNL: `Een website-template lijkt aantrekkelijk: laag budget, snelle oplevering, herkenbaar design. Toch melden de meeste bedrijven die na twee jaar overstappen op maatwerk dat ze spijt hebben van de keuze voor een template. Niet omdat de template slecht was, maar omdat het compromissen oplegde die ze pas later zagen.

**Beperkte laadsnelheid en Core Web Vitals**

Template-themes laden tientallen scripts, stijlbladen en plug-ins die u nooit gebruikt. Google meet laadtijd en interactiviteit zwaar mee in de ranking. Een maatwerk website laadt alleen wat nodig is — typisch 40–70% sneller dan een vergelijkbare template-site op shared hosting.

**Merkidentiteit versus 'generiek'**

Templates zijn gebouwd om voor iedereen te werken, wat betekent dat ze voor niemand specifiek werken. Bezoekers herkennen een Elementor-site of een standaard Shopify-thema. Een maatwerk design draagt uw merkwaarden consequent door — typografie, kleur, microanimaties — en geeft een eerste indruk die converteert.

**Onderhoudsschuld**

Elke template-update, plug-in-conflict of thema-aanpassing vereist handmatig werk. Maatwerk codebases hebben geen overbodige afhankelijkheden en volgen een duidelijke structuur, waardoor onderhoud voorspelbaar en kostenefficiënt blijft.

**Wanneer is een template wél goed genoeg?**

Voor een persoonlijk blog of een eenmalige landingspagina is een template prima. Zodra u een professionele uitstraling nodig heeft, omzet via de website wilt genereren, of specifieke integraties (CRM, boekhoudpakket, API) nodig heeft, loont maatwerk altijd.`,
    contentEN: `A website template seems attractive: low budget, fast delivery, familiar design. Yet most businesses that switch to custom development after two years report regretting the template choice — not because the template was bad, but because it imposed compromises they only noticed later.

**Load speed and Core Web Vitals**

Template themes load dozens of scripts, stylesheets, and plugins you never use. Google measures load time and interactivity heavily in its ranking algorithm. A custom website loads only what is needed — typically 40–70% faster than a comparable template site on shared hosting.

**Brand identity versus "generic"**

Templates are built to work for everyone, which means they work specifically for no one. Visitors recognise an Elementor site or a standard Shopify theme. A custom design carries your brand values consistently — typography, colour, micro-animations — and creates a first impression that converts.

**Maintenance debt**

Every template update, plugin conflict, or theme adjustment requires manual work. Custom codebases have no redundant dependencies and follow a clear structure, keeping maintenance predictable and cost-efficient.

**When is a template good enough?**

For a personal blog or a one-off landing page, a template is fine. The moment you need a professional presence, want to generate revenue through your website, or require specific integrations (CRM, accounting package, API), custom development always pays off.`,
  },
  {
    slug: 'ai-chatbot-voor-bedrijven',
    category: 'ai',
    publishedAt: '2025-12-03',
    readingTimeMinutes: 6,
    titleNL: 'AI-chatbots voor bedrijven: wat levert het écht op?',
    titleEN: 'AI chatbots for business: what do they actually deliver?',
    teaserNL: 'Een AI-assistent op uw website is meer dan een trendy gadget. Bedrijven die chatbots slim inzetten zien minder supportvragen, hogere klanttevredenheid en meer gekwalificeerde leads — mits correct opgezet.',
    teaserEN: 'An AI assistant on your website is more than a trendy gadget. Businesses that deploy chatbots strategically see fewer support tickets, higher customer satisfaction, and more qualified leads — when set up correctly.',
    contentNL: `De meeste AI-chatbots die bedrijven inzetten falen niet door de technologie, maar door de implementatie. Een generieke chatbot die "Hoe kan ik u helpen?" vraagt zonder context lost geen enkel probleem op. Een goed opgezette AI-assistent daarentegen werkt 24 uur per dag als eerste lijn voor uw klantenservice.

**Wat een effectieve chatbot doet**

Een goed opgezette AI-assistent beantwoordt veelgestelde vragen zonder menselijke tussenkomst, kwalificeert binnenkomende leads op basis van budget, branche en tijdlijn, en escaleert complexe vragen naar een mens met volledige gesprekscontext. Dit scheelt gemiddeld 30–50% van het volume in uw inbox.

**De rol van domeinkennis**

De kwaliteit van een AI-chatbot staat of valt met de kennisbasis. Generieke modellen geven generieke antwoorden. Een chatbot die gevoed is met uw diensten, uw prijslogica en uw tone of voice gedraagt zich als een goed geïnformeerde medewerker — niet als een zoekrobot.

**Integraties die het verschil maken**

De meeste meerwaarde zit in koppelingen: kalenderintegratie voor directe afspraakinplanning, CRM-koppeling voor automatische leadregistratie, en WhatsApp-integratie voor klanten die liever via een vertrouwd kanaal communiceren.

**Wat kost het en wat levert het op?**

Een maatwerk AI-assistent van Qovre start vanaf EUR 3.000. Typisch terugverdientijd: 3–6 maanden voor bedrijven met meer dan 50 inkomende klantvragen per week. Voor bedrijven met een lager volume is een eenvoudiger FAQ-widget vaak voldoende.`,
    contentEN: `Most AI chatbots businesses deploy fail not because of the technology, but because of the implementation. A generic chatbot asking "How can I help you?" without context solves no problem. A well-configured AI assistant, on the other hand, works 24 hours a day as the first line of your customer service.

**What an effective chatbot does**

A well-configured AI assistant answers frequently asked questions without human intervention, qualifies incoming leads based on budget, industry and timeline, and escalates complex queries to a human with full conversation context. This typically reduces inbox volume by 30–50%.

**The role of domain knowledge**

The quality of an AI chatbot depends entirely on its knowledge base. Generic models give generic answers. A chatbot trained on your services, your pricing logic, and your tone of voice behaves like a well-informed team member — not a search engine.

**Integrations that make the difference**

Most of the value lies in connections: calendar integration for direct appointment scheduling, CRM coupling for automatic lead registration, and WhatsApp integration for clients who prefer to communicate via a familiar channel.

**What does it cost and what does it return?**

A custom AI assistant from Qovre starts from EUR 3,000. Typical payback period: 3–6 months for businesses receiving more than 50 inbound customer queries per week. For businesses with lower volume, a simpler FAQ widget is often sufficient.`,
  },
  {
    slug: 'saas-bouwen-of-kopen',
    category: 'saas',
    publishedAt: '2026-01-14',
    readingTimeMinutes: 7,
    titleNL: 'SaaS bouwen of kopen: wanneer is maatwerk de slimmere keuze?',
    titleEN: 'Build vs. buy SaaS: when is custom the smarter choice?',
    teaserNL: 'Er is een fase in de groei van elk bedrijf waarop standaard software te beperkend wordt. Hoe herkent u dat moment, en wat zijn de echte kosten van een maatwerk SaaS-platform?',
    teaserEN: 'There is a stage in the growth of every business where off-the-shelf software becomes too restrictive. How do you recognise that moment, and what are the real costs of a custom SaaS platform?',
    contentNL: `"Kopen" wint bijna altijd in de vroege fase. Salesforce, HubSpot, Notion, Monday.com — ze bestaan omdat ze voor de meeste bedrijven goed genoeg zijn. Maar "goed genoeg" is niet hetzelfde als "optimaal", en naarmate uw processen complexer worden, betaalt u een hogere prijs voor de beperkingen van een generiek platform.

**Signalen dat het tijd is voor maatwerk**

U betaalt voor features die u nooit gebruikt, maar mist de drie functies die uw bedrijfsproces werkelijk ondersteunen. U exporteert data naar Excel omdat de software uw rapportagebehoeften niet dekt. U heeft meerdere losse tools die niet goed samenwerken. Uw team heeft workarounds ontwikkeld om met de software te leven.

**De echte kosten van licenties**

SaaS-licenties groeien mee met uw team. EUR 50 per gebruiker per maand klinkt laag, maar voor een team van 30 mensen is dat EUR 1.500 per maand — EUR 18.000 per jaar. Een maatwerk platform van EUR 30.000 heeft een terugverdientijd van minder dan 2 jaar, zonder verdere licentiekosten.

**Wat u niet ziet bij maatwerk**

Maatwerk kost meer upfront en meer aandacht bij onderhoud en uitbreiding. De keuze voor maatwerk is alleen verstandig als u een duidelijk eigendomsvoordeel heeft: onderscheidende processen die concurrent-voordeel geven, of data-eigenaarschap dat strategisch belangrijk is.

**Onze aanpak bij Qovre**

We starten altijd met een procesaudit. Als standaard software met integraties uw probleem oplost, adviseren we dat eerlijk. Als maatwerk de betere ROI geeft, bouwen we het platform in gefaseerde sprints — zodat u vroeg waarde ziet en het platform meegroeit met uw organisatie.`,
    contentEN: `"Buying" almost always wins in the early stage. Salesforce, HubSpot, Notion, Monday.com — they exist because they are good enough for most businesses. But "good enough" is not the same as "optimal", and as your processes become more complex, you pay an increasing price for the limitations of a generic platform.

**Signals that it's time for custom**

You pay for features you never use, but miss the three functions that actually support your business process. You export data to Excel because the software doesn't cover your reporting needs. You have multiple disconnected tools that don't work well together. Your team has developed workarounds to live with the software.

**The real cost of licences**

SaaS licences scale with your team. EUR 50 per user per month sounds low, but for a team of 30 people that's EUR 1,500 per month — EUR 18,000 per year. A custom platform at EUR 30,000 has a payback period of under two years, with no further licence costs.

**What you don't see with custom development**

Custom costs more upfront and requires more attention for maintenance and expansion. Choosing custom only makes sense when you have a clear ownership advantage: differentiating processes that create competitive advantage, or data ownership that is strategically important.

**Our approach at Qovre**

We always start with a process audit. If standard software with integrations solves your problem, we advise that honestly. If custom delivers better ROI, we build the platform in phased sprints — so you see value early and the platform grows with your organisation.`,
  },
  {
    slug: 'lokale-seo-nederland-2025',
    category: 'seo',
    publishedAt: '2026-02-06',
    readingTimeMinutes: 5,
    titleNL: 'Lokale SEO voor Nederlandse bedrijven: wat werkt in 2025?',
    titleEN: 'Local SEO for Dutch businesses: what works in 2025?',
    teaserNL: 'Google toont steeds vaker lokale resultaten voor zakelijke zoekopdrachten. Welke tactische keuzes bepalen of uw bedrijf bovenaan staat of onzichtbaar blijft?',
    teaserEN: 'Google increasingly shows local results for business searches. Which tactical choices determine whether your business ranks at the top or stays invisible?',
    contentNL: `Lokale zoekopdrachten zoals "softwareontwikkelaar Den Haag" of "website laten bouwen Rotterdam" groeien consistent. Google weet inmiddels met grote precisie wat een gebruiker bedoelt, en toont bij zakelijke zoekopdrachten steeds vaker het lokale 3-pack boven organische resultaten. Als u niet in dat 3-pack staat, mist u de meeste klikken.

**Google Business Profile als fundament**

Uw Google Business Profile is de enkelvoudigste hefboom voor lokale vindbaarheid. Houd het volledig ingevuld (categorieën, openingstijden, beschrijving, foto's), reageer op alle reviews — ook negatieve — en post minstens éénmaal per maand een update. Algoritme-tests laten zien dat actieve profielen gemiddeld 35% meer views genereren.

**Lokale landingspagina's**

Voor elke regio of stad die relevant is voor uw dienstverlening, heeft u een aparte landingspagina nodig met lokale zoektermen, een lokale referentie en een consistente NAP (naam, adres, telefoonnummer). Generieke stedenpagina's zonder unieke content ranken niet; pagina's met specifieke lokale relevantie wel.

**Structured data: LocalBusiness schema**

Zoekmachines lezen structured data (JSON-LD) sneller dan platte tekst. Een correct geïmplementeerd LocalBusiness-schema met adres, dienstgebied en openingstijden geeft Google zekerheid over uw lokale relevantie — en vergroot de kans op rich results.

**Wat Qovre anders doet**

Wij combineren technische SEO (schema markup, Core Web Vitals, interne linkstructuur) met lokale contentoptimalisatie. Iedere pagina die wij bouwen heeft een meetbare rankingdoelstelling, geen ijdelheidsmetriek.`,
    contentEN: `Local searches such as "software developer The Hague" or "website development Rotterdam" are growing consistently. Google now knows with great precision what a user means, and for business searches increasingly shows the local 3-pack above organic results. If you are not in that 3-pack, you are missing most of the clicks.

**Google Business Profile as foundation**

Your Google Business Profile is the single biggest lever for local visibility. Keep it fully filled in (categories, opening hours, description, photos), respond to all reviews — including negative ones — and post at least once a month. Algorithm tests show that active profiles generate an average of 35% more views.

**Local landing pages**

For each region or city relevant to your services, you need a separate landing page with local search terms, a local reference, and consistent NAP (name, address, phone number). Generic city pages without unique content don't rank; pages with specific local relevance do.

**Structured data: LocalBusiness schema**

Search engines read structured data (JSON-LD) faster than plain text. A correctly implemented LocalBusiness schema with address, service area, and opening hours gives Google certainty about your local relevance — and increases the chance of rich results.

**What Qovre does differently**

We combine technical SEO (schema markup, Core Web Vitals, internal link structure) with local content optimisation. Every page we build has a measurable ranking objective, not a vanity metric.`,
  },
  {
    slug: 'procesautomatisering-mkb',
    category: 'automation',
    publishedAt: '2026-03-12',
    readingTimeMinutes: 6,
    titleNL: 'Procesautomatisering in het MKB: praktisch en zonder grote IT-afdeling',
    titleEN: 'Process automation for SMEs: practical without a large IT team',
    teaserNL: 'Automatisering is niet voorbehouden aan grote corporates. MKB-bedrijven die slimme koppelingen bouwen tussen hun tools besparen gemiddeld 8 tot 15 uur per week per medewerker — en dat begint al bij EUR 3.000.',
    teaserEN: 'Automation is not reserved for large corporates. SMEs that build smart connections between their tools save an average of 8 to 15 hours per week per employee — and it starts at EUR 3,000.',
    contentNL: `De meeste MKB-bedrijven automatiseren te weinig — niet omdat het te duur is, maar omdat ze niet weten waar te beginnen. Ieder bedrijf heeft processen die met een slimme integratie tien keer sneller kunnen: van offerte naar factuur, van contactformulier naar CRM, van bestelling naar magazijnsysteem.

**Begin bij de tijdvreters**

De beste kandidaten voor automatisering zijn taken die: meer dan drie keer per week worden uitgevoerd, meer dan vijf minuten duren, een vaste, herhaalbare structuur hebben, en afhankelijk zijn van data die al ergens digitaal beschikbaar is. Voorbeelden: factuurverwerking, leadkwalificatie, klantcommunicatie na aankoop, voorraadmeldingen.

**Integraties bouwen zonder IT-team**

Met API-koppelingen tussen uw bestaande software — boekhouding, CRM, e-commerce, e-mail — kunt u complexe workflows automatiseren zonder een interne IT-afdeling. Qovre bouwt maatwerk integraties die precies doen wat nodig is, zonder overbodige complexiteit.

**AI in de automatisering**

Moderne automatisering gaat verder dan "als X dan Y". AI-modellen kunnen ongestructureerde input (e-mails, formulieren, berichten) classificeren, samenvatten en routeren — zodat ook taken die vroeger menselijke interpretatie vereisten, geautomatiseerd kunnen worden.

**Concreet voorbeeld**

Een distributeur in Rotterdam verwerkte 200 inkomende orders per dag handmatig. Qovre bouwde een integratie die e-mailorders parseert, het ERP-systeem bijwerkt en de klant automatisch een bevestiging stuurt. Tijdsbesparing: 4 FTE-uur per dag. Investering: EUR 4.500. Terugverdientijd: 6 weken.`,
    contentEN: `Most SMEs automate too little — not because it is too expensive, but because they don't know where to start. Every business has processes that could run ten times faster with a smart integration: from quote to invoice, from contact form to CRM, from order to warehouse system.

**Start with the time-eaters**

The best candidates for automation are tasks that: occur more than three times per week, take more than five minutes, have a fixed, repeatable structure, and depend on data that is already digitally available somewhere. Examples: invoice processing, lead qualification, post-purchase customer communication, inventory alerts.

**Building integrations without an IT team**

With API connections between your existing software — accounting, CRM, e-commerce, email — you can automate complex workflows without an internal IT department. Qovre builds custom integrations that do exactly what is needed, without unnecessary complexity.

**AI in automation**

Modern automation goes beyond "if X then Y". AI models can classify, summarise, and route unstructured input (emails, forms, messages) — so that even tasks that previously required human interpretation can be automated.

**Concrete example**

A distributor in Rotterdam manually processed 200 incoming orders per day. Qovre built an integration that parses email orders, updates the ERP system, and automatically sends a confirmation to the customer. Time saving: 4 FTE hours per day. Investment: EUR 4,500. Payback period: 6 weeks.`,
  },
]

export const BLOG_CATEGORIES: Record<BlogPost['category'], { nl: string; en: string }> = {
  'web-development': { nl: 'Webontwikkeling', en: 'Web Development' },
  'ai': { nl: 'AI & Automatisering', en: 'AI & Automation' },
  'saas': { nl: 'SaaS & Platformen', en: 'SaaS & Platforms' },
  'seo': { nl: 'SEO & Zichtbaarheid', en: 'SEO & Visibility' },
  'automation': { nl: 'Procesautomatisering', en: 'Process Automation' },
}
