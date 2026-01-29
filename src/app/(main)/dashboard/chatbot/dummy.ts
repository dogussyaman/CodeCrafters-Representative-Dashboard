/**
 * Chatbot için birleştirilmiş dummy veriler
 * Tüm sayfalarda kullanılan veriler buradan dışa aktarılır.
 */

// Typewriter phrases
export { typewriterPhrases } from "../default/_data/typewriter-phrases";

// Curriculum data
export { curriculum, type Lesson as CurriculumLesson, getLessonsByUnit, getTotalDuration, getTotalLessons } from "../education/_data/curriculum";

// Training stats
export { trainingStats, trainingTips, OVERALL_PROGRESS, type TrainingStat } from "../education/_data/training-stats";

// Notifications
export { initialNotifications, type Notification as AppNotification } from "../notifications/_data/initial-notifications";

// Action items (OD Talep)
export { actionItems, type ActionItem } from "../od-talep/_data/action-items";

// Lesson content data
export { lessonsData, type Lesson as ContentLesson, getLessonById, getAdjacentLessons } from "../education/lesson/[lessonId]/lesson-data";

// Units data (Satış Birimi, Müşteri Hizmetleri, İkame, Help)
export {
    salesWarrantyPackages,
    salesCategories,
    customerServiceWarrantyPackages,
    customerServiceCategories,
    regionalManagers,
    officeManagers,
    helpSupportInfo,
    faqData
} from "./units-data";

// Destek biletleri eğitim verisi (support_tickets - MT iş akışı)
export const supportTicketsTraining = {
  ticketTypes: [
    { id: "login_error", label: "Giriş hatası", description: "Giriş, şifre veya hesap erişim sorunları. Kullanıcı giriş yapamıyorsa bu tip seçilir." },
    { id: "feedback", label: "Geri bildirim", description: "Öneri, şikayet veya memnuniyet bildirimi. Genel geri bildirimler için." },
    { id: "technical", label: "Teknik", description: "Teknik hata, performans veya entegrasyon sorunları. Yazılım/sistem hataları için." },
    { id: "other", label: "Diğer", description: "Yukarıdaki kategorilere girmeyen tüm talepler." },
  ],
  statuses: [
    { id: "open", label: "Açık", description: "Henüz ele alınmadı. Yeni gelen biletler bu durumda başlar." },
    { id: "in_progress", label: "İşlemde", description: "MT tarafından işleniyor. Bileti üstlendiğinizde bu duruma alın." },
    { id: "resolved", label: "Çözüldü", description: "Çözüm uygulandı. Çözüm notu (resolution_no) yazıp bu duruma geçin." },
    { id: "closed", label: "Kapatıldı", description: "Talep kapatıldı. Artık işlem yapılmayacak biletler için." },
  ],
  priorities: [
    { id: "low", label: "Düşük" },
    { id: "medium", label: "Orta" },
    { id: "high", label: "Yüksek" },
    { id: "urgent", label: "Acil" },
  ],
  mtSteps: [
    { step: 1, title: "Biletleri listele", description: "Destek Biletleri sayfasında tüm biletleri görüntüle. Durum, öncelik ve tip ile filtrele." },
    { step: 2, title: "Detayı incele", description: "Bilete tıklayarak konu, açıklama, ekler (attachment_urls) ve iletişim bilgilerini oku." },
    { step: 3, title: "Atama yap", description: "Bileti kendine veya başka bir MT/admin'e ata (assigned_to alanı)." },
    { step: 4, title: "Durum güncelle", description: "Akış: Açık → İşlemde → Çözüldü → Kapatıldı. Bileti üstlendiğinizde İşlemde yapın." },
    { step: 5, title: "Çözüm notu yaz", description: "Çözüldü veya Kapatıldı biletlerde resolution_no ve gerekirse açıklama ekleyin." },
  ],
  helpLinks: {
    destekBiletleri: "/dashboard/destek-biletleri",
    panel: "/dashboard",
    yardim: "/dashboard/help",
  },
};

// Import data for system prompt
import { typewriterPhrases as phrases } from "../default/_data/typewriter-phrases";
import { curriculum as curriculumData } from "../education/_data/curriculum";
import { trainingStats as statsData } from "../education/_data/training-stats";
import { initialNotifications as notificationsData } from "../notifications/_data/initial-notifications";
import { actionItems as actionsData } from "../od-talep/_data/action-items";
import { lessonsData as lessons } from "../education/lesson/[lessonId]/lesson-data";
import {
    salesWarrantyPackages,
    salesCategories,
    customerServiceWarrantyPackages,
    customerServiceCategories,
    regionalManagers,
    officeManagers,
    helpSupportInfo,
    faqData
} from "./units-data";

export const systemPrompt = `Sen CodeCrafters MT Asistanı'sın. Müşteri temsilcilerine (MT) destek biletleri ve iş akışı konusunda yetenekli, profesyonel ve dostça yardımcı ol.
Cevap verirken emoji kullan.

ÖNEMLİ KURALLAR:
- Maddeli listeler oluştururken ASLA "*" işaretini kullanma
- Bunun yerine "-" işareti veya numaralandırma (1., 2., 3. vb.) kullan
- Her maddeyi yeni satırda yaz
- Cevapları düzenli ve okunabilir şekilde formatla

ÖNCELİKLİ VERİ - Destek Biletleri Eğitimi (support_tickets):
${JSON.stringify(supportTicketsTraining)}

Destek biletleri ile ilgili sorularda YUKARIDAKI supportTicketsTraining verisini kullan. Bilet tipleri, durumlar, öncelikler ve MT adımlarını açıkla. Panel ve Destek Biletleri sayfasına yönlendir (/dashboard, /dashboard/destek-biletleri).

Diğer veriler (sadece ilgili sorularda kullan):
1. Typewriter Phrases: ${JSON.stringify(phrases)}
2. Müfredat: ${JSON.stringify(curriculumData)}
3. Eğitim İstatistikleri: ${JSON.stringify(statsData)}
4. Bildirimler: ${JSON.stringify(notificationsData)}
5. Aksiyonlar (OD Talep): ${JSON.stringify(actionsData)}
6. Ders İçerikleri: ${JSON.stringify(lessons)}
7. Satış Birimi Güvence Paketleri: ${JSON.stringify(salesWarrantyPackages)}
8. Satış Birimi Kategoriler: ${JSON.stringify(salesCategories)}
9. Müşteri Hizmetleri Güvence Paketleri: ${JSON.stringify(customerServiceWarrantyPackages)}
10. Müşteri Hizmetleri Kategoriler: ${JSON.stringify(customerServiceCategories)}
11. Bölge Müdürleri (İKAME): ${JSON.stringify(regionalManagers)}
12. Ofis Müdürleri (İKAME): ${JSON.stringify(officeManagers)}
13. Yardım ve Destek Bilgileri: ${JSON.stringify(helpSupportInfo)}
14. Sık Sorulan Sorular: ${JSON.stringify(faqData)}

ÖZELLİKLER:
- Destek biletleri, bilet tipleri, durum güncelleme, çözüm notu, atama gibi MT iş akışı sorularında supportTicketsTraining ile detaylı cevap ver
- Eğer kullanıcı "bunu kurumsal bir dilde tekrar yaz" derse, metni profesyonel ve kurumsal dille yeniden yaz
- Yardım ve destek kanalları hakkında bilgi ver
- Bu veriler dışındaki sorulara "Ben sadece sistemimdeki verilere göre cevap verebiliyorum. 📊" şeklinde cevap ver
- Her zaman yardımsever ve profesyonel ol`;