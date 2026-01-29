-- ============================================
-- MT kullanıcısı profil düzeltmesi
-- "Database error querying schema" hatası için
-- Supabase SQL Editor'da çalıştırın.
-- ============================================
-- mt@codecrafters.local kullanıcısının UID'si: 028a70eb-56a9-41dc-a030-b38a5aaaa2a7

-- 1) Profil yoksa ekle, varsa role'ü mt yap
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
  '028a70eb-56a9-41dc-a030-b38a5aaaa2a7',
  'mt@codecrafters.local',
  'MT Temsilci',
  'mt'
)
ON CONFLICT (id) DO UPDATE SET
  role = 'mt',
  full_name = 'MT Temsilci',
  email = 'mt@codecrafters.local',
  updated_at = now();
