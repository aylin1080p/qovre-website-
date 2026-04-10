'use client'

import { useState } from 'react'
import type { Submission } from '@/lib/onboarding-types'

// ---------------------------------------------------------------------------
// Label maps
// ---------------------------------------------------------------------------
const CATEGORY_LABELS: Record<string, string> = {
  web: 'Professional Web',
  saas: 'Scalable SaaS',
  ai: 'AI & Automation',
}

const STATUS_LABELS: Record<string, string> = {
  new: 'Nieuw',
  reviewed: 'Bekeken',
  proposal_sent: 'Offerte verstuurd',
  won: 'Gewonnen',
  lost: 'Verloren',
}

const SLA_LABELS: Record<string, string> = {
  essential: 'Essential',
  growth: 'Growth',
  partner: 'Partner',
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  reviewed: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  proposal_sent: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  won: 'bg-green-500/20 text-green-300 border-green-500/30',
  lost: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
}

const SLA_COLORS: Record<string, string> = {
  essential: 'bg-neutral-700/60 text-neutral-300 border-neutral-600',
  growth: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  partner: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function Badge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {label}
    </span>
  )
}

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className="flex gap-3 text-sm">
      <span className="text-neutral-500 w-44 shrink-0">{label}</span>
      <span className="text-neutral-200">{value}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{title}</h4>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  )
}

function bool(v: boolean | null | undefined) {
  return v === true ? 'Ja' : v === false ? 'Nee' : '-'
}

function arr(v: string[] | null | undefined) {
  return v?.join(', ') || '-'
}

// ---------------------------------------------------------------------------
// Detail panel
// ---------------------------------------------------------------------------
function SubmissionDetail({
  sub,
  onStatusChange,
}: {
  sub: Submission
  onStatusChange: (id: string, status: Submission['status']) => void
}) {
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(sub.status)
  const p = sub.payload

  async function handleStatusChange(newStatus: Submission['status']) {
    setSaving(true)
    setStatus(newStatus)
    try {
      const res = await fetch(`/api/admin/submissions/${sub.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) onStatusChange(sub.id, newStatus)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-white font-semibold">{sub.name}</p>
          <p className="text-neutral-400 text-sm">{sub.email}</p>
          {sub.company && <p className="text-neutral-500 text-xs mt-0.5">{sub.company}</p>}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-neutral-500 text-xs">
            {new Date(sub.created_at).toLocaleString('nl-NL', { dateStyle: 'medium', timeStyle: 'short' })}
          </span>
          <select
            value={status}
            disabled={saving}
            onChange={e => handleStatusChange(e.target.value as Submission['status'])}
            className="bg-neutral-800 text-neutral-200 text-xs border border-neutral-700 rounded-lg px-2 py-1.5 focus:outline-none focus:border-neutral-500 disabled:opacity-60"
          >
            {Object.entries(STATUS_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Contact info */}
      <Section title="Contact">
        <DetailRow label="Naam" value={sub.name} />
        <DetailRow label="E-mail" value={sub.email} />
        <DetailRow label="Bedrijf" value={sub.company} />
        {p.competitorUrl && <DetailRow label="Referentie URL" value={p.competitorUrl} />}
        {sub.file_name && <DetailRow label="Bijlage" value={sub.file_name} />}
      </Section>

      {/* Service details */}
      <Section title="Service Details">
        <DetailRow label="Categorie" value={CATEGORY_LABELS[sub.category] ?? sub.category} />
        {sub.category === 'web' && <>
          <DetailRow label="Web types" value={arr(p.webTypes)} />
          <DetailRow label="Pagina's" value={p.pageCount ?? undefined} />
          <DetailRow label="CMS nodig" value={bool(p.cmsNeeded)} />
          <DetailRow label="Integraties" value={arr(p.integrations)} />
        </>}
        {sub.category === 'saas' && <>
          <DetailRow label="Gebruikersrollen" value={arr(p.userRoles)} />
          <DetailRow label="Complexiteit" value={p.complexity ?? undefined} />
          <DetailRow label="AI-functies" value={arr(p.aiFunctions)} />
          <DetailRow label="Data-migratie" value={bool(p.dataMigration)} />
        </>}
        {sub.category === 'ai' && <>
          <DetailRow label="Automatiseringstypen" value={arr(p.automationTypes)} />
          <DetailRow label="Databronnen" value={arr(p.dataSources)} />
          <DetailRow label="Bestaande AI" value={bool(p.hasExistingAi)} />
        </>}
      </Section>

      {/* Infrastructure */}
      <Section title="Infrastructuur & SLA">
        <DetailRow label="SLA-pakket" value={sub.sla_level ? SLA_LABELS[sub.sla_level] : '-'} />
        <DetailRow label="Hosting" value={sub.hosting === 'qovre' ? 'Qovre Managed' : sub.hosting === 'own' ? 'Eigen hosting' : '-'} />
        <DetailRow label="Traffic" value={sub.traffic_level ?? undefined} />
        <DetailRow label="Beveiliging" value={sub.security_level ?? undefined} />
        <DetailRow label="Schaalbaarheid" value={sub.scalability ?? undefined} />
      </Section>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function SubmissionsList({
  initialSubmissions,
}: {
  initialSubmissions: Submission[]
}) {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = submissions.find(s => s.id === selectedId) ?? null

  function handleStatusChange(id: string, status: Submission['status']) {
    setSubmissions(prev =>
      prev.map(s => s.id === id ? { ...s, status } : s)
    )
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Projectaanvragen
          <span className="ml-2 text-sm font-normal text-neutral-500">({submissions.length})</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/60">
                <th className="text-left text-neutral-500 font-medium px-4 py-3 text-xs uppercase tracking-wider">Datum</th>
                <th className="text-left text-neutral-500 font-medium px-4 py-3 text-xs uppercase tracking-wider">Naam</th>
                <th className="text-left text-neutral-500 font-medium px-4 py-3 text-xs uppercase tracking-wider">Categorie</th>
                <th className="text-left text-neutral-500 font-medium px-4 py-3 text-xs uppercase tracking-wider">SLA</th>
                <th className="text-left text-neutral-500 font-medium px-4 py-3 text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(sub => (
                <tr
                  key={sub.id}
                  onClick={() => setSelectedId(sub.id === selectedId ? null : sub.id)}
                  className={`border-b border-neutral-800/60 cursor-pointer transition-colors ${
                    sub.id === selectedId
                      ? 'bg-neutral-800/60'
                      : 'hover:bg-neutral-900/60'
                  }`}
                >
                  <td className="px-4 py-3 text-neutral-400 text-xs whitespace-nowrap">
                    {new Date(sub.created_at).toLocaleDateString('nl-NL')}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-neutral-200 font-medium">{sub.name}</p>
                    {sub.company && <p className="text-neutral-500 text-xs">{sub.company}</p>}
                  </td>
                  <td className="px-4 py-3 text-neutral-400 text-xs whitespace-nowrap">
                    {CATEGORY_LABELS[sub.category] ?? sub.category}
                  </td>
                  <td className="px-4 py-3">
                    {sub.sla_level ? (
                      <Badge
                        label={SLA_LABELS[sub.sla_level]}
                        colorClass={SLA_COLORS[sub.sla_level]}
                      />
                    ) : (
                      <span className="text-neutral-600 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      label={STATUS_LABELS[sub.status]}
                      colorClass={STATUS_COLORS[sub.status]}
                    />
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-neutral-600 text-sm">
                    Nog geen aanvragen.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        <div>
          {selected ? (
            <SubmissionDetail
              sub={selected}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <div className="h-full min-h-[200px] flex items-center justify-center rounded-xl border border-dashed border-neutral-800 text-neutral-600 text-sm">
              Selecteer een aanvraag om details te bekijken
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
