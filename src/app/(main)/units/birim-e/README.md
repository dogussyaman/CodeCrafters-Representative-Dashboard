# Kurumsal Satış Yönetimi Sistemi

Bu modül, temsilcilerden gelen kurumsal satış taleplerini yönetmek ve performansı takip etmek için tasarlanmıştır.

## 📋 Özellikler

### 1. Talep Yönetimi (`talep-durum-paneli.tsx`)
- **120 Temsilciden Gelen Talepler**: Tüm temsilcilerin gönderdiği kurumsal satış talepleri
- **Durum Kategorileri**:
  - ✅ **Başarılı**: Kurumsal anlaşma sağlanan müşteriler
  - ⏳ **Askıda**: Talebi beklemede olan müşteriler
  - ❌ **Başarısız**: Başarısız olan talepler
- **Filtreleme ve Arama**: Durum ve temsilci bazlı filtreleme
- **Detaylı Görünüm**: Her talep için detaylı bilgi modal'ı
- **İstatistikler**: Toplam, başarılı, askıda ve başarısız talep sayıları

### 2. Temsilci Performansı (`temsilci-performans.tsx`)
- **Temsilci Listesi**: Tüm 120 temsilcinin detaylı performans tablosu
- **Performans Metrikleri**:
  - Toplam talep sayısı
  - Başarılı talep sayısı
  - Askıda talep sayısı
  - Başarısız talep sayısı
  - Başarı oranı (%)
- **En İyi 5 Temsilci**: Başarı oranına göre sıralama
- **Arama Fonksiyonu**: Temsilci adı veya ID ile arama

### 3. Başarı Grafikleri (`basari-grafikleri.tsx`)
- **En Fazla Talep Gönderen Temsilciler**: İlk 10 temsilci
- **En Yüksek Başarı Oranı**: İlk 10 temsilci (min. 3 talep)
- **Genel Performans Karşılaştırması**: Talep sayısı × başarı oranı skoru
- **Görsel Grafikler**: Modern progress bar grafikleri
- **Renkli Göstergeler**: Performans seviyelerine göre renk kodlaması

## 🎨 Tasarım Özellikleri

- **Modern UI**: Shadcn/ui ve Tailwind CSS kullanımı
- **Dark Mode Uyumlu**: Tüm componentler dark mode destekli
- **Responsive**: Mobil, tablet ve desktop uyumlu
- **Animasyonlu**: Smooth transitions ve hover efektleri
- **Renkli Badge'ler**: Durum ve performans göstergeleri

## 📊 Veri Yapısı

### Talep (Request)
```typescript
{
  id: number
  temsilciId: string        // TMS-1001 formatında
  temsilciAdi: string       // Temsilci adı
  musteriEmail: string      // Müşteri email adresi
  musteriTicaret: string    // Ticaret sicil numarası
  detay: string            // Talep detayı
  tarih: string            // Talep tarihi (tr-TR format)
  durum: 'basarili' | 'askida' | 'basarisiz'
}
```

### Temsilci Performansı (Representative)
```typescript
{
  id: number
  temsilciId: string
  temsilciAdi: string
  toplamTalep: number
  basarili: number
  askida: number
  basarisiz: number
  basariOrani: number      // 0-100 arası yüzde
}
```

## 🗂️ Dosya Yapısı

```
kurumsal-satis-bo/
├── page.tsx                          # Ana sayfa (Tab navigation)
├── components/
│   ├── talep-durum-paneli.tsx       # Talep yönetimi
│   ├── temsilci-performans.tsx      # Temsilci performans tablosu
│   └── basari-grafikleri.tsx        # Performans grafikleri
└── README.md                         # Bu dosya
```

## 🚀 Kullanım

Sayfa 3 ana tab'dan oluşur:

1. **Talepler**: Tüm talepleri görüntüle, filtrele ve yönet
2. **Temsilciler**: Temsilci performansını detaylı incele
3. **Performans**: Görsel grafiklerle performans analizi

## 🔄 Veri Akışı

1. Temsilciler `kurumsal-yonlendirme` sayfasından talep gönderir
2. Talepler bu sistemde görüntülenir ve yönetilir
3. Her talep bir durum alır (başarılı/askıda/başarısız)
4. Sistem otomatik olarak performans metriklerini hesaplar
5. Grafikler ve tablolar gerçek zamanlı güncellenir

## 📝 Notlar

- Şu anda mock data kullanılmaktadır (120 temsilci)
- Gerçek API entegrasyonu için `generateMockRequests()` ve `generateRepresentativeData()` fonksiyonları değiştirilmelidir
- Tüm componentler client-side rendering kullanır ('use client')
- Dosya isimlendirmesi kebab-case formatındadır (örn: `talep-durum-paneli.tsx`)
