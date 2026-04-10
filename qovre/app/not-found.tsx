import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060608] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <span className="text-xs font-medium tracking-widest text-neutral-600 uppercase">404</span>
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
          Pagina niet gevonden
        </h1>
        <p className="text-neutral-500 text-base leading-relaxed mb-10">
          Deze pagina bestaat niet of is verplaatst.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/nl"
            className="px-6 py-3 bg-white text-black font-semibold text-sm rounded-full hover:bg-neutral-200 transition-colors"
          >
            Terug naar home
          </Link>
          <Link
            href="/nl/contact"
            className="px-6 py-3 border border-neutral-800 text-neutral-400 font-semibold text-sm rounded-full hover:bg-neutral-900 hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
