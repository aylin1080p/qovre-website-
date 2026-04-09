'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'required').max(100),
  email: z.string().email('invalid email'),
  company: z.string().max(100).optional(),
  message: z.string().min(1, 'required').max(1000),
})

type FormData = z.infer<typeof schema>
type FormErrors = Partial<Record<keyof FormData, string>>

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
    return <p>{t('success')}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 max-w-lg">
      {/* Honeypot — hidden from users */}
      <input
        type="text"
        name="_honeypot"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="name">{t('name')}</label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email">{t('email')}</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="company">{t('company')}</label>
        <input
          id="company"
          type="text"
          value={form.company ?? ''}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message">{t('message')}</label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        {errors.message && <span>{errors.message}</span>}
      </div>

      {status === 'error' && <p>{t('error')}</p>}

      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? '...' : t('send')}
      </button>
    </form>
  )
}
