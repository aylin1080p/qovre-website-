'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { z } from 'zod'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

const schema = z.object({
  name: z.string().min(1, 'required').max(100),
  email: z.string().email('invalid email'),
  company: z.string().max(100).optional(),
  message: z.string().min(1, 'required').max(1000),
})

type FormData = z.infer<typeof schema>
type FormErrors = Partial<Record<keyof FormData, string>>

const inputClass =
  'w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors'

const labelClass = 'block text-xs font-medium tracking-wide text-neutral-400 uppercase mb-2'

export default function ContactForm() {
  const t = useTranslations('contact')
  const locale = useLocale()

  const [form, setForm] = useState<FormData>({ name: '', email: '', company: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function validate(): boolean {
    const result = schema.safeParse(form)
    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormData
        fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return false
    }
    setErrors({})
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale, _honeypot: '' }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Unknown error')
      }

      setStatus('success')
      setForm({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="py-12 px-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-medium">{t('success')}</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      {/* Honeypot — hidden from users */}
      <input
        type="text"
        name="_honeypot"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>{t('name')}</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Jan de Vries"
            required
            className={inputClass}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>{t('email')}</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="jan@bedrijf.nl"
            required
            className={inputClass}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <label htmlFor="company" className={labelClass}>{t('company')}</label>
        <input
          id="company"
          type="text"
          value={form.company ?? ''}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder={locale === 'nl' ? 'Bedrijfsnaam (optioneel)' : 'Company name (optional)'}
          className={inputClass}
        />
      </motion.div>

      <motion.div variants={fadeUp}>
        <label htmlFor="message" className={labelClass}>{t('message')}</label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={locale === 'nl' ? 'Omschrijf uw project of vraagstuk...' : 'Describe your project or question...'}
          required
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </motion.div>

      {status === 'error' && (
        <motion.p variants={fadeUp} className="text-sm text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3">
          {t('error')}
        </motion.p>
      )}

      <motion.div variants={fadeUp}>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold text-sm rounded-full hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {locale === 'nl' ? 'Verzenden...' : 'Sending...'}
            </span>
          ) : t('send')}
        </button>
      </motion.div>
    </motion.form>
  )
}
