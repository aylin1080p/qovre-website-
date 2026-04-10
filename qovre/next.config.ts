import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
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
