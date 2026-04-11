import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { createServerClient } from '@supabase/ssr'

const intlMiddleware = createIntlMiddleware({
  locales: ['nl', 'en'],
  defaultLocale: 'nl',
  localePrefix: 'always',
  alternateLinks: false,
})

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always keep the first-entry experience Dutch-first.
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/nl', req.url))
  }

  // Bypass for SEO and static files
  if (
    pathname === '/robots.txt' || 
    pathname === '/sitemap.xml' || 
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Keep /admin outside locale routing and protect dashboard routes.
  if (pathname === '/admin' || pathname.startsWith('/admin/dashboard') || pathname.startsWith('/admin/api')) {
    if (pathname === '/admin') {
      return NextResponse.next()
    }

    const res = NextResponse.next()
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials in proxy');
      return res;
    }

    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll: () => req.cookies.getAll(),
          setAll: (cookiesToSet) => {
            for (const { name, value, options } of cookiesToSet) {
              res.cookies.set(name, value, options)
            }
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    return res
  }

  // next-intl handles all other routes
  return intlMiddleware(req)
}

export const proxyConfig = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
