import { useLocale } from 'next-intl'
import Hero from '@/components/sections/Hero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import ContactForm from '@/components/sections/ContactForm'

export default function HomePage() {
  const locale = useLocale()

  return (
    <div className="flex flex-col gap-0 overflow-x-hidden">
      <Hero />
      <ServicesGrid locale={locale} />
      <Process />
      <FAQ locale={locale} />
      <ContactForm />
    </div>
  )
}
