import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Qovre — Websites, Webshops, SaaS en AI voor bedrijven in Nederland'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#060608',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Brand */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: '#ffffff',
            letterSpacing: '0.05em',
            marginBottom: 40,
            opacity: 0.6,
          }}
        >
          QOVRE
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            maxWidth: 800,
            marginBottom: 24,
          }}
        >
          Digitale oplossingen voor betere online prestaties
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: '#a3a3a3',
            maxWidth: 640,
            lineHeight: 1.5,
          }}
        >
          Websites · Webshops · SaaS · AI-automatisering · SEO
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 80,
            fontSize: 16,
            color: '#525252',
            letterSpacing: '0.05em',
          }}
        >
          qovre.nl · Den Haag
        </div>
      </div>
    ),
    { ...size }
  )
}
