import { generateMeta } from '@/lib/metadata'
import { BRAND } from '@/data/seo'
import OnboardingForm from '@/components/sections/OnboardingForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return generateMeta({
    title: locale === 'nl'
      ? 'Start je project — vertel ons wat je nodig hebt'
      : 'Start your project — tell us what you need',
    description: locale === 'nl'
      ? 'Beantwoord een paar vragen over je project en ontvang binnen 24 uur een persoonlijk voorstel van Qovre.'
      : 'Answer a few questions about your project and receive a personal proposal from Qovre within 24 hours.',
    path: `/${locale}/start`,
    locale: locale as 'nl' | 'en',
    alternateLocale: locale === 'nl' ? `${BRAND.websiteUrl}/en/start` : `${BRAND.websiteUrl}/nl/start`,
  })
}

export default async function StartPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <main className="min-h-screen bg-[#060608] pt-28 pb-24 px-4">
      <div className="container max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-3">
            {locale === 'nl' ? 'Projectaanvraag' : 'Project inquiry'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {locale === 'nl'
              ? 'Vertel ons over je project'
              : 'Tell us about your project'}
          </h1>
          <p className="text-neutral-400 text-base leading-relaxed max-w-md mx-auto">
            {locale === 'nl'
              ? 'Beantwoord een paar vragen zodat we een gericht voorstel kunnen sturen. Duurt minder dan 3 minuten.'
              : 'Answer a few questions so we can send you a tailored proposal. Takes less than 3 minutes.'}
          </p>
        </div>

        <OnboardingForm locale={locale} />
      </div>
    </main>
  )
}
