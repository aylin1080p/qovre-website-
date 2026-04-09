'use client'

import { motion } from 'framer-motion'
import { TARGET_CITIES } from '@/data/seo'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import ContactForm from '@/components/sections/ContactForm'
import { notFound } from 'next/navigation'

interface CityLandingProps {
  citySlug: string
  locale: string
}

export default function CityLanding({ citySlug, locale }: CityLandingProps) {
  const cityData = TARGET_CITIES.find((c) => c.slug === citySlug)

  if (!cityData) {
    notFound()
  }

  const title = locale === 'nl' 
    ? `Software ontwikkeling in ${cityData.city}` 
    : `Software development in ${cityData.city}`

  const intro = locale === 'nl' ? cityData.introNL : cityData.introEN
  const signals = locale === 'nl' ? cityData.localSignalsNL : cityData.localSignalsEN

  return (
    <article className="pt-32 pb-24 px-4 overflow-x-hidden">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            {cityData.province}, NL
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white leading-[1.1]">
            {title}
          </h1>
          <div className="prose prose-invert prose-lg max-w-none text-neutral-400 leading-relaxed">
            <p className="whitespace-pre-line">{intro}</p>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24"
        >
          {signals.map((signal, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 hover:border-blue-500/30 transition-colors"
            >
              <div className="flex gap-4">
                <span className="text-blue-500 font-bold shrink-0">✓</span>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {signal}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="p-8 md:p-12 rounded-3xl bg-blue-500/5 border border-blue-500/10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">
            {locale === 'nl' ? 'Project bespreken?' : 'Discuss your project?'}
          </h2>
          <ContactForm />
        </motion.div>
      </div>
    </article>
  )
}
