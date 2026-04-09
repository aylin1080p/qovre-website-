'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

const STEPS = [
  { id: '01', titleKey: 'discovery' },
  { id: '02', titleKey: 'strategy' },
  { id: '03', titleKey: 'development' },
  { id: '04', titleKey: 'launch' },
  { id: '05', titleKey: 'growth' },
]

export default function Process() {
  const t = useTranslations('process')

  return (
    <section id="process" className="py-24 px-4 bg-black">
      <div className="container max-w-7xl mx-auto">
        <motion.div
           variants={fadeUp}
           initial="hidden"
           whileInView="visible"
           viewport={viewportOnce}
           className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            {t('sectionTitle')}
          </h2>
          <p className="text-neutral-400 max-w-2xl text-lg">
            {t('sectionSubtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.id}
              variants={fadeUp}
              className="relative group"
            >
              <div className="text-6xl font-black text-neutral-900 mb-6 group-hover:text-blue-500/10 transition-colors duration-500">
                {step.id}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {t(`steps.${step.titleKey}.title`)}
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                {t(`steps.${step.titleKey}.description`)}
              </p>
              
              {/* Connector line for desktop */}
              <div className="hidden lg:block absolute top-[2.5rem] left-full w-full h-[1px] bg-neutral-900 z-0 -translate-x-8" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
