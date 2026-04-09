import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import ServicesCRUD from '@/components/admin/ServicesCRUD'
import ContactList from '@/components/admin/ContactList'

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin')

  const [{ data: services }, { data: contacts }] = await Promise.all([
    supabase.from('services').select('*').order('order_index'),
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(50),
  ])

  return (
    <div className="p-8 flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <h1>Admin Dashboard</h1>
        <form action="/api/admin/logout" method="POST">
          <button type="submit">Uitloggen</button>
        </form>
      </div>
      <ServicesCRUD initialServices={services ?? []} />
      <ContactList contacts={contacts ?? []} />
    </div>
  )
}
