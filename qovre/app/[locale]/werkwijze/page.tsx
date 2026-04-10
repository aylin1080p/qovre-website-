import Process from '@/components/sections/Process'
import { generateMeta } from '@/lib/metadata'
import { BRAND } from '@/data/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return generateMeta({
    title: 'Werkwijze',
    description: 'Van eerste gesprek tot oplevering — de werkwijze van Qovre stap voor stap uitgelegd.',
    path: `/${locale}/werkwijze`,
    locale: 'nl',
    alternateLocale: `${BRAND.websiteUrl}/en/process`,
  })
}

export default function WerkwijzePage() {
  return (
    <div className="pt-16 bg-[#060608] min-h-screen">
      <Process />
    </div>
  )
}
