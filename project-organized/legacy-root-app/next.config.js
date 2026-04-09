/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Output ──────────────────────────────────────────────────
  // output: 'export',   // uncomment for static export (no server)
  // trailingSlash: true, // required for static export on some hosts

  // ── Performance ─────────────────────────────────────────────
  compress: true,
  poweredByHeader: false,         // don't leak Next.js version
  reactStrictMode: true,

  // ── Images ──────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ── HTTP Security Headers ────────────────────────────────────
  // Critical for enterprise trust and Core Web Vitals
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Prevent MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // XSS protection (legacy browsers)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Referrer policy — privacy-friendly
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions policy — disable unused browser APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // HSTS — force HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Content Security Policy
          // Adjust as you add third-party scripts (analytics, chat widgets etc.)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://www.google-analytics.com https://api.resend.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache images
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      // llms.txt — no cache so AI crawlers always get fresh data
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
    ];
  },

  // ── Redirects ───────────────────────────────────────────────
  async redirects() {
    return [
      // Root → English by default
      // (swap to /nl if Dutch is the primary audience)
      {
        source: "/",
        destination: "/en",
        permanent: false, // 302 until confirmed — change to true later
      },
      // Redirect old/generic URLs if migrating from an existing site
      // { source: '/services', destination: '/en/services', permanent: true },
    ];
  },

  // ── Rewrites ────────────────────────────────────────────────
  async rewrites() {
    return [
      // llms.txt accessible at root
      {
        source: "/llms.txt",
        destination: "/llms.txt",
      },
    ];
  },
};

export default nextConfig;
