'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type {
  FormState, Category, WebType, WebIntegration, PageCount,
  ComplexityLevel, AiFunction, AutomationType, DataSource,
  TrafficLevel, SecurityLevel, ScalabilityLevel, HostingType, SlaLevel,
} from '@/lib/onboarding-types'
import { INITIAL_FORM } from '@/lib/onboarding-types'

// ── Animation variants ────────────────────────────────────────────────────────
const staggerList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const itemFade = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
}
const stepSlideIn  = { opacity: 0, x: 20 }
const stepSlideOut = { opacity: 0, x: -20 }
const stepVisible  = { opacity: 1, x: 0 }

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputCls = 'w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors'
const labelCls = 'flex items-center gap-2 text-xs font-semibold tracking-wide text-neutral-400 uppercase mb-2'
const pillBase = 'px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer select-none'
const pillOn  = 'border-blue-500 bg-blue-500/10 text-blue-400'
const pillOff = 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
const cardBase = 'p-5 rounded-2xl border transition-all cursor-pointer text-left'
const cardOn  = 'border-blue-500/60 bg-blue-500/5 ring-1 ring-blue-500/20'
const cardOff = 'border-neutral-800 bg-neutral-900/30 hover:border-neutral-700'

// ── Tooltip ───────────────────────────────────────────────────────────────────
function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="w-4 h-4 rounded-full bg-neutral-800 text-neutral-500 text-[9px] font-bold flex items-center justify-center hover:bg-neutral-700 hover:text-neutral-300 transition-colors"
        aria-label="Meer info"
      >
        ?
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-neutral-300 leading-relaxed z-20 shadow-2xl pointer-events-none">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-700" />
        </span>
      )}
    </span>
  )
}

// ── StepIndicator ─────────────────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            i + 1 < current  ? 'bg-blue-500 text-white' :
            i + 1 === current ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400' :
                                'bg-neutral-900 border border-neutral-800 text-neutral-600'
          }`}>
            {i + 1 < current ? '✓' : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-px w-8 transition-all ${i + 1 < current ? 'bg-blue-500/50' : 'bg-neutral-800'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ── BoolSelect ────────────────────────────────────────────────────────────────
function BoolSelect({ value, onChange, locale }: { value: boolean | null; onChange: (v: boolean) => void; locale: string }) {
  return (
    <div className="flex gap-3">
      {([true, false] as const).map((v) => (
        <button key={String(v)} type="button" onClick={() => onChange(v)}
          className={`${pillBase} ${value === v ? pillOn : pillOff}`}
        >
          {v ? (locale === 'nl' ? 'Ja' : 'Yes') : (locale === 'nl' ? 'Nee' : 'No')}
        </button>
      ))}
    </div>
  )
}

// ── MultiPill ─────────────────────────────────────────────────────────────────
function MultiPill<T extends string>({ value, onChange, options, locale }: {
  value: T[]
  onChange: (v: T[]) => void
  options: { id: T; nl: string; en: string }[]
  locale: string
}) {
  const toggle = (id: T) =>
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id])
  return (
    <motion.div variants={staggerList} initial="hidden" animate="visible" className="flex flex-wrap gap-2">
      {options.map((o) => (
        <motion.button key={o.id} variants={itemFade} type="button" onClick={() => toggle(o.id)}
          className={`${pillBase} ${value.includes(o.id) ? pillOn : pillOff}`}
        >
          {locale === 'nl' ? o.nl : o.en}
        </motion.button>
      ))}
    </motion.div>
  )
}

// ── SinglePill ────────────────────────────────────────────────────────────────
function SinglePill<T extends string>({ value, onChange, options, locale }: {
  value: T | null
  onChange: (v: T) => void
  options: { id: T; nl: string; en: string }[]
  locale: string
}) {
  return (
    <motion.div variants={staggerList} initial="hidden" animate="visible" className="flex flex-wrap gap-2">
      {options.map((o) => (
        <motion.button key={o.id} variants={itemFade} type="button" onClick={() => onChange(o.id)}
          className={`${pillBase} ${value === o.id ? pillOn : pillOff}`}
        >
          {locale === 'nl' ? o.nl : o.en}
        </motion.button>
      ))}
    </motion.div>
  )
}

// ── Step 1: Category ──────────────────────────────────────────────────────────
const CATEGORIES: { id: Category; icon: string; nl: string; en: string; descNL: string; descEN: string }[] = [
  {
    id: 'web',
    icon: '◈',
    nl: 'Professional Web',
    en: 'Professional Web',
    descNL: 'Websites, webshops en lead-gen platformen',
    descEN: 'Websites, ecommerce, and lead-gen platforms',
  },
  {
    id: 'saas',
    icon: '⬡',
    nl: 'Scalable SaaS',
    en: 'Scalable SaaS',
    descNL: 'Maatwerkplatformen en multi-tenant applicaties',
    descEN: 'Custom platforms and multi-tenant applications',
  },
  {
    id: 'ai',
    icon: '◎',
    nl: 'AI & Automatisering',
    en: 'AI & Automation',
    descNL: 'Chatbots, data pipelines en slimme workflows',
    descEN: 'Chatbots, data pipelines, and intelligent workflows',
  },
]

function Step1({ value, onChange, locale }: { value: Category | null; onChange: (c: Category) => void; locale: string }) {
  const isNL = locale === 'nl'
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-6">
        {isNL ? 'Wat wilt u bouwen?' : 'What do you want to build?'}
      </p>
      <motion.div variants={staggerList} initial="hidden" animate="visible" className="flex flex-col gap-3">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            variants={itemFade}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`${cardBase} ${value === cat.id ? cardOn : cardOff}`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl leading-none text-blue-400/70 mt-0.5 font-light">{cat.icon}</span>
              <div>
                <p className="text-white font-semibold text-base mb-1">{isNL ? cat.nl : cat.en}</p>
                <p className="text-neutral-500 text-sm leading-snug">{isNL ? cat.descNL : cat.descEN}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

// ── Step 2: Web ───────────────────────────────────────────────────────────────
function Step2Web({ state, onChange, locale }: { state: FormState; onChange: (p: Partial<FormState>) => void; locale: string }) {
  const isNL = locale === 'nl'
  return (
    <div className="flex flex-col gap-7">
      <div>
        <label className={labelCls}>
          {isNL ? 'Type platform' : 'Platform type'}
          <Tooltip text={isNL ? 'Selecteer alle toepasselijke typen.' : 'Select all applicable types.'} />
        </label>
        <MultiPill<WebType>
          value={state.webTypes}
          onChange={(v) => onChange({ webTypes: v })}
          locale={locale}
          options={[
            { id: 'website',  nl: 'Website',   en: 'Website' },
            { id: 'webshop',  nl: 'Webshop',   en: 'Webshop' },
            { id: 'leadgen',  nl: 'Lead gen',  en: 'Lead gen' },
          ]}
        />
      </div>
      <div>
        <label className={labelCls}>
          {isNL ? 'Verwacht aantal pagina\'s' : 'Expected page count'}
        </label>
        <SinglePill<PageCount>
          value={state.pageCount}
          onChange={(v) => onChange({ pageCount: v })}
          locale={locale}
          options={[
            { id: 'small',  nl: 'Klein (1–5)',  en: 'Small (1–5)' },
            { id: 'medium', nl: 'Middel (6–15)', en: 'Medium (6–15)' },
            { id: 'large',  nl: 'Groot (16+)',  en: 'Large (16+)' },
          ]}
        />
      </div>
      <div>
        <label className={labelCls}>
          {isNL ? 'Integraties' : 'Integrations'}
          <Tooltip text={isNL ? 'Welke externe systemen moeten worden gekoppeld?' : 'Which external systems need to be connected?'} />
        </label>
        <MultiPill<WebIntegration>
          value={state.integrations}
          onChange={(v) => onChange({ integrations: v })}
          locale={locale}
          options={[
            { id: 'crm',       nl: 'CRM',        en: 'CRM' },
            { id: 'calendar',  nl: 'Kalender',   en: 'Calendar' },
            { id: 'payment',   nl: 'Betaling',   en: 'Payment' },
            { id: 'analytics', nl: 'Analytics',  en: 'Analytics' },
          ]}
        />
      </div>
      <div>
        <label className={labelCls}>{isNL ? 'CMS / zelfbeheer nodig?' : 'CMS / self-managed?'}</label>
        <BoolSelect value={state.cmsNeeded} onChange={(v) => onChange({ cmsNeeded: v })} locale={locale} />
      </div>
    </div>
  )
}

// ── Step 2: SaaS ──────────────────────────────────────────────────────────────
function Step2Saas({ state, onChange, locale }: { state: FormState; onChange: (p: Partial<FormState>) => void; locale: string }) {
  const isNL = locale === 'nl'
  const [roleInput, setRoleInput] = useState('')

  function addRole() {
    const trimmed = roleInput.trim()
    if (trimmed && state.userRoles.length < 5 && !state.userRoles.includes(trimmed)) {
      onChange({ userRoles: [...state.userRoles, trimmed] })
    }
    setRoleInput('')
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <label className={labelCls}>
          {isNL ? 'Gebruikersrollen' : 'User roles'}
          <Tooltip text={isNL ? 'Bijv. Admin, Gebruiker, Manager — max 5 rollen.' : 'E.g. Admin, User, Manager — max 5 roles.'} />
        </label>
        <div className="flex gap-2 mb-2">
          <input
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addRole() } }}
            placeholder={isNL ? 'Bijv. Admin...' : 'E.g. Admin...'}
            className={`${inputCls} flex-1`}
          />
          <button type="button" onClick={addRole} disabled={state.userRoles.length >= 5}
            className="px-4 py-2 text-sm font-medium text-blue-400 border border-blue-500/30 bg-blue-500/5 rounded-xl hover:bg-blue-500/10 transition-colors disabled:opacity-40"
          >
            +
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {state.userRoles.map((r) => (
            <span key={r} className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-neutral-300">
              {r}
              <button type="button" onClick={() => onChange({ userRoles: state.userRoles.filter((x) => x !== r) })}
                className="text-neutral-600 hover:text-neutral-400 transition-colors text-xs leading-none"
              >×</button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className={labelCls}>
          {isNL ? 'Complexiteit' : 'Complexity'}
          <Tooltip text={isNL ? 'MVP = snel lanceren · Enterprise = hoge schaal, meerdere teams.' : 'MVP = fast launch · Enterprise = high scale, multiple teams.'} />
        </label>
        <SinglePill<ComplexityLevel>
          value={state.complexity}
          onChange={(v) => onChange({ complexity: v })}
          locale={locale}
          options={[
            { id: 'mvp',        nl: 'MVP',        en: 'MVP' },
            { id: 'standard',   nl: 'Standaard',  en: 'Standard' },
            { id: 'enterprise', nl: 'Enterprise',  en: 'Enterprise' },
          ]}
        />
      </div>
      <div>
        <label className={labelCls}>{isNL ? 'AI-functies' : 'AI features'}</label>
        <MultiPill<AiFunction>
          value={state.aiFunctions}
          onChange={(v) => onChange({ aiFunctions: v })}
          locale={locale}
          options={[
            { id: 'analysis',   nl: 'Data-analyse', en: 'Data analysis' },
            { id: 'bot',        nl: 'AI-bot',        en: 'AI bot' },
            { id: 'automation', nl: 'Automatisering', en: 'Automation' },
          ]}
        />
      </div>
      <div>
        <label className={labelCls}>{isNL ? 'Data-migratie nodig?' : 'Data migration needed?'}</label>
        <BoolSelect value={state.dataMigration} onChange={(v) => onChange({ dataMigration: v })} locale={locale} />
      </div>
    </div>
  )
}

// ── Step 2: AI ────────────────────────────────────────────────────────────────
function Step2Ai({ state, onChange, locale }: { state: FormState; onChange: (p: Partial<FormState>) => void; locale: string }) {
  const isNL = locale === 'nl'
  return (
    <div className="flex flex-col gap-7">
      <div>
        <label className={labelCls}>
          {isNL ? 'Type automatisering' : 'Automation type'}
          <Tooltip text={isNL ? 'Meerdere typen mogelijk.' : 'Multiple types are possible.'} />
        </label>
        <MultiPill<AutomationType>
          value={state.automationTypes}
          onChange={(v) => onChange({ automationTypes: v })}
          locale={locale}
          options={[
            { id: 'chatbot',       nl: 'Chatbot',           en: 'Chatbot' },
            { id: 'data_pipeline', nl: 'Data Pipeline',     en: 'Data Pipeline' },
            { id: 'document_ai',   nl: 'Document AI',       en: 'Document AI' },
            { id: 'workflow',      nl: 'Workflow Automatie', en: 'Workflow Automation' },
          ]}
        />
      </div>
      <div>
        <label className={labelCls}>
          {isNL ? 'Databronnen' : 'Data sources'}
          <Tooltip text={isNL ? 'Welke systemen leveren de data voor uw AI-oplossing?' : 'Which systems provide data for your AI solution?'} />
        </label>
        <MultiPill<DataSource>
          value={state.dataSources}
          onChange={(v) => onChange({ dataSources: v })}
          locale={locale}
          options={[
            { id: 'crm',      nl: 'CRM',       en: 'CRM' },
            { id: 'email',    nl: 'E-mail',     en: 'Email' },
            { id: 'database', nl: 'Database',   en: 'Database' },
            { id: 'api',      nl: 'API',        en: 'API' },
            { id: 'files',    nl: 'Bestanden',  en: 'Files' },
          ]}
        />
      </div>
      <div>
        <label className={labelCls}>{isNL ? 'Bestaande AI-integraties?' : 'Existing AI integrations?'}</label>
        <BoolSelect value={state.hasExistingAi} onChange={(v) => onChange({ hasExistingAi: v })} locale={locale} />
      </div>
    </div>
  )
}

// ── Step 2: Dispatcher ────────────────────────────────────────────────────────
function Step2({ state, onChange, locale }: { state: FormState; onChange: (p: Partial<FormState>) => void; locale: string }) {
  if (state.category === 'web')  return <Step2Web  state={state} onChange={onChange} locale={locale} />
  if (state.category === 'saas') return <Step2Saas state={state} onChange={onChange} locale={locale} />
  if (state.category === 'ai')   return <Step2Ai   state={state} onChange={onChange} locale={locale} />
  return null
}

// ── Step 3: VIP Infrastructure ────────────────────────────────────────────────
const SLA_CARDS: { id: SlaLevel; nl: string; en: string; featuresNL: string[]; featuresEN: string[]; highlight: boolean }[] = [
  {
    id: 'essential',
    nl: 'Essential', en: 'Essential',
    featuresNL: ['Bug fixes & patches', 'Maandelijkse updates', 'E-mail support (3 werkdagen)'],
    featuresEN: ['Bug fixes & patches', 'Monthly updates', 'Email support (3 business days)'],
    highlight: false,
  },
  {
    id: 'growth',
    nl: 'Growth', en: 'Growth',
    featuresNL: ['Alles in Essential', 'Performance monitoring', 'SEO updates', 'Priority support (1 werkdag)'],
    featuresEN: ['Everything in Essential', 'Performance monitoring', 'SEO updates', 'Priority support (1 business day)'],
    highlight: true,
  },
  {
    id: 'partner',
    nl: 'Partner', en: 'Partner',
    featuresNL: ['Alles in Growth', 'Dedicated developer', 'Proactieve verbeteringen', 'SLA garanties (4-uur reactie)'],
    featuresEN: ['Everything in Growth', 'Dedicated developer', 'Proactive improvements', 'SLA guarantees (4-hour response)'],
    highlight: false,
  },
]

function Step3({ state, onChange, locale }: { state: FormState; onChange: (p: Partial<FormState>) => void; locale: string }) {
  const isNL = locale === 'nl'
  return (
    <div className="flex flex-col gap-8">
      {/* SLA / Maintenance */}
      <div>
        <label className={labelCls}>
          {isNL ? 'Onderhoudspakket (SLA)' : 'Maintenance package (SLA)'}
          <Tooltip text={isNL
            ? 'Doorlopend onderhoud na oplevering. Kies op basis van bedrijfskritiekheid.'
            : 'Ongoing maintenance post-launch. Choose based on business criticality.'} />
        </label>
        <motion.div variants={staggerList} initial="hidden" animate="visible" className="grid grid-cols-1 gap-3">
          {SLA_CARDS.map((sla) => (
            <motion.button
              key={sla.id}
              variants={itemFade}
              type="button"
              onClick={() => onChange({ slaLevel: sla.id })}
              className={`${cardBase} relative ${state.slaLevel === sla.id ? cardOn : cardOff}`}
            >
              {sla.highlight && (
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-semibold rounded-full tracking-wide uppercase">
                  {isNL ? 'Populair' : 'Popular'}
                </span>
              )}
              <p className="text-white font-semibold text-sm mb-2">{isNL ? sla.nl : sla.en}</p>
              <ul className="flex flex-col gap-1">
                {(isNL ? sla.featuresNL : sla.featuresEN).map((f) => (
                  <li key={f} className="text-xs text-neutral-500 flex items-start gap-2">
                    <span className="text-blue-500/60 mt-0.5">·</span>{f}
                  </li>
                ))}
              </ul>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Hosting */}
      <div>
        <label className={labelCls}>
          {isNL ? 'Hosting voorkeur' : 'Hosting preference'}
          <Tooltip text={isNL
            ? 'Qovre Managed = volledig beheerde cloud infra. Eigen server = u levert de omgeving.'
            : 'Qovre Managed = fully managed cloud infra. Own server = you provide the environment.'} />
        </label>
        <SinglePill<HostingType>
          value={state.hosting}
          onChange={(v) => onChange({ hosting: v })}
          locale={locale}
          options={[
            { id: 'qovre', nl: 'Qovre Managed', en: 'Qovre Managed' },
            { id: 'own',   nl: 'Eigen server',  en: 'Own server' },
          ]}
        />
      </div>

      {/* Traffic */}
      <div>
        <label className={labelCls}>
          {isNL ? 'Verwacht maandelijks bezoek' : 'Expected monthly traffic'}
          <Tooltip text={isNL ? 'Schatting voor infrastructuurplanning.' : 'Estimate for infrastructure planning.'} />
        </label>
        <SinglePill<TrafficLevel>
          value={state.trafficLevel}
          onChange={(v) => onChange({ trafficLevel: v })}
          locale={locale}
          options={[
            { id: 'low',        nl: '< 1.000',       en: '< 1,000' },
            { id: 'medium',     nl: '1k – 10k',      en: '1k – 10k' },
            { id: 'high',       nl: '10k – 100k',    en: '10k – 100k' },
            { id: 'enterprise', nl: '100k+',          en: '100k+' },
          ]}
        />
      </div>

      {/* Security */}
      <div>
        <label className={labelCls}>
          {isNL ? 'Beveiligingsniveau' : 'Security level'}
          <Tooltip text={isNL
            ? 'Enterprise = GDPR-audit, pentest, AVG-verwerkersovereenkomsten inbegrepen.'
            : 'Enterprise = GDPR audit, pentest, and DPA agreements included.'} />
        </label>
        <SinglePill<SecurityLevel>
          value={state.securityLevel}
          onChange={(v) => onChange({ securityLevel: v })}
          locale={locale}
          options={[
            { id: 'standard',   nl: 'Standaard',   en: 'Standard' },
            { id: 'advanced',   nl: 'Geavanceerd', en: 'Advanced' },
            { id: 'enterprise', nl: 'Enterprise',   en: 'Enterprise' },
          ]}
        />
      </div>

      {/* Scalability */}
      <div>
        <label className={labelCls}>
          {isNL ? 'Schaalbaarheid' : 'Scalability'}
          <Tooltip text={isNL
            ? 'Hoog volume = auto-scaling infra met load balancing en CDN.'
            : 'High volume = auto-scaling infra with load balancing and CDN.'} />
        </label>
        <SinglePill<ScalabilityLevel>
          value={state.scalability}
          onChange={(v) => onChange({ scalability: v })}
          locale={locale}
          options={[
            { id: 'fixed',    nl: 'Vast',      en: 'Fixed' },
            { id: 'moderate', nl: 'Groeiend',  en: 'Growing' },
            { id: 'high',     nl: 'Hoog volume', en: 'High volume' },
          ]}
        />
      </div>
    </div>
  )
}

// ── Step 4: Contact ───────────────────────────────────────────────────────────
function Step4({ state, onChange, onFileChange, fileError, locale }: {
  state: FormState
  onChange: (p: Partial<FormState>) => void
  onFileChange: (f: File) => void
  fileError: string
  locale: string
}) {
  const isNL = locale === 'nl'
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="ob-name">{isNL ? 'Naam *' : 'Name *'}</label>
          <input id="ob-name" type="text" required value={state.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder={isNL ? 'Jan de Vries' : 'John Smith'} className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="ob-email">E-mail *</label>
          <input id="ob-email" type="email" required value={state.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="jan@bedrijf.nl" className={inputCls}
          />
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="ob-company">{isNL ? 'Bedrijfsnaam (optioneel)' : 'Company (optional)'}</label>
        <input id="ob-company" type="text" value={state.company}
          onChange={(e) => onChange({ company: e.target.value })}
          placeholder={isNL ? 'Uw bedrijfsnaam' : 'Your company'} className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls} htmlFor="ob-competitor">
          {isNL ? 'Referentie / concurrent URL (optioneel)' : 'Reference / competitor URL (optional)'}
        </label>
        <input id="ob-competitor" type="url" value={state.competitorUrl}
          onChange={(e) => onChange({ competitorUrl: e.target.value })}
          placeholder="https://voorbeeld.nl" className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>
          {isNL ? 'Logo of huisstijl (optioneel)' : 'Logo or brand identity (optional)'}
        </label>
        <button type="button" onClick={() => fileInputRef.current?.click()}
          className="w-full p-6 rounded-xl border-2 border-dashed border-neutral-800 bg-neutral-900/20 hover:border-neutral-700 transition-colors text-center"
        >
          {state.fileName
            ? <span className="text-sm text-blue-400 font-medium">{state.fileName}</span>
            : <span className="text-sm text-neutral-500">
                {isNL ? 'Klik om bestand te uploaden' : 'Click to upload file'}
                <span className="block text-xs text-neutral-600 mt-1">PNG, JPG, PDF — max 10 MB</span>
              </span>
          }
        </button>
        {fileError && <p className="mt-1.5 text-xs text-red-400">{fileError}</p>}
        <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.pdf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onFileChange(f) }}
        />
      </div>

      {/* SaaS pricing notice */}
      {state.category === 'saas' && (
        <p className="text-xs text-amber-400/80 bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-3 leading-relaxed">
          {isNL
            ? 'Na uw aanvraag voeren wij een technische analyse uit en sturen u een gepersonaliseerde prijsopgave.'
            : 'After your request we perform a technical analysis and send you a personalised quote.'}
        </p>
      )}
    </div>
  )
}

// ── SuccessScreen ─────────────────────────────────────────────────────────────
function SuccessScreen({ locale }: { locale: string }) {
  const isNL = locale === 'nl'
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
        <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">
        {isNL ? 'Aanvraag ontvangen!' : 'Request received!'}
      </h2>
      <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mx-auto">
        {isNL
          ? 'Bedankt voor uw aanvraag. Wij nemen binnen 24 uur contact met u op via het opgegeven e-mailadres.'
          : 'Thank you for your request. We will get back to you within 24 hours at the email address you provided.'}
      </p>
      <a
        href={`/${locale}`}
        className="inline-block mt-8 px-6 py-2.5 border border-neutral-800 text-neutral-400 text-sm font-medium rounded-full hover:border-neutral-700 hover:text-white transition-colors"
      >
        {isNL ? '← Terug naar home' : '← Back to home'}
      </a>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function OnboardingForm({ locale }: { locale: string }) {
  const isNL = locale === 'nl'
  const [step, setStep] = useState(1)
  const [state, setState] = useState<FormState>({ ...INITIAL_FORM, locale })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [fileError, setFileError] = useState('')

  function update(partial: Partial<FormState>) {
    setState((prev) => ({ ...prev, ...partial }))
  }

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf']

  function handleFileChange(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError(isNL ? 'Ongeldig bestandstype. Alleen PDF, JPG en PNG.' : 'Invalid type. PDF, JPG, PNG only.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError(isNL ? 'Bestand te groot (max 10 MB).' : 'File too large (max 10 MB).')
      return
    }
    setFileError('')
    const reader = new FileReader()
    reader.onload = (e) => update({ fileName: file.name, fileBase64: (e.target?.result as string) ?? null })
    reader.readAsDataURL(file)
  }

  function canAdvance(): boolean {
    if (step === 1) return state.category !== null
    if (step === 3) return state.slaLevel !== null && state.hosting !== null
    if (step === 4) return state.name.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)
    return true
  }

  async function handleSubmit() {
    setStatus('loading')
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
      if (!res.ok) throw new Error('error')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') return <SuccessScreen locale={locale} />

  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator current={step} total={4} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={stepSlideIn}
          animate={stepVisible}
          exit={stepSlideOut}
          transition={{ duration: 0.2 }}
        >
          {step === 1 && <Step1 value={state.category} onChange={(c) => { update({ category: c }); setStep(2) }} locale={locale} />}
          {step === 2 && <Step2 state={state} onChange={update} locale={locale} />}
          {step === 3 && <Step3 state={state} onChange={update} locale={locale} />}
          {step === 4 && (
            <Step4
              state={state}
              onChange={update}
              locale={locale}
              onFileChange={handleFileChange}
              fileError={fileError}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {status === 'error' && (
        <p className="mt-4 text-sm text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3">
          {isNL ? 'Er is iets misgegaan. Probeer het opnieuw.' : 'Something went wrong. Please try again.'}
        </p>
      )}

      <div className="flex items-center justify-between mt-8">
        {step > 1
          ? <button type="button" onClick={() => setStep((s) => s - 1)}
              className="px-5 py-2.5 text-sm text-neutral-400 border border-neutral-800 rounded-full hover:border-neutral-700 hover:text-white transition-colors"
            >
              {isNL ? '← Terug' : '← Back'}
            </button>
          : <span />
        }
        {step < 4
          ? <button
              type="button"
              disabled={!canAdvance()}
              onClick={() => setStep((s) => s + 1)}
              className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isNL ? 'Volgende →' : 'Next →'}
            </button>
          : <button
              type="button"
              disabled={!canAdvance() || status === 'loading'}
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {status === 'loading'
                ? <>{isNL ? 'Versturen...' : 'Sending...'}</>
                : <>{isNL ? 'Verstuur aanvraag →' : 'Submit request →'}</>
              }
            </button>
        }
      </div>
    </div>
  )
}
