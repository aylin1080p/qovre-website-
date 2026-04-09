import { MetadataRoute } from "next";
import { BRAND, SERVICES, CITIES } from "./seo";

// ---------------------------------------------------------------
// Dynamic sitemap — covers every indexable URL on the site
// Place at: app/sitemap.ts
// ---------------------------------------------------------------
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    // English core
    { url: `${BRAND.url}/en`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BRAND.url}/en/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BRAND.url}/en/process`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BRAND.url}/en/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BRAND.url}/en/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${BRAND.url}/en/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Dutch core
    { url: `${BRAND.url}/nl`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BRAND.url}/nl/diensten`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BRAND.url}/nl/werkwijze`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BRAND.url}/nl/sectoren`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BRAND.url}/nl/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${BRAND.url}/nl/over-ons`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Service pages — EN + NL
  const servicePages: MetadataRoute.Sitemap = SERVICES.flatMap((s) => [
    {
      url: `${BRAND.url}/en/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${BRAND.url}/nl/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
  ]);

  // City landing pages — SEO geo targeting
  // EN: /en/custom-software-amsterdam
  // NL: /nl/maatwerk-software-amsterdam
  const cityPages: MetadataRoute.Sitemap = CITIES.flatMap((city) => [
    {
      url: `${BRAND.url}/en/software-development-${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${BRAND.url}/nl/software-ontwikkeling-${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ]);

  // Blog/Insights — static for now, extend with CMS later
  const blogPages: MetadataRoute.Sitemap = [
    { url: `${BRAND.url}/en/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BRAND.url}/nl/inzichten`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  return [...core, ...servicePages, ...cityPages, ...blogPages];
}
