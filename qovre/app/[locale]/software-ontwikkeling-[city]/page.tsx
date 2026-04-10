import CityLanding from '@/components/sections/CityLanding'
import { TARGET_CITIES, BRAND } from '@/data/seo'
import { generateMeta } from '@/lib/metadata'

export async function generateStaticParams() {
  return TARGET_CITIES.map((city) => ({
    city: city.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; city: string }> }) {
  const { city: citySlug } = await params
  const city = TARGET_CITIES.find((c) => c.slug === citySlug)
  if (!city) return {}

  return generateMeta({
    title: `Software ontwikkeling ${city.city}`,
    description: `Qovre bouwt websites, SaaS-platformen en AI-oplossingen voor bedrijven in ${city.city} en omgeving. Remote werkwijze, vaste prijs, snelle oplevering.`,
    path: `/nl/software-ontwikkeling-${citySlug}`,
    locale: 'nl',
    alternateLocale: `${BRAND.websiteUrl}/en/software-development-${citySlug}`,
  })
}

export default async function CityNLPage({ params }: { params: Promise<{ locale: string; city: string }> }) {
  const { locale, city: citySlug } = await params
  const city = TARGET_CITIES.find((c) => c.slug === citySlug)

  const localBusinessSchema = city ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND.brandName,
    url: `${BRAND.websiteUrl}/nl/software-ontwikkeling-${citySlug}`,
    email: BRAND.email.primary,
    telephone: BRAND.phone.international,
    address: { '@type': 'PostalAddress', addressLocality: BRAND.location.city, addressCountry: 'NL' },
    areaServed: { '@type': 'City', name: city.city },
    description: `Qovre levert software ontwikkeling en digitale oplossingen voor bedrijven in ${city.city}.`,
  } : null

  const breadcrumbSchema = city ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Qovre', item: `${BRAND.websiteUrl}/nl` },
      { '@type': 'ListItem', position: 2, name: `Software ontwikkeling ${city.city}`, item: `${BRAND.websiteUrl}/nl/software-ontwikkeling-${citySlug}` },
    ],
  } : null

  return (
    <>
      {localBusinessSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      )}
      <CityLanding citySlug={citySlug} locale={locale} />
    </>
  )
}
