import Process from '@/components/sections/Process'
import { generateMeta } from '@/lib/metadata'
import { BRAND } from '@/data/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return generateMeta({
    title: 'How we work',
    description: "From first call to live delivery — Qovre's transparent step-by-step project process.",
    path: `/${locale}/process`,
    locale: 'en',
    alternateLocale: `${BRAND.websiteUrl}/nl/werkwijze`,
  })
}

export default function ProcessPage() {
  return (
    <div className="pt-16 bg-[#060608] min-h-screen">
      <Process />
    </div>
  )
}
