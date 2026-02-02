import type { Term } from "@/types/terms";

/**
 * Örnek terim listesi. Üretimde Supabase veya başka kaynaktan beslenebilir.
 * Alfabetik filtreleme sayfa tarafında title'ın ilk harfine göre yapılır.
 */
const SAMPLE_TERMS: Term[] = [
  { id: "1", title: "API", description: "Uygulama programlama arayüzü; yazılım bileşenlerinin birbirleriyle iletişim kurmasını sağlar.", slug: "api" },
  { id: "2", title: "Authentication", description: "Kullanıcı kimliğinin doğrulanması; giriş ve yetkilendirme süreçleri.", slug: "authentication" },
  { id: "3", title: "Bilet", description: "Destek talebi kaydı; kullanıcı sorunlarının takip edildiği kayıt.", slug: "bilet" },
  { id: "4", title: "Dashboard", description: "Özet bilgilerin ve hızlı erişim linklerinin gösterildiği ana panel ekranı.", slug: "dashboard" },
  { id: "5", title: "Eğitim Talebi", description: "Kullanıcının eğitim veya sertifikasyon için yaptığı talep kaydı.", slug: "egitim-talebi" },
  { id: "6", title: "MT", description: "Müşteri Temsilcisi; destek ve iletişim süreçlerini yöneten rol.", slug: "mt" },
  { id: "7", title: "Rol Talebi", description: "Kullanıcının platform içi rol değişikliği veya yetki talebi.", slug: "rol-talebi" },
  { id: "8", title: "Şirket Talebi", description: "Yeni şirket oluşturma veya şirket bilgisi güncelleme talebi.", slug: "sirket-talebi" },
];

export function getTerms(): Term[] {
  return SAMPLE_TERMS;
}

export function getTermsByLetter(terms: Term[], letter: string): Term[] {
  const upper = letter.trim().toUpperCase();
  return terms.filter((t) => {
    const first = t.title.trim().charAt(0).toLocaleUpperCase("tr-TR");
    return first === upper;
  });
}
