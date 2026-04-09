# QOVRE — MASTER BRIEF v2
*Claude Code / Antigravity için tek kaynak belge*
*Son güncelleme: Nisan 2026*

---

## GENEL BAKIŞ

**Marka adı:** Qovre  
**Domain:** qovre.nl (birincil), qovre.com (301 redirect)  
**Tip:** Kurumsal B2B web sitesi — Hollanda pazarı  
**Hedef:** Premium IT/AI hizmetleri, SEO + GEO güçlü, yapay zeka tanınırlığı yüksek  
**Diller:** Nederlands (birincil `/nl`) + English (`/en`)  
**Deployment:** Vercel (free tier, başlangıç için yeterli)  
**Email:** hello@qovre.nl, contact@qovre.nl (Zoho Mail — ücretsiz)  
**GitHub repo:** `aylin1080p/qovre-website` (private)

---

## TEKNİK STACK

```
Frontend:     Next.js 14 (App Router)
Dil:          TypeScript
Stil:         Tailwind CSS (Faz 3'e kadar sadece layout class'ları)
Animasyon:    Framer Motion (lib/animations.ts'den — yeni animasyon yazma)
i18n:         next-intl (/nl ve /en routing)
Veritabanı:   Supabase (PostgreSQL + Auth + RLS)
Email:        Resend API (transactional, ayda 3.000 ücretsiz)
AI Chat:      Google Gemini Flash (ücretsiz tier, günde 1.500 istek)
Analytics:    Plausible (GDPR uyumlu, cookie banner yok)
Hosting:      Vercel
```

---

## PROJE KLASÖR YAPISI

```
qovre/
├── app/
│   ├── layout.tsx                          ← Root layout, Organization schema, hreflang
│   ├── sitemap.ts                          ← Dinamik sitemap (YAZILDI ✓)
│   ├── robots.ts                           ← AI crawler izinleri (YAZILDI ✓)
│   ├── [locale]/                           ← next-intl dynamic routing
│   │   ├── layout.tsx                      ← Locale layout (lang attr)
│   │   ├── page.tsx                        ← Homepage
│   │   ├── diensten/page.tsx               ← NL: Hizmetler (Supabase'den)
│   │   ├── services/page.tsx               ← EN: Services (Supabase'den)
│   │   ├── contact/page.tsx                ← Contact form
│   │   ├── werkwijze/page.tsx              ← NL: Process sayfası
│   │   ├── process/page.tsx                ← EN: Process sayfası
│   │   ├── sectoren/page.tsx               ← NL: Industries
│   │   ├── industries/page.tsx             ← EN: Industries
│   │   ├── over-ons/page.tsx               ← NL: About
│   │   ├── about/page.tsx                  ← EN: About
│   │   ├── [service]/page.tsx              ← Dinamik servis sayfaları
│   │   ├── software-ontwikkeling-[city]/   ← NL: Şehir landing pages (20 şehir)
│   │   └── software-development-[city]/    ← EN: Şehir landing pages (20 şehir)
│   ├── admin/
│   │   ├── page.tsx                        ← Admin login
│   │   └── dashboard/page.tsx              ← CMS dashboard
│   └── api/
│       ├── chat/route.ts                   ← Gemini chat endpoint
│       ├── contact/route.ts                ← Contact form → Resend + Supabase
│       └── chat-warning/route.ts           ← Limit uyarı emaili
├── components/
│   ├── layout/                             ← Nav, Footer
│   ├── sections/                           ← Hero, Services, Counter, FAQ vb.
│   └── ui/                                 ← Button, Card, Input, ChatWidget vb.
├── data/
│   └── seo.ts                              ← TEK KAYNAK: BRAND, SERVICES, CITIES, FAQ (YAZILDI ✓)
├── lib/
│   ├── metadata.ts                         ← generateMeta() helper (YAZILDI ✓)
│   ├── animations.ts                       ← Framer Motion variant'ları (YAZILDI ✓)
│   ├── supabase.ts                         ← Supabase client
│   ├── gemini.ts                           ← Gemini chat client
│   └── resend.ts                           ← Resend email client
├── messages/
│   ├── nl.json                             ← Hollandaca UI metinleri
│   └── en.json                             ← İngilizce UI metinleri
├── public/
│   ├── llms.txt                            ← GEO: AI crawler discovery (YAZILDI ✓)
│   └── og-default.jpg                      ← 1200×630 OG görseli (oluşturulacak)
└── middleware.ts                            ← next-intl locale routing
```

### Zaten yazılmış dosyalar (dokunma, sadece kullan):
- `data/seo.ts` — tüm içerik buradan gelecek
- `lib/metadata.ts` — `generateMeta()` ile her sayfada kullan
- `lib/animations.ts` — yeni animasyon yazma, buradan import et
- `app/sitemap.ts` — tüm URL'leri kapsıyor
- `app/robots.ts` — AI crawler izinleri dahil
- `public/llms.txt` — GEO için

### ÖNEMLİ: `data/seo.ts` içinde "Veloq" referansları var
Geliştirme başlamadan önce seo.ts'de şunları güncelle:
- `FAQ_EN` ve `FAQ_NL` içindeki "Veloq" → "Qovre"
- `LLMS_TXT` içindeki "Veloq" → "Qovre"
- `getOrganizationSchema()` içindeki LinkedIn URL'ini güncelle
- `BRAND.phone`, `BRAND.vatNumber`, `BRAND.kvkNumber` → placeholder bırak

---

## VERİTABANI — SUPABASE

### Tablolar (OLUŞTURULDU ✓)

```sql
-- Hizmetler CMS
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_nl TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_nl TEXT,
  description_en TEXT,
  icon TEXT,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact form kayıtları
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  locale TEXT DEFAULT 'nl',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gemini chat günlük kullanım
CREATE TABLE chat_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  count INT DEFAULT 0,
  UNIQUE(date)
);
```

### RLS (OLUŞTURULDU ✓)
- `services`: herkes okur, sadece authenticated yazar
- `contact_submissions`: herkes insert eder, sadece authenticated okur
- `chat_usage`: sadece service_role

---

## SAYFALAR & İÇERİK

### Homepage (`/nl` ve `/en`)
1. **Nav** — Logo + linkler + NL/EN switcher + dark/light toggle + CTA butonu
2. **Hero** — Typewriter efektli başlık + parallax arka plan + CTA
3. **Sayaç şeridi** — 4 rakam animasyonla (7+ yıl, 120+ proje, 40+ müşteri, 12 il)
4. **Marquee** — Kayan servis etiketleri
5. **Servisler** — 4 kart (data/seo.ts'den)
6. **AI highlight** — Özel vurgu bölümü
7. **Süreç** — 5 adım, scroll-based (data/seo.ts PROCESS'den)
8. **Sektörler** — Grid (data/seo.ts INDUSTRIES'den)
9. **Yorumlar** — 5 referans kartı (aşağıda detay)
10. **Hollanda coverage** — Şehir pilleri (data/seo.ts CITIES'den)
11. **FAQ** — Accordion (data/seo.ts FAQ_NL / FAQ_EN'den)
12. **Contact CTA** — Büyük alan
13. **Footer** — Linkler + şehirler + KVK numarası

### Services/Diensten (`/nl/diensten`, `/en/services`)
- Supabase'den aktif hizmetler dinamik olarak listelenir
- Her hizmet: ikon, başlık, açıklama

### Dinamik servis sayfaları (`/[locale]/[service]`)
- `data/seo.ts` → SERVICES listesinden oluşturulur
- Her sayfa: `generateMeta()`, JSON-LD Service schema, FAQ section, hreflang

### Şehir landing pages (20 × 2 dil = 40 sayfa)
- EN: `/en/software-development-amsterdam` vb.
- NL: `/nl/software-ontwikkeling-amsterdam` vb.
- `data/seo.ts` → CITIES listesinden oluşturulur
- Her sayfa: LocalBusiness schema, şehre özel içerik (duplicate değil)

### Contact (`/nl/contact`, `/en/contact`)
- Form: Naam, E-mail, Bedrijf (opsiyonel), Bericht
- Honeypot spam koruması (hidden field)
- Resend → contact@qovre.nl
- Supabase'e kayıt
- Başarı/hata durumları
- Rate limit: aynı IP'den 5 dakikada max 3 istek (Faz 2)

### Sipariş sayfası (`/nl/bestelling`, `/en/order`)
- Şirket adı + KVK numarası
- İletişim kişisi + email + telefon
- Proje türü (dropdown — 4 servis)
- Bütçe aralığı (dropdown)
- Tahmini başlangıç tarihi
- Proje açıklaması
- Dosya yükleme (brief/mockup)
- Dijital sözleşme onayı checkbox'ı
- Sözleşme özeti PDF → müşteriye email

### Admin (`/admin`)
- Supabase Auth ile giriş (email/şifre)
- Hizmet CRUD
- Contact başvurularını görme
- Tasarım önemli değil, işlevsel olsun

---

## SAHTE MÜŞTERİ YORUMLARI (Hollandalı isimler)

```
"Qovre heeft onze operationele processen volledig getransformeerd."
— M. van den Berg, Operations Director

"Professioneel, snel en altijd bereikbaar. Aanrader voor elk bedrijf."
— R. de Vries, CEO

"De AI-automatisering heeft ons team 15 uur per week bespaard."
— J. Bakker, Managing Partner

"Uitstekende samenwerking van begin tot eind. Echt een topteam."
— S. Janssen, Founder

"Qovre denkt mee als strategisch partner, niet alleen als uitvoerder."
— T. Smit, CFO
```

---

## AI CHAT BOTU (Gemini Flash)

### Konfigürasyon
- **Model:** `gemini-2.0-flash`
- **Günlük limit:** 1.500 istek (ücretsiz)
- **Uyarı eşiği:** 1.200'de admin'e Resend ile email
- **Limit dolunca:** Bot kapanır, statik mesaj gösterilir

### System Prompt
```
Je bent de digitale assistent van Qovre — een professioneel software- en 
AI-automatiseringsbedrijf dat actief is door heel Nederland.

TOON & STIJL:
- Professioneel maar toegankelijk
- Kort en to-the-point (max 3-4 zinnen per antwoord)
- Geen overdreven enthousiasme, geen emoji's
- Antwoord altijd in de taal van de gebruiker (NL of EN)
- Spreek de gebruiker aan met "u" in het Nederlands

OVER QOVRE:
Qovre is opgericht in 2025 en heeft een ervaren team van senior developers,
AI-architecten, UX-designers en projectmanagers. We hebben meer dan 120 projecten 
afgerond voor bedrijven in heel Nederland.

DIENSTEN: Custom Software, AI & Automatisering, Content & Groei, Doorlopend Onderhoud
PRIJSMODEL: Vaste scope, vaste prijs. Projecten starten vanaf €3.000.
WERKWIJZE: 5 stappen (Discovery → Architectuur → Bouwen → Lancering → Support)
CONTACT: contact@qovre.nl | Reactietijd: binnen 1 werkdag

DOORVERWIJZINGEN:
- Project starten → /nl/contact of /en/contact
- Diensten bekijken → /nl/diensten of /en/services
- Werkwijze → /nl/werkwijze of /en/process

WAT JE NIET DOET:
- Geen exacte prijsgaranties voor specifieke projecten
- Geen beloftes over exacte deadlines
- Geen negatieve uitspraken over concurrenten
- Niet meer dan 4 zinnen tenzij de vraag echt complex is

ALS JE HET NIET WEET:
"Voor een gedetailleerd antwoord kunt u contact opnemen via contact@qovre.nl."
```

### Hızlı Yanıt Butonları (API çağrısı yapmaz)
```typescript
const QUICK_REPLIES = {
  nl: [
    { label: "Onze diensten", response: "Qovre biedt vier diensten: Maatwerk Software, AI & Automatisering, Content & Groei, en Doorlopend Onderhoud. [Bekijk alle diensten](/nl/diensten)." },
    { label: "Wat kost het?", response: "Projecten starten vanaf €3.000 met vaste scope en prijs. Geen uurtarief. [Plan een gratis gesprek](/nl/contact)." },
    { label: "Hoe lang duurt het?", response: "Gemiddeld 6-12 weken voor een webapplicatie, 3-8 weken voor AI-integraties." },
    { label: "Contact opnemen", response: "Bereik ons via contact@qovre.nl — reactie binnen 1 werkdag. [Contactformulier](/nl/contact)." }
  ],
  en: [
    { label: "Our services", response: "Qovre offers four services: Custom Software, AI & Automation, Content & Growth, and Ongoing Support. [View services](/en/services)." },
    { label: "Pricing", response: "Projects start from €3,000 with fixed scope. No hourly billing. [Book a free call](/en/contact)." },
    { label: "Timeline", response: "Typically 6-12 weeks for a web application, 3-8 weeks for AI integrations." },
    { label: "Get in touch", response: "Email us at contact@qovre.nl — we respond within one business day. [Contact form](/en/contact)." }
  ]
}
```

### Chat UI
- Sağ alt köşede sabit chat ikonu
- WhatsApp butonu chat ikonunun üstünde
- Açılınca: başlık + 4 quick reply + mesaj alanı
- Site diline göre otomatik NL/EN

### Teknik implementasyon (`lib/gemini.ts`)
```typescript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: conversationHistory,
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
    })
  }
)
// Konuşma geçmişi state'de tut (son 10 mesaj)
// Her API çağrısında Supabase'deki chat_usage sayacını artır
// 1200'de admin'e Resend ile email gönder
// 1500'de botu devre dışı bırak
```

---

## i18n METİNLERİ

### `messages/nl.json`
```json
{
  "nav": {
    "services": "Diensten",
    "process": "Werkwijze",
    "about": "Over ons",
    "contact": "Contact",
    "cta": "Project starten"
  },
  "hero": {
    "title": "Slimme software voor ambitieuze bedrijven",
    "subtitle": "Wij bouwen maatwerk software, AI-systemen en digitale infrastructuur voor bedrijven in heel Nederland.",
    "cta": "Neem contact op",
    "ctaSecondary": "Bekijk onze diensten"
  },
  "counter": {
    "years": "Jaar ervaring",
    "projects": "Afgeronde projecten",
    "clients": "Tevreden klanten",
    "cities": "Nederlandse provincies"
  },
  "contact": {
    "title": "Neem contact op",
    "name": "Naam",
    "email": "E-mailadres",
    "company": "Bedrijf (optioneel)",
    "message": "Bericht",
    "send": "Versturen",
    "success": "Bedankt! We nemen binnen 1 werkdag contact op.",
    "error": "Er is iets misgegaan. Probeer het opnieuw."
  },
  "chat": {
    "title": "Qovre Assistent",
    "greeting": "Goedag! Hoe kan ik u helpen?",
    "placeholder": "Stel een vraag...",
    "limit": "De chat is tijdelijk niet beschikbaar. Neem contact op via contact@qovre.nl"
  }
}
```

### `messages/en.json`
```json
{
  "nav": {
    "services": "Services",
    "process": "Process",
    "about": "About",
    "contact": "Contact",
    "cta": "Start a project"
  },
  "hero": {
    "title": "Smart software for ambitious businesses",
    "subtitle": "We build custom software, AI systems, and digital infrastructure for businesses across the Netherlands.",
    "cta": "Get in touch",
    "ctaSecondary": "View our services"
  },
  "counter": {
    "years": "Years of experience",
    "projects": "Projects completed",
    "clients": "Satisfied clients",
    "cities": "Dutch provinces"
  },
  "contact": {
    "title": "Get in touch",
    "name": "Name",
    "email": "Email address",
    "company": "Company (optional)",
    "message": "Message",
    "send": "Send",
    "success": "Thank you! We'll get back to you within one business day.",
    "error": "Something went wrong. Please try again."
  },
  "chat": {
    "title": "Qovre Assistant",
    "greeting": "Hello! How can I help you?",
    "placeholder": "Ask a question...",
    "limit": "Chat is temporarily unavailable. Please email contact@qovre.nl"
  }
}
```

---

## TEMA SİSTEMİ

- **Varsayılan:** Light mod
- **Toggle:** Dark/Light, `localStorage`'a kaydet, `<html>` tag'ına `class="dark"` ekle

```css
/* globals.css — Light mode varsayılan */
:root {
  --bg: #ffffff;
  --bg-secondary: #f8f8fc;
  --bg-card: #f2f2f8;
  --text-primary: #0a0a14;
  --text-secondary: #4a4a6a;
  --text-muted: #8888aa;
  --border: rgba(0,0,0,0.08);
  --accent: #0a0a14;
  --accent-text: #ffffff;
  --glow: rgba(99, 88, 220, 0.15);
}

.dark {
  --bg: #080810;
  --bg-secondary: #0d0d18;
  --bg-card: #111122;
  --text-primary: #ffffff;
  --text-secondary: rgba(255,255,255,0.55);
  --text-muted: rgba(255,255,255,0.28);
  --border: rgba(255,255,255,0.07);
  --accent: rgba(255,255,255,0.92);
  --accent-text: #080810;
  --glow: rgba(99, 88, 220, 0.2);
}
```

---

## SEO & GEO KURALLARI

### Her sayfada zorunlu
- `generateMeta()` kullan (`lib/metadata.ts`'den)
- JSON-LD WebPage schema
- hreflang: `en-nl`, `nl-nl`, `x-default`
- Canonical URL
- H1 → H2 → H3 hiyerarşisi

### Servis sayfalarında ekstra
- JSON-LD Service schema
- FAQPage schema
- BreadcrumbList schema

### Şehir sayfalarında ekstra
- JSON-LD LocalBusiness schema
- `containedInPlace` ile il bilgisi
- Şehre özel içerik (tekrar değil)
- 6 başka şehre internal link

### GEO (AI tanınırlığı)
- `public/llms.txt` canlı ve erişilebilir olmalı
- `robots.ts` GPTBot, ClaudeBot, PerplexityBot'a izin veriyor (YAZILDI ✓)
- Hero copy faktüel, marketing fluff değil
- FAQ cevapları citation-ready yazılmış
- Organization schema `knowsAbout` array'i dolu
- `areaServed: Netherlands` tüm schema'larda

### Performance hedefleri
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- JS gzipped < 200KB
- CSS gzipped < 50KB
- Animasyonlar sadece `transform` ve `opacity` — layout trigger yok

---

## GÜVENLİK (Faz 2'de mutlaka yapılacak)

### Rate Limiting
- Contact form: aynı IP'den 5 dakikada max 3 istek
- Chat API: aynı IP'den dakikada max 10 istek
- `@upstash/ratelimit` ile implement et

### Input Validation
- Tüm formlar Zod ile validate et
- Email format kontrolü
- Mesaj max 1000 karakter
- XSS: kullanıcı girdisi ham HTML olarak render edilmez

### Admin Panel
- Supabase Auth zorunlu
- `/admin` tüm route'lar middleware'de auth kontrolü
- Session timeout: 24 saat

### Environment
- `.env.local` asla git'e commit edilmez
- `SUPABASE_SERVICE_ROLE_KEY` sadece server-side (API routes)
- Vercel'de env'ler dashboard'dan girilir

### CSRF
- API route'larda `origin` header kontrol et

---

## ENV DEĞİŞKENLERİ

```env
# Supabase (EKLENDI ✓)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Gemini (EKLENDI ✓)
GEMINI_API_KEY=

# Resend (eklenecek)
RESEND_API_KEY=

# Site
NEXT_PUBLIC_SITE_URL=https://www.qovre.nl

# Admin
ADMIN_EMAIL=contact@qovre.nl
```

---

## GELİŞTİRME FAZLARI

### FAZ 1 — İskelet (ŞIMDI)
Tasarım YOK. Stil YOK. Sadece çalışan yapı.

1. `npx create-next-app@latest qovre --typescript --app` (Tailwind dahil)
2. next-intl kur, middleware.ts yaz (`/nl` default, `/en` destekli)
3. `data/seo.ts` içindeki "Veloq" referanslarını "Qovre" ile değiştir
4. `lib/animations.ts`, `lib/metadata.ts` dosyalarını kopyala
5. `app/sitemap.ts`, `app/robots.ts` dosyalarını kopyala
6. `public/llms.txt` dosyasını kopyala
7. `messages/nl.json` ve `messages/en.json` oluştur
8. Tüm sayfalar için boş layout dosyaları
9. `lib/supabase.ts` yaz
10. Nav + Footer bileşeni (işlevsel, stil yok)

### FAZ 2 — Fonksiyonellik
11. Homepage tam içerikle (data/seo.ts'den)
12. Servis sayfaları dinamik routing
13. Şehir landing pages (20 × 2)
14. Contact form → Resend + Supabase
15. Sipariş formu + PDF
16. Gemini chat botu + limit sistemi
17. Admin panel (hizmet CRUD)
18. Rate limiting + Zod validation (güvenlik)
19. Plausible analytics

### FAZ 3 — Tasarım (EN SON)
20. globals.css tema sistemi (CSS değişkenleri)
21. Tipografi, spacing, renk sistemi
22. Framer Motion animasyonları (lib/animations.ts'den)
23. Dark/Light toggle
24. Sayaç animasyonları, typewriter, marquee
25. Hover efektleri, glow
26. Mobil responsive polish
27. OG görseli (1200×630)
28. Core Web Vitals optimizasyonu

### FAZ 4 — Launch
29. Google Search Console kaydı
30. Sitemap submit
31. DNS → Vercel
32. Resend domain doğrulaması
33. Vercel env değişkenleri dashboard'dan gir

---

## ANTIGRAVITY BAŞLANGIÇ PROMPTU (Faz 1)

```
QOVRE_MASTER_BRIEF_v2.md dosyasını oku.

Şu an sadece FAZ 1'i yapıyoruz — iskelet.
Tasarım YOK. Görsel efekt YOK. Sadece çalışan yapı.

Başla:
1. npx create-next-app@latest qovre --typescript --app (Tailwind dahil olsun)
2. next-intl kur, middleware.ts yaz (/nl default, /en destekli)
3. data/seo.ts içindeki "Veloq" → "Qovre" yap (FAQ ve LLMS_TXT dahil)
4. lib/animations.ts, lib/metadata.ts dosyalarını proje klasöründen kopyala
5. app/sitemap.ts, app/robots.ts dosyalarını kopyala
6. public/llms.txt dosyasını kopyala
7. messages/nl.json ve messages/en.json oluştur (brief'teki metinler)
8. Tüm sayfalar için boş iskelet dosyaları oluştur
9. npm install @supabase/supabase-js → lib/supabase.ts yaz
10. Nav + Footer bileşeni yaz (işlevsel, Tailwind layout class'ları tamam, görsel stil yok)

Her adımı bitir, bir sonrakine geç. Onay bekleme.
```

---

## MALIYET ÖZETİ

| Kalem | Fiyat |
|-------|-------|
| qovre.nl domain (mijn.host) | ~€5/yıl |
| qovre.com domain | ~€10/yıl |
| Vercel (free tier) | €0 |
| Zoho Mail (ücretsiz) | €0 |
| Resend (ücretsiz, 3k/ay) | €0 |
| Supabase (ücretsiz tier) | €0 |
| Gemini Flash (ücretsiz) | €0 |
| Plausible | €9/ay (veya ücretsiz self-host) |
| **Başlangıç toplam** | **~€1.2/ay** |

---

## NOTLAR & KARARLAR

- **Marka adı:** Qovre kesinleşti (Axelo değil). Gerekçe: fonetik güç, özgünlük, LLM tanınırlığı, Hollandaca uyum
- **CMS:** Harici CMS yok — Supabase admin paneli yeterli (sadece servis sayfaları yönetilecek)
- **Blog:** Şimdilik statik, sonra eklenebilir (`/en/insights`, `/nl/inzichten` route'ları hazır)
- **WhatsApp:** Sağ alt köşe, chat ikonunun üstü. Numara sonra eklenecek
- **Plausible:** GDPR uyumlu, cookie banner gerektirmiyor — Google Analytics'e tercih sebebi
- **Vercel → Hetzner:** İkinci proje gelince CX32 + Coolify'a geçiş planı var
