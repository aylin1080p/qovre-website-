'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ---- Types ----
type Category = 'visitekaart' | 'portfolio' | 'leadgen' | 'saas'
type CtaType = 'whatsapp' | 'call' | 'form'
type ContentType = 'video' | 'photo' | 'pdf'
type AiFunction = 'analysis' | 'bot' | 'automation'
type CrmType = 'hubspot' | 'salesforce' | 'other' | 'none'

interface FormState {
  category: Category | null
  nfcIntegration: boolean | null
  ctaType: CtaType | null
  contentTypes: ContentType[]
  filtering: boolean | null
  cmsNeeded: boolean | null
  calendarIntegration: boolean | null
  crmType: CrmType | null
  formSteps: number
  userRoles: string[]
  aiFunctions: AiFunction[]
  dataMigration: boolean | null
  competitorUrl: string
  hosting: 'qovre' | 'own' | null
  monthlyMaintenance: boolean
  name: string
  email: string
  company: string
  fileName: string
  fileBase64: string | null
}

const INITIAL: FormState = {
  category: null, nfcIntegration: null, ctaType: null,
  contentTypes: [], filtering: null, cmsNeeded: null,
  calendarIntegration: null, crmType: null, formSteps: 1,
  userRoles: [], aiFunctions: [], dataMigration: null,
  competitorUrl: '', hosting: null, monthlyMaintenance: false,
  name: '', email: '', company: '', fileName: '', fileBase64: null,
}

// ---- Shared styles ----
const inputCls = 'w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors'
const labelCls = 'block text-xs font-medium tracking-wide text-neutral-400 uppercase mb-2'
const pillBase = 'px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer select-none'
const pillOn = 'border-blue-500 bg-blue-500/10 text-blue-400'
const pillOff = 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'

// ---- Step Indicator ----
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            i + 1 < current ? 'bg-blue-500 text-white' :
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

// ---- Toggle ----
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-blue-500' : 'bg-neutral-700'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${value ? 'translate-x-5' : ''}`} />
    </button>
  )
}

// ---- Bool Select ----
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

// ---- Step 1: Category ----
const CATEGORIES = [
  { id: 'visitekaart' as Category, nl: 'De Digitale Visitekaart', en: 'Digital Business Card', descNL: 'Minimalistisch, single-page, altijd bij de hand.', descEN: 'Minimalist, single-page, always at hand.' },
  { id: 'portfolio' as Category, nl: 'Showcase & Portfolio', en: 'Showcase & Portfolio', descNL: 'Visueel gefocust, werk presenteren en uitstralen.', descEN: 'Visually focused, presenting and showcasing work.' },
  { id: 'leadgen' as Category, nl: 'Conversion & Lead Gen', en: 'Conversion & Lead Gen', descNL: 'Afspraken, offertes en verkoopconversie.', descEN: 'Appointments, quotes, and sales conversion.' },
  { id: 'saas' as Category, nl: 'Custom SaaS / Platform', en: 'Custom SaaS / Platform', descNL: 'Complexe systemen en AI-integraties op maat.', descEN: 'Complex systems and custom AI integrations.' },
]

function Step1({ value, onChange, locale }: { value: Category | null; onChange: (c: Category) => void; locale: string }) {
  const isNL = locale === 'nl'
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">Stap 1 / Step 1</p>
      <h2 className="text-2xl font-bold text-white mb-8">
        {isNL ? 'Welk type project zoekt u?' : 'What type of project are you looking for?'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => (
          <button key={cat.id} type="button" onClick={() => onChange(cat.id)}
            className={`p-6 rounded-2xl border text-left transition-all ${
              value === cat.id ? 'border-blue-500 bg-blue-500/10' : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
            }`}
          >
            <span className="text-sm font-semibold text-white block mb-1">{isNL ? cat.nl : cat.en}</span>
            <span className="text-xs text-neutral-500 leading-relaxed">{isNL ? cat.descNL : cat.descEN}</span>
            <span className="block text-[10px] text-neutral-700 mt-1">{isNL ? cat.en : cat.nl}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ---- Step 2: Conditional sub-views ----
function Step2Visitekaart({ state, onChange, locale }: { state: FormState; onChange: (p: Partial<FormState>) => void; locale: string }) {
  const isNL = locale === 'nl'
  const ctaOpts: { id: CtaType; nl: string; en: string }[] = [
    { id: 'whatsapp', nl: 'WhatsApp', en: 'WhatsApp' },
    { id: 'call', nl: 'Bel direct', en: 'Call directly' },
    { id: 'form', nl: 'Contactformulier', en: 'Contact form' },
  ]
  return (
    <div className="flex flex-col gap-8">
      <div>
        <label className={labelCls}>NFC-integratie <span className="text-neutral-600 normal-case font-normal">/ NFC integration</span></label>
        <BoolSelect value={state.nfcIntegration} onChange={(v) => onChange({ nfcIntegration: v })} locale={locale} />
      </div>
      <div>
        <label className={labelCls}>Hoofd call-to-action <span className="text-neutral-600 normal-case font-normal">/ Main CTA</span></label>
        <div className="flex flex-wrap gap-3">
          {ctaOpts.map((o) => (
            <button key={o.id} type="button" onClick={() => onChange({ ctaType: o.id })}
              className={`${pillBase} ${state.ctaType === o.id ? pillOn : pillOff}`}
            >{isNL ? o.nl : o.en}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step2Portfolio({ state, onChange, locale }: { state: FormState; onChange: (p: Partial<FormState>) => void; locale: string }) {
  const isNL = locale === 'nl'
  const contentOpts: { id: ContentType; nl: string; en: string }[] = [
    { id: 'video', nl: 'Video', en: 'Video' },
    { id: 'photo', nl: "Foto's / afbeeldingen", en: 'Photos / images' },
    { id: 'pdf', nl: 'PDF / documenten', en: 'PDF / documents' },
  ]
  const toggle = (id: ContentType) => onChange({
    contentTypes: state.contentTypes.includes(id)
      ? state.contentTypes.filter((c) => c !== id)
      : [...state.contentTypes, id],
  })
  return (
    <div className="flex flex-col gap-8">
      <div>
        <label className={labelCls}>Type content <span className="text-neutral-600 normal-case font-normal">/ Content type (meerdere mogelijk)</span></label>
        <div className="flex flex-wrap gap-3">
          {contentOpts.map((o) => (
            <button key={o.id} type="button" onClick={() => toggle(o.id)}
              className={`${pillBase} ${state.contentTypes.includes(o.id) ? pillOn : pillOff}`}
            >{isNL ? o.nl : o.en}</button>
          ))}
        </div>
      </div>
      <div>
        <label className={labelCls}>Filteroptie nodig? <span className="text-neutral-600 normal-case font-normal">/ Filtering needed?</span></label>
        <BoolSelect value={state.filtering} onChange={(v) => onChange({ filtering: v })} locale={locale} />
      </div>
      <div>
        <label className={labelCls}>Content management panel <span className="text-neutral-600 normal-case font-normal">/ CMS needed?</span></label>
        <BoolSelect value={state.cmsNeeded} onChange={(v) => onChange({ cmsNeeded: v })} locale={locale} />
      </div>
    </div>
  )
}

function Step2LeadGen({ state, onChange, locale }: { state: FormState; onChange: (p: Partial<FormState>) => void; locale: string }) {
  const isNL = locale === 'nl'
  const crmOpts: { id: CrmType; label: string }[] = [
    { id: 'hubspot', label: 'HubSpot' },
    { id: 'salesforce', label: 'Salesforce' },
    { id: 'other', label: isNL ? 'Ander / Other' : 'Other' },
    { id: 'none', label: isNL ? 'Geen' : 'None' },
  ]
  return (
    <div className="flex flex-col gap-8">
      <div>
        <label className={labelCls}>Kalenderintegratie (Calendly e.d.) <span className="text-neutral-600 normal-case font-normal">/ Calendar integration</span></label>
        <BoolSelect value={state.calendarIntegration} onChange={(v) => onChange({ calendarIntegration: v })} locale={locale} />
      </div>
      <div>
        <label className={labelCls}>CRM-systeem <span className="text-neutral-600 normal-case font-normal">/ CRM system</span></label>
        <div className="flex flex-wrap gap-3">
          {crmOpts.map((o) => (
            <button key={o.id} type="button" onClick={() => onChange({ crmType: o.id })}
              className={`${pillBase} ${state.crmType === o.id ? pillOn : pillOff}`}
            >{o.label}</button>
          ))}
        </div>
      </div>
      <div>
        <label className={labelCls}>Formulierstappen <span className="text-neutral-600 normal-case font-normal">/ Form step count</span></label>
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((n) => (
            <button key={n} type="button" onClick={() => onChange({ formSteps: n })}
              className={`${pillBase} ${state.formSteps === n ? pillOn : pillOff}`}
            >{n === 4 ? '4+' : n}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step2Saas({ state, onChange, locale }: { state: FormState; onChange: (p: Partial<FormState>) => void; locale: string }) {
  const isNL = locale === 'nl'
  const roles = ['Admin', isNL ? 'Klant / Customer' : 'Customer', isNL ? 'Medewerker / Staff' : 'Staff', isNL ? 'Anders / Other' : 'Other']
  const aiOpts: { id: AiFunction; nl: string; en: string }[] = [
    { id: 'analysis', nl: 'Data-analyse', en: 'Data analysis' },
    { id: 'bot', nl: 'AI-chatbot', en: 'AI chatbot' },
    { id: 'automation', nl: 'Procesautomatisering', en: 'Process automation' },
  ]
  const toggleRole = (r: string) => onChange({
    userRoles: state.userRoles.includes(r) ? state.userRoles.filter((x) => x !== r) : [...state.userRoles, r],
  })
  const toggleAi = (fn: AiFunction) => onChange({
    aiFunctions: state.aiFunctions.includes(fn) ? state.aiFunctions.filter((x) => x !== fn) : [...state.aiFunctions, fn],
  })
  return (
    <div className="flex flex-col gap-8">
      <div>
        <label className={labelCls}>Gebruikersrollen <span className="text-neutral-600 normal-case font-normal">/ User roles (meerdere mogelijk)</span></label>
        <div className="flex flex-wrap gap-3">
          {roles.map((r) => (
            <button key={r} type="button" onClick={() => toggleRole(r)}
              className={`${pillBase} ${state.userRoles.includes(r) ? pillOn : pillOff}`}
            >{r}</button>
          ))}
        </div>
      </div>
      <div>
        <label className={labelCls}>AI-functionaliteiten <span className="text-neutral-600 normal-case font-normal">/ AI functions</span></label>
        <div className="flex flex-wrap gap-3">
          {aiOpts.map((o) => (
            <button key={o.id} type="button" onClick={() => toggleAi(o.id)}
              className={`${pillBase} ${state.aiFunctions.includes(o.id) ? pillOn : pillOff}`}
            >{isNL ? o.nl : o.en}</button>
          ))}
        </div>
      </div>
      <div>
        <label className={labelCls}>Data-migratie nodig? <span className="text-neutral-600 normal-case font-normal">/ Data migration needed?</span></label>
        <BoolSelect value={state.dataMigration} onChange={(v) => onChange({ dataMigration: v })} locale={locale} />
      </div>
    </div>
  )
}

const CATEGORY_LABELS: Record<Category, { nl: string; en: string }> = {
  visitekaart: { nl: 'De Digitale Visitekaart', en: 'Digital Business Card' },
  portfolio: { nl: 'Showcase & Portfolio', en: 'Showcase & Portfolio' },
  leadgen: { nl: 'Conversion & Lead Gen', en: 'Conversion & Lead Gen' },
  saas: { nl: 'Custom SaaS / Platform', en: 'Custom SaaS / Platform' },
}

function Step2({ category, state, onChange, locale }: { category: Category | null; state: FormState; onChange: (p: Partial<FormState>) => void; locale: string }) {
  const isNL = locale === 'nl'
  const catLabel = category ? (isNL ? CATEGORY_LABELS[category].nl : CATEGORY_LABELS[category].en) : ''
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">Stap 2 / Step 2 · {catLabel}</p>
      <h2 className="text-2xl font-bold text-white mb-8">{isNL ? 'Project details' : 'Project details'}</h2>
      {category === 'visitekaart' && <Step2Visitekaart state={state} onChange={onChange} locale={locale} />}
      {category === 'portfolio' && <Step2Portfolio state={state} onChange={onChange} locale={locale} />}
      {category === 'leadgen' && <Step2LeadGen state={state} onChange={onChange} locale={locale} />}
      {category === 'saas' && <Step2Saas state={state} onChange={onChange} locale={locale} />}
    </div>
  )
}

// ---- Step 3 ----
function Step3({ state, onChange, locale }: { state: FormState; onChange: (p: Partial<FormState>) => void; locale: string }) {
  const isNL = locale === 'nl'
  const hostingOpts = [
    { id: 'qovre' as const, nl: 'Qovre Managed (Zorgeloos)', en: 'Qovre Managed (Hassle-free)' },
    { id: 'own' as const, nl: 'Eigen server / Own server', en: 'Own server / Eigen server' },
  ]
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">Stap 3 / Step 3</p>
      <h2 className="text-2xl font-bold text-white mb-8">{isNL ? 'Context & infrastructuur' : 'Context & infrastructure'}</h2>
      <div className="flex flex-col gap-8">
        <div>
          <label className={labelCls} htmlFor="ob-competitor">
            {isNL ? 'Link naar concurrent' : 'Link to a competitor'}{' '}
            <span className="text-neutral-600 normal-case font-normal">/ {isNL ? 'Link to a competitor\'s website' : 'Link naar concurrent'}</span>
          </label>
          <input id="ob-competitor" type="url" value={state.competitorUrl}
            onChange={(e) => onChange({ competitorUrl: e.target.value })}
            placeholder="https://www.concurrent.nl" className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Hosting <span className="text-neutral-600 normal-case font-normal">/ Hosting preference</span></label>
          <div className="flex flex-wrap gap-3">
            {hostingOpts.map((o) => (
              <button key={o.id} type="button" onClick={() => onChange({ hosting: o.id })}
                className={`${pillBase} ${state.hosting === o.id ? pillOn : pillOff}`}
              >{isNL ? o.nl : o.en}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between p-5 rounded-xl border border-neutral-800 bg-neutral-900/30">
          <div>
            <p className="text-sm font-medium text-white">{isNL ? 'Maandelijks onderhoud & updates' : 'Monthly maintenance & updates'}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{isNL ? 'Doorlopend beheer en beveiligingsupdates' : 'Ongoing management and security updates'}</p>
          </div>
          <Toggle value={state.monthlyMaintenance} onChange={(v) => onChange({ monthlyMaintenance: v })} />
        </div>
      </div>
    </div>
  )
}

// ---- Step 4 ----
function Step4({ state, onChange, locale, onFileChange, fileError }: {
  state: FormState
  onChange: (p: Partial<FormState>) => void
  locale: string
  onFileChange: (f: File) => void
  fileError: string
}) {
  const isNL = locale === 'nl'
  const fileInputRef = useRef<HTMLInputElement>(null)
  const showWarning = state.category === 'saas'

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">Stap 4 / Step 4</p>
      <h2 className="text-2xl font-bold text-white mb-8">{isNL ? 'Afronden' : 'Final step'}</h2>

      {showWarning && (
        <div className="mb-8 p-5 rounded-xl border border-amber-500/30 bg-amber-500/5">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500/80 mb-2">
            {isNL ? 'Let op / Please note' : 'Please note / Let op'}
          </p>
          <p className="text-sm text-amber-200/70 leading-relaxed">
            {isNL
              ? 'Voor speciale en maatwerk projecten worden uw vereisten geanalyseerd en ontvangt u een gedetailleerde prijsopgave en projectdetails per e-mail.'
              : 'For custom and SaaS projects, your requirements will be analysed and you will receive a detailed quote and project details by email. / Voor speciale projecten ontvangt u een gedetailleerde offerte per e-mail.'}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelCls} htmlFor="ob-name">{isNL ? 'Naam' : 'Name'} *</label>
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
            placeholder={isNL ? 'Uw bedrijfsnaam' : 'Your company name'} className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>
            {isNL ? 'Logo of huisstijl (optioneel)' : 'Logo or brand identity (optional)'}
            <span className="text-neutral-600 normal-case font-normal"> / Logo or corporate identity document</span>
          </label>
          <button type="button" onClick={() => fileInputRef.current?.click()}
            className="w-full p-6 rounded-xl border-2 border-dashed border-neutral-800 bg-neutral-900/20 hover:border-neutral-700 transition-colors text-center"
          >
            {state.fileName
              ? <span className="text-sm text-blue-400 font-medium">{state.fileName}</span>
              : <span className="text-sm text-neutral-500">
                  {isNL ? 'Klik om bestand te uploaden' : 'Click to upload file'}
                  <span className="block text-xs text-neutral-600 mt-1">PNG, JPG, PDF, AI, SVG — max 10 MB</span>
                </span>
            }
          </button>
          {fileError && <p className="mt-1.5 text-xs text-red-400">{fileError}</p>}
          <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.pdf,.ai,.svg,.zip"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onFileChange(f) }}
          />
        </div>
      </div>
    </div>
  )
}

// ---- Success Screen ----
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
          ? 'Bedankt voor uw aanvraag. Wij nemen binnen 24 uur contact met u op.'
          : 'Thank you for your request. We will get back to you within 24 hours.'}
      </p>
      <p className="text-xs text-neutral-600 mt-4">
        {isNL
          ? 'U ontvangt een bevestiging op het opgegeven e-mailadres.'
          : 'You will receive a confirmation at the email address provided.'}
      </p>
    </motion.div>
  )
}

// ---- Main Component ----
export default function OnboardingForm({ locale }: { locale: string }) {
  const isNL = locale === 'nl'
  const [step, setStep] = useState(1)
  const [state, setState] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [fileError, setFileError] = useState('')

  function update(partial: Partial<FormState>) {
    setState((prev) => ({ ...prev, ...partial }))
  }

  function handleFileChange(file: File) {
    if (file.size > 10 * 1024 * 1024) {
      setFileError(isNL ? 'Bestand te groot (max 10 MB).' : 'File too large (max 10 MB).')
      return
    }
    setFileError('')
    const reader = new FileReader()
    reader.onload = (e) => update({ fileName: file.name, fileBase64: (e.target?.result as string) ?? null })
    reader.readAsDataURL(file)
  }

  function canAdvance() {
    if (step === 1) return state.category !== null
    if (step === 4) return state.name.trim() !== '' && state.email.includes('@')
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
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
          {step === 1 && <Step1 value={state.category} onChange={(c) => update({ category: c })} locale={locale} />}
          {step === 2 && <Step2 category={state.category} state={state} onChange={update} locale={locale} />}
          {step === 3 && <Step3 state={state} onChange={update} locale={locale} />}
          {step === 4 && <Step4 state={state} onChange={update} locale={locale} onFileChange={handleFileChange} fileError={fileError} />}
        </motion.div>
      </AnimatePresence>

      {status === 'error' && (
        <p className="mt-4 text-sm text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3">
          {isNL ? 'Er is iets misgegaan. Probeer het opnieuw.' : 'Something went wrong. Please try again.'}
        </p>
      )}

      <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-800/50">
        {step > 1
          ? <button type="button" onClick={() => setStep((s) => s - 1)}
              className="px-5 py-2.5 text-sm font-medium text-neutral-400 hover:text-white border border-neutral-800 rounded-full transition-colors"
            >{isNL ? '← Terug' : '← Back'}</button>
          : <div />
        }
        {step < 4
          ? <button type="button" disabled={!canAdvance()} onClick={() => setStep((s) => s + 1)}
              className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >{isNL ? 'Volgende →' : 'Next →'}</button>
          : <button type="button" disabled={!canAdvance() || status === 'loading'} onClick={handleSubmit}
              className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {status === 'loading'
                ? <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>{isNL ? 'Verzenden...' : 'Sending...'}</>
                : isNL ? 'Aanvraag verzenden →' : 'Submit request →'
              }
            </button>
        }
      </div>
    </div>
  )
}
