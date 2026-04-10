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
  image?: string; // path to OG image, defaults to /opengraph-image (Next.js edge OG)
  noIndex?: boolean;
  keywords?: string[];
}

export function generateMeta({
  title,
  description,
  path,
  locale = "en",
  alternateLocale,
  image = "/opengraph-image",
  noIndex = false,
  keywords = [],
}: MetaConfig): Metadata {
  const canonical = `${BRAND.websiteUrl}${path}`;
  const ogImage = `${BRAND.websiteUrl}${image}`;
  const normalizedTitle = title.trim();
  const fullTitle = normalizedTitle.toLowerCase().includes(BRAND.brandName.toLowerCase())
    ? normalizedTitle
    : `${normalizedTitle} | ${BRAND.brandName}`;
  const localeSuffix = path === "/" || path === "/en" || path === "/nl" ? "" : path.replace(/^\/(en|nl)/, "");
  const normalizeUrl = (url: string) =>
    url.startsWith("http") ? url : `${BRAND.websiteUrl}${url.startsWith("/") ? url : `/${url}`}`;
  const englishUrl =
    locale === "en"
      ? canonical
      : alternateLocale
        ? normalizeUrl(alternateLocale)
        : `${BRAND.websiteUrl}/en${localeSuffix}`;
  const dutchUrl =
    locale === "nl"
      ? canonical
      : alternateLocale
        ? normalizeUrl(alternateLocale)
        : `${BRAND.websiteUrl}/nl${localeSuffix}`;
  const verificationToken =
    process.env.GOOGLE_SITE_VERIFICATION ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: BRAND.brandName, url: BRAND.websiteUrl }],
    creator: BRAND.brandName,
    publisher: BRAND.brandName,
    metadataBase: new URL(BRAND.websiteUrl),
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
      languages: {
        "en": englishUrl,
        "nl": dutchUrl,
        "x-default": dutchUrl,
      },
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
    verification: verificationToken ? { google: verificationToken } : undefined,
    other: {
      "geo.region": "NL",
      "geo.country": "Netherlands",
      "geo.placename": BRAND.location.city,
      "language": locale === "nl" ? "Dutch" : "English",
      "DC.title": fullTitle,
      "DC.description": description,
      "DC.creator": BRAND.brandName,
      "DC.language": locale,
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
    { rel: "alternate", hrefLang: "x-default", href: `${BRAND.websiteUrl}${nlUrl}` },
  ];
}
