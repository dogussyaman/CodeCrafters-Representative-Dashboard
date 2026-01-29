/**
 * Ders için tip tanımı
 */
export interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string;
    order?: number;
    completed?: boolean;
}

/**
 * Birim anahtarları için tip
 */
export type UnitKey = "GENEL" | "SATIŞ BİRİMİ" | "MÜŞTERİ HİZMETLERİ" | "OFİS" | "İKAME" | "ADMIN";

/**
 * Ders ID oluşturucu yardımcı fonksiyon
 */
function createLessonId(unit: string, index: number): string {
    const unitMap: Record<string, string> = {
        "GENEL": "genel",
        "SATIŞ BİRİMİ": "satis",
        "MÜŞTERİ HİZMETLERİ": "musteri",
        "OFİS": "ofis",
        "İKAME": "ikame",
        "ADMIN": "admin"
    };
    return `${unitMap[unit] || "genel"}-${String(index + 1).padStart(2, "0")}`;
}

/**
 * Eğitim müfredatı - Tüm birimler için ders listeleri
 */
export const curriculum: Record<UnitKey, Lesson[]> = {
    GENEL: [
        {
            id: createLessonId("GENEL", 0),
            title: "Platforma Genel Bakış",
            description: "Dijital platformun temel özellikleri ve kullanım alanları",
            duration: "15 dk",
            order: 1,
        },
        {
            id: createLessonId("GENEL", 1),
            title: "Temsilci Paneli Kullanımı",
            description: "Dashboard, menüler ve temel navigasyon",
            duration: "20 dk",
            order: 2,
        },
        {
            id: createLessonId("GENEL", 2),
            title: "Müşteri İletişim İlkeleri",
            description: "Profesyonel iletişim ve müşteri memnuniyeti stratejileri",
            duration: "25 dk",
            order: 3,
        },
        {
            id: createLessonId("GENEL", 3),
            title: "Rezervasyon Süreci - Adım Adım",
            description: "Rezervasyon oluşturma, düzenleme ve iptal işlemleri",
            duration: "30 dk",
            order: 4,
        },
        {
            id: createLessonId("GENEL", 4),
            title: "Güvence Paketleri Hakkında",
            description: "Tam, mini ve süper güvence paketlerinin karşılaştırması",
            duration: "18 dk",
            order: 5,
        },
        {
            id: createLessonId("GENEL", 5),
            title: "Kampanya Yönetimi",
            description: "Aktif kampanyalara erişim ve müşteriye bilgilendirme",
            duration: "12 dk",
            order: 6,
        },
        {
            id: createLessonId("GENEL", 6),
            title: "Hazır Cümleler ve Şablonlar",
            description: "Etkili iletişim için hazır metinlerin kullanımı",
            duration: "10 dk",
            order: 7,
        },
        {
            id: createLessonId("GENEL", 7),
            title: "Raporlama ve Analitik",
            description: "Satış raporları, müşteri istatistikleri ve performans takibi",
            duration: "22 dk",
            order: 8,
        },
        {
            id: createLessonId("GENEL", 8),
            title: "Sorun Çözme ve Eskalasyon",
            description: "Karşılaşılan problemlerin çözümü ve yöneticiye iletme",
            duration: "16 dk",
            order: 9,
        },
        {
            id: createLessonId("GENEL", 9),
            title: "Veri Güvenliği ve Gizlilik",
            description: "KVKK uyumu ve müşteri verilerinin korunması",
            duration: "14 dk",
            order: 10,
        },
        {
            id: createLessonId("GENEL", 10),
            title: "En İyi Uygulamalar ve İpuçları",
            description: "Deneyimli temsilcilerden öneriler ve pratik bilgiler",
            duration: "12 dk",
            order: 11,
        },
    ],
    "SATIŞ BİRİMİ": [
        {
            id: createLessonId("SATIŞ BİRİMİ", 0),
            title: "Güvence Paketleri - Temel Bilgiler",
            description: "Tam, mini ve süper güvence paketlerinin kapsamları ve müşteriye sunuş teknikleri.",
            duration: "20 dk",
            order: 1,
        },
        {
            id: createLessonId("SATIŞ BİRİMİ", 1),
            title: "Kampanya Akışı ve Yönetimi",
            description: "Mevsimsel kampanyalar, promosyon kodları ve özel fırsatların müşterilere aktarılması.",
            duration: "15 dk",
            order: 2,
        },
        {
            id: createLessonId("SATIŞ BİRİMİ", 2),
            title: "Şablon ve Hazır Cümle Kullanımı",
            description: "Etkili iletişim için hazır metinlerin kullanımı ve kişiselleştirme yöntemleri.",
            duration: "10 dk",
            order: 3,
        },
        {
            id: createLessonId("SATIŞ BİRİMİ", 3),
            title: "Rezervasyon Süreci",
            description: "Online ve telefon üzerinden rezervasyon oluşturma, güncelleme ve iptal işlemleri.",
            duration: "18 dk",
            order: 4,
        },
        {
            id: createLessonId("SATIŞ BİRİMİ", 4),
            title: "Müşteri İtiraz Yönetimi",
            description: "Şikayet ve itirazların profesyonel bir şekilde ele alınması ve çözüm yolları.",
            duration: "16 dk",
            order: 5,
        },
    ],
    "MÜŞTERİ HİZMETLERİ": [
        {
            id: createLessonId("MÜŞTERİ HİZMETLERİ", 0),
            title: "Ürün Segmentleri ve Araç Grupları",
            description: "Ekonomi, kompakt, orta ve büyük araç segmentleri, özellikleri ve farklılıkları.",
            duration: "18 dk",
            order: 1,
        },
        {
            id: createLessonId("MÜŞTERİ HİZMETLERİ", 1),
            title: "Kampanya ve Promosyonlar",
            description: "Ekonomik paketler, erken rezervasyon indirimleri ve sadakat programları.",
            duration: "14 dk",
            order: 2,
        },
        {
            id: createLessonId("MÜŞTERİ HİZMETLERİ", 2),
            title: "Müşteri Profilleme",
            description: "Müşteri kitlesinin özellikleri ve ihtiyaçlarına uygun hizmet sunumu.",
            duration: "16 dk",
            order: 3,
        },
        {
            id: createLessonId("MÜŞTERİ HİZMETLERİ", 3),
            title: "Şikayet Yönetimi",
            description: "Müşteri şikayetlerini profesyonel bir şekilde ele alma ve çözüm yolları.",
            duration: "12 dk",
            order: 4,
        },
    ],
    OFİS: [
        {
            id: createLessonId("OFİS", 0),
            title: "Araç Teslim Operasyonu",
            description: "Müşteriye araç teslimi sırasında izlenmesi gereken adımlar ve kontrol listeleri.",
            duration: "25 dk",
            order: 1,
        },
        {
            id: createLessonId("OFİS", 1),
            title: "İade ve Devir İşlemleri",
            description: "Araç iade sürecinde hasar tespiti, yakıt kontrolü ve devir işlemleri.",
            duration: "20 dk",
            order: 2,
        },
        {
            id: createLessonId("OFİS", 2),
            title: "Günlük Raporlama",
            description: "Ofis operasyonlarına dair günlük raporların hazırlanması ve sisteme girilmesi.",
            duration: "12 dk",
            order: 3,
        },
        {
            id: createLessonId("OFİS", 3),
            title: "Filo Yönetimi Temelleri",
            description: "Araç filosunun takibi, bakım planlaması ve envanter yönetimi.",
            duration: "18 dk",
            order: 4,
        },
        {
            id: createLessonId("OFİS", 4),
            title: "Acil Durum Protokolleri",
            description: "Kaza, arıza ve diğer beklenmedik durumlarda izlenecek prosedürler.",
            duration: "15 dk",
            order: 5,
        },
    ],
    İKAME: [
        {
            id: createLessonId("İKAME", 0),
            title: "İkame Araç Süreci - Başlangıç",
            description: "İkame araç taleplerinin alınması, değerlendirilmesi ve onay süreçleri.",
            duration: "30 dk",
            order: 1,
        },
        {
            id: createLessonId("İKAME", 1),
            title: "Müşteri İletişimi ve Script",
            description: "İkame araç müşterileri ile iletişimde kullanılacak standart metinler ve yaklaşımlar.",
            duration: "16 dk",
            order: 2,
        },
        {
            id: createLessonId("İKAME", 2),
            title: "Sigorta Koordinasyonu",
            description: "Sigorta şirketleri ile iletişim, evrak akışı ve ödeme süreçleri.",
            duration: "22 dk",
            order: 3,
        },
        {
            id: createLessonId("İKAME", 3),
            title: "Araç Atama ve Lojistik",
            description: "Uygun aracın belirlenmesi, müşteriye ulaştırılması ve teslimat süreci.",
            duration: "18 dk",
            order: 4,
        },
        {
            id: createLessonId("İKAME", 4),
            title: "Sorun Çözme ve Eskalasyon",
            description: "İkame sürecinde karşılaşılan sorunların çözümü ve üst birimlere iletilmesi.",
            duration: "14 dk",
            order: 5,
        },
    ],
    ADMIN: [
        {
            id: createLessonId("ADMIN", 0),
            title: "Kullanıcı Rolleri ve Yetki Yönetimi",
            description: "Temsilci, yönetici ve admin rollerinin tanımlanması ve yetki atamaları.",
            duration: "28 dk",
            order: 1,
        },
        {
            id: createLessonId("ADMIN", 1),
            title: "Şablon ve İçerik Yönetimi",
            description: "Hazır cümleler, email şablonları ve kampanya içeriklerinin oluşturulması ve güncellenmesi.",
            duration: "14 dk",
            order: 2,
        },
        {
            id: createLessonId("ADMIN", 2),
            title: "Kampanya Tanımlama",
            description: "Yeni kampanyaların sisteme eklenmesi, parametrelerinin belirlenmesi ve yayınlanması.",
            duration: "20 dk",
            order: 3,
        },
        {
            id: createLessonId("ADMIN", 3),
            title: "Raporlama ve Analitik",
            description: "İleri düzey raporlar, dashboard metrikleri ve performans analizleri.",
            duration: "26 dk",
            order: 4,
        },
        {
            id: createLessonId("ADMIN", 4),
            title: "Sistem Bakımı ve Güncelleme",
            description: "Veritabanı yönetimi, yedekleme, güncelleme ve sistem sağlığı kontrolü.",
            duration: "18 dk",
            order: 5,
        },
    ],
};

/**
 * Bir birimin tüm derslerini al
 */
export function getLessonsByUnit(unit: UnitKey): Lesson[] {
    return curriculum[unit] || [];
}

/**
 * Bir birimin toplam süresini hesapla (dakika cinsinden)
 */
export function getTotalDuration(unit: UnitKey): number {
    const lessons = curriculum[unit] || [];
    return lessons.reduce((total, lesson) => {
        const minutes = parseInt(lesson.duration.replace(" dk", "")) || 0;
        return total + minutes;
    }, 0);
}

/**
 * Tüm derslerin sayısını al
 */
export function getTotalLessons(unit: UnitKey): number {
    return (curriculum[unit] || []).length;
}

/**
 * ID'ye göre ders bul
 */
export function getLessonById(unit: UnitKey, lessonId: string): Lesson | undefined {
    return curriculum[unit]?.find(lesson => lesson.id === lessonId);
}

/**
 * Tüm birimlerin listesini al
 */
export function getAllUnits(): UnitKey[] {
    return Object.keys(curriculum) as UnitKey[];
}

/**
 * Bir birimin tamamlanma yüzdesini hesapla
 */
export function getCompletionPercentage(unit: UnitKey, completedLessonIds: string[]): number {
    const lessons = curriculum[unit] || [];
    if (lessons.length === 0) return 0;
    const completed = lessons.filter(lesson => completedLessonIds.includes(lesson.id)).length;
    return Math.round((completed / lessons.length) * 100);
}
