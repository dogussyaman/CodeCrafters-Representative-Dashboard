import { type WarrantyPackage, type CategoryPricing } from '@/components/warranty-packages'

// Satış Birimi Güvence Paketleri
export const salesWarrantyPackages: WarrantyPackage[] = [
    {
        id: '1',
        code: 'SM',
        name: 'Mini Güvence Paketi',
        dailyPrice: 120,
        monthlyPrice: 2500,
        hasCorporateOffice: true,
        hasLicenseOffice: true,
        category: 'eco'
    },
    {
        id: '2',
        code: 'LCFA',
        name: 'Lastik Cam Far Ayna Güvencesi',
        dailyPrice: 60,
        monthlyPrice: 1200,
        hasCorporateOffice: true,
        hasLicenseOffice: true,
        category: 'eco'
    },
    {
        id: '3',
        code: 'MH',
        name: 'Mini Hasar Güvencesi',
        dailyPrice: 85,
        monthlyPrice: 1800,
        hasCorporateOffice: true,
        hasLicenseOffice: true,
        category: 'comfort'
    },
    {
        id: '4',
        code: 'FK',
        name: 'Ferdi Kaza Güvencesi',
        dailyPrice: 45,
        monthlyPrice: 900,
        hasCorporateOffice: true,
        hasLicenseOffice: true,
        category: 'comfort'
    },
    {
        id: '5',
        code: 'IM',
        name: 'İhtiyari Mali Mesuliyet',
        dailyPrice: 200,
        monthlyPrice: 4200,
        hasCorporateOffice: true,
        hasLicenseOffice: true,
        category: 'prestige'
    },
    {
        id: '6',
        code: 'PH',
        name: 'Premium Hasar Güvencesi',
        dailyPrice: 250,
        monthlyPrice: 5500,
        hasCorporateOffice: true,
        hasLicenseOffice: false,
        category: 'premium'
    }
]

export const salesCategories: CategoryPricing[] = [
    {
        category: 'eco',
        label: 'Eco',
        dailyPrice: 120,
        monthlyPrice: 380,
        badge: 'ECO',
        badgeColor: 'bg-green-500/10 text-green-600'
    },
    {
        category: 'comfort',
        label: 'Konfor',
        dailyPrice: 130,
        monthlyPrice: 400,
        badge: 'KONFOR'
    },
    {
        category: 'prestige',
        label: 'Prestij',
        dailyPrice: 200,
        monthlyPrice: 420,
        badge: 'PRESTİJ',
        badgeColor: 'bg-purple-500/10 text-purple-600'
    },
    {
        category: 'premium',
        label: 'Premium',
        dailyPrice: 250,
        monthlyPrice: 550,
        badge: 'PREMIUM',
        badgeColor: 'bg-amber-500/10 text-amber-600'
    }
]

// Müşteri Hizmetleri Güvence Paketleri
export const customerServiceWarrantyPackages: WarrantyPackage[] = [
    {
        id: '1',
        code: 'CSM',
        name: 'Müşteri Hizmetleri Mini Güvence',
        dailyPrice: 100,
        monthlyPrice: 2200,
        hasCorporateOffice: true,
        hasLicenseOffice: true,
        category: 'eco'
    },
    {
        id: '2',
        code: 'CSLCF',
        name: 'Müşteri Hizmetleri Lastik Cam Far Güvencesi',
        dailyPrice: 55,
        monthlyPrice: 1100,
        hasCorporateOffice: true,
        hasLicenseOffice: true,
        category: 'eco'
    },
    {
        id: '3',
        code: 'CSMH',
        name: 'Müşteri Hizmetleri Mini Hasar Güvencesi',
        dailyPrice: 75,
        monthlyPrice: 1700,
        hasCorporateOffice: true,
        hasLicenseOffice: true,
        category: 'comfort'
    },
    {
        id: '4',
        code: 'CSFK',
        name: 'Müşteri Hizmetleri Ferdi Kaza Güvencesi',
        dailyPrice: 40,
        monthlyPrice: 850,
        hasCorporateOffice: true,
        hasLicenseOffice: true,
        category: 'comfort'
    },
    {
        id: '5',
        code: 'CSIM',
        name: 'Müşteri Hizmetleri İhtiyari Mali Mesuliyet',
        dailyPrice: 180,
        monthlyPrice: 4000,
        hasCorporateOffice: true,
        hasLicenseOffice: true,
        category: 'prestige'
    },
    {
        id: '6',
        code: 'CSPH',
        name: 'Müşteri Hizmetleri Premium Hasar Güvencesi',
        dailyPrice: 230,
        monthlyPrice: 5200,
        hasCorporateOffice: true,
        hasLicenseOffice: false,
        category: 'premium'
    }
]

export const customerServiceCategories: CategoryPricing[] = [
    {
        category: 'eco',
        label: 'Eco',
        dailyPrice: 100,
        monthlyPrice: 350,
        badge: 'ECO',
        badgeColor: 'bg-green-500/10 text-green-600'
    },
    {
        category: 'comfort',
        label: 'Konfor',
        dailyPrice: 115,
        monthlyPrice: 380,
        badge: 'KONFOR'
    },
    {
        category: 'prestige',
        label: 'Prestij',
        dailyPrice: 180,
        monthlyPrice: 400,
        badge: 'PRESTİJ',
        badgeColor: 'bg-purple-500/10 text-purple-600'
    },
    {
        category: 'premium',
        label: 'Premium',
        dailyPrice: 230,
        monthlyPrice: 520,
        badge: 'PREMIUM',
        badgeColor: 'bg-amber-500/10 text-amber-600'
    }
]

// İkame Hizmetleri Bölge Müdürleri
export const regionalManagers = [
    { id: 1, name: "Marmara Bölge", manager: "Ahmet Yılmaz", phone: "+90 555 123 45 67", email: "ahmet.yilmaz@example.com", status: "Aktif" },
    { id: 2, name: "Ege Bölge", manager: "Ayşe Demir", phone: "+90 555 234 56 78", email: "ayse.demir@example.com", status: "Aktif" },
    { id: 3, name: "İç Anadolu Bölge", manager: "Mehmet Kaya", phone: "+90 555 345 67 89", email: "mehmet.kaya@example.com", status: "İzinde" },
    { id: 4, name: "Akdeniz Bölge", manager: "Fatma Çelik", phone: "+90 555 456 78 90", email: "fatma.celik@example.com", status: "Aktif" },
    { id: 5, name: "Karadeniz Bölge", manager: "Mustafa Şahin", phone: "+90 555 567 89 01", email: "mustafa.sahin@example.com", status: "Aktif" },
]

// İKAME Ofis Müdürleri
export const officeManagers = [
    { id: 1, name: "İstanbul Merkez Ofis", manager: "Canan Öztürk", location: "İstanbul", performance: 95 },
    { id: 2, name: "Ankara Ofis", manager: "Burak Yıldız", location: "Ankara", performance: 88 },
    { id: 3, name: "İzmir Ofis", manager: "Selin Arslan", location: "İzmir", performance: 92 },
    { id: 4, name: "Bursa Ofis", manager: "Emre Polat", location: "Bursa", performance: 85 },
    { id: 5, name: "Antalya Ofis", manager: "Zeynep Koç", location: "Antalya", performance: 90 },
]

// Yardım ve Destek Bilgileri
export const helpSupportInfo = {
    email: "destek@arackiralama.com",
    phone: "0850 123 45 67",
    workingHours: "08:30-18:00 (Hafta içi)",
    responseTime: "24 saat içinde",
    chatbotAvailability: "7/24 aktif"
}

export const faqData = [
    {
        question: "Genel arama nasıl çalışır?",
        answer: "Üst menüdeki arama alanına yazdığınız kelimeler birim ve içerik tiplerine göre filtrelenir. Sonuçlarda birim rozetleri görünür."
    },
    {
        question: "Güvence paketleri bilgisi nasıl görüntülenir?",
        answer: "İlgili birimde 'Güvence Paketleri' menüsüne tıklayın. Burada tüm paket detaylarını, fiyatları ve kapsamları görebilirsiniz."
    },
    {
        question: "DigiBot nasıl kullanılır?",
        answer: "Üst menüden 'DigiBot' butonuna tıklayarak asistanı açabilirsiniz. DigiBot ile müşteri sorularına cevap hazırlayabilir, içerik üretebilir ve hızlı bilgi alabilirsiniz."
    },
    {
        question: "Farklı birimlere nasıl geçiş yapılır?",
        answer: "Sol menüdeki 'Birimler' bölümünden istediğiniz birime tıklayarak geçiş yapabilirsiniz. Her birimin kendine özgü hazır cümleleri, kampanyaları ve özellikleri bulunmaktadır."
    }
]
