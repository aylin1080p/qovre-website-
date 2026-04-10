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
    title: `Software development ${city.city}`,
    description: `Qovre builds websites, SaaS platforms, and AI systems for businesses in ${city.city} and the surrounding region. Remote working model, fixed price, fast delivery.`,
    path: `/en/software-development-${citySlug}`,
    locale: 'en',
    alternateLocale: `${BRAND.websiteUrl}/nl/software-ontwikkeling-${citySlug}`,
  })
}

export default async function CityENPage({ params }: { params: Promise<{ locale: string; city: string }> }) {
  const { locale, city: citySlug } = await params
  const city = TARGET_CITIES.find((c) => c.slug === citySlug)

  const localBusinessSchema = city ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND.brandName,
    url: `${BRAND.websiteUrl}/en/software-development-${citySlug}`,
    email: BRAND.email.primary,
    telephone: BRAND.phone.international,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BRAND.location.city,
      addressCountry: 'NL',
    },
    areaServed: {
      '@type': 'City',
      name: city.city,
    },
    description: `Qovre delivers software development and digital solutions for businesses in ${city.city}.`,
  } : null

  return (
    <>
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}
      <CityLanding citySlug={citySlug} locale={locale} />
    </>
  )
}
