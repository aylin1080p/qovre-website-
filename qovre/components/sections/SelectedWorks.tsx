'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARD_WIDTH = 340
const GAP = 24

const WORKS = [
  {
    client: 'Nexus Logistics B.V.',
    category: 'SaaS Platform',
    tagline: 'Real-time supply chain intelligence voor 12 Europese depots.',
    tech: ['Next.js', 'Supabase', 'Gemini AI'],
    metric: '–43% operationele kosten',
    color: 'from-blue-500/10 to-blue-600/5',
    accent: 'bg-blue-500/20 text-blue-400',
  },
  {
    client: 'Meridia Health',
    category: 'AI Automatisering',
    tagline: 'Intelligente triage-assistent voor 8 klinieken in de Randstad.',
    tech: ['AI Pipeline', 'RAG', 'Next.js'],
    metric: '68% snellere intake',
    color: 'from-violet-500/10 to-violet-600/5',
    accent: 'bg-violet-500/20 text-violet-400',
  },
  {
    client: 'Bloom Retail Group',
    category: 'Webshop Platform',
    tagline: 'Schaalbaar e-commerce platform met gepersonaliseerde aanbevelingen.',
    tech: ['Next.js', 'Tailwind', 'Supabase'],
    metric: '+127% conversie Q4',
    color: 'from-emerald-500/10 to-emerald-600/5',
    accent: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    client: 'Fortis Capital',
    category: 'Client Portal',
    tagline: 'Beveiligde portefeuille-dashboard voor vermogensbeheer in NL.',
    tech: ['TypeScript', 'Supabase', 'Vercel'],
    metric: 'SOC2 Type II compliant',
    color: 'from-amber-500/10 to-amber-600/5',
    accent: 'bg-amber-500/20 text-amber-400',
  },
  {
    client: 'VerdeTech',
    category: 'AI & Groei',
    tagline: 'Geautomatiseerde content- en SEO-engine voor duurzame sector.',
    tech: ['Gemini', 'AI SDK', 'Next.js'],
    metric: '3× organisch bereik in 90d',
    color: 'from-teal-500/10 to-teal-600/5',
    accent: 'bg-teal-500/20 text-teal-400',
  },
  {
    client: 'Archon Studios',
    category: 'SaaS MVP',
    tagline: 'Multi-tenant creatief projectmanagement voor mediabureaus.',
    tech: ['SaaS', 'RBAC', 'Supabase'],
    metric: 'Van idee naar launch in 8w',
    color: 'from-rose-500/10 to-rose-600/5',
    accent: 'bg-rose-500/20 text-rose-400',
  },
]

const DUPLICATED = [...WORKS, ...WORKS]
const TOTAL_WIDTH = WORKS.length * (CARD_WIDTH + GAP)

export default function SelectedWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-600 mb-3">
            Selected Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Projecten die tellen
          </h2>
        </motion.div>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#060608] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#060608] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex"
          style={{ gap: GAP }}
          animate={{ x: [0, -TOTAL_WIDTH] }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        >
          {DUPLICATED.map((work, i) => (
            <div
              key={`${work.client}-${i}`}
              style={{ width: CARD_WIDTH, flexShrink: 0 }}
              className={`relative rounded-2xl border border-neutral-800 bg-gradient-to-br ${work.color} p-6 flex flex-col gap-4 backdrop-blur-sm`}
            >
              {/* Category badge */}
              <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${work.accent}`}>
                {work.category}
              </span>

              {/* Content */}
              <div className="flex-1">
                <p className="text-white font-semibold text-base mb-2">{work.client}</p>
                <p className="text-neutral-400 text-sm leading-relaxed">{work.tagline}</p>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5">
                {work.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-800/80 text-neutral-500 border border-neutral-700/50"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Metric */}
              <div className="border-t border-neutral-800/60 pt-3">
                <p className="text-xs font-semibold text-white/70">{work.metric}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
