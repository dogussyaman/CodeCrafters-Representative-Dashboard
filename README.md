# CodeCraftX MT Dashboard

**CodeCraftX MT Dashboard**, CodeCraftX platformu için müşteri temsilcisi (MT) ve yönetici panelidir. Aynı Supabase projesini kullanır; admin ve mt rolleri ile giriş yapılır.

## Özellikler

- **Kimlik doğrulama**: Supabase Auth ile giriş; sadece `admin`, `platform_admin` ve `mt` rolleri panele erişebilir.
- **Yönetici**: İletişim mesajları, destek biletleri, eğitim/rol/şirket talepleri, bildirimler, kullanıcılar, temsilci yönetimi, istatistikler.
- **Müşteri temsilcisi**: İletişim mesajları, destek biletleri, eğitim/rol/şirket talepleri, bildirimler.

## Gereksinimler

- Node.js
- CodeCrafters ile aynı Supabase projesi (env değişkenleri)

## Kurulum

1. **Bağımlılıkları yükleyin:** Proje kökünde sistem terminalinizde (PowerShell veya CMD) `npm install` çalıştırın.  
   - `Module not found: Can't resolve '@supabase/ssr'` hatası alıyorsanız paketler yüklenmemiştir; mutlaka `npm install` çalıştırın.
2. `.env.example` dosyasını `.env.local` olarak kopyalayın ve Supabase bilgilerinizi girin (CodeCraftX ile aynı `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Supabase’de CodeCraftX şemasına ek olarak `scripts/MT_EXTENSION_SCHEMA.sql` (CodeCraftX repo’sunda `scripts/MT_EXTENSION_SCHEMA.sql`) migration’ını çalıştırın.
4. Geliştirme sunucusunu başlatın: `npm run dev`
5. Tarayıcıda `http://localhost:3000` adresine gidin; giriş için admin veya mt rolüne sahip bir Supabase kullanıcısı kullanın.

## Komutlar

| Komut         | Açıklama                |
| ------------- | ----------------------- |
| `npm run dev` | Geliştirme sunucusu      |
| `npm run build` | Prodüksiyon derlemesi  |
| `npm run start` | Prodüksiyon sunucusu   |
| `npm run lint` | ESLint kontrolü         |

## Proje yapısı

- `src/app/(main)/auth/v2/login` – Giriş sayfası (Supabase)
- `src/app/(main)/dashboard` – Ana panel (role göre AdminSidebar veya MTSidebar)
- `src/app/(main)/dashboard/admin` – Yalnızca admin erişimi (kullanıcılar, temsilci yönetimi, istatistikler)
- `src/lib/supabase` – Supabase client/server helpers

## Lisans

MIT
