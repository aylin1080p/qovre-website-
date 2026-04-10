'use client'

import { motion } from 'framer-motion'
import { BRAND, SERVICES, TARGET_CITIES } from '@/data/seo'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

interface ProofStripProps {
  locale: string
}

export default function ProofStrip({ locale }: ProofStripProps) {
  const isNL = locale === 'nl'

  const stats = [
    {
      value: `${SERVICES.length}`,
      label: isNL ? 'specialisaties' : 'specialisations',
    },
    {
      value: `${TARGET_CITIES.length}+`,
      label: isNL ? 'steden in Nederland' : 'cities in the Netherlands',
    },
    {
      value: 'EUR 3.000',
      label: isNL ? 'projecten starten vanaf' : 'projects start from',
    },
    {
      value: '100%',
      label: isNL ? 'remote — heel Nederland' : 'remote — all of Netherlands',
    },
  ]

  const differentiators = isNL ? BRAND.differentiators.nl : BRAND.differentiators.en

  return (
    <section className="py-20 px-4 bg-[#060608]">
      <div className="container max-w-6xl mx-auto">

        {/* Stats row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800/30 rounded-2xl overflow-hidden mb-16"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="bg-[#060608] p-8 flex flex-col gap-2"
            >
              <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
              <span className="text-sm text-neutral-500 leading-snug">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Differentiators */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-8">
            {isNL ? 'Waarom Qovre' : 'Why Qovre'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {differentiators.map((point, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-5 rounded-xl bg-neutral-900/30 border border-neutral-800/50"
              >
                <span className="text-blue-500 font-bold shrink-0 mt-0.5">0{idx + 1}</span>
                <p className="text-neutral-300 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
