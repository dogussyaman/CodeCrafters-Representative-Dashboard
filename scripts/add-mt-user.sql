-- ============================================
-- MT kullanıcısı ekleme (örnek)
-- Supabase Dashboard > SQL Editor'da çalıştırın.
-- Şifreyi mutlaka değiştirin: aşağıdaki 'CHANGE_ME' yerine güçlü bir şifre yazın.
-- Giriş: mt@codecrafters.local ve belirlediğiniz şifre.
-- ============================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'mt@codecrafters.local',
  crypt('CHANGE_ME', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"MT Temsilci","role":"mt"}'
);

-- Trigger (handle_new_user) otomatik olarak public.profiles'a
-- aynı id, email, full_name ve role='mt' ile kayıt ekler.
-- Eğer profile eklenmezse aşağıdaki satırı çalıştırın (id'yi auth.users'dan alın):
-- INSERT INTO public.profiles (id, email, full_name, role)
-- SELECT id, email, raw_user_meta_data->>'full_name', COALESCE(raw_user_meta_data->>'role','mt')
-- FROM auth.users WHERE email = 'mt@codecrafters.local';
