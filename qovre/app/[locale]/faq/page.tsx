import { generateMeta } from '@/lib/metadata'
import { FAQ_EN, BRAND } from '@/data/seo'

export async function generateMetadata() {
  return generateMeta({
    title: 'Frequently Asked Questions',
    description: 'Answers to common questions about websites, ecommerce, SaaS, AI solutions, pricing, timelines, and how Qovre works.',
    path: '/en/faq',
    locale: 'en',
    alternateLocale: `${BRAND.websiteUrl}/nl/veelgestelde-vragen`,
  })
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_EN.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
}

export default function FAQPageEN() {
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
              Frequently asked questions
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Answers to the most common questions about our services, process, and pricing.
            </p>
          </div>

          {/* FAQ list */}
          <div className="flex flex-col divide-y divide-neutral-800">
            {FAQ_EN.map((item, i) => (
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
            <p className="text-neutral-300 mb-6">Can&apos;t find your question?</p>
            <a
              href="/en/contact"
              className="inline-block px-6 py-3 bg-white text-black font-semibold text-sm rounded-full hover:bg-neutral-200 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
