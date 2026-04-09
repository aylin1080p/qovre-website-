import CityLanding from '@/components/sections/CityLanding'
import { TARGET_CITIES } from '@/data/seo'

export async function generateStaticParams() {
  return TARGET_CITIES.map((city) => ({
    city: city.slug,
  }))
}

export default async function CityNLPage({ params }: { params: Promise<{ locale: string; city: string }> }) {
  const { locale, city } = await params
  return <CityLanding citySlug={city} locale={locale} />
}
