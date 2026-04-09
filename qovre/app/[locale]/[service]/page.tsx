import ServiceDetail from '@/components/sections/ServiceDetail'
import { SERVICES } from '@/data/seo'

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    service: service.slug,
  }))
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; service: string }> }) {
  const { locale, service } = await params
  return <ServiceDetail slug={service} locale={locale} />
}
