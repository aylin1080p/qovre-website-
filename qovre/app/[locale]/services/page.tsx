import Link from 'next/link'
import { SERVICES, BRAND } from '@/data/seo'
import { generateMeta } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return generateMeta({
    title: locale === 'nl' ? 'Diensten' : 'Services',
    description: locale === 'nl'
      ? 'Bekijk alle digitale diensten van Qovre: websites, ecommerce, SaaS, AI en SEO.'
      : 'Explore all Qovre services: websites, ecommerce, SaaS, AI automation, and SEO.',
    path: `/${locale}/services`,
    locale: locale as 'nl' | 'en',
  })
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <div className="relative min-h-screen pt-24 pb-24 px-4 bg-[#060608]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase text-blue-400 border border-blue-500/20 bg-blue-500/5 rounded-full">
            {locale === 'nl' ? 'Wat we doen' : 'What we do'}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white leading-[1.05]">
            {locale === 'nl' ? 'Diensten' : 'Services'}
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            {BRAND.positioning[locale as 'nl' | 'en']}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/${locale}/${service.slug}`}
              className="group p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 rounded-full border-2 border-blue-500/50" />
                </div>
                <h2 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {locale === 'nl' ? service.titleNL : service.titleEN}
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {locale === 'nl' ? service.shortDescriptionNL : service.shortDescriptionEN}
                </p>
              </div>
              <span className="text-sm font-semibold text-neutral-500 group-hover:text-white transition-colors flex items-center gap-1">
                {locale === 'nl' ? 'Meer informatie' : 'Learn more'}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity"> →</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
