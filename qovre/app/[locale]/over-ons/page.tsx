import Link from 'next/link'
import { BRAND } from '@/data/seo'
import { generateMeta } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return generateMeta({
    title: 'Over ons',
    description: 'Qovre is een digitaal bureau in Den Haag dat websites, SaaS en AI-systemen bouwt voor bedrijven in Nederland.',
    path: `/${locale}/over-ons`,
    locale: 'nl',
    alternateLocale: `${BRAND.websiteUrl}/en/about`,
  })
}

export default function OverOnsPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className="relative min-h-screen pt-24 pb-24 px-4 bg-[#060608]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[35%] h-[35%] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="relative z-10 container max-w-5xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase text-blue-400 border border-blue-500/20 bg-blue-500/5 rounded-full">
            Over ons
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-[1.05]">
            Qovre
          </h1>
          <p className="text-xl text-neutral-300 leading-relaxed mb-4">
            {BRAND.positioning.nl}
          </p>
          <p className="text-neutral-500 text-sm">
            {BRAND.legal.operatorDisclosure.nl}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {BRAND.differentiators.nl.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/50">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p className="text-neutral-300 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/nl/contact" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors text-sm">
            Neem contact op
          </Link>
          <Link href="/nl/diensten" className="px-8 py-4 border border-neutral-800 text-neutral-300 font-semibold rounded-full hover:bg-neutral-900 transition-colors text-sm">
            Bekijk diensten
          </Link>
        </div>
      </div>
    </div>
  )
}
