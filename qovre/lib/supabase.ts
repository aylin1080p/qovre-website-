import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function createServiceClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, serviceRoleKey)
}

export type Service = {
  id: string
  slug: string
  title_nl: string
  title_en: string
  description_nl: string | null
  description_en: string | null
  icon: string | null
  order_index: number
  is_active: boolean
  created_at: string
}

export type ContactSubmission = {
  id: string
  name: string
  email: string
  company: string | null
  message: string
  locale: string
  created_at: string
}

export type ChatUsage = {
  id: string
  date: string
  count: number
}
