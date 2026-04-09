'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SERVICES } from '@/data/seo'
import { fadeUp, staggerContainer, viewportOnce, scaleUp } from '@/lib/animations'
import Link from 'next/link'

export default function ServicesGrid({ locale }: { locale: string }) {
  const t = useTranslations('services')

  return (
    <section id="services" className="py-24 px-4 bg-neutral-950">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            {t('sectionTitle')}
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            {t('sectionSubtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.slug}
              variants={scaleUp}
              className="group p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/50 hover:bg-neutral-900 hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                   <div className="w-6 h-6 rounded-full border-2 border-blue-500/50" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                  {locale === 'nl' ? service.titleNL : service.titleEN}
                </h3>
                <p className="text-neutral-400 mb-8 leading-relaxed">
                  {locale === 'nl' ? service.shortDescriptionNL : service.shortDescriptionEN}
                </p>
              </div>

              <Link
                href={`/${locale}/${service.slug}`}
                className="inline-flex items-center text-sm font-semibold text-white group-hover:gap-2 transition-all"
              >
                {t('learnMore')}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity"> →</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
