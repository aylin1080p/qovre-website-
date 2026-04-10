import Process from '@/components/sections/Process'
import { generateMeta } from '@/lib/metadata'
import { BRAND } from '@/data/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return generateMeta({
    title: locale === 'nl' ? 'Werkwijze' : 'How we work',
    description: locale === 'nl'
      ? 'Van eerste gesprek tot oplevering — de werkwijze van Qovre stap voor stap uitgelegd.'
      : "From first call to live delivery — Qovre's transparent step-by-step project process.",
    path: `/${locale}/process`,
    locale: locale as 'nl' | 'en',
    alternateLocale: `${BRAND.websiteUrl}/${locale === 'nl' ? 'en' : 'nl'}/process`,
  })
}

export default async function ProcessPage() {
  return (
    <div className="pt-16 bg-[#060608] min-h-screen">
      <Process />
    </div>
  )
}
