import { getTranslations } from 'next-intl/server'
import ContactForm from '@/components/sections/ContactForm'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  const trustItems =
    locale === 'nl'
      ? [
          'Reactie binnen 1 werkdag',
          'Vrijblijvend eerste gesprek',
          'Vaste prijs per project',
          'Geen verborgen kosten',
        ]
      : [
          'Response within 1 business day',
          'No-obligation initial call',
          'Fixed price per project',
          'No hidden costs',
        ]

  return (
    <div className="relative min-h-screen pt-24 pb-24 px-4 bg-[#060608]">
      {/* Background glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[30%] h-[30%] rounded-full bg-indigo-600/4 blur-[100px]" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase text-blue-400 border border-blue-500/20 bg-blue-500/5 rounded-full">
            {locale === 'nl' ? 'Direct contact' : 'Get in touch'}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-[1.05]">
            {t('sectionTitle')}
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed">
            {t('sectionSubtitle')}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: form */}
          <div>
            <ContactForm />

            {/* Legal links */}
            <div className="mt-8 pt-6 border-t border-neutral-900">
              <p className="text-xs text-neutral-600">
                {locale === 'nl'
                  ? 'Uw gegevens worden verwerkt conform ons '
                  : 'Your data is processed in accordance with our '}
                <a
                  href="/legal/privacy-policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-300 underline underline-offset-2 transition-colors"
                >
                  {locale === 'nl' ? 'privacybeleid' : 'privacy policy'}
                </a>
                {locale === 'nl' ? ' en ' : ' and '}
                <a
                  href="/legal/data-processing-agreement.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-300 underline underline-offset-2 transition-colors"
                >
                  {locale === 'nl' ? 'verwerkersovereenkomst' : 'data processing agreement'}
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right: trust + info */}
          <div className="space-y-8">

            {/* Trust checklist */}
            <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800/50">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6">
                {locale === 'nl' ? 'Wat u kunt verwachten' : 'What to expect'}
              </h2>
              <ul className="space-y-4">
                {trustItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct contact */}
            <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800/50">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6">
                {locale === 'nl' ? 'Direct bereikbaar' : 'Reach us directly'}
              </h2>
              <div className="space-y-4">
                <a
                  href="mailto:contact@qovre.nl"
                  className="flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition-colors group"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  contact@qovre.nl
                </a>
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center">
                    <svg className="w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  Den Haag, Nederland
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
