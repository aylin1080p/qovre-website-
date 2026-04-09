import { MetadataRoute } from "next";
import { BRAND, SERVICES, CITIES } from "@/data/seo";

// ---------------------------------------------------------------
// Dynamic sitemap — covers every indexable URL on the site
// Place at: app/sitemap.ts
// ---------------------------------------------------------------
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    // English core
    { url: `${BRAND.websiteUrl}/en`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BRAND.websiteUrl}/en/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BRAND.websiteUrl}/en/process`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BRAND.websiteUrl}/en/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BRAND.websiteUrl}/en/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${BRAND.websiteUrl}/en/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Dutch core
    { url: `${BRAND.websiteUrl}/nl`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BRAND.websiteUrl}/nl/diensten`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BRAND.websiteUrl}/nl/werkwijze`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BRAND.websiteUrl}/nl/sectoren`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BRAND.websiteUrl}/nl/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${BRAND.websiteUrl}/nl/over-ons`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Service pages — EN + NL
  const servicePages: MetadataRoute.Sitemap = SERVICES.flatMap((s) => [
    {
      url: `${BRAND.websiteUrl}/en/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${BRAND.websiteUrl}/nl/${s.slug}`,
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
      url: `${BRAND.websiteUrl}/en/software-development-${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${BRAND.websiteUrl}/nl/software-ontwikkeling-${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ]);

  return [...core, ...servicePages, ...cityPages];
}
