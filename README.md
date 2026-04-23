<div align="center">

# Qovre — Corporate B2B Website

**Production-grade B2B digital studio website, live at [qovre.nl](https://qovre.nl)**

[![Live](https://img.shields.io/badge/Live-qovre.nl-0f172a?style=for-the-badge&logo=vercel&logoColor=white)](https://qovre.nl)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 🌐 Live Demo

| Environment | URL |
|---|---|
| 🇳🇱 Dutch (primary) | [qovre.nl/nl](https://qovre.nl/nl) |
| 🇬🇧 English | [qovre.nl/en](https://qovre.nl/en) |
| 📬 Contact | [qovre.nl/nl/contact](https://qovre.nl/nl/contact) |
| 🚀 Start a Project | [qovre.nl/nl/start](https://qovre.nl/nl/start) |

---

## 📸 Screenshots

### Hero — Landing Page
![Hero section](Ekran_Resmi_2026-04-23_14_04_51.png)

### Contact Page
![Contact page](Ekran_Resmi_2026-04-23_14_06_47.png)

### Project Intake — Step 1: What to build
![Project intake step 1](Ekran_Resmi_2026-04-23_14_05_07.png)

### Project Intake — Step 2: Platform type & integrations
![Project intake step 2](Ekran_Resmi_2026-04-23_14_05_13.png)

### Project Intake — Step 3: Maintenance package & SLA
![Project intake step 3](Ekran_Resmi_2026-04-23_14_05_25.png)

### Project Intake — Step 4: Final details & submit
![Project intake step 4](Ekran_Resmi_2026-04-23_14_05_38.png)

---

## 📌 Project Overview

Qovre is a full-scale B2B corporate website for a Dutch IT/AI consultancy, built from scratch as a solo project. The site markets services across seven specialisations — from custom business websites and SaaS platforms to AI automation, chatbots, and technical SEO/GEO — and is actively live and indexed in the Netherlands.

This is not a template or starter kit. Every architectural decision, database schema, API integration, deployment configuration, and content structure was designed and implemented end-to-end.

**Key product characteristics:**
- Bilingual (Dutch/English) with Next.js `i18n` routing
- Multi-page architecture with 30+ routed pages
- Multi-step project intake form (4 steps) with dynamic fields
- AI-powered chat widget powered by Google Gemini Flash
- Contact form with transactional email via Resend
- Supabase PostgreSQL backend with RPC functions
- City-based SEO landing pages for 21 Dutch cities
- Legal documents included (Privacy Policy, Terms & Conditions, SLA, DPA)
- Deployed via Vercel with custom domain on mijn.host DNS

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    qovre.nl (Vercel)                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Next.js 14 App Router (TypeScript)                     │
│  ├── /[locale]/                  → i18n routing         │
│  │   ├── (home)                  → Landing page         │
│  │   ├── diensten / services     → Service overview     │
│  │   ├── /[service-slug]         → 7 service pages      │
│  │   ├── process / werkwijze     → How we work          │
│  │   ├── over-ons / about        → About page           │
│  │   ├── blog                    → Blog listing         │
│  │   ├── faq                     → FAQ accordion        │
│  │   ├── contact                 → Contact form         │
│  │   ├── start                   → Project intake (4-step wizard) │
│  │   ├── sectoren / industries   → Industry landing     │
│  │   └── software-ontwikkeling/  → 21 city pages (SEO) │
│  │       [city]                                         │
│  └── /legal/                     → PDF documents        │
│                                                         │
├──────────────────┬──────────────────────────────────────┤
│   Supabase       │   External APIs                      │
│   ─────────      │   ────────────                       │
│   PostgreSQL DB  │   Resend      → Transactional email  │
│   RPC functions  │   Gemini AI   → Chat widget          │
│   Row-level sec  │   Vercel      → Edge deployment      │
└──────────────────┴──────────────────────────────────────┘
```

---

## ⚙️ Tech Stack

### Core Framework

| Technology | Version | Role |
|---|---|---|
| **Next.js** | 14 (App Router) | Full-stack React framework |
| **TypeScript** | 5 | Type safety across the codebase |
| **React** | 18 | UI component library |

### Styling

| Technology | Role |
|---|---|
| **Tailwind CSS** | Utility-first styling system |
| Custom design tokens | Consistent brand theming |
| Responsive-first layout | Mobile, tablet, desktop breakpoints |

### Backend & Database

| Technology | Role |
|---|---|
| **Supabase** | PostgreSQL database + API layer |
| Supabase RPC functions | Custom server-side logic |
| Row Level Security (RLS) | Data access control |
| **Resend** | Transactional email delivery (contact form) |

### AI Integration

| Technology | Role |
|---|---|
| **Google Gemini Flash** | Powering the on-site AI chat widget |

### Deployment & Infrastructure

| Technology | Role |
|---|---|
| **Vercel** | Production hosting + edge network |
| **mijn.host** | DNS management (manual A record configuration) |
| Custom domain | `qovre.nl` with `www` redirect |
| Environment variables | Secure secrets management via Vercel dashboard |

---

## 🗂️ Page Architecture

### Main Pages (Bilingual NL/EN)

| Page | NL Route | EN Route |
|---|---|---|
| Home | `/nl` | `/en` |
| Services overview | `/nl/diensten` | `/en/services` |
| Process | `/nl/process` | `/en/process` |
| About | `/nl/over-ons` | `/en/about` |
| Blog | `/nl/blog` | `/en/blog` |
| FAQ | `/nl/faq` | `/en/faq` |
| Contact | `/nl/contact` | `/en/contact` |
| Start a project | `/nl/start` | `/en/start` |
| Industries | `/nl/sectoren` | `/en/industries` |
| Privacy Policy | `/nl/privacy-policy` | `/en/privacy-policy` |
| Terms & Conditions | `/nl/terms-conditions` | `/en/terms-conditions` |

### Service Detail Pages (7 services × 2 languages = 14 pages)

| Service | Slug |
|---|---|
| Custom business websites | `business-websites` |
| Ecommerce & webshop development | `ecommerce-development` |
| SaaS & custom platform development | `saas-development` |
| AI automation & workflow automation | `ai-automation` |
| AI chatbots & smart assistants | `ai-chatbots` |
| SEO, GEO & technical discoverability | `seo-geo-optimization` |
| Maintenance, updates & ongoing development | `maintenance-support` |

### City SEO Landing Pages (21 cities)

Programmatically generated pages under `/[locale]/software-ontwikkeling/[city]`:

Amsterdam · Rotterdam · Den Haag · Utrecht · Eindhoven · Tilburg · Groningen · Almere · Breda · Nijmegen · Haarlem · Arnhem · Apeldoorn · Enschede · Zwolle · Maastricht · Leiden · Delft · Zoetermeer · Amersfoort · Leeuwarden

---

## 🧙 Project Intake Wizard

A 4-step interactive form at `/start` guides potential clients through a structured inquiry:

| Step | Fields |
|---|---|
| **Step 1** | What to build: Professional Web / Scalable SaaS / AI & Automation |
| **Step 2** | Platform type, page count, integrations (CRM, Calendar, Payment, Analytics), CMS |
| **Step 3** | Maintenance package (Essential / Growth / Partner), hosting, expected traffic |
| **Step 4** | Name, email, company, reference URL, logo upload |

On submission: data saved to Supabase + confirmation email via Resend.

---

## 🌍 Internationalisation (i18n)

- Language selector switches between `/nl/` and `/en/` without page reload
- All metadata, titles, descriptions and content fully translated
- Dutch is the primary locale; English targets international B2B audiences
- Canonical tags configured per locale to avoid duplicate content penalties

---

## 🤖 AI Chat Widget

- Powered by **Google Gemini Flash** via a Next.js server route (no client-side key exposure)
- Contextual system prompt trained on Qovre's service catalogue
- Floating chat button visible on all pages

---

## 📬 Contact Form & Email

- Submission triggers a Next.js server route handler
- Email delivered via **Resend API** from `contact@qovre.nl`
- All submissions also stored in Supabase as a backup record
- Client and server-side validation

---

## 📈 SEO & GEO Strategy

- 21 city landing pages for local Dutch search intent
- 7 service pages targeting high-intent B2B keywords
- GEO optimisation — structured to surface in AI-driven search (ChatGPT, Gemini, Perplexity)
- Semantic HTML, proper heading hierarchy, Open Graph + Twitter Card meta
- Sitemap and `robots.txt` configured for full crawlability

---

## 🚀 Local Development

```bash
git clone https://github.com/aylin1080p/qovre-website-.git
cd qovre-website-
npm install
cp .env.example .env.local
npm run dev
```

---

## 🔐 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
GEMINI_API_KEY=
```

---

## 📊 Project Stats

| Metric | Value |
|---|---|
| Pages | 30+ |
| Languages | 2 (NL + EN) |
| Service pages | 7 |
| City SEO pages | 21 |
| Integrations | Supabase · Resend · Gemini · Vercel |
| Intake form steps | 4 |
| Domain | qovre.nl (live) |
| Solo built | ✅ Yes |

---

<div align="center">

**Built in the Netherlands · Den Haag · 2026**

[qovre.nl](https://qovre.nl) · [contact@qovre.nl](mailto:contact@qovre.nl)

</div>
