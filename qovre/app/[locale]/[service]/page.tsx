import ServiceDetail from '@/components/sections/ServiceDetail'
import { SERVICES, BRAND } from '@/data/seo'
import { generateMeta } from '@/lib/metadata'

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    service: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; service: string }> }) {
  const { locale, service: slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}

  const isNL = locale === 'nl'
  const title = isNL ? service.titleNL : service.titleEN
  const description = isNL ? service.shortDescriptionNL : service.shortDescriptionEN
  const path = `/${locale}/${slug}`
  const alternatePath = `${BRAND.websiteUrl}/${isNL ? 'en' : 'nl'}/${slug}`

  return generateMeta({ title, description, path, locale: locale as 'nl' | 'en', alternateLocale: alternatePath })
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; service: string }> }) {
  const { locale, service: slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)

  const serviceSchema = service ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'nl' ? service.titleNL : service.titleEN,
    description: locale === 'nl' ? service.shortDescriptionNL : service.shortDescriptionEN,
    provider: {
      '@type': 'Organization',
      name: BRAND.brandName,
      url: BRAND.websiteUrl,
    },
    areaServed: { '@type': 'Country', name: 'Netherlands' },
    url: `${BRAND.websiteUrl}/${locale}/${slug}`,
  } : null

  return (
    <>
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      <ServiceDetail slug={slug} locale={locale} />
    </>
  )
}
