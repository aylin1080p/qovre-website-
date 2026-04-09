'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const otherLocale = locale === 'nl' ? 'en' : 'nl'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">

        {/* Logo */}
        <Link href={`/${locale}`} className="text-white font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity">
          Qovre
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
          <Link href={`/${locale}/${locale === 'nl' ? 'diensten' : 'services'}`} className="hover:text-white transition-colors">
            {t('services')}
          </Link>
          <Link href={`/${locale}/${locale === 'nl' ? 'werkwijze' : 'process'}`} className="hover:text-white transition-colors">
            {t('process')}
          </Link>
          <Link href={`/${locale}/${locale === 'nl' ? 'over-ons' : 'about'}`} className="hover:text-white transition-colors">
            {t('about')}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
            {t('contact')}
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 text-sm">
          <Link
            href={`/${otherLocale}`}
            className="text-neutral-500 hover:text-white transition-colors uppercase tracking-wide text-xs font-medium"
          >
            {otherLocale}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors"
          >
            {t('cta')}
          </Link>
        </div>

      </nav>
    </header>
  )
}
