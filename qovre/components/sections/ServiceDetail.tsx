'use client'

import { motion } from 'framer-motion'
import { SERVICES } from '@/data/seo'
import { fadeUp, staggerContainer, viewportOnce, scaleUp } from '@/lib/animations'
import ContactForm from '@/components/sections/ContactForm'
import { notFound } from 'next/navigation'

interface ServiceDetailProps {
  slug: string
  locale: string
}

export default function ServiceDetail({ slug, locale }: ServiceDetailProps) {
  const service = SERVICES.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  const title = locale === 'nl' ? service.titleNL : service.titleEN
  const description = locale === 'nl' ? service.fullDescriptionNL : service.fullDescriptionEN
  const features = locale === 'nl' ? service.deliverablesNL : service.deliverablesEN

  return (
    <article className="pt-32 pb-24 px-4">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-20 text-center"
        >
          <motion.span
             variants={fadeUp}
             className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            {locale === 'nl' ? 'Onze Expertise' : 'Our Expertise'}
          </motion.span>
          <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight text-white">
            {title}
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            {locale === 'nl' ? service.shortDescriptionNL : service.shortDescriptionEN}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center"
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

        {/* Action Section */}
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
                {locale === 'nl' ? 'Klaar om te automatiseren?' : 'Ready to automate?'}
              </h2>
              <p className="text-neutral-400 text-lg mb-8">
                {locale === 'nl' 
                  ? 'Plan een vrijblijvend adviesgesprek in en ontdek hoe wij uw bedrijf naar een hoger niveau tillen.' 
                  : 'Schedule a discovery call and find out how we can take your business to the next level.'
                }
              </p>
            </div>
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </article>
  )
}
