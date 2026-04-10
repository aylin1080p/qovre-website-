import { generateMeta } from '@/lib/metadata'
import { FAQ_NL, BRAND } from '@/data/seo'

export async function generateMetadata() {
  return generateMeta({
    title: 'Veelgestelde vragen',
    description: 'Antwoorden op veelgestelde vragen over websites, webshops, SaaS, AI-oplossingen, kosten, doorlooptijd en het werkproces van Qovre.',
    path: '/nl/veelgestelde-vragen',
    locale: 'nl',
    alternateLocale: `${BRAND.websiteUrl}/en/faq`,
  })
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_NL.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
}

export default function FAQPageNL() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-[#060608] pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-block text-xs font-medium tracking-widest text-blue-400 uppercase mb-4">
              FAQ
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Veelgestelde vragen
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Antwoorden op de meest gestelde vragen over onze diensten, werkwijze en tarieven.
            </p>
          </div>

          {/* FAQ list */}
          <div className="flex flex-col divide-y divide-neutral-800">
            {FAQ_NL.map((item, i) => (
              <details
                key={i}
                className="group py-6 cursor-pointer"
              >
                <summary className="flex items-start justify-between gap-4 text-white font-medium text-base leading-snug list-none select-none">
                  <span>{item.question}</span>
                  <span className="mt-0.5 flex-shrink-0 text-neutral-500 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
                </summary>
                <p className="mt-4 text-neutral-400 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center">
            <p className="text-neutral-300 mb-6">Staat uw vraag er niet bij?</p>
            <a
              href="/nl/contact"
              className="inline-block px-6 py-3 bg-white text-black font-semibold text-sm rounded-full hover:bg-neutral-200 transition-colors"
            >
              Neem contact op
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
