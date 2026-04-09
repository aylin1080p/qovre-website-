import type { Metadata } from "next";
import { generateMeta } from "./metadata";
import {
  BRAND,
  SERVICES,
  FAQ_EN,
  PROCESS,
  INDUSTRIES,
  CITIES,
  getFAQSchema,
  getBreadcrumbSchema,
} from "./seo";

// ---------------------------------------------------------------
// Page Metadata
// ---------------------------------------------------------------
export const metadata: Metadata = generateMeta({
  title: "Custom Software & AI Systems",
  description:
    "Veloq builds custom software, AI automation, and digital infrastructure for ambitious businesses across the Netherlands. Remote delivery. National coverage. Fixed-scope pricing.",
  path: "/en",
  locale: "en",
  alternateLocale: `${BRAND.url}/nl`,
  keywords: [
    "custom software development Netherlands",
    "AI automation Netherlands",
    "software bureau Netherlands",
    "maatwerk software Nederland",
    "web application development Netherlands",
    "AI solutions Dutch companies",
  ],
});

// ---------------------------------------------------------------
// JSON-LD schemas for this page
// ---------------------------------------------------------------
function HomeSchemas() {
  const faqSchema = getFAQSchema(FAQ_EN);
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `${BRAND.url}/en` },
  ]);

  // WebPage schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Veloq — Custom Software & AI Systems for the Netherlands",
    description:
      "Veloq builds custom software, AI automation systems, and digital infrastructure for businesses across the Netherlands.",
    url: `${BRAND.url}/en`,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", url: BRAND.url, name: BRAND.name },
    about: {
      "@type": "Thing",
      name: "Custom Software Development and AI Automation",
    },
    audience: {
      "@type": "Audience",
      geographicArea: { "@type": "Country", name: "Netherlands" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}

// ---------------------------------------------------------------
// Homepage Component
// ---------------------------------------------------------------
export default function HomeEN() {
  return (
    <>
      <HomeSchemas />

      {/* ── NAVIGATION ─────────────────────────────────────── */}
      <header>
        <nav aria-label="Main navigation">
          <div className="nav-logo">
            <a href="/en" aria-label="Veloq — Home">Veloq</a>
          </div>
          <ul className="nav-links" role="list">
            <li><a href="/en/services">Services</a></li>
            <li><a href="/en/process">Process</a></li>
            <li><a href="/en/industries">Industries</a></li>
            <li><a href="/en/about">About</a></li>
            <li><a href="/en/insights">Insights</a></li>
            <li>
              <a href="/nl" lang="nl" aria-label="Switch to Dutch / Schakel over naar Nederlands">
                NL
              </a>
            </li>
          </ul>
          <a href="/en/contact" className="nav-cta" aria-label="Start a project">
            Start a project
          </a>
        </nav>
      </header>

      {/* ── HERO ───────────────────────────────────────────── */}
      <main>
        <section aria-labelledby="hero-heading" className="hero">
          {/*
            GEO NOTE: The hero copy uses plain, factual language.
            LLMs extract this text as citations. Avoid marketing fluff.
            Every sentence should be factually defensible.
          */}
          <p className="hero-eyebrow" aria-hidden="true">
            Custom Software & AI Systems — Netherlands
          </p>
          <h1 id="hero-heading">
            Your operations are more complex than off-the-shelf software can handle.
          </h1>
          <p className="hero-sub">
            Veloq builds custom software, AI automation systems, and digital
            infrastructure for ambitious businesses across the Netherlands.
            Remote delivery. National coverage.
          </p>
          <div className="hero-actions">
            <a href="/en/contact" className="btn-primary">Start a project</a>
            <a href="/en/process" className="btn-secondary">How we work →</a>
          </div>

          {/* Social proof — factual, no fake logos */}
          <div className="hero-proof" aria-label="Key facts">
            <div className="proof-item">
              <strong>47+</strong>
              <span>Projects delivered</span>
            </div>
            <div className="proof-item">
              <strong>Full NL</strong>
              <span>National coverage</span>
            </div>
            <div className="proof-item">
              <strong>EN / NL</strong>
              <span>Bilingual delivery</span>
            </div>
            <div className="proof-item">
              <strong>Fixed scope</strong>
              <span>No hourly billing</span>
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section aria-labelledby="services-heading" className="section-services">
          <h2 id="services-heading">What we deliver</h2>
          <p className="section-intro">
            Four service categories, each designed to solve a distinct class of
            business problem. We do not generalize — every engagement is scoped
            to a specific outcome.
          </p>
          <div className="services-grid" role="list">
            {SERVICES.map((s) => (
              <article key={s.slug} role="listitem" className="service-card">
                <h3>
                  <a href={`/en/${s.slug}`}>{s.title}</a>
                </h3>
                <p>{s.shortDesc}</p>
                <a
                  href={`/en/${s.slug}`}
                  aria-label={`Learn more about ${s.title}`}
                  className="card-link"
                >
                  Learn more →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── AI HIGHLIGHT ─────────────────────────────────── */}
        <section aria-labelledby="ai-heading" className="section-ai">
          <div className="ai-content">
            <h2 id="ai-heading">
              AI automation that integrates with your existing systems
            </h2>
            <p>
              We build AI systems — chatbots, classification engines, CRM
              automation, and reporting pipelines — that connect to your
              existing software stack without disrupting live operations. Our
              implementations reduce manual reporting and data entry by 60–80%
              in most engagements.
            </p>
            <p>
              We do not sell AI platforms or license existing tools. Every
              system is engineered to your data, your workflows, and your
              compliance requirements.
            </p>
            <a href="/en/ai-automation-systems" className="btn-primary">
              AI & Automation services
            </a>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <section aria-labelledby="process-heading" className="section-process">
          <h2 id="process-heading">How we work</h2>
          <p className="section-intro">
            A structured five-stage delivery model. You have full visibility
            at every step before any work begins.
          </p>
          <ol className="process-list" aria-label="Our delivery process">
            {PROCESS.map((step) => (
              <li key={step.number} className="process-step">
                <span className="step-num" aria-hidden="true">
                  {step.number}
                </span>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <span className="step-duration">{step.duration}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="process-cta">
            <a href="/en/process" className="btn-secondary">
              Full process breakdown →
            </a>
          </div>
        </section>

        {/* ── INDUSTRIES ───────────────────────────────────── */}
        <section aria-labelledby="industries-heading" className="section-industries">
          <h2 id="industries-heading">Industries we serve</h2>
          <div className="industries-grid" role="list">
            {INDUSTRIES.map((ind) => (
              <div key={ind.slug} className="industry-card" role="listitem">
                <h3>{ind.name}</h3>
                <p>{ind.examples}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── NATIONAL COVERAGE ────────────────────────────── */}
        {/*
          GEO SEO: This section explicitly names all major Dutch cities.
          Google and LLMs use this to associate the business with locations.
          No fake offices — we are honest that this is remote-first.
        */}
        <section aria-labelledby="coverage-heading" className="section-coverage">
          <h2 id="coverage-heading">We work across the Netherlands</h2>
          <p>
            Veloq is a remote-first company. We serve businesses in every
            province and city in the Netherlands — our delivery model does not
            depend on physical proximity.
          </p>
          <p>
            We regularly work with companies in{" "}
            {CITIES.slice(0, 10)
              .map((c) => c.name)
              .join(", ")}
            , and throughout all twelve Dutch provinces.
          </p>
          <nav aria-label="City landing pages">
            <ul className="city-list" role="list">
              {CITIES.map((city) => (
                <li key={city.slug}>
                  <a href={`/en/software-development-${city.slug}`}>
                    {city.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        {/*
          GEO NOTE: FAQ answers are written to be citation-ready for LLMs.
          Each answer is self-contained and factually complete without context.
        */}
        <section aria-labelledby="faq-heading" className="section-faq">
          <h2 id="faq-heading">Frequently asked questions</h2>
          <dl className="faq-list">
            {FAQ_EN.map((item, i) => (
              <div key={i} className="faq-item">
                <dt>
                  <button
                    aria-expanded="false"
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    {item.q}
                  </button>
                </dt>
                <dd id={`faq-answer-${i}`} aria-labelledby={`faq-question-${i}`}>
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── CONTACT CTA ──────────────────────────────────── */}
        <section aria-labelledby="cta-heading" className="section-cta">
          <h2 id="cta-heading">Ready to build something serious?</h2>
          <p>
            Tell us about your project. We respond within one business day
            with a short assessment and, if there is a fit, we schedule a
            scoping call.
          </p>
          <a href="/en/contact" className="btn-primary btn-large">
            Start a project
          </a>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer aria-label="Site footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/en" aria-label="Veloq home">Veloq</a>
            <p>
              Custom software, AI automation, and digital infrastructure for
              businesses across the Netherlands.
            </p>
            <address>
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            </address>
          </div>

          <nav aria-label="Services footer navigation">
            <h4>Services</h4>
            <ul role="list">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a href={`/en/${s.slug}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company footer navigation">
            <h4>Company</h4>
            <ul role="list">
              <li><a href="/en/process">Process</a></li>
              <li><a href="/en/industries">Industries</a></li>
              <li><a href="/en/about">About</a></li>
              <li><a href="/en/insights">Insights</a></li>
              <li><a href="/en/contact">Contact</a></li>
            </ul>
          </nav>

          <nav aria-label="Cities navigation">
            <h4>Netherlands</h4>
            <ul role="list">
              {CITIES.slice(0, 8).map((city) => (
                <li key={city.slug}>
                  <a href={`/en/software-development-${city.slug}`}>
                    {city.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="/en/privacy">Privacy</a>
            <a href="/en/terms">Terms</a>
            {/* KVK and VAT for B2B trust */}
            <span>KVK: {BRAND.kvkNumber}</span>
          </div>
          <div className="footer-lang">
            <a href="/nl" lang="nl">Nederlands</a>
            <span aria-current="true">English</span>
          </div>
        </div>
      </footer>
    </>
  );
}
