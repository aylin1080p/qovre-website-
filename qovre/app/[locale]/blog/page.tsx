import Link from 'next/link'
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blog'
import { BRAND } from '@/data/seo'
import { generateMeta } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isNL = locale === 'nl'

  return generateMeta({
    title: isNL ? 'Blog & Inzichten' : 'Blog & Insights',
    description: isNL
      ? 'Praktische artikelen over webontwikkeling, AI, SaaS en digitale groei voor Nederlandse bedrijven.'
      : 'Practical articles on web development, AI, SaaS and digital growth for businesses in the Netherlands.',
    path: `/${locale}/blog`,
    locale: locale as 'nl' | 'en',
    alternateLocale: `${BRAND.websiteUrl}/${isNL ? 'en' : 'nl'}/blog`,
  })
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isNL = locale === 'nl'
  const sorted = [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

  return (
    <main className="pt-32 pb-24 px-4 bg-[#060608] min-h-screen">
      <div className="container max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">
            {isNL ? 'Inzichten & Kennis' : 'Insights & Knowledge'}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            {isNL ? 'Blog' : 'Blog'}
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {isNL
              ? 'Praktische kennis over webontwikkeling, AI-toepassingen en digitale groei voor Nederlandse bedrijven.'
              : 'Practical knowledge on web development, AI applications, and digital growth for businesses in the Netherlands.'}
          </p>
        </div>

        {/* Article grid */}
        <div className="flex flex-col gap-6">
          {sorted.map((post) => {
            const category = BLOG_CATEGORIES[post.category]
            return (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group block p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 hover:border-neutral-700 hover:bg-neutral-900/70 transition-all duration-200"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                    {isNL ? category.nl : category.en}
                  </span>
                  <span className="text-neutral-700 text-xs">·</span>
                  <span className="text-neutral-600 text-xs">{formatDate(post.publishedAt, locale)}</span>
                  <span className="text-neutral-700 text-xs">·</span>
                  <span className="text-neutral-600 text-xs">
                    {post.readingTimeMinutes} {isNL ? 'min leestijd' : 'min read'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                  {isNL ? post.titleNL : post.titleEN}
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                  {isNL ? post.teaserNL : post.teaserEN}
                </p>
                <span className="mt-4 inline-block text-xs text-blue-500 font-medium group-hover:text-blue-400 transition-colors">
                  {isNL ? 'Lees meer →' : 'Read more →'}
                </span>
              </Link>
            )
          })}
        </div>

      </div>
    </main>
  )
}
