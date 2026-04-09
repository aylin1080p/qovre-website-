'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const otherLocale = locale === 'nl' ? 'en' : 'nl'
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: `/${locale}/${locale === 'nl' ? 'diensten' : 'services'}`, label: t('services') },
    { href: `/${locale}/${locale === 'nl' ? 'werkwijze' : 'process'}`, label: t('process') },
    { href: `/${locale}/${locale === 'nl' ? 'over-ons' : 'about'}`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">

        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-white font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity"
          onClick={() => setMobileOpen(false)}
        >
          Qovre
        </Link>

        {/* Desktop center links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 text-sm">
          <Link
            href={`/${otherLocale}`}
            className="hidden sm:block text-neutral-500 hover:text-white transition-colors uppercase tracking-wide text-xs font-medium"
          >
            {otherLocale}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="hidden md:block px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors"
          >
            {t('cta')}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Sluit menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-neutral-300 hover:text-white transition-colors text-base font-medium"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <Link
              href={`/${otherLocale}`}
              onClick={() => setMobileOpen(false)}
              className="text-neutral-500 hover:text-white transition-colors uppercase tracking-wide text-xs font-medium"
            >
              {otherLocale}
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
