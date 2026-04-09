import { useLocale } from 'next-intl'
import Hero from '@/components/sections/Hero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import TrustBar from '@/components/sections/TrustBar'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  const locale = useLocale()

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      <Hero />
      <ServicesGrid locale={locale} />
      <TrustBar locale={locale} />
      <Process />
      <FAQ locale={locale} />
      <ContactSection locale={locale} />
    </div>
  )
}
