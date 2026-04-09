'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

const NL_CITIES = [
  'Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven',
  'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen',
]

interface TrustBarProps {
  locale: string
}

export default function TrustBar({ locale }: TrustBarProps) {
  const isNL = locale === 'nl'

  const capabilities = isNL
    ? [
        { label: 'Websites & webshops', desc: 'Op maat gebouwd, schaalbaar' },
        { label: 'SaaS & maatwerk', desc: 'Complexe platformen, eenvoudig beheerbaar' },
        { label: 'AI & automatisering', desc: 'Chatbots, workflows, AI-integraties' },
        { label: 'SEO & vindbaarheid', desc: 'Technische SEO en GEO-optimalisatie' },
      ]
    : [
        { label: 'Websites & ecommerce', desc: 'Custom built, scalable' },
        { label: 'SaaS & custom platforms', desc: 'Complex systems, simple to manage' },
        { label: 'AI & automation', desc: 'Chatbots, workflows, AI integrations' },
        { label: 'SEO & discoverability', desc: 'Technical SEO and GEO optimisation' },
      ]

  return (
    <section className="py-20 px-4 bg-[#060608] border-y border-neutral-900">
      <div className="container max-w-7xl mx-auto">

        {/* Capabilities */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {capabilities.map((cap) => (
            <motion.div key={cap.label} variants={fadeUp} className="group">
              <div className="w-8 h-[2px] bg-blue-500/40 mb-4 group-hover:w-12 group-hover:bg-blue-400 transition-all duration-300" />
              <h3 className="text-white font-semibold mb-1">{cap.label}</h3>
              <p className="text-neutral-500 text-sm">{cap.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Nationwide coverage */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="pt-12 border-t border-neutral-900"
        >
          <p className="text-xs font-medium tracking-wider uppercase text-neutral-600 mb-5">
            {isNL ? 'Actief door heel Nederland' : 'Active across the Netherlands'}
          </p>
          <div className="flex flex-wrap gap-2">
            {NL_CITIES.map((city) => (
              <span
                key={city}
                className="px-3 py-1 text-xs text-neutral-500 border border-neutral-800/80 rounded-full hover:border-neutral-700 hover:text-neutral-400 transition-colors"
              >
                {city}
              </span>
            ))}
            <span className="px-3 py-1 text-xs text-neutral-600 border border-neutral-800/50 rounded-full">
              {isNL ? '+ heel Nederland' : '+ all of Netherlands'}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
