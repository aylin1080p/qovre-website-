'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote:
      'Qovre transformeerde onze verouderde datapijplijn naar een AI-gedreven platform. Ze leverden niet alleen code, maar een complete strategische routekaart. Het resultaat overtrof alle verwachtingen.',
    name: 'Jasper van den Berg',
    role: 'CTO',
    company: 'Nexus Logistics B.V.',
    initial: 'J',
    color: 'bg-blue-500',
  },
  {
    quote:
      'Wat me het meest verraste, was de technische diepgang gecombineerd met strategisch inzicht. Ze begrepen ons businessmodel volledig voordat er ook maar één regel code werd geschreven. Dat is zeldzaam.',
    name: 'Elena Schroeder',
    role: 'Head of Digital',
    company: 'Meridia Health',
    initial: 'E',
    color: 'bg-violet-500',
  },
  {
    quote:
      'Van infrastructuuranalyse tot livegang in acht weken. De communicatie was helder, de oplevering was punctueel en het eindresultaat is een platform waar we de komende vijf jaar mee vooruit kunnen.',
    name: 'Maarten Visser',
    role: 'Founder & CEO',
    company: 'VerdeTech',
    initial: 'M',
    color: 'bg-emerald-500',
  },
]

export default function Testimonials({ locale }: { locale: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isNL = locale === 'nl'

  return (
    <section ref={ref} className="py-24 bg-neutral-950/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-600 mb-3">
            {isNL ? 'Wat klanten zeggen' : 'What clients say'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {isNL ? 'Strategische resultaten, echte woorden' : 'Strategic outcomes, real words'}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-5 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 transition-colors"
            >
              {/* Quote mark */}
              <span className="text-4xl leading-none text-neutral-700 font-serif select-none">&ldquo;</span>

              {/* Quote */}
              <p className="text-neutral-300 text-sm leading-relaxed flex-1">{t.quote}</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-neutral-800">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {t.initial}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-neutral-500 text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
