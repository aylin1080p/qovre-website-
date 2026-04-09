# Qovre — Kuruluş Rehberi
## Marka Adı · Domain · Hosting · Email · GitHub

---

## 1. Marka Adı Kararı: Qovre

### Neden Qovre, Axelo değil?

Nöropsikoloji ve B2B marka araştırmalarından derlenen veriler:

**Fonetik yapı:** Qovre, arka sesli harf ("o") + kapanma ünsüzü ("vr") kombinasyonu içeriyor.
Araştırmalar bu yapının güç, sağlamlık ve güvenilirlik çağrışımı yarattığını gösteriyor
(Bouba/Kiki etkisi — yuvarlak sesler = güvenli/sağlam). B2B alıcılar için kritik.

**Özgünlük:** "Axelo" türevi isimler (Axelo, Axela, Axel-X) teknoloji sektöründe
aşırı doymuş durumda. "Qovre" Google'da sıfır sonuç — tamamen temiz bir marka sahası.

**Uzunluk:** 5 karakter, 2 hece (Ko-vre). Araştırmalara göre 1-2 heceli isimler
anımsanma hızını ve marka bilinirliğini maksimize ediyor (Apple, Shell, Google).

**Q harfi etkisi:** Latince kökenli dillerde Q harfi nadir ve dikkat çekici.
İngilizce ve Hollandaca'da ekrana yapışır, arama sonuçlarında fark yaratır.

**LLM bilinirliği:** Tamamen özgün bir kelime olduğu için hiçbir bağlamsal çakışma yok.
LLM'ler "Qovre" adını gördüklerinde direkt bu markaya aitleyecekler —
"Axelo" gibi yaygın köke sahip isimler ise karışıklık yaratabilir.

**Hollandaca uyum:** Qovre, Hollandaca'da olumsuz bir anlam veya gülünç bir
çağrışım taşımıyor. "Q" harfi Hollandaca'da egzotik ve premium algılanır.

**Sonuç: Qovre.**

---

## 2. Domain Stratejisi

### Öncelik sırası — hangi domainleri al

```
1. qovre.nl       ← Birincil — zorunlu
2. qovre.com      ← İkincil — zorunlu
3. qovre.eu       ← Opsiyonel ama önerilen
```

`qovre.nl` birincil domain olarak kullanılacak.
`qovre.com` ve `qovre.eu` → 301 redirect ile `qovre.nl`'e yönlendirilecek.

Bu üç domain'i şimdi almak kritik. Marka büyüdükçe cybersquatter riski artar.

### Domain nereden alınmalı?

**Öneri: Mijn.host**

Gerekçe (araştırma bulgularına göre):
- `.nl` domain yılda yaklaşık €5 — TransIP'in %30-40 altında
- Bağımsız şirket, büyük yatırımcı baskısı yok → fiyat artışı riski düşük
- LiteSpeed sunucu altyapısı, DirectAdmin panel
- Hızlı ve net email desteği
- Hollanda merkezli, GDPR uyumlu

**TransIP alternatif olarak uygun** — daha büyük firma, daha pahalı.
2024'te `.nl` yenileme fiyatı €15'e çıktı (başlangıçta €5'ti).
Domain al, hosting değil.

**Kaçınılacaklar:**
- GoDaddy, Namecheap — `.nl` için optimal değil, destek zayıf
- Vimexx — ucuz ama fiyatlar sık artıyor

### Satın alma adımları

1. mijn.host adresine git
2. Hesap oluştur (eenmanszaak bilgilerin yeterli)
3. `qovre.nl` → sepete ekle
4. `qovre.com` → sepete ekle
5. Ödeme (toplam ~€10-15/yıl)
6. DNS yönetimi için nameserver'ları kendi kontrolünde tut
   (hosting başka yerden alacaksan nameserver'ı hostinge yönlendirmek gerekecek)

---

## 3. Hosting Stratejisi

### Senaryo A: Vercel (Başlangıç için önerilen)

**Ne zaman:** Site yeni açılıyor, trafik belirsiz, geliştirme süreci devam ediyor.

| Özellik | Detay |
|---------|-------|
| Fiyat | Ücretsiz tier (0-1 site için yeterli) |
| Next.js desteği | Mükemmel — aynı ekip |
| Deploy | Git push → otomatik canlı |
| SSL | Otomatik, ücretsiz |
| Birden fazla site | Free tier'da 1 proje; Pro ($20/ay) ile sınırsız |
| Dezavantaj | Trafik büyüyünce maliyet artar |

**Vercel free tier limitleri:**
- 100GB bandwidth/ay
- 6.000 build dakikası/ay
- Tek production deployment

Qovre için başlangıç fazında Vercel free tier fazlasıyla yeterli.

### Senaryo B: VPS + Coolify (Büyüme fazı / birden fazla site)

**Ne zaman:** Birden fazla proje var, maliyet kontrol edilmek isteniyor,
veya aylık Vercel faturası €30'u geçiyor.

**Önerilen VPS: Hetzner Cloud (Almanya, Nürnberg/Falkenstein DC)**

Gerekçe:
- Hollanda'ya en yakın Alman veri merkezi, latency < 10ms
- GDPR uyumlu (AB içinde)
- Fiyat/performans oranı piyasanın en iyisi

| Plan | vCPU | RAM | Disk | Fiyat |
|------|------|-----|------|-------|
| CX22 | 2 | 4GB | 40GB | ~€4.5/ay |
| CX32 | 4 | 8GB | 80GB | ~€8.9/ay |
| CX42 | 8 | 16GB | 160GB | ~€18/ay |

**CX32 ile kaç site barındırabilirsin?**

Bir CX32 (€8.9/ay) üzerine Coolify kurarak:
- 5-10 Next.js sitesi (her biri düşük-orta trafikli)
- 1-2 Node.js API servisi
- PostgreSQL veya MySQL veritabanı
- Redis cache
- Email sunucusu (isteğe bağlı)
- Wildcard SSL (Let's Encrypt, ücretsiz)

Qovre + 3-4 başka proje rahatlıkla taşınır. CX42'ye geçersen 15-20 siteye kadar çıkabilirsin.

**Coolify nedir?**
Open-source, self-hosted Vercel/Heroku alternatifi. Git repo bağlarsın,
push yaparsın, otomatik deploy eder. SSL kur, domain ekle, tümü dashboard'dan.

### Hangi senaryo sana uygun?

```
Şu an sadece Qovre sitesi varsa    → Vercel free tier ile başla
Birden fazla proje yakında gelecekse → Hetzner CX32 + Coolify kur
```

Öneri: Vercel ile başla, ikinci site gelince Hetzner'a geç.
Geçiş 2-3 saat sürer, DNS propagation dahil.

---

## 4. Email Stratejisi

### Hangi adresler lazım?

```
hello@qovre.nl      ← Ana iletişim (sıcak, erişilebilir)
info@qovre.nl       ← Kurumsal/resmi iletişim
contact@qovre.nl    ← Form maili buradan gönderilecek (Resend)
```

Üçü de aynı inbox'a yönlendirilebilir.

### Mail servisi seçenekleri

**Seçenek 1: Google Workspace — €6/ay**

Avantajlar:
- Gmail arayüzü (zaten biliyorsun)
- Google Meet, Drive, Docs dahil
- Mobil entegrasyon mükemmel
- Spam filtreleme en güçlü
- Kurumsal görünüm için en iyi

Dezavantaj: Aylık maliyet var.

**Seçenek 2: Zoho Mail — Ücretsiz (5 kullanıcıya kadar)**

Avantajlar:
- GDPR uyumlu (AB sunucuları seçilebilir)
- Ücretsiz plan yeterli tek kullanıcı için
- Kendi domain destekler

Dezavantaj: Gmail kadar akıcı değil.

**Seçenek 3: Mijn.host / TransIP mail — €2-3/ay**

Avantajlar:
- Domain ile aynı yerde, yönetim kolay
- Ucuz

Dezavantaj: Özellikleri sınırlı, spam koruması zayıf.

**Öneri:** Başlangıç için **Zoho Mail (ücretsiz)** ile başla.
Müşteri sayısı artınca Google Workspace'e geç.

### Resend — Form mailleri için (ayrı sistem)

Resend, kullanıcının iletişim formunu doldurduğunda sana mail atan sistemdir.
Google Workspace'ten farklı — bu bir transactional mail servisi.

Kurulum:
1. resend.com'a kaydol (ücretsiz, ayda 3.000 mail)
2. `qovre.nl` domain'ini Resend'e ekle
3. DNS'e 3 kayıt ekle: SPF, DKIM, DMARC (10 dakika)
4. `.env.local`'a `RESEND_API_KEY=re_xxx` ekle
5. Form maili `contact@qovre.nl` → `hello@qovre.nl` zinciri otomatik çalışır

---

## 5. GitHub Stratejisi

### Private repo kurulumu

1. github.com'a giriş yap (aylin1080p hesabı)
2. **New repository** → `qovre-website`
3. **Private** seç (zorunlu — canlıya alana kadar)
4. Initialize with README: ✓
5. .gitignore: Node
6. Create repository

### İlk push — local kurulum

```bash
# Projeyi localine çek
git clone https://github.com/aylin1080p/qovre-website.git
cd qovre-website

# Dosyaları kopyala (indirdiğin nexus-site klasöründen)
cp -r /path/to/nexus-site/* .

# Bağımlılıkları kur
npm install

# İlk commit
git add .
git commit -m "feat: initial project structure with SEO/GEO foundation"
git push origin main
```

### Branch stratejisi (test aşaması için)

```
main          ← canlı / production kodu (Vercel bu branch'i takip eder)
develop       ← geliştirme branch'i
feature/xxx   ← her yeni özellik için ayrı branch
```

Çalışma akışı:
```bash
# Yeni bir özellik başlatırken
git checkout -b feature/contact-form
# ... değişiklikler yap ...
git commit -m "feat: add contact form validation"
git push origin feature/contact-form

# Hazır olunca develop'a merge et
git checkout develop
git merge feature/contact-form

# Test geçince main'e merge et
git checkout main
git merge develop
git push origin main
# → Vercel otomatik deploy başlar
```

### Codex / Claude Code entegrasyonu

**Claude Code (Antigravity) için:**
1. Antigravity'yi aç
2. GitHub repo'yu bağla: `aylin1080p/qovre-website`
3. İlk mesaj olarak `IMPLEMENTATION_GUIDE.md` içeriğini yapıştır
4. "Bu guide'ı referans alarak geliştirmeye devam et" de

**Codex için:**
1. Codex'i GitHub hesabına bağla
2. `qovre-website` repo'sunu seç
3. `IMPLEMENTATION_GUIDE.md`'yi birinci prompt olarak ver
4. Görev: "Implement the remaining pages following the guide"

**Codex vs Claude Code:**
Bu proje için Claude Code (Antigravity) daha avantajlı.
Sebep: Proje context'ini bu konuşmadan taşıyabilirsin, SEO/GEO kararlarının
gerekçelerini biliyor, data/seo.ts dosyasını zaten oluşturdu.
Codex sıfırdan başlamak zorunda kalır.

---

## 6. Kurulum Sırası (Öncelik Listesi)

```
1. [ ] qovre.nl + qovre.com domain satın al (mijn.host) — 15 dakika
2. [ ] GitHub'da private repo oluştur (qovre-website) — 5 dakika
3. [ ] Zoho Mail kur, hello@qovre.nl oluştur — 20 dakika
4. [ ] Resend.com kaydol, domain bağla — 15 dakika
5. [ ] Vercel hesabı aç, GitHub repo'yu bağla — 10 dakika
6. [ ] .env.local dosyası oluştur, API key'leri ekle — 5 dakika
7. [ ] Claude Code / Codex ile geliştirmeye devam et
8. [ ] data/seo.ts'de BRAND.name ve BRAND.url'i güncelle (Veloq → Qovre)
9. [ ] Canlıya alma öncesi: GSC kaydı, sitemap submit
```

---

## 7. Aylık Maliyet Özeti

| Kalem | Fiyat |
|-------|-------|
| qovre.nl domain | ~€5/yıl (~€0.4/ay) |
| qovre.com domain | ~€10/yıl (~€0.8/ay) |
| Vercel (free) | €0 |
| Zoho Mail (free) | €0 |
| Resend (free tier) | €0 |
| **Toplam başlangıç** | **~€1.2/ay** |

Büyüme fazında (VPS + Google Workspace):

| Kalem | Fiyat |
|-------|-------|
| Hetzner CX32 VPS | €8.9/ay |
| Google Workspace | €6/ay |
| Domain'ler | €1.2/ay |
| Resend (free) | €0 |
| **Toplam büyüme fazı** | **~€16/ay** |

---

## 8. Güncelleme: data/seo.ts

Qovre kararı kesinleşti. `data/seo.ts`'deki BRAND objesini şöyle güncelle:

```typescript
export const BRAND = {
  name: "Qovre",
  tagline: "Custom Software & AI Systems for the Netherlands",
  url: "https://www.qovre.nl",
  email: "hello@qovre.nl",
  // ... geri kalan aynı
};
```

Ve `public/llms.txt`'in ilk satırını güncelle:
```
# Qovre — Custom Software & AI Systems for the Netherlands
# https://www.qovre.nl/llms.txt
```

---

*Bu dosya Codex / Claude Code için referans dokümantasyon olarak hazırlanmıştır.*
*Son güncelleme: Nisan 2026*
