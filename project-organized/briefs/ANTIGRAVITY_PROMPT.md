# Antigravity / Claude Code — İlk Prompt

Aşağıdaki metni Antigravity'de yeni bir Claude Code oturumunda
ilk mesaj olarak yapıştır. Hiçbir şeyi değiştirme.

---

## BAŞLANGIÇ PROMPTU (kopyala yapıştır)

Sen Qovre adlı bir Hollanda yazılım ve AI şirketinin web sitesini
geliştiriyorsun. Proje Next.js 14, TypeScript, Tailwind CSS ve
Framer Motion kullanıyor.

Proje dosyaları GitHub repo'da mevcut. Klasör yapısı şu şekilde:

```
app/
  layout.tsx          ← Root layout, global schema, hreflang
  globals.css         ← Tüm design system ve CSS değişkenleri
  en/
    page.tsx          ← İngilizce homepage (yazılmış)
    [service]/page.tsx
    software-development-[city]/page.tsx
    contact/page.tsx
  nl/
    page.tsx          ← Hollandaca homepage (yazılmış)
  sitemap.ts
  robots.ts
data/
  seo.ts              ← Tek kaynak: BRAND, SERVICES, CITIES, FAQ, PROCESS
lib/
  metadata.ts         ← generateMeta() helper
  animations.ts       ← Tüm Framer Motion variant'ları
public/
  llms.txt            ← AI crawler için
```

Yapman gerekenler sırasıyla:

1. `data/seo.ts` dosyasını referans al — tüm içerik buradan gelecek
2. `lib/animations.ts` dosyasındaki variant'ları kullan — yeni animasyon yazma
3. `app/globals.css` dosyasındaki CSS değişkenlerini kullan — inline style yazma
4. `IMPLEMENTATION_GUIDE.md` dosyasındaki checklist'i takip et

İLK GÖREV: Eksik sayfaları tamamla:
- `app/en/process/page.tsx` — process sayfası
- `app/en/industries/page.tsx` — sektörler sayfası  
- `app/en/about/page.tsx` — hakkında sayfası
- `app/nl/contact/page.tsx` — Hollandaca iletişim sayfası
- `app/nl/[service]/page.tsx` — Hollandaca servis sayfaları
- `app/nl/software-ontwikkeling-[city]/page.tsx` — Hollandaca şehir sayfaları

Her sayfa için:
- `generateMeta()` kullan (lib/metadata.ts'den)
- JSON-LD schema ekle
- hreflang bağlantısı kur
- İçeriği `data/seo.ts`'den al
- Framer Motion animasyonları `lib/animations.ts`'den import et
- CSS class'ları `app/globals.css`'deki sistemi kullan

SEO/GEO kuralları `IMPLEMENTATION_GUIDE.md` dosyasında detaylı yazılı.
Başlamadan önce bu dosyayı oku.

Hazır mısın? data/seo.ts ve IMPLEMENTATION_GUIDE.md dosyalarını oku
ve hangi sayfayı önce yazacağını söyle.
