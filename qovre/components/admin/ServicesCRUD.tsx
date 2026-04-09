'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import type { Service } from '@/lib/supabase'

const serviceSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'Only lowercase, numbers, hyphens'),
  title_nl: z.string().min(1).max(200),
  title_en: z.string().min(1).max(200),
  description_nl: z.string().max(1000).optional(),
  description_en: z.string().max(1000).optional(),
  icon: z.string().max(50).optional(),
  order_index: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
})

type ServiceInput = z.infer<typeof serviceSchema>

const EMPTY: ServiceInput = {
  slug: '', title_nl: '', title_en: '',
  description_nl: '', description_en: '',
  icon: '', order_index: 0, is_active: true,
}

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export default function ServicesCRUD({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [form, setForm] = useState<ServiceInput>(EMPTY)
  const [editId, setEditId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  function resetForm() {
    setForm(EMPTY)
    setEditId(null)
    setErrors({})
    setMsg('')
  }

  function startEdit(service: Service) {
    setEditId(service.id)
    setForm({
      slug: service.slug,
      title_nl: service.title_nl,
      title_en: service.title_en,
      description_nl: service.description_nl ?? '',
      description_en: service.description_en ?? '',
      icon: service.icon ?? '',
      order_index: service.order_index,
      is_active: service.is_active,
    })
    setMsg('')
  }

  async function handleSave() {
    const parsed = serviceSchema.safeParse(form)
    if (!parsed.success) {
      const errs: Record<string, string> = {}
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message
      setErrors(errs)
      return
    }
    setErrors({})
    setSaving(true)

    const supabase = getClient()
    const payload = {
      ...parsed.data,
      description_nl: parsed.data.description_nl || null,
      description_en: parsed.data.description_en || null,
      icon: parsed.data.icon || null,
    }

    if (editId) {
      const { data, error } = await supabase.from('services').update(payload).eq('id', editId).select().single()
      if (error) { setMsg(`Error: ${error.message}`); setSaving(false); return }
      setServices((prev) => prev.map((s) => s.id === editId ? data as Service : s))
      setMsg('Updated.')
    } else {
      const { data, error } = await supabase.from('services').insert(payload).select().single()
      if (error) { setMsg(`Error: ${error.message}`); setSaving(false); return }
      setServices((prev) => [...prev, data as Service])
      setMsg('Created.')
    }

    setSaving(false)
    resetForm()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this service?')) return
    const supabase = getClient()
    const { error } = await supabase.from('services').delete().eq('id', id)
    if (error) { setMsg(`Error: ${error.message}`); return }
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  async function toggleActive(service: Service) {
    const supabase = getClient()
    const { data, error } = await supabase
      .from('services').update({ is_active: !service.is_active }).eq('id', service.id).select().single()
    if (error) { setMsg(`Error: ${error.message}`); return }
    setServices((prev) => prev.map((s) => s.id === service.id ? data as Service : s))
  }

  return (
    <section className="flex flex-col gap-6">
      <h2>Services</h2>

      {/* List */}
      <table>
        <thead>
          <tr>
            <th>Slug</th><th>NL</th><th>EN</th><th>Active</th><th>Order</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.slug}</td>
              <td>{s.title_nl}</td>
              <td>{s.title_en}</td>
              <td>
                <button onClick={() => toggleActive(s)}>{s.is_active ? 'Yes' : 'No'}</button>
              </td>
              <td>{s.order_index}</td>
              <td className="flex gap-2">
                <button onClick={() => startEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form */}
      <div className="flex flex-col gap-3 p-4 border">
        <h3>{editId ? 'Edit service' : 'New service'}</h3>

        {(['slug', 'title_nl', 'title_en', 'icon'] as const).map((field) => (
          <div key={field} className="flex flex-col gap-1">
            <label>{field}</label>
            <input
              value={String(form[field] ?? '')}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
            {errors[field] && <span>{errors[field]}</span>}
          </div>
        ))}

        {(['description_nl', 'description_en'] as const).map((field) => (
          <div key={field} className="flex flex-col gap-1">
            <label>{field}</label>
            <textarea
              rows={3}
              value={String(form[field] ?? '')}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}

        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label>order_index</label>
            <input
              type="number"
              value={form.order_index}
              onChange={(e) => setForm({ ...form, order_index: Number(e.target.value) })}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>is_active</label>
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            />
          </div>
        </div>

        {msg && <p>{msg}</p>}

        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving}>{saving ? '...' : 'Save'}</button>
          <button onClick={resetForm}>Cancel</button>
        </div>
      </div>
    </section>
  )
}
