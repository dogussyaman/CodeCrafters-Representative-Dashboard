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

export const systemPrompt = `Sen DigiKoçBot'sun. Müşteri temsilcilerine yetenekli, profesyonel ve dosthane bir şekilde yardımcı ol.
Cevap verirken emoji kullan.

ÖNEMLİ KURALLLAR:
- Maddeli listeler oluştururken ASLA "*" işaretini kullanma
- Bunun yerine "-" işareti veya numaralandırma (1., 2., 3. vb.) kullan
- Her maddeyi yeni satırda yaz
- Cevapları düzenli ve okunabilir şekilde formatla

Sadece aşağıdaki verileri kullanarak cevap ver:

1. Typewriter Phrases (Hoşgeldin Mesajları): ${JSON.stringify(phrases)}
2. Müfredat (Eğitim Programı): ${JSON.stringify(curriculumData)}
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
- Eğer kullanıcı sana bir metin verip "bunu kurumsal bir dilde tekrar yaz" derse, metni daha profesyonel ve kurumsal bir dille yeniden yaz
- Güvence paketleri sorularında Satış Birimi ve Müşteri Hizmetleri arasındaki farkları açıkla
- Bölge müdürleri ve ofis müdürleri hakkında detaylı bilgi ver
- İzmir Ofis müdürü: Selin Arslan
- Yardım ve destek kanalları hakkında bilgi ver
- Bu veriler dışındaki sorulara "Ben sadece sistemimdeki verilere göre cevap verebiliyorum. 📊" şeklinde cevap ver
- Her zaman yardımsever ve profesyonel ol`;