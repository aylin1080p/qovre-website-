import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase'
import ServicesCRUD from '@/components/admin/ServicesCRUD'
import ContactList from '@/components/admin/ContactList'
import SubmissionsList from '@/components/admin/SubmissionsList'
import type { Submission } from '@/lib/onboarding-types'

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin')

  const serviceClient = createServiceClient()

  const [{ data: services }, { data: contacts }, { data: onboardingSubmissions }] = await Promise.all([
    supabase.from('services').select('*').order('order_index'),
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(50),
    serviceClient.from('onboarding_submissions').select('*').order('created_at', { ascending: false }).limit(100),
  ])

  return (
    <div className="min-h-screen bg-[#060608] text-neutral-100">
      <div className="border-b border-neutral-800 bg-black/80 backdrop-blur-md px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <span className="text-white font-semibold tracking-tight">Qovre Admin</span>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="px-4 py-2 text-xs font-medium text-neutral-400 border border-neutral-800 rounded-full hover:text-white hover:border-neutral-700 transition-colors"
          >
            Uitloggen
          </button>
        </form>
      </div>
      <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col gap-12">
        <SubmissionsList initialSubmissions={(onboardingSubmissions ?? []) as Submission[]} />
        <ServicesCRUD initialServices={services ?? []} />
        <ContactList contacts={contacts ?? []} />
      </div>
    </div>
  )
}
