'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const parsed = loginSchema.safeParse({ email, password })
    if (!parsed.success) {
      setError('Invalid email or password format')
      return
    }

    setLoading(true)
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

      if (authError) {
        setError('Invalid credentials')
        return
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors'
  const labelClass = 'block text-xs font-medium tracking-wide text-neutral-400 uppercase mb-2'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800">
      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@qovre.nl"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>Wachtwoord</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className={inputClass}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-white text-black font-semibold text-sm rounded-full hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Bezig...' : 'Inloggen'}
      </button>
    </form>
  )
}
