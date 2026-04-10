import Link from 'next/link'
import { generateMeta } from '@/lib/metadata'
import { BRAND } from '@/data/seo'

export async function generateMetadata() {
  return generateMeta({
    title: 'Sectoren',
    description: 'Qovre bouwt websites, webshops, SaaS-platformen en AI-oplossingen voor bedrijven in zakelijke dienstverlening, retail, zorg, technologie en meer.',
    path: '/nl/sectoren',
    locale: 'nl',
    alternateLocale: `${BRAND.websiteUrl}/en/industries`,
  })
}

const sectoren = [
  {
    title: 'Zakelijke dienstverlening & MKB',
    description:
      'Advocaten, accountants, consultants en zelfstandigen die een betrouwbare online aanwezigheid nodig hebben om vertrouwen op te bouwen en aanvragen te genereren. Snelle oplevering, heldere structuur, sterke conversieopbouw.',
    diensten: [
      { label: 'Zakelijke websites op maat', href: '/nl/business-websites' },
      { label: 'SEO & vindbaarheid', href: '/nl/visibility-seo-geo' },
    ],
  },
  {
    title: 'E-commerce & retail',
    description:
      'Merken en retailers die online verkopen en een schaalbare, conversiegerichte webshop nodig hebben met een sterke productarchitectuur, betaalintegraties en goede beheerbaarheid.',
    diensten: [
      { label: 'Webshop ontwikkeling', href: '/nl/ecommerce-development' },
      { label: 'Doorlopend onderhoud', href: '/nl/ongoing-support' },
    ],
  },
  {
    title: 'SaaS-platformen & technologie',
    description:
      'Scale-ups en productteams die een maatwerk SaaS-backbone, API-laag of intern tool nodig hebben — gebouwd voor performance, multi-tenancy en langdurig eigenaarschap.',
    diensten: [
      { label: 'SaaS & maatwerkplatformen', href: '/nl/saas-custom-software' },
      { label: 'AI & automatisering', href: '/nl/ai-automation' },
    ],
  },
  {
    title: 'Zorg, praktijken & advies',
    description:
      'Medische praktijken, therapeuten en zorgverleners die een professionele website nodig hebben met heldere intakeflows, AVG-conforme formulieren en optioneel een AI-intakeassistent.',
    diensten: [
      { label: 'Zakelijke websites op maat', href: '/nl/business-websites' },
      { label: 'AI chatbot & assistent', href: '/nl/ai-chatbot-assistant' },
    ],
  },
  {
    title: 'Groeigerichte ondernemingen',
    description:
      'Bedrijven die investeren in langdurige vindbaarheid via technische SEO, GEO, structured data, city landing pages, FAQ-architectuur en machineleesbare content.',
    diensten: [
      { label: 'SEO & vindbaarheid', href: '/nl/visibility-seo-geo' },
      { label: 'Content & groei', href: '/nl/content-growth' },
    ],
  },
]

export default function SectorenPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-24 px-4 bg-[#060608]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase text-blue-400 border border-blue-500/20 bg-blue-500/5 rounded-full">
            Sectoren
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white leading-[1.05]">
            Voor wie we bouwen
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed">
            Qovre werkt remote voor bedrijven door heel Nederland. Dit zijn de sectoren waarvoor we het meest bouwen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {sectoren.map((sector) => (
            <div
              key={sector.title}
              className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/50 flex flex-col gap-6"
            >
              <div>
                <h2 className="text-xl font-bold text-white mb-3">{sector.title}</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">{sector.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {sector.diensten.map((s) => (
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
            <p className="text-white font-semibold mb-1">Weet u nog niet precies wat u nodig heeft?</p>
            <p className="text-neutral-500 text-sm">We helpen bij het scopen van projecten — geheel vrijblijvend.</p>
          </div>
          <Link
            href="/nl/contact"
            className="flex-shrink-0 px-6 py-3 bg-white text-black font-semibold text-sm rounded-full hover:bg-neutral-200 transition-colors"
          >
            Neem contact op
          </Link>
        </div>
      </div>
    </div>
  )
}
