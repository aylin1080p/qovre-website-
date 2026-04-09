import type { ContactSubmission } from '@/lib/supabase'

export default function ContactList({ contacts }: { contacts: ContactSubmission[] }) {
  return (
    <section className="flex flex-col gap-4">
      <h2>Contact submissions ({contacts.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Name</th><th>Email</th><th>Company</th><th>Locale</th><th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td>{new Date(c.created_at).toLocaleDateString('nl-NL')}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.company ?? '-'}</td>
              <td>{c.locale}</td>
              <td style={{ maxWidth: 300 }}>{c.message}</td>
            </tr>
          ))}
          {contacts.length === 0 && (
            <tr><td colSpan={6}>No submissions yet.</td></tr>
          )}
        </tbody>
      </table>
    </section>
  )
}
