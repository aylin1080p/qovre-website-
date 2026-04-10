import Link from 'next/link'
import { generateMeta } from '@/lib/metadata'
import { BRAND } from '@/data/seo'

export async function generateMetadata() {
  return generateMeta({
    title: 'Industries',
    description: 'Qovre builds websites, ecommerce, SaaS, and AI systems for businesses across professional services, retail, healthcare, technology, and logistics.',
    path: '/en/industries',
    locale: 'en',
    alternateLocale: `${BRAND.websiteUrl}/nl/sectoren`,
  })
}

const sectors = [
  {
    title: 'Professional services & SMEs',
    description:
      'Law firms, accountants, consultants, and independent professionals that need a reliable online presence to build credibility and generate enquiries. Fast delivery, clear structure, strong conversion path.',
    services: [
      { label: 'Business websites', href: '/en/business-websites' },
      { label: 'SEO & visibility', href: '/en/visibility-seo-geo' },
    ],
  },
  {
    title: 'Ecommerce & retail',
    description:
      'Brands and retailers that sell online and need a scalable, conversion-focused webshop with solid product architecture, payment integrations, and maintainability.',
    services: [
      { label: 'Ecommerce development', href: '/en/ecommerce-development' },
      { label: 'Ongoing support', href: '/en/ongoing-support' },
    ],
  },
  {
    title: 'SaaS platforms & technology',
    description:
      'Scale-ups and product teams that need a custom SaaS backbone, API layer, or internal tool — built for performance, multi-tenancy, and long-term ownership.',
    services: [
      { label: 'SaaS & custom software', href: '/en/saas-custom-software' },
      { label: 'AI & automation', href: '/en/ai-automation' },
    ],
  },
  {
    title: 'Healthcare & practices',
    description:
      'Medical practices, therapists, and care providers who need a professional website with clear intake flows, GDPR-compliant forms, and optionally an AI intake assistant.',
    services: [
      { label: 'Business websites', href: '/en/business-websites' },
      { label: 'AI chatbot & assistant', href: '/en/ai-chatbot-assistant' },
    ],
  },
  {
    title: 'Growth-focused businesses',
    description:
      'Companies investing in long-term discoverability through technical SEO, GEO, structured data, city landing pages, FAQ architecture, and machine-readable content.',
    services: [
      { label: 'SEO & visibility', href: '/en/visibility-seo-geo' },
      { label: 'Content & growth', href: '/en/content-growth' },
    ],
  },
]

export default function IndustriesPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-24 px-4 bg-[#060608]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase text-blue-400 border border-blue-500/20 bg-blue-500/5 rounded-full">
            Industries
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white leading-[1.05]">
            Who we work with
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed">
            Qovre works remotely with businesses across the Netherlands. Below are the sectors we have the most experience building for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {sectors.map((sector) => (
            <div
              key={sector.title}
              className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/50 flex flex-col gap-6"
            >
              <div>
                <h2 className="text-xl font-bold text-white mb-3">{sector.title}</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">{sector.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {sector.services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white hover:border-blue-500/40 transition-all"
                  >
                    {s.label} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-semibold mb-1">Not sure what you need?</p>
            <p className="text-neutral-500 text-sm">We help scope projects — no commitment required.</p>
          </div>
          <Link
            href="/en/contact"
            className="flex-shrink-0 px-6 py-3 bg-white text-black font-semibold text-sm rounded-full hover:bg-neutral-200 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  )
}
