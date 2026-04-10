import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blog'
import { BRAND } from '@/data/seo'
import { generateMeta } from '@/lib/metadata'

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}

  const isNL = locale === 'nl'
  return generateMeta({
    title: isNL ? post.titleNL : post.titleEN,
    description: isNL ? post.teaserNL : post.teaserEN,
    path: `/${locale}/blog/${slug}`,
    locale: locale as 'nl' | 'en',
    alternateLocale: `${BRAND.websiteUrl}/${isNL ? 'en' : 'nl'}/blog/${slug}`,
  })
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function renderContent(content: string) {
  // Split on double newlines to get paragraphs, handle **bold** markdown
  const paragraphs = content.split('\n\n').filter(Boolean)
  return paragraphs.map((para, i) => {
    if (para.startsWith('**') && para.includes('**\n')) {
      // Heading paragraph: **Title**\nContent
      const headingEnd = para.indexOf('**', 2)
      const heading = para.slice(2, headingEnd)
      const body = para.slice(headingEnd + 2).trim()
      return (
        <div key={i} className="mb-6">
          <h3 className="text-lg font-bold text-white mb-2">{heading}</h3>
          {body && <p className="text-neutral-300 leading-relaxed">{body}</p>}
        </div>
      )
    }
    return (
      <p key={i} className="text-neutral-300 leading-relaxed mb-6">
        {para}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const isNL = locale === 'nl'
  const category = BLOG_CATEGORIES[post.category]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isNL ? post.titleNL : post.titleEN,
    description: isNL ? post.teaserNL : post.teaserEN,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: BRAND.brandName, url: BRAND.websiteUrl },
    publisher: { '@type': 'Organization', name: BRAND.brandName, url: BRAND.websiteUrl },
    url: `${BRAND.websiteUrl}/${locale}/blog/${slug}`,
    inLanguage: isNL ? 'nl' : 'en',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Qovre', item: `${BRAND.websiteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BRAND.websiteUrl}/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: isNL ? post.titleNL : post.titleEN, item: `${BRAND.websiteUrl}/${locale}/blog/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="pt-32 pb-24 px-4 bg-[#060608] min-h-screen">
        <div className="container max-w-3xl mx-auto">

          {/* Back link */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors mb-10"
          >
            ← {isNL ? 'Terug naar blog' : 'Back to blog'}
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              {isNL ? category.nl : category.en}
            </span>
            <span className="text-neutral-700 text-xs">·</span>
            <span className="text-neutral-500 text-xs">{formatDate(post.publishedAt, locale)}</span>
            <span className="text-neutral-700 text-xs">·</span>
            <span className="text-neutral-500 text-xs">
              {post.readingTimeMinutes} {isNL ? 'min leestijd' : 'min read'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8 tracking-tight">
            {isNL ? post.titleNL : post.titleEN}
          </h1>

          {/* Teaser / lead */}
          <p className="text-lg text-neutral-400 leading-relaxed mb-12 border-l-2 border-blue-500/40 pl-6">
            {isNL ? post.teaserNL : post.teaserEN}
          </p>

          {/* Body */}
          <div className="prose-custom">
            {renderContent(isNL ? post.contentNL : post.contentEN)}
          </div>

          {/* CTA block */}
          <div className="mt-16 p-8 rounded-2xl bg-neutral-900 border border-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-[80px]" />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">Qovre</p>
              <h2 className="text-2xl font-bold text-white mb-4">
                {isNL ? 'Vrijblijvend sparren?' : 'Want to talk it through?'}
              </h2>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                {isNL
                  ? 'Heeft u een vraag over dit onderwerp of wilt u weten wat Qovre voor uw specifieke situatie kan betekenen? Plan een gratis gesprek.'
                  : 'Have a question about this topic or want to know what Qovre can do for your specific situation? Schedule a free call.'}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors"
              >
                {isNL ? 'Neem contact op →' : 'Get in touch →'}
              </Link>
            </div>
          </div>

          {/* Other articles */}
          <div className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-6">
              {isNL ? 'Meer artikelen' : 'More articles'}
            </p>
            <div className="flex flex-col gap-4">
              {BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3).map((other) => (
                <Link
                  key={other.slug}
                  href={`/${locale}/blog/${other.slug}`}
                  className="group flex items-start gap-4 p-5 rounded-xl bg-neutral-900/30 border border-neutral-800/50 hover:border-neutral-700 transition-colors"
                >
                  <span className="text-blue-500 mt-0.5 shrink-0 text-xs font-bold uppercase tracking-wide">
                    {isNL ? BLOG_CATEGORIES[other.category].nl : BLOG_CATEGORIES[other.category].en}
                  </span>
                  <span className="text-neutral-300 text-sm font-medium group-hover:text-white transition-colors leading-snug">
                    {isNL ? other.titleNL : other.titleEN}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </article>
    </>
  )
}
