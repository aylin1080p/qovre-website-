import { MetadataRoute } from "next";
import { BRAND } from "@/data/seo";

// ---------------------------------------------------------------
// robots.ts — place at app/robots.ts
// Allows all crawlers including AI/LLM indexers
// ---------------------------------------------------------------
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard web crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/studio/"],
      },
      // AI crawlers — explicitly allowed for GEO visibility
      // GPTBot = OpenAI/ChatGPT
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      // ClaudeBot = Anthropic
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      // PerplexityBot
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Google Gemini
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Meta AI
      {
        userAgent: "meta-externalagent",
        allow: "/",
      },
      // Cohere
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      // Common crawl (feeds many LLMs)
      {
        userAgent: "CCBot",
        allow: "/",
      },
    ],
    sitemap: `${BRAND.websiteUrl}/sitemap.xml`,
    host: BRAND.websiteUrl,
  };
}
