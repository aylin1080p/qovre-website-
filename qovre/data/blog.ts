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
  {
    slug: 'webshop-bouwen-checklist',
    category: 'web-development',
    publishedAt: '2026-03-25',
    readingTimeMinutes: 5,
    titleNL: 'Webshop laten bouwen: de checklist die leveranciers niet altijd noemen',
    titleEN: "Getting a webshop built: the checklist suppliers don't always mention",
    teaserNL: 'Een webshop bestellen lijkt eenvoudig, maar de meeste teleurstellingen ontstaan door zaken die in de offerte ontbreken. Dit is wat u moet weten vóórdat u tekent.',
    teaserEN: 'Ordering a webshop seems straightforward, but most disappointments arise from things missing in the quote. Here is what you need to know before you sign.',
    contentNL: `Een webshop-offerte die er goed uitziet, kan verborgen kosten en beperkingen bevatten die pas na oplevering zichtbaar worden. Niet per definitie door kwade opzet, maar omdat leveranciers en klanten vaak langs elkaar heen praten over wat een "complete" webshop inhoudt.

**Wat hoort standaard in een webshop?**

Vraag uw leverancier expliciet naar: SSL-certificaat en HTTPS, mobielvriendelijk responsive design, GDPR-conforme cookiebanner en privacybeleid, koppeling met ten minste één Nederlandse betaalprovider (Mollie, Stripe), productpagina's met SEO-fields, voorraadbeheersysteem, orderbevestigingen per e-mail, en een terugkeerproces voor retouren. Als een of meer van deze punten "later" komen of niet in de offerte staan, vraag waarom.

**Hosting en beheer: de terugkerende kosten**

Veel offertes zijn eenmalig. De terugkerende kosten — hosting, domein, SSL-verlenging, plug-in-licenties, beveiligingsupdates — worden pas later zichtbaar. Vraag altijd naar de totale jaarlijkse eigendomskosten, niet alleen de bouwprijs.

**Snelheid en technische schuld**

Een goedkope webshop gebouwd op een geladen template kan bij een productcatalogus van 500+ items dramatisch traag worden. Vraag hoe de webshop presteert bij schaal: laadtijd bij 200 gelijktijdige bezoekers, paginagrootte, en of Core Web Vitals gemeten zijn.

**Eigenaarschap van code en data**

U wilt eigenaar zijn van uw eigen code, database en klantenbestand. Zorg dat de overeenkomst dit expliciet vastlegt. Locked-in platforms die u niet kunt exporteren of migreren zijn een risico dat groter wordt naarmate uw bedrijf groeit.

**Wat Qovre meelevert als standaard**

Bij elke webshop die wij bouwen zijn de bovenstaande punten standaard onderdeel van de oplevering. U tekent voor een compleet systeem, niet voor een kale basis.`,
    contentEN: `A webshop quote that looks good can contain hidden costs and limitations that only become visible after delivery — not necessarily through bad intent, but because suppliers and clients often talk past each other about what a "complete" webshop actually includes.

**What belongs in a webshop as standard?**

Ask your supplier explicitly about: SSL certificate and HTTPS, mobile-friendly responsive design, GDPR-compliant cookie banner and privacy policy, connection with at least one payment provider, product pages with SEO fields, inventory management, order confirmation emails, and a returns process. If any of these are "later" or missing from the quote, ask why.

**Hosting and management: the recurring costs**

Many quotes are one-off. The recurring costs — hosting, domain, SSL renewal, plugin licences, security updates — only become visible later. Always ask for total annual ownership costs, not just the build price.

**Speed and technical debt**

A cheap webshop built on a heavy template can become dramatically slow with a product catalogue of 500+ items. Ask how the webshop performs at scale: load time at 200 simultaneous visitors, page size, and whether Core Web Vitals have been measured.

**Ownership of code and data**

You want to own your own code, database, and customer base. Make sure the agreement explicitly states this. Locked-in platforms you cannot export or migrate are a risk that grows as your business scales.

**What Qovre delivers as standard**

For every webshop we build, the above points are standard parts of the delivery. You sign for a complete system, not a bare foundation.`,
  },
  {
    slug: 'geo-ai-zoekmachines-2026',
    category: 'seo',
    publishedAt: '2026-04-02',
    readingTimeMinutes: 6,
    titleNL: 'GEO: zo vindt ChatGPT en Perplexity uw bedrijf (of niet)',
    titleEN: "GEO: how ChatGPT and Perplexity find your business — or don't",
    teaserNL: 'AI-zoekmachines lezen het web anders dan Google. Bedrijven die hun website alleen optimaliseren voor klassieke SEO missen een groeiend kanaal. Dit is hoe Generative Engine Optimization werkt.',
    teaserEN: 'AI search engines read the web differently from Google. Businesses optimising only for classic SEO are missing a growing channel. This is how Generative Engine Optimization works.',
    contentNL: `In 2026 gebruikt een significant deel van de zakelijke zoekopdrachten een AI-interface: ChatGPT, Perplexity, Google AI Overviews, of Bing Copilot. Deze systemen werken anders dan een klassieke zoekmachine: ze synthetiseren informatie uit meerdere bronnen en presenteren een antwoord — zonder de gebruiker naar uw site te sturen, tenzij uw content als bron wordt geciteerd.

**Wat AI-modellen anders lezen**

Klassieke SEO optimaliseert voor trefwoorden, backlinks en technische crawlbaarheid. GEO optimaliseert voor bronwaarde: is uw content feitelijk correct, gestructureerd, uniek van perspectief, en makkelijk te citeren? AI-modellen selecteren bronnen op basis van autoriteit, helderheid en schaalbaarheid van de informatie.

**llms.txt: de robots.txt voor AI**

Een groeiend aantal websites implementeert een llms.txt-bestand — een door mensen leesbaar document dat AI-crawlers direct vertelt wie u bent, wat u doet, en welke pagina's relevant zijn. Het is geen formele standaard, maar grote AI-platforms honoreren het.

**Structured data als directe invoer**

JSON-LD schema markup (Organization, Service, FAQ, Article) wordt door AI-systemen gelezen als gestructureerde feiten. Een correct geïmplementeerd schema verhoogt de kans dat uw bedrijf wordt geciteerd in een AI-antwoord op een relevante zakelijke vraag.

**Praktische GEO-checklist**

Zorg dat uw website een llms.txt heeft met uw kernidentiteit, services en serviceregio. Implementeer Organization en Service schema op alle relevante pagina's. Schrijf inhoud die vragen beantwoordt in één alinea — AI-modellen citeren compacte, directe antwoorden. Vermijd vage merkentaal; gebruik concrete feiten, prijzen en processen.

**Wat Qovre al heeft gedaan**

Onze eigen website heeft een uitgebreide llms.txt, volledige schema-implementatie en GEO-geoptimaliseerde content op alle service- en stadspagina's. We passen dezelfde aanpak toe voor klanten.`,
    contentEN: `In 2026, a significant share of business searches use an AI interface: ChatGPT, Perplexity, Google AI Overviews, or Bing Copilot. These systems work differently from a classic search engine: they synthesise information from multiple sources and present an answer — without sending the user to your site, unless your content is cited as a source.

**What AI models read differently**

Classic SEO optimises for keywords, backlinks, and technical crawlability. GEO optimises for source value: is your content factually accurate, well-structured, unique in perspective, and easy to cite? AI models select sources based on authority, clarity, and the scalability of the information.

**llms.txt: the robots.txt for AI**

A growing number of websites implement an llms.txt file — a human-readable document that tells AI crawlers directly who you are, what you do, and which pages are relevant. It is not a formal standard, but major AI platforms honour it.

**Structured data as direct input**

JSON-LD schema markup (Organization, Service, FAQ, Article) is read by AI systems as structured facts. Correctly implemented schema increases the chance that your business is cited in an AI answer to a relevant business query.

**Practical GEO checklist**

Ensure your website has an llms.txt with your core identity, services, and service region. Implement Organization and Service schema on all relevant pages. Write content that answers questions in one paragraph — AI models cite compact, direct answers. Avoid vague brand language; use concrete facts, prices, and processes.

**What Qovre has already done**

Our own website has a comprehensive llms.txt, full schema implementation, and GEO-optimised content on all service and city pages. We apply the same approach for clients.`,
  },
  {
    slug: 'api-integraties-bedrijfssoftware',
    category: 'automation',
    publishedAt: '2026-04-08',
    readingTimeMinutes: 5,
    titleNL: 'API-integraties: hoe uw bedrijfssoftware samenwerkt zonder handmatig kopiëren',
    titleEN: 'API integrations: how your business software works together without manual copying',
    teaserNL: 'De meeste bedrijven kopiëren dagelijks data tussen systemen die eigenlijk al met elkaar kunnen praten. Een API-integratie elimineert die handmatige schakel — en het is goedkoper dan u denkt.',
    teaserEN: 'Most businesses copy data every day between systems that could already talk to each other. An API integration eliminates that manual step — and it costs less than you think.',
    contentNL: `Als uw medewerkers dagelijks data overtikken van het ene systeem naar het andere — van e-mail naar CRM, van webshop naar boekhouding, van formulier naar spreadsheet — dan is er een koppeling mogelijk die dat automatisch doet. In negen van de tien gevallen hebben de betrokken systemen al een API beschikbaar.

**Wat een API precies doet**

Een API (Application Programming Interface) is een gestandaardiseerde manier waarop software met andere software communiceert. Als uw webshop een nieuwe bestelling ontvangt, kan die via de API direct uw boekhoudsysteem bijwerken, een fulfillment-bericht sturen en de klant een gepersonaliseerde bevestiging geven — zonder menselijke tussenkomst.

**Veelgebruikte integraties voor het MKB**

Webshop → boekhouding (Exact, Moneybird, Twinfield). CRM → e-mailmarketing (Mailchimp, ActiveCampaign). Contactformulier → CRM + notificatie. Agenda → afsprakensysteem. ERP → klantportaal. Elk van deze koppelingen bespaart typisch 30 minuten tot 3 uur per dag per medewerker die ermee werkt.

**Maatwerk vs. no-code tools**

Tools zoals Zapier en Make zijn goed voor eenvoudige koppelingen. Bij complexe bedrijfslogica — uitzonderingsafhandeling, foutlogging, authenticatie, hogere volumes — loont een maatwerk integratie die precies doet wat nodig is zonder de beperkingen van een generiek platform.

**Wat kost een API-integratie?**

Een enkelvoudige koppeling (A → B, met foutafhandeling en logging) start bij Qovre vanaf EUR 1.500. Complexe multi-system workflows starten vanaf EUR 3.000. De terugverdientijd is bij vrijwel elke MKB-toepassing minder dan zes maanden.`,
    contentEN: `If your employees copy data every day from one system to another — from email to CRM, from webshop to accounting, from form to spreadsheet — then there is an integration that can do that automatically. In nine out of ten cases, the systems involved already have an API available.

**What an API actually does**

An API (Application Programming Interface) is a standardised way for software to communicate with other software. When your webshop receives a new order, it can via the API immediately update your accounting system, send a fulfilment message, and give the customer a personalised confirmation — without human intervention.

**Common integrations for SMEs**

Webshop → accounting (Exact, Moneybird, Twinfield). CRM → email marketing (Mailchimp, ActiveCampaign). Contact form → CRM + notification. Calendar → appointment system. ERP → customer portal. Each of these connections typically saves 30 minutes to 3 hours per day per employee using them.

**Custom vs. no-code tools**

Tools like Zapier and Make are good for simple connections. With complex business logic — exception handling, error logging, authentication, higher volumes — a custom integration that does exactly what is needed is worthwhile, without the limitations of a generic platform.

**What does an API integration cost?**

A single connection (A → B, with error handling and logging) starts at EUR 1,500 at Qovre. Complex multi-system workflows start at EUR 3,000. The payback period for almost any SME application is less than six months.`,
  },
  {
    slug: 'website-onderhoud-waarom-belangrijk',
    category: 'web-development',
    publishedAt: '2026-04-09',
    readingTimeMinutes: 4,
    titleNL: 'Waarom website-onderhoud geen kostenpost is maar een investering',
    titleEN: 'Why website maintenance is not a cost but an investment',
    teaserNL: 'Een website zonder onderhoud veroudert sneller dan u denkt. Beveiligingsgaten, verouderde afhankelijkheden en dalende prestaties zijn de stille killers van een goed converterende site.',
    teaserEN: 'A website without maintenance ages faster than you think. Security gaps, outdated dependencies, and declining performance are the silent killers of a high-converting site.',
    contentNL: `De meeste bedrijven behandelen website-onderhoud als een onnodige terugkerende kostenpost. Tot er iets mis gaat: een gehackte website, een betaalkoppeling die niet meer werkt, of een Google-penalisatie vanwege verouderde beveiligingsprotocollen. Op dat moment is een maand onderhoud goedkoper geweest dan één nacht crisisinterventie.

**Wat veroudert er precies?**

Frameworks en bibliotheken (Next.js, Node.js, plug-ins) krijgen regelmatig beveiligingsupdates. Zonder deze updates worden bekende kwetsbaarheden actief uitgebuit. SSL-certificaten verlopen. Betaalapparaten veranderen hun API. Browserstandaarden evolueren. Een website die vorig jaar perfect werkte kan dit jaar al problemen geven.

**De impact op SEO**

Google straft trage en onveilige websites af. Core Web Vitals verslechteren naarmate bibliotheken verouderen, afbeeldingen niet geoptimaliseerd worden bijgehouden, en caching-configuraties niet worden aangepast. Een site die eenmalig goed scoorde, verliest positie zonder actief onderhoud.

**Wat goed onderhoud inhoudt**

Maandelijkse afhankelijkheden-update en beveiligingsscan. Kwartaals performance-audit (Lighthouse, Core Web Vitals). Jaarlijkse inhoudelijke review: verouderde prijzen, inactieve contactpersonen, veranderde diensten. Monitoring van uptime en foutlogs.

**Hoe Qovre onderhoud aanpakt**

We bieden doorlopend onderhoud als transparant maandabonnement. U weet precies wat er gedaan wordt, wanneer en voor welk bedrag. Geen verrassingsfacturen, geen reactief brandblussen.`,
    contentEN: `Most businesses treat website maintenance as an unnecessary recurring cost — until something goes wrong: a hacked website, a payment integration that stops working, or a Google penalty due to outdated security protocols. At that point, one month of maintenance would have been cheaper than one night of crisis intervention.

**What actually goes out of date?**

Frameworks and libraries (Next.js, Node.js, plugins) receive regular security updates. Without these updates, known vulnerabilities are actively exploited. SSL certificates expire. Payment providers change their APIs. Browser standards evolve. A website that worked perfectly last year can already have problems this year.

**The impact on SEO**

Google penalises slow and insecure websites. Core Web Vitals deteriorate as libraries age, images are not kept optimised, and caching configurations are not adjusted. A site that once scored well loses position without active maintenance.

**What good maintenance involves**

Monthly dependency update and security scan. Quarterly performance audit (Lighthouse, Core Web Vitals). Annual content review: outdated prices, inactive contacts, changed services. Uptime and error log monitoring.

**How Qovre approaches maintenance**

We offer ongoing maintenance as a transparent monthly subscription. You know exactly what is done, when, and for what amount. No surprise invoices, no reactive firefighting.`,
  },
  {
    slug: 'mvp-saas-platform-bouwen',
    category: 'saas',
    publishedAt: '2026-04-10',
    readingTimeMinutes: 6,
    titleNL: 'Een SaaS MVP bouwen: hoe u snel valideert zonder technische schuld op te bouwen',
    titleEN: 'Building a SaaS MVP: how to validate fast without accumulating technical debt',
    teaserNL: 'Een Minimum Viable Product is bedoeld om snel te leren, niet om eeuwig live te blijven. Maar de keuzes die u in een MVP maakt, bepalen hoe moeilijk het wordt om daarna door te schalen.',
    teaserEN: 'A Minimum Viable Product is meant to learn fast, not to stay live forever. But the choices you make in an MVP determine how difficult it becomes to scale afterwards.',
    contentNL: `Het idee van een MVP is verleidelijk simpel: bouw het kleinste werkende product, test het met echte gebruikers, en leer. In de praktijk maken veel startups en scale-ups dezelfde fout: ze bouwen een MVP dat zo snel mogelijk feature-compleet moet zijn, in plaats van zo snel mogelijk validerend.

**Wat een MVP wél en niet moet doen**

Een MVP moet de kernhypothese testen — "willen gebruikers dit probleem op deze manier opgelost zien?" — en niets meer. Het hoeft niet schaalbaar te zijn, niet multi-tenant, niet perfect beveiligd. Het moet bewijzen dat het probleem bestaat en dat uw oplossing aansluit.

**De valkuil van de technische schuld**

Sommige shortcuts in een MVP zijn acceptabel (hardcoded configuratie, geen e-mailverificatie). Andere creëren schuld die later duur is om af te lossen: een monolithische database-architectuur die niet uitgesplitst kan worden, directe frontend-aanroepen naar de database zonder tussenlaag, of authenticatie die later niet uitbreidbaar is naar SSO. Het verschil leer je door ervaring — of door samen te werken met een partner die het eerder heeft gebouwd.

**Gefaseerde bouw: sprint 1-2-3**

Sprint 1: kern user journey (aanmelden, kernactie uitvoeren, resultaat zien). Sprint 2: authenticatie, basisbeheer, eerste feedback-loop. Sprint 3: iteratie op basis van gebruikersdata, of beslissing om te pivoten. Elke sprint levert iets testbaar op. U betaalt voor wat u leert, niet voor wat u hoopt.

**Wanneer MVP en wanneer meer?**

Als u al weet dat het product werkt — betalende klanten, herhaald gebruik, duidelijke retentie — dan is het tijd voor een productierijpe architectuur. Die overgang vergt planning. Qovre helpt teams bij zowel de MVP-fase als de doorgroei naar een schaalbaar platform.`,
    contentEN: `The idea of an MVP is deceptively simple: build the smallest working product, test it with real users, and learn. In practice, many startups and scale-ups make the same mistake: they build an MVP that must be feature-complete as fast as possible, rather than validating as fast as possible.

**What an MVP should and shouldn't do**

An MVP should test the core hypothesis — "do users want this problem solved in this way?" — and nothing more. It does not need to be scalable, multi-tenant, or perfectly secure. It needs to prove that the problem exists and that your solution fits.

**The technical debt trap**

Some shortcuts in an MVP are acceptable (hardcoded configuration, no email verification). Others create debt that is expensive to repay later: a monolithic database architecture that cannot be split, direct frontend calls to the database without a service layer, or authentication that is not extensible to SSO. The difference comes from experience — or from working with a partner who has built it before.

**Phased build: sprint 1-2-3**

Sprint 1: core user journey (sign up, perform core action, see result). Sprint 2: authentication, basic management, first feedback loop. Sprint 3: iteration based on user data, or decision to pivot. Each sprint delivers something testable. You pay for what you learn, not what you hope.

**When MVP and when more?**

If you already know the product works — paying customers, repeated use, clear retention — it is time for a production-ready architecture. That transition requires planning. Qovre helps teams through both the MVP phase and the transition to a scalable platform.`,
  },
]

export const BLOG_CATEGORIES: Record<BlogPost['category'], { nl: string; en: string }> = {
  'web-development': { nl: 'Webontwikkeling', en: 'Web Development' },
  'ai': { nl: 'AI & Automatisering', en: 'AI & Automation' },
  'saas': { nl: 'SaaS & Platformen', en: 'SaaS & Platforms' },
  'seo': { nl: 'SEO & Zichtbaarheid', en: 'SEO & Visibility' },
  'automation': { nl: 'Procesautomatisering', en: 'Process Automation' },
}
