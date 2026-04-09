'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { fadeUp, staggerContainerSlow, lineReveal, viewportOnce } from '@/lib/animations'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 px-4">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/8 blur-[140px]" />
        <div className="absolute bottom-[0%] right-[5%] w-[45%] h-[45%] rounded-full bg-indigo-600/6 blur-[140px]" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-blue-400/4 blur-[100px]" />
      </div>

      <motion.div
        variants={staggerContainerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.span
          variants={fadeUp}
          className="inline-block px-4 py-1.5 mb-8 text-sm font-medium tracking-wider uppercase text-blue-400 border border-blue-500/20 bg-blue-500/5 rounded-full backdrop-blur-sm"
        >
          {t('eyebrow')}
        </motion.span>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.05]">
          <span className="block overflow-hidden pb-1">
            <motion.span variants={lineReveal} className="inline-block">
              {t('title')}
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
           variants={fadeUp}
           className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors w-full sm:w-auto"
          >
            {t('primaryCta')}
          </a>
          <a
            href="#services"
            className="px-8 py-4 border border-neutral-800 text-neutral-300 font-semibold rounded-full hover:bg-neutral-900 transition-colors w-full sm:w-auto"
          >
            {t('secondaryCta')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
