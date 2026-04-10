'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICES, FAQ } from '@/data/seo'
import { fadeUp, staggerContainer, viewportOnce, scaleUp, faqAnswer } from '@/lib/animations'
import ContactForm from '@/components/sections/ContactForm'
import { notFound } from 'next/navigation'

interface ServiceDetailProps {
  slug: string
  locale: string
}

function getCTAHeadline(category: string, locale: string): string {
  const map: Record<string, { nl: string; en: string }> = {
    'web-development': { nl: 'Klaar voor een professionele website?', en: 'Ready for a professional website?' },
    'ecommerce': { nl: 'Uw webshop laten bouwen?', en: 'Ready to build your webshop?' },
    'saas': { nl: 'Een maatwerk platform bouwen?', en: 'Ready to build a custom platform?' },
    'automation': { nl: 'Uw processen slimmer inrichten?', en: 'Ready to automate your processes?' },
    'ai-chatbots': { nl: 'Een AI-assistent voor uw website?', en: 'Ready to add an AI assistant?' },
    'seo-geo': { nl: 'Beter gevonden worden?', en: 'Ready to improve your discoverability?' },
    'maintenance': { nl: 'Betrouwbaar onderhoud nodig?', en: 'Need reliable ongoing support?' },
  }
  const fallback = { nl: 'Klaar om te starten?', en: 'Ready to get started?' }
  const entry = map[category] ?? fallback
  return locale === 'nl' ? entry.nl : entry.en
}

export default function ServiceDetail({ slug, locale }: ServiceDetailProps) {
  const service = SERVICES.find((s) => s.slug === slug)
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  if (!service) notFound()

  const title = locale === 'nl' ? service.titleNL : service.titleEN
  const description = locale === 'nl' ? service.fullDescriptionNL : service.fullDescriptionEN
  const features = locale === 'nl' ? service.deliverablesNL : service.deliverablesEN
  const pricingNote = locale === 'nl' ? service.pricing.noteNL : service.pricing.noteEN
  const timelineNote = locale === 'nl' ? service.timeline.typicalNL : service.timeline.typicalEN

  // Filter FAQ items relevant to this service via faqHooks
  const relevantFAQ = FAQ.filter((f) => service.faqHooks.includes(f.category)).slice(0, 4)

  return (
    <article className="pt-32 pb-24 px-4 bg-[#060608] min-h-screen">
      <div className="container max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-20 text-center"
        >
          <motion.span variants={fadeUp} className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            {locale === 'nl' ? 'Onze Expertise' : 'Our Expertise'}
          </motion.span>
          <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight text-white">
            {title}
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            {locale === 'nl' ? service.shortDescriptionNL : service.shortDescriptionEN}
          </p>
        </motion.div>

        {/* Description + Deliverables */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-start"
        >
          <div className="prose prose-invert prose-lg max-w-none text-neutral-300 leading-relaxed">
            <p className="whitespace-pre-line">{description}</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={scaleUp}
                className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 flex gap-4"
              >
                <span className="text-blue-500 font-bold shrink-0">✓</span>
                <span className="text-neutral-200 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing + Timeline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <div className="p-7 rounded-2xl bg-neutral-900/40 border border-neutral-800/50">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">
              {locale === 'nl' ? 'Investering' : 'Investment'}
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed">{pricingNote}</p>
          </div>
          <div className="p-7 rounded-2xl bg-neutral-900/40 border border-neutral-800/50">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">
              {locale === 'nl' ? 'Doorlooptijd' : 'Timeline'}
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed">{timelineNote}</p>
          </div>
        </motion.div>

        {/* Relevant FAQ */}
        {relevantFAQ.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-16"
          >
            <h2 className="text-xl font-bold text-white mb-6">
              {locale === 'nl' ? 'Veelgestelde vragen' : 'Frequently asked questions'}
            </h2>
            <div className="flex flex-col divide-y divide-neutral-800 rounded-2xl border border-neutral-800 overflow-hidden">
              {relevantFAQ.map((item) => (
                <div key={item.id} className="bg-neutral-900/30">
                  <button
                    onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-neutral-800/40 transition-colors"
                  >
                    <span className="font-medium text-white text-sm leading-snug pr-4">
                      {locale === 'nl' ? item.questionNL : item.questionEN}
                    </span>
                    <span className={`text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === item.id ? 'rotate-45 text-blue-400' : 'text-neutral-600'}`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === item.id && (
                      <motion.div
                        variants={faqAnswer}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <p className="px-6 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800/50 pt-4">
                          {locale === 'nl' ? item.answerNL : item.answerEN}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <Link
                href={locale === 'nl' ? '/nl/veelgestelde-vragen' : '/en/faq'}
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {locale === 'nl' ? 'Alle vragen bekijken →' : 'View all questions →'}
              </Link>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="p-8 md:p-16 rounded-[2.5rem] bg-neutral-900 border border-neutral-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                {getCTAHeadline(service.category, locale)}
              </h2>
              <p className="text-neutral-400 text-lg mb-8">
                {locale === 'nl'
                  ? 'Plan een vrijblijvend gesprek en ontdek wat Qovre voor u kan betekenen.'
                  : 'Schedule a free call and find out what Qovre can do for you.'}
              </p>
            </div>
            <ContactForm />
          </div>
        </motion.div>

      </div>
    </article>
  )
}
