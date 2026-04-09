import Link from 'next/link'
import { BRAND, CITIES } from '@/data/seo'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black text-neutral-400 text-sm">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
            <span className="text-white font-semibold text-base">Qovre</span>
            <span>{BRAND.email.primary}</span>
            <span>{BRAND.email.secondary}</span>
            <span className="text-neutral-600 text-xs">{BRAND.legal.operatorDisclosure.nl}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-white font-medium mb-1">Nederlands</span>
            <Link href="/nl/diensten" className="hover:text-white transition-colors">Diensten</Link>
            <Link href="/nl/werkwijze" className="hover:text-white transition-colors">Werkwijze</Link>
            <Link href="/nl/over-ons" className="hover:text-white transition-colors">Over ons</Link>
            <Link href="/nl/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-white font-medium mb-1">English</span>
            <Link href="/en/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/en/process" className="hover:text-white transition-colors">Process</Link>
            <Link href="/en/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/en/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-white font-medium mb-1">Legal</span>
            <a href="/legal/service_level_agreement.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SLA</a>
            <a href="/legal/data_processing_agreement.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Data Processing</a>
            <a href="/legal/refund_policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Refund Policy</a>
            <a href="/legal/ai_usage_policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">AI Usage Policy</a>
            <a href="/legal/hosting_liability.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Hosting Liability</a>
            <a href="/legal/client_contract_template.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Contract</a>
          </div>
        </div>

        {/* Cities */}
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-neutral-600">
          {CITIES.map((city) => (
            <Link key={city.slug} href={`/nl/software-ontwikkeling-${city.slug}`} className="hover:text-neutral-400 transition-colors">
              {city.name}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-neutral-600">
          <span>© {new Date().getFullYear()} Qovre. {BRAND.legal.operatorDisclosure.en}</span>
          <span>Den Haag, Nederland · contact@qovre.nl</span>
        </div>
      </div>
    </footer>
  )
}
