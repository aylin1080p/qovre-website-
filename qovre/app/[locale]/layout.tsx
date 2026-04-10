import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/ui/ChatWidget'
import { BRAND, SERVICES } from '@/data/seo'

const locales = ['nl', 'en']

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: BRAND.brandName,
  legalName: BRAND.legalName,
  url: BRAND.websiteUrl,
  email: BRAND.email.primary,
  telephone: BRAND.phone.international,
  address: {
    '@type': 'PostalAddress',
    addressLocality: BRAND.location.city,
    addressCountry: 'NL',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Netherlands',
  },
  description: BRAND.positioning.nl,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Qovre diensten',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: {
        '@type': 'Service',
        name: s.titleNL,
        url: `${BRAND.websiteUrl}/nl/${s.slug}`,
      },
    })),
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: BRAND.email.primary,
    availableLanguage: ['Dutch', 'English'],
  },
  sameAs: [BRAND.websiteUrl],
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link
          rel="preload"
          href="/hero-lcp.png"
          as="image"
          type="image/png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-[#060608] text-neutral-100">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
