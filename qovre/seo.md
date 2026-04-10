# Technical SEO & Modernization Report: Qovre.nl

**Date**: April 2026
**Role**: Senior SEO Engineer

## 1. Largest Contentful Paint (LCP) Optimization
- **Issue**: The primary hero image was loading with default priority, causing a delay in the visual completion of the page on mobile devices.
- **Fix**: 
  - Integrated a high-fidelity 3D asset (`hero-lcp.png`).
  - Implemented `loading="eager"` and `fetchPriority="high"` in the `Hero` component.
  - Added `<link rel="preload">` in the global `[locale]/layout.tsx` to ensure the asset is fetched before the main JS bundle execution.

## 2. Multi-regional & Multilingual Strategy (Hreflang)
- **Issue**: Incomplete relationship definitions between `/nl` and `/en` subdirectories.
- **Fix**:
  - Hardened the `metadata.ts` alternate language mapping.
  - Implemented `x-default` targeting the English version for global users.
  - Dynamic path resolution handles city-specific routes (e.g., `/nl/software-ontwikkeling-[city]` properly relates to `/en/software-development-[city]`).

## 3. Network & Blocking Time
- **Issue**: Potential 300ms+ delay due to render-blocking scripts and non-optimized asset fetching.
- **Fix**:
  - Shifted non-critical CSS definitions to the `seo.ts` master data for future inlining.
  - Verified all third-party scripts (GA4, etc.) use `async` or `defer` in the root layout.
  - Canonicalized the domain to `www.qovre.nl` in all metadata sets to prevent redirect hops.

## 4. AI & Generative Engine Optimization (GEO)
- **Issue**: Static brand information was insufficient for next-gen AI crawlers like Perplexity and GPTBot.
- **Fix**:
  - Enhanced `llms.txt` with structured organizational data: Legal entity (GetFromTR), Commercial Presence (Den Haag/Amsterdam), and Service Coverage (Netherlands National).
  - Explicitly defined the "Build vs Buy" and "Custom vs Template" value propositions for LLM indexing.

## 5. Indexing Protocols - VERIFIED
- **Status**: **RESOLVED**. Hardened `proxy.ts` (Next.js 16 standard) to explicitly allow AI agents and bypass locale prefixing for system files.
- **Verification**: Local build and Vercel deployment confirmed successful generation and exposure of `/robots.txt` and `/sitemap.xml`.
- **Locale Prefix**: Switched to `as-needed` for better SEO hygiene (no prefix for Dutch default).

---
*Status: Production Ready. Monitor Google Search Console for Core Web Vitals improvements over the next 14 days.*
