import type { Metadata } from "next";
import { BRAND } from "@/data/seo";

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
  const canonical = `${BRAND.websiteUrl}${path}`;
  const ogImage = `${BRAND.websiteUrl}${image}`;
  const fullTitle = `${title} | ${BRAND.brandName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: BRAND.brandName, url: BRAND.websiteUrl }],
    creator: BRAND.brandName,
    publisher: BRAND.brandName,
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
      siteName: BRAND.brandName,
      locale: locale === "nl" ? "nl_NL" : "en_NL",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${BRAND.brandName}`,
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
      "DC.creator": BRAND.brandName,
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
    { rel: "alternate", hrefLang: "en-nl", href: `${BRAND.websiteUrl}${enUrl}` },
    { rel: "alternate", hrefLang: "nl-nl", href: `${BRAND.websiteUrl}${nlUrl}` },
    { rel: "alternate", hrefLang: "x-default", href: `${BRAND.websiteUrl}${enUrl}` },
  ];
}
