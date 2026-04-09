import { createClient } from '@supabase/supabase-js'
import type { Service } from '@/lib/supabase'

async function getServices(): Promise<Service[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('order_index')

  if (error) {
    console.error('Failed to fetch services:', error)
    return []
  }
  return data ?? []
}

export default async function DienstenPage() {
  const services = await getServices()

  return (
    <div className="p-8">
      <h1>Diensten</h1>
      <div className="grid gap-6 mt-8">
        {services.map((service) => (
          <div key={service.id} className="p-4 border">
            <h2>{service.title_nl}</h2>
            {service.description_nl && <p>{service.description_nl}</p>}
          </div>
        ))}
        {services.length === 0 && (
          <p>Geen diensten beschikbaar.</p>
        )}
      </div>
    </div>
  )
}
