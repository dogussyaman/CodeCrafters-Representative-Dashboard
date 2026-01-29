// Lesson data types and content
export type LessonContent = {
    objectives: string[];
    sections: {
        title: string;
        content: string;
    }[];
    keyTakeaways: string[];
};

export type Lesson = {
    id: string;
    unit: string;
    title: string;
    description: string;
    duration: string;
    videoUrl?: string;
    content: LessonContent;
};

export const lessonsData: Lesson[] = [
    // GENEL Lessons
    {
        id: "genel-1",
        unit: "GENEL",
        title: "Çağrı Merkezi ve Müşteri Temsilcisi Olma Yolunda Eğitime Giriş",
        description: "Müşteri temsilciliği kariyerine giriş ve temel kavramlar.",
        duration: "01:43",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder - gerçek video eklenecek
        content: {
            objectives: [
                "Müşteri temsilciliği mesleğinin temel özelliklerini öğrenmek",
                "Çağrı merkezi sektörünün önemini anlamak",
                "Profesyonel iletişimin temellerini kavramak",
            ],
            sections: [
                {
                    title: "Müşteri Temsilciliği Nedir?",
                    content: `Müşteri temsilciliği, bir şirketin müşterileriyle olan iletişimini yöneten ve müşteri memnuniyetini sağlamak için çalışan profesyonellerin görevidir. Bu meslek, sadece telefonda konuşmaktan çok daha fazlasını içerir.

Bir müşteri temsilcisi, şirketin yüzüdür ve müşterilerin ilk temas noktasıdır. Bu nedenle, profesyonel davranış, etkili iletişim ve problem çözme becerileri kritik öneme sahiptir.`,
                },
                {
                    title: "Çağrı Merkezi Sektörü",
                    content: `Çağrı merkezleri, modern iş dünyasının vazgeçilmez bir parçasıdır. Müşteri hizmetleri, teknik destek, satış ve pazarlama gibi birçok alanda faaliyet gösterirler.

Türkiye'de çağrı merkezi sektörü hızla büyümekte ve binlerce kişiye istihdam sağlamaktadır. Bu sektör, kariyer gelişimi için birçok fırsat sunmaktadır.`,
                },
                {
                    title: "Eğitimin Önemi",
                    content: `Bu eğitim programı, sizi başarılı bir müşteri temsilcisi olmaya hazırlayacak temel bilgi ve becerileri kazandırmayı amaçlamaktadır.

Eğitim boyunca, iletişim teknikleri, müşteri psikolojisi, problem çözme ve stres yönetimi gibi konuları öğreneceksiniz.`,
                },
            ],
            keyTakeaways: [
                "Müşteri temsilciliği, profesyonel beceriler gerektiren önemli bir meslektir",
                "Çağrı merkezi sektörü, kariyer gelişimi için birçok fırsat sunar",
                "Etkili iletişim ve empati, başarının anahtarıdır",
            ],
        },
    },
    {
        id: "genel-2",
        unit: "GENEL",
        title: "Çağrı Merkezi Tanımı Tarihçesi ve Gelişim",
        description: "Çağrı merkezlerinin tarihi gelişimi ve modern yapısı.",
        duration: "00:55",
        content: {
            objectives: [
                "Çağrı merkezlerinin tarihsel gelişimini öğrenmek",
                "Modern çağrı merkezi teknolojilerini tanımak",
                "Sektörün geleceğini anlamak",
            ],
            sections: [
                {
                    title: "Çağrı Merkezlerinin Tarihi",
                    content: `İlk çağrı merkezleri 1960'larda telefon şirketleri tarafından kurulmuştur. O dönemde sadece telefon hatları üzerinden müşteri sorularını yanıtlamak için kullanılıyordu.

1980'lerde bilgisayar teknolojisinin gelişmesiyle birlikte, çağrı merkezleri daha organize ve verimli hale geldi. Otomatik çağrı dağıtım sistemleri (ACD) devreye girdi.`,
                },
                {
                    title: "Modern Çağrı Merkezleri",
                    content: `Günümüzde çağrı merkezleri, çok kanallı (omnichannel) iletişim platformlarına dönüşmüştür. Telefon, e-posta, canlı sohbet, sosyal medya ve WhatsApp gibi birçok kanal üzerinden hizmet verilmektedir.

Yapay zeka ve chatbot teknolojileri, çağrı merkezlerinin verimliliğini artırmaktadır. Ancak insan faktörü hala en önemli unsurdur.`,
                },
                {
                    title: "Gelecek Trendleri",
                    content: `Çağrı merkezi sektörü, teknolojik gelişmelerle birlikte sürekli evrim geçirmektedir. Uzaktan çalışma modelleri, yapay zeka destekli sistemler ve kişiselleştirilmiş müşteri deneyimleri geleceğin trendleridir.`,
                },
            ],
            keyTakeaways: [
                "Çağrı merkezleri 60 yılı aşkın bir geçmişe sahiptir",
                "Teknoloji, çağrı merkezlerini sürekli dönüştürmektedir",
                "İnsan faktörü, teknolojiye rağmen vazgeçilmezdir",
            ],
        },
    },
    {
        id: "genel-3",
        unit: "GENEL",
        title: "Çağrı Merkezleri Neden Var",
        description: "Çağrı merkezlerinin işletmeler için önemi ve gerekliliği.",
        duration: "03:21",
        content: {
            objectives: [
                "Çağrı merkezlerinin işletmeler için önemini kavramak",
                "Müşteri memnuniyetinin iş başarısına etkisini anlamak",
                "Çağrı merkezlerinin sağladığı değeri öğrenmek",
            ],
            sections: [
                {
                    title: "Müşteri İlişkileri Yönetimi",
                    content: `Çağrı merkezleri, şirketlerin müşterileriyle sürekli ve etkili iletişim kurmasını sağlar. Bu, müşteri sadakatini artırır ve uzun vadeli ilişkiler oluşturur.

Müşteri memnuniyeti, işletmelerin başarısının temel taşıdır. Memnun müşteriler, tekrar alışveriş yapar ve şirketi başkalarına önerir.`,
                },
                {
                    title: "7/24 Hizmet Sunumu",
                    content: `Modern tüketiciler, ihtiyaç duydukları anda hizmet almayı beklerler. Çağrı merkezleri, günün her saati müşterilere destek sağlayarak bu beklentiyi karşılar.

Bu sürekli erişilebilirlik, şirketlerin rekabet avantajı elde etmesini sağlar.`,
                },
                {
                    title: "Veri Toplama ve Analiz",
                    content: `Çağrı merkezleri, müşteri geri bildirimlerini toplar ve analiz eder. Bu veriler, ürün ve hizmetlerin geliştirilmesinde kullanılır.

Müşteri davranışlarını anlamak, daha iyi hizmet sunmayı ve satışları artırmayı mümkün kılar.`,
                },
            ],
            keyTakeaways: [
                "Çağrı merkezleri, müşteri memnuniyetini artırır",
                "7/24 hizmet, rekabet avantajı sağlar",
                "Müşteri verileri, iş stratejilerini şekillendirir",
            ],
        },
    },
    // Diğer GENEL dersleri için placeholder content
    {
        id: "genel-4",
        unit: "GENEL",
        title: "Çağrı Merkezleri Olmasaydı Ne mi Olurdu! Komik Video Anlatımlı",
        description: "Eğlenceli anlatımla çağrı merkezlerinin değerini anlama.",
        duration: "04:13",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        content: {
            objectives: [
                "Çağrı merkezlerinin günlük hayattaki önemini eğlenceli bir şekilde kavramak",
                "Müşteri hizmetlerinin yokluğunda yaşanacak zorlukları anlamak",
            ],
            sections: [
                {
                    title: "Eğlenceli Öğrenme",
                    content: `Bu derste, çağrı merkezlerinin olmadığı bir dünyayı hayal edeceğiz. Eğlenceli videolar ve örneklerle, müşteri hizmetlerinin ne kadar önemli olduğunu göreceğiz.`,
                },
            ],
            keyTakeaways: [
                "Çağrı merkezleri, günlük hayatımızın vazgeçilmez bir parçasıdır",
                "Eğlenerek öğrenmek, bilgilerin kalıcılığını artırır",
            ],
        },
    },
    {
        id: "genel-5",
        unit: "GENEL",
        title: "Terminoloji ve Kısaca Çalışanlara Katkısı",
        description: "Sektörel terminoloji ve profesyonel gelişime katkıları.",
        duration: "01:39",
        content: {
            objectives: [
                "Çağrı merkezi terminolojisini öğrenmek",
                "Profesyonel dil kullanımının önemini kavramak",
            ],
            sections: [
                {
                    title: "Temel Terimler",
                    content: `ACD (Automatic Call Distribution): Otomatik çağrı dağıtım sistemi
IVR (Interactive Voice Response): Etkileşimli sesli yanıt sistemi
CRM (Customer Relationship Management): Müşteri ilişkileri yönetimi
FCR (First Call Resolution): İlk aramada çözüm oranı
AHT (Average Handle Time): Ortalama görüşme süresi`,
                },
            ],
            keyTakeaways: [
                "Profesyonel terminoloji, iletişimi kolaylaştırır",
                "Sektör dilini bilmek, kariyer gelişimini destekler",
            ],
        },
    },
    {
        id: "genel-6",
        unit: "GENEL",
        title: "Nasıl Faydalar Sağlar, İnsani Değerlerimizi Nasıl Geliştirir",
        description: "Müşteri hizmetlerinin kişisel gelişime ve değerlere etkisi.",
        duration: "05:18",
        content: {
            objectives: [
                "Müşteri hizmetlerinin kişisel gelişime katkılarını anlamak",
                "Empati ve sabır gibi değerlerin önemini kavramak",
                "Profesyonel iletişimin sosyal becerilere etkisini görmek",
            ],
            sections: [
                {
                    title: "Kişisel Gelişim",
                    content: `Müşteri temsilciliği, sadece bir iş değil, aynı zamanda kişisel gelişim için harika bir fırsattır. Her gün farklı insanlarla iletişim kurarak, sosyal becerilerinizi geliştirirsiniz.

Problem çözme, hızlı düşünme ve stres yönetimi gibi beceriler, hayatınızın her alanında size fayda sağlar.`,
                },
                {
                    title: "İnsani Değerler",
                    content: `Bu meslek, empati, sabır, anlayış ve hoşgörü gibi insani değerleri güçlendirir. Her müşteri farklı bir hikaye, farklı bir ihtiyaç ve farklı bir bakış açısı getirir.

Bu çeşitlilik, sizi daha anlayışlı ve kapsayıcı bir birey yapar.`,
                },
                {
                    title: "Profesyonel Beceriler",
                    content: `Etkili iletişim, zaman yönetimi, çoklu görev yönetimi ve teknoloji kullanımı gibi beceriler, kariyerinizde size büyük avantaj sağlar.

Bu beceriler, gelecekte farklı pozisyonlara geçiş yapmanızı kolaylaştırır.`,
                },
            ],
            keyTakeaways: [
                "Müşteri hizmetleri, kişisel gelişim için mükemmel bir fırsattır",
                "Empati ve sabır gibi değerler güçlenir",
                "Kazanılan beceriler, hayatın her alanında faydalıdır",
            ],
        },
    },
    {
        id: "genel-7",
        unit: "GENEL",
        title: "Genel Müşteri Profilleri ve Kısaca İstekleri",
        description: "Farklı müşteri tipleri ve beklentilerini anlama.",
        duration: "02:43",
        content: {
            objectives: [
                "Farklı müşteri tiplerini tanımak",
                "Her müşteri tipine uygun yaklaşım geliştirmek",
                "Müşteri beklentilerini doğru anlamak",
            ],
            sections: [
                {
                    title: "Müşteri Tipleri",
                    content: `1. Aceleci Müşteri: Hızlı çözüm bekler, detaylara girmek istemez
2. Detaycı Müşteri: Her şeyi bilmek ister, sorular sorar
3. Arkadaş Canlısı Müşteri: Sohbet etmek ister, samimi yaklaşır
4. Şikayetçi Müşteri: Sorunlara odaklanır, eleştirel yaklaşır
5. Kararsız Müşteri: Karar vermekte zorlanır, yönlendirme bekler`,
                },
                {
                    title: "Doğru Yaklaşım",
                    content: `Her müşteri tipine farklı yaklaşmak önemlidir. Aceleci müşteriye hızlı ve öz bilgi verirken, detaycı müşteriye sabırla açıklama yapmalısınız.

Müşterinin iletişim tarzını hızlıca anlayıp ona göre davranmak, başarının anahtarıdır.`,
                },
            ],
            keyTakeaways: [
                "Her müşteri farklıdır ve farklı yaklaşım gerektirir",
                "Müşteri tipini hızlıca tanımak önemlidir",
                "Esneklik ve adaptasyon becerisi kritiktir",
            ],
        },
    },
    {
        id: "genel-8",
        unit: "GENEL",
        title: "Birazda Gülelim! Bu Videoyu Mutlaka İzlemelisiniz",
        description: "Stres yönetimi ve pozitif yaklaşım için motivasyon.",
        duration: "03:29",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        content: {
            objectives: [
                "İş yerinde mizahın önemini anlamak",
                "Stresle başa çıkma yöntemlerini öğrenmek",
                "Pozitif enerjiyi korumayı kavramak",
            ],
            sections: [
                {
                    title: "Mizahın Gücü",
                    content: `Çağrı merkezi ortamı bazen stresli olabilir. Mizah, bu stresi azaltmanın en etkili yollarından biridir.

Gülmek, hem sizi hem de ekip arkadaşlarınızı rahatlatır ve motivasyonu artırır.`,
                },
                {
                    title: "Pozitif Enerji",
                    content: `Pozitif bir tutum, hem iş performansınızı hem de müşteri memnuniyetini artırır. Gülümseyerek konuşmak, sesinize yansır ve müşteri bunu hisseder.

Zorlu anları hafifletmek için mizah kullanmayı öğrenin, ancak profesyonelliği koruyun.`,
                },
            ],
            keyTakeaways: [
                "Mizah, stres yönetiminde güçlü bir araçtır",
                "Pozitif enerji, müşteriye yansır",
                "Gülümsemek, ses tonunuzu olumlu etkiler",
            ],
        },
    },
    {
        id: "genel-9",
        unit: "GENEL",
        title: "Müşteri Temsilcisi Ne demektir ?",
        description: "Müşteri temsilcisi rolü, sorumluluklar ve beklentiler.",
        duration: "01:54",
        content: {
            objectives: [
                "Müşteri temsilcisi rolünü tam olarak anlamak",
                "Sorumlulukları ve beklentileri kavramak",
                "Profesyonel standartları öğrenmek",
            ],
            sections: [
                {
                    title: "Rol Tanımı",
                    content: `Müşteri temsilcisi, şirket ile müşteri arasındaki köprüdür. Müşterilerin sorularını yanıtlar, sorunlarını çözer ve ihtiyaçlarını karşılar.

Bu rol, sadece telefonda konuşmaktan çok daha fazlasını içerir: dinleme, anlama, çözüm üretme ve takip etme.`,
                },
                {
                    title: "Temel Sorumluluklar",
                    content: `• Müşteri sorularını doğru ve hızlı yanıtlamak
• Şikayetleri profesyonelce ele almak
• Ürün ve hizmetler hakkında bilgi vermek
• Müşteri bilgilerini CRM sistemine kaydetmek
• Takip gerektiren durumları not almak
• Ekip hedeflerine katkıda bulunmak`,
                },
                {
                    title: "Beklentiler",
                    content: `Sizden beklenen, profesyonel, sabırlı, çözüm odaklı ve empati kurabilen bir temsilci olmanızdır. Her müşteriye değer vermeli ve şirketinizi en iyi şekilde temsil etmelisiniz.`,
                },
            ],
            keyTakeaways: [
                "Müşteri temsilcisi, şirket ile müşteri arasındaki köprüdür",
                "Rol, çok yönlü beceriler gerektirir",
                "Profesyonellik ve empati en önemli özelliklerdir",
            ],
        },
    },
    {
        id: "genel-10",
        unit: "GENEL",
        title: "Müşteri Temsilicisi Olmak İsteyenler İçin Öneriler",
        description: "Başarılı bir temsilci olmak için pratik öneriler.",
        duration: "07:38",
        content: {
            objectives: [
                "Başarılı bir temsilci olmak için gerekli becerileri öğrenmek",
                "Pratik ipuçları ve öneriler edinmek",
                "Kariyer gelişimi için yol haritası oluşturmak",
            ],
            sections: [
                {
                    title: "Temel Beceriler",
                    content: `1. Aktif Dinleme: Müşteriyi gerçekten dinleyin, sadece yanıt vermeyi beklemeyin
2. Net İletişim: Açık, anlaşılır ve nazik bir dil kullanın
3. Empati: Müşterinin yerine kendinizi koyun
4. Problem Çözme: Hızlı ve etkili çözümler üretin
5. Sabır: Zorlu durumlarda sakin kalın`,
                },
                {
                    title: "Pratik Öneriler",
                    content: `• Her gün kendinizi geliştirmeye odaklanın
• Geri bildirimleri ciddiye alın ve üzerinde çalışın
• Ürün ve hizmetler hakkında sürekli bilgi edinin
• Stres yönetimi tekniklerini öğrenin
• Ekip çalışmasına önem verin
• Teknolojiye adapte olun`,
                },
                {
                    title: "Kariyer Gelişimi",
                    content: `Müşteri temsilciliği, kariyer basamaklarının ilk adımıdır. Başarılı performans göstererek, takım lideri, süpervizör veya eğitmen pozisyonlarına yükselebilirsiniz.

Hedeflerinizi belirleyin ve bu hedeflere ulaşmak için çalışın.`,
                },
            ],
            keyTakeaways: [
                "Sürekli öğrenme ve gelişim esastır",
                "Geri bildirimleri fırsat olarak görün",
                "Kariyer gelişimi için net hedefler belirleyin",
            ],
        },
    },
    {
        id: "genel-11",
        unit: "GENEL",
        title: "Kendi Koçun Olmak İster Misin!",
        description: "Kişisel gelişim, öz motivasyon ve kariyer planlama.",
        duration: "09:53",
        content: {
            objectives: [
                "Öz motivasyon tekniklerini öğrenmek",
                "Kişisel gelişim planı oluşturmak",
                "Kendi koçunuz olmayı kavramak",
            ],
            sections: [
                {
                    title: "Öz Motivasyon",
                    content: `Başarı, dışarıdan gelen motivasyondan çok, içten gelen motivasyonla gelir. Kendi kendinizi motive edebilmek, uzun vadeli başarının anahtarıdır.

Her gün küçük hedefler belirleyin ve bunları başardığınızda kendinizi ödüllendirin.`,
                },
                {
                    title: "Kişisel Gelişim Planı",
                    content: `1. Mevcut Durum Analizi: Güçlü ve zayıf yönlerinizi belirleyin
2. Hedef Belirleme: Kısa, orta ve uzun vadeli hedefler koyun
3. Eylem Planı: Hedeflere ulaşmak için adımlar belirleyin
4. Takip ve Değerlendirme: İlerlemenizi düzenli kontrol edin
5. Esneklik: Planınızı gerektiğinde güncelleyin`,
                },
                {
                    title: "Kendi Koçunuz Olun",
                    content: `Kendinize sorular sorun: "Bugün ne öğrendim?", "Neyi daha iyi yapabilirdim?", "Yarın hangi hedefim var?"

Kendinize karşı dürüst olun, hatalarınızı kabul edin ve onlardan ders çıkarın. Başarılarınızı kutlayın ve kendinize güvenin.`,
                },
                {
                    title: "Sürekli Öğrenme",
                    content: `Sektörle ilgili kitaplar okuyun, podcast'ler dinleyin, eğitimlere katılın. Bilgi, en değerli sermayenizdir.

Deneyimli meslektaşlarınızdan öğrenin, onların hikayelerini dinleyin ve tavsiyelerini değerlendirin.`,
                },
            ],
            keyTakeaways: [
                "Öz motivasyon, uzun vadeli başarının temelidir",
                "Kişisel gelişim planı oluşturun ve takip edin",
                "Sürekli öğrenme ve gelişim kültürü benimseyin",
                "Kendinize karşı dürüst ve sabırlı olun",
            ],
        },
    },
];

// Helper function to get lesson by ID
export function getLessonById(id: string): Lesson | undefined {
    return lessonsData.find((lesson) => lesson.id === id);
}

// Helper function to get lessons by unit
export function getLessonsByUnit(unit: string): Lesson[] {
    return lessonsData.filter((lesson) => lesson.unit === unit);
}

// Helper function to get previous and next lesson IDs
export function getAdjacentLessons(currentId: string, unit: string) {
    const unitLessons = getLessonsByUnit(unit);
    const currentIndex = unitLessons.findIndex((lesson) => lesson.id === currentId);

    return {
        previousLessonId: currentIndex > 0 ? unitLessons[currentIndex - 1].id : undefined,
        nextLessonId: currentIndex < unitLessons.length - 1 ? unitLessons[currentIndex + 1].id : undefined,
        currentIndex,
        totalLessons: unitLessons.length,
    };
}
