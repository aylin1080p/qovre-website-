import type { Metadata } from "next";
import { BRAND } from "./seo";

// ---------------------------------------------------------------
// generateMeta — call this on every page
// ---------------------------------------------------------------
interface MetaConfig {
  title: string;
  description: string;
  path: string; // e.g. "/en/ai-automation-systems"
  locale?: "en" | "nl";
  alternateLocale?: string; // the URL of the same page in the other language
  image?: string; // path to OG image, defaults to /og-default.jpg
  noIndex?: boolean;
  keywords?: string[];
}

export function generateMeta({
  title,
  description,
  path,
  locale = "en",
  alternateLocale,
  image = "/og-default.jpg",
  noIndex = false,
  keywords = [],
}: MetaConfig): Metadata {
  const canonical = `${BRAND.url}${path}`;
  const ogImage = `${BRAND.url}${image}`;
  const fullTitle = `${title} | ${BRAND.name}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: BRAND.name, url: BRAND.url }],
    creator: BRAND.name,
    publisher: BRAND.name,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    alternates: {
      canonical,
      languages: alternateLocale
        ? {
            "en-NL": locale === "en" ? canonical : alternateLocale,
            "nl-NL": locale === "nl" ? canonical : alternateLocale,
          }
        : undefined,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: BRAND.name,
      locale: locale === "nl" ? "nl_NL" : "en_NL",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${BRAND.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    other: {
      // GEO meta tags — helps regional engines and AI crawlers
      "geo.region": "NL",
      "geo.country": "Netherlands",
      "language": locale === "nl" ? "Dutch" : "English",
      // Dublin Core for LLM crawlers
      "DC.title": fullTitle,
      "DC.description": description,
      "DC.creator": BRAND.name,
      "DC.language": locale,
      "DC.coverage": "Netherlands",
    },
  };
}

// ---------------------------------------------------------------
// getHreflangTags — returns the <link> tags for hreflang
// Use in layout.tsx or page.tsx <head>
// ---------------------------------------------------------------
export function getHreflangTags(enUrl: string, nlUrl: string) {
  return [
    { rel: "alternate", hrefLang: "en-nl", href: `${BRAND.url}${enUrl}` },
    { rel: "alternate", hrefLang: "nl-nl", href: `${BRAND.url}${nlUrl}` },
    { rel: "alternate", hrefLang: "x-default", href: `${BRAND.url}${enUrl}` },
  ];
}
