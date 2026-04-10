'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { type CityLandingInfo, SERVICES } from '@/data/seo'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import ContactForm from '@/components/sections/ContactForm'

interface CityLandingProps {
  cityData: CityLandingInfo
  locale: string
}

export default function CityLanding({ cityData, locale }: CityLandingProps) {
  const title = locale === 'nl' 
    ? `Software ontwikkeling in ${cityData.city}` 
    : `Software development in ${cityData.city}`

  const intro = locale === 'nl' ? cityData.introNL : cityData.introEN
  const signals = locale === 'nl' ? cityData.localSignalsNL : cityData.localSignalsEN

  const servicesLabel = locale === 'nl' ? 'Onze diensten' : 'Our services'
  const servicesSubtitle = locale === 'nl'
    ? `Wat Qovre bouwt voor bedrijven in ${cityData.city}`
    : `What Qovre builds for businesses in ${cityData.city}`
  const overviewHref = locale === 'nl' ? `/${locale}/diensten` : `/${locale}/services`
  const overviewLabel = locale === 'nl' ? 'Alle diensten bekijken →' : 'View all services →'

  return (
    <article className="pt-32 pb-24 px-4 overflow-x-hidden bg-[#060608] min-h-screen">
      <div className="container max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-xs text-neutral-600" aria-label="breadcrumb">
          <Link href={`/${locale}`} className="hover:text-neutral-400 transition-colors">
            {locale === 'nl' ? 'Home' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-neutral-500">{cityData.city}</span>
        </nav>

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

        {/* Services grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-24"
        >
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">
                {servicesLabel}
              </p>
              <h2 className="text-2xl font-bold text-white">{servicesSubtitle}</h2>
            </div>
            <Link
              href={overviewHref}
              className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors shrink-0"
            >
              {overviewLabel}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service) => {
              const name = locale === 'nl' ? service.titleNL : service.titleEN
              const desc = locale === 'nl' ? service.shortDescriptionNL : service.shortDescriptionEN
              return (
                <Link
                  key={service.slug}
                  href={`/${locale}/${service.slug}`}
                  className="group p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 hover:border-blue-500/30 hover:bg-neutral-900/70 transition-all duration-200 flex flex-col gap-3"
                >
                  <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {name}
                  </span>
                  <span className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {desc}
                  </span>
                  <span className="text-xs text-blue-500 font-medium mt-auto">
                    {locale === 'nl' ? 'Meer info →' : 'Learn more →'}
                  </span>
                </Link>
              )
            })}
          </div>
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
