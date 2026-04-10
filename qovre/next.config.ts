import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

// Content-Security-Policy
// unsafe-inline required for: GA4 inline gtag init, JSON-LD <script> blocks, Framer Motion inline styles
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://vitals.vercel-insights.com",
    "https://*.supabase.co",
    "wss://*.supabase.co",
    "https://generativelanguage.googleapis.com",
  ].join(' '),
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy',   value: CSP },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), payment=()' },
]

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [{ source: '/(.*)', headers: SECURITY_HEADERS }]
  },
  async redirects() {
    return [
      {
        source: '/nl/veelgestelde-vragen',
        destination: '/nl/faq',
        permanent: true,
      },
      {
        source: '/en/veelgestelde-vragen',
        destination: '/en/faq',
        permanent: true,
      },
      {
        source: '/nl/werkwijze',
        destination: '/nl/process',
        permanent: true,
      },
      {
        source: '/en/werkwijze',
        destination: '/en/process',
        permanent: true,
      },
      {
        source: '/en/over-ons',
        destination: '/en/about',
        permanent: true,
      },
      {
        source: '/en/sectoren',
        destination: '/en/industries',
        permanent: true,
      },
      {
        source: '/nl/about',
        destination: '/nl/over-ons',
        permanent: true,
      },
      {
        source: '/nl/industries',
        destination: '/nl/sectoren',
        permanent: true,
      },
      {
        source: '/nl/services',
        destination: '/nl/diensten',
        permanent: true,
      },
      {
        source: '/en/diensten',
        destination: '/en/services',
        permanent: true,
      },
      {
        source: '/en/software-development-:city',
        destination: '/en/software-development/:city',
        permanent: true,
      },
      {
        source: '/nl/software-ontwikkeling-:city',
        destination: '/nl/software-ontwikkeling/:city',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
