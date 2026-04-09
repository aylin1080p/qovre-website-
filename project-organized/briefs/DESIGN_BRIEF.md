# Qovre — Antigravity Design Brief
## Site inşası için tam karar dosyası

---

## Tema & Dil

- **Varsayılan tema:** Bright (açık/light) mod — dark moda geçiş toggle'ı olacak
- **Varsayılan dil:** Nederlands (NL) — EN'e geçiş switcher'ı olacak
- **URL yapısı:** `/nl` varsayılan, `/en` İngilizce

---

## Animasyonlar (hepsi dahil)

- **Scroll-based:** Sayfa aşağı indikçe elementler yukarıdan belirir (Framer Motion whileInView)
- **Parallax:** Hero section'da katmanlar farklı hızda kayar
- **Typewriter:** Hero başlığında typing efekti — Hollandaca metin
- **Sayaç:** Rakamlar 0'dan hedef değere sayılarak artar (7+ yıl, proje sayısı vb.)
- **Hover glow:** Servis kartlarında hover'da soft glow efekti
- **Marquee:** Servis etiketleri yatay kayan bant (zaten var)

---

## Güven Elementleri

### Deneyim değerleri (sayaç animasyonuyla)
- **7+** Yıllık sektör deneyimi / Jaren ervaring
- **120+** Tamamlanan proje / Afgeronde projecten  
- **40+** Memnun müşteri / Tevreden klanten
- **12** Hollanda ili / Nederlandse provincies

### Takım algısı
- "Ons team van specialisten" — uzman ekibimiz
- Senior developer, AI architect, UX designer, project manager rolleri gösterilecek
- Gerçek fotoğraf yok — soyut/geometrik avatar placeholder'lar

### Sahte yorumlar (gerçekçi isimler, Hollandalı)
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

## Renk Sistemi (Bright mod varsayılan)

```css
/* Light mode */
--bg: #ffffff
--bg-secondary: #f8f8fc
--bg-card: #f2f2f8
--text-primary: #0a0a14
--text-secondary: #4a4a6a
--text-muted: #8888aa
--border: rgba(0,0,0,0.08)
--accent: #0a0a14
--accent-text: #ffffff
--glow: rgba(99, 88, 220, 0.15)

/* Dark mode (toggle ile) */
--bg: #080810
--bg-secondary: #0d0d18
--bg-card: #111122
--text-primary: #ffffff
--text-secondary: rgba(255,255,255,0.55)
--text-muted: rgba(255,255,255,0.28)
--border: rgba(255,255,255,0.07)
--accent: rgba(255,255,255,0.92)
--accent-text: #080810
--glow: rgba(99, 88, 220, 0.2)
```

---

## Sayfa Yapısı

### Homepage (NL varsayılan)
1. **Nav** — Logo + linkler + NL/EN switcher + dark/light toggle + CTA butonu
2. **Hero** — Typewriter efektli başlık + parallax arka plan + CTA
3. **Sayaç şeridi** — 4 rakam animasyonla
4. **Marquee** — Kayan servis etiketleri
5. **Servisler** — 4 kart, hover glow efektli
6. **AI highlight** — Özel vurgu bölümü
7. **Süreç** — 5 adım, scroll-based
8. **Sektörler** — Grid
9. **Yorumlar** — 5 referans kartı, isim + ünvan
10. **Hollanda coverage** — Şehir pilleri
11. **FAQ** — Accordion
12. **Contact CTA** — Büyük alan
13. **Footer** — Linkler + şehirler + KVK

---

## Contact & Sipariş Sistemi

### İletişim formu (genel)
- Ad, E-mail, Şirket, Servis türü, Mesaj
- Honeypot spam koruması
- Resend ile `contact@qovre.nl`'e iletim

### Sipariş formu (özel müşteri)
Ayrı `/nl/bestelling` ve `/en/order` sayfası:
- Şirket adı + KVK numarası
- İletişim kişisi + e-mail + telefon
- Proje türü (dropdown — 4 servis kategorisi)
- Bütçe aralığı (dropdown)
- Tahmini başlangıç tarihi
- Proje açıklaması (textarea)
- Dosya yükleme (brief/mockup için)
- **Dijital sözleşme onayı** checkbox'ı
- İmzalanmış PDF özeti otomatik maile gönderilir

### Dijital sözleşme içeriği
- Kapsam ve teslimatlar
- Ödeme planı (50% avans, 50% teslimatta)
- Revizyon hakkı (2 round dahil)
- Telif hakları (ödeme tamamlanınca müşteriye geçer)
- Gizlilik maddesi
- İptal koşulları

---

## Mail Akışı

```
Ziyaretçi form doldurur
  → Resend API tetiklenir
  → contact@qovre.nl'e mail gelir
  → Otomatik onay maili ziyaretçiye gönderilir

Sipariş formu doldurulur
  → Sözleşme özeti PDF oluşturulur
  → contact@qovre.nl'e sipariş detayı gelir
  → Müşteriye sözleşme özeti PDF maile gider
```

---

## Teknik Notlar (Antigravity için)

- `lib/animations.ts` dosyasındaki variant'ları kullan, yeni yazma
- `app/globals.css` class'larını kullan, inline style yazma
- `data/seo.ts` içeriği güncelle: Hollandaca yorumlar, sayaç değerleri, takım rolleri ekle
- Theme toggle: `localStorage`'a kaydet, `<html>` tag'ına `class="dark"` ekle
- Lang switcher: `/nl` ↔ `/en` URL değişimi, `localStorage`'a kaydet
- Typewriter: `framer-motion` ile değil, saf CSS `@keyframes` veya küçük custom hook
- Parallax: `useScroll` + `useTransform` (Framer Motion)
- Hover glow: CSS `box-shadow` transition, `--glow` değişkeni kullan

---

## Öncelik Sırası (Antigravity build order)

1. Theme toggle sistemi (globals.css güncelle)
2. NL homepage tam içerikle
3. EN homepage
4. Servis sayfaları (4 adet)
5. Contact sayfası + form
6. Sipariş sayfası + sözleşme
7. Şehir landing pages (20 adet)
8. Process, Industries, About sayfaları
9. Insights/blog iskeleti

---

## AI Chat Sistemi (Gemini Flash — ücretsiz)

**Model:** Google Gemini 2.0 Flash (ücretsiz tier, günde 1500 istek)
**API:** Google AI Studio → https://aistudio.google.com → API key al

### Chat widget özellikleri
- Sağ alt köşede sabit chat ikonu
- Açılınca küçük chat penceresi (modal değil, overlay)
- Hollandaca varsayılan, site diline göre otomatik değişir
- Qovre hakkında bilgi verir, sayfalara yönlendirir

### System prompt (Antigravity'ye ver)
```
Je bent de digitale assistent van Qovre, een software- en AI-bedrijf 
in Nederland. Je helpt bezoekers met vragen over onze diensten, 
werkwijze en prijzen. Antwoord altijd in de taal van de gebruiker.

Onze diensten:
- Maatwerk software ontwikkeling
- AI & automatisering systemen  
- Content & groei systemen
- Doorlopend onderhoud

Werkwijze: 5 stappen (Discovery → Architectuur → Bouwen → Lancering → Support)
Prijsmodel: Vaste scope, geen uurtarief. Projecten starten vanaf €3.000.
Doorlooptijd: 3-12 weken afhankelijk van scope.
Contact: contact@qovre.nl

Als iemand een project wil starten, stuur ze naar /nl/contact.
Als iemand meer wil weten over een dienst, stuur ze naar de juiste pagina.
Geef geen garanties over exacte prijzen of deadlines.
Houd antwoorden kort en zakelijk.
```

### Teknik implementasyon
```typescript
// lib/gemini.ts
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userMessage }] }],
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
    })
  }
)
```

Environment variable ekle:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

---

## WhatsApp Butonu

Sağ alt köşede sabit, chat ikonunun üstünde.

```typescript
// components/WhatsAppButton.tsx
const WHATSAPP_NUMBER = "31600000000" // başına 31 ekle, 0 olmadan
const WHATSAPP_MESSAGE = "Hallo, ik heb een vraag over Qovre."

<a 
  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
  target="_blank"
  // sağ alt köşe, sabit pozisyon
>
```

WhatsApp numarasını sonra ekle — `WHATSAPP_NUMBER` değişkenini güncelle.

---

*Bu dosya Antigravity'ye verilecek ana brief'tir.*
*İlk prompt olarak ANTIGRAVITY_PROMPT.md ile birlikte kullan.*
