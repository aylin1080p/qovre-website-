import { generateMeta } from '@/lib/metadata'
import { BRAND } from '@/data/seo'
import Hero from '@/components/sections/Hero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import TrustBar from '@/components/sections/TrustBar'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import ContactSection from '@/components/sections/ContactSection'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return generateMeta({
    title: locale === 'nl'
      ? 'Websites, Webshops, SaaS en AI voor bedrijven in Nederland'
      : 'Websites, Ecommerce, SaaS and AI for businesses in the Netherlands',
    description: locale === 'nl'
      ? 'Qovre bouwt schaalbare websites, webshops, SaaS-platformen, AI-automatisering en technische SEO/GEO voor bedrijven in Nederland.'
      : 'Qovre builds scalable websites, ecommerce, SaaS platforms, AI automation, and technical SEO/GEO for businesses in the Netherlands.',
    path: `/${locale}`,
    locale: locale as 'nl' | 'en',
    alternateLocale: locale === 'nl' ? `${BRAND.websiteUrl}/en` : `${BRAND.websiteUrl}/nl`,
  })
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: BRAND.brandName,
  url: BRAND.websiteUrl,
  description: BRAND.tagline.nl,
  inLanguage: ['nl', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BRAND.websiteUrl}/nl/faq`,
    'query-input': 'required name=search_term_string',
  },
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="flex flex-col gap-0 overflow-x-hidden">
        <Hero />
        <ServicesGrid locale={locale} />
        <TrustBar locale={locale} />
        <Process />
        <FAQ locale={locale} />
        <ContactSection locale={locale} />
      </div>
    </>
  )
}
