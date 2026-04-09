'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { fadeUp, staggerContainerSlow, viewportOnce } from '@/lib/animations'
import ContactForm from '@/components/sections/ContactForm'

interface ContactSectionProps {
  locale: string
}

export default function ContactSection({ locale }: ContactSectionProps) {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="py-24 px-4 bg-neutral-950">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase text-blue-400 border border-blue-500/20 bg-blue-500/5 rounded-full">
              {locale === 'nl' ? 'Aan de slag' : 'Get started'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              {t('sectionTitle')}
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-lg">
              {t('sectionSubtitle')}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
