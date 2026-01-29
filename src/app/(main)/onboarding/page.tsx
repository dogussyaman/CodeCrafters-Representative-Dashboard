"use client"

import { useState } from "react"
import { Sparkles, MessageSquareText, Zap, Users, BarChart3, ShieldCheck, Globe, Layers, Lock, MonitorSmartphone, BrainCircuit, Rocket } from "lucide-react"
import { OnboardingStep } from "@/components/onboarding/types/onboarding"
import { Onboarding } from "@/components/onboarding/onboarding"
import { useRouter } from "next/navigation"

const onboardingSteps: OnboardingStep[] = [
    {
        title: "CodeCrafters MT: Akıllı Çalışma Asistanı",
        description: "CodeCrafters MT, müşteri temsilcilerinin verimliliğini artırmak için tasarlanmış bir akıllı çalışma asistanıdır. Süreçleri optimize ederek zaman yönetimini geliştirmeyi hedefler ve günlük iş akışlarınızı kolaylaştırarak daha fazla müşteriye hizmet etmenizi sağlar. Satış Birimi, Müşteri Hizmetleri, İkame Hizmetleri ve diğer tüm birimlerin operasyonlarını tek bir merkezden yönetmenize olanak tanır. Modern arayüzü ve yapay zeka desteği ile iş akışınızı güçlendirir.",
        icon: Rocket,
        image: "/onboarding/slide1.png",
        features: ["7 Farklı Birim Yönetimi", "Tek Panelden Tüm Operasyonlar", "Yapay Zeka Destekli Asistan", "Hazır Cümleler ve Şablonlar"],
    },
    {
        title: "Temel Özellikler",
        description: "Operasyon verilerini analiz eden yapay zeka, otomatik süreç yönetimi ve kişiselleştirilmiş önerilerle tam kapsamlı destek sunar. Sistem, gerçek zamanlı veri işleme ve akıllı karar destek mekanizmaları ile çalışırken, kullanıcı deneyimini ön planda tutar. Kampanya yönetimi, yurtdışı işlemleri ve karşılama portalı gibi birim bazlı özel modüller ile her ihtiyaca uygun çözümler sunar.",
        icon: BrainCircuit,
        image: "/onboarding/slide2.png",
        features: ["CodeCrafters AI Asistanı", "Birim Bazlı Hazır Cümleler", "Güvence Paketleri Yönetimi", "Fiyat Teklifi Hazırlama"],
    },
    {
        title: "Neden CodeCrafters MT?",
        description: "Müşteri temsilcileri karmaşık sistemler arasında kaybolurken, hem verimlilik hem de müşteri memnuniyeti düşüyor. CodeCrafters MT, bu sorunu tek bir akıllı arayüzle çözüyor ve tüm ihtiyaçlarınızı merkezi bir platformda birleştirerek iş süreçlerinizi hızlandırıyor. Kurumsal yönlendirme, VIP talep yönetimi ve ikame operasyonları gibi özel süreçler için hazırlanmış modüller ile iş akışınızı optimize eder.",
        icon: Layers,
        image: "/onboarding/slide3.png",
        features: ["Kampanya Yönetimi", "Genel Arama Özelliği", "Eğitim Modülleri", "Yardım ve Destek Sistemi"],
    },
    {
        title: "CodeCrafters MT'nin Faydaları",
        description: "Müşteri temsilcileri zaman kaybından kurtarırken, hem verimlilik hem de müşteri memnuniyeti artar. Operasyonel verimlilik ve tutarlılığı standart süreçlerle sürekli hale getirir. Ayrıca, merkezi veri yapısı sayesinde bilgiye hızlı erişim sağlanır ve karar alma süreçleri hızlanır. Her birim için özel raporlama ve operasyon takip sistemleri ile detaylı analiz ve performans değerlendirmesi yapabilirsiniz.",
        icon: Sparkles,
        image: "/onboarding/slide4.png",
        features: ["Şablonlar ile Hızlı İçerik", "Geri Bildirim Sistemi", "Ticket ve Talep Yönetimi", "Performans Takip Raporları"],
    },
    {
        title: "Nasıl Çalışır?",
        description: "Müşteri temsilcilerine etkili destek sağlayarak iş akışlarını optimize eder. Kullanıcı dostu arayüz ile soruları hızlıca yanıtlayın ve akıllı chatbot özelliği sayesinde anında yardım alın. Sistem, öğrenme algoritmaları ile kullanım alışkanlıklarınızı analiz ederek size özel çözümler sunar. Metin editörü ve şablon sistemi ile profesyonel içerikler oluşturabilir, bildirimler ile önemli güncellemelerden anında haberdar olabilirsiniz.",
        icon: Zap,
        image: "/onboarding/slide5.png",
        features: ["Birimler Arası Geçiş", "Hazır Cümleler ile Hızlı Yanıt", "Asistan ile Anında Yardım", "OD Talep ve İşlem Takibi"],
    },
    {
        title: "Güvenlik Altyapısı",
        description: "KVKK uyumlu, güvenli ve modern altyapı ile verileriniz her zaman güvende. Giriş yaparken OTP doğrulama ile güvenliği sağlar ve tüm veri transferleri şifrelenmiş kanallar üzerinden gerçekleşir. Düzenli güvenlik güncellemeleri ve izleme sistemleri ile sisteminiz sürekli korunur. Rol bazlı erişim kontrolü ve kullanıcı yetkilendirme sistemi ile her kullanıcı sadece yetkili olduğu alanlara erişebilir.",
        icon: Lock,
        image: "/onboarding/slide6.png",
        features: ["KVKK Uyumlu Altyapı", "OTP Doğrulama Sistemi", "Şifrelenmiş Veri Transferi", "Güvenlik İzleme ve Raporlama"],
    },
    {
        title: "Yatırım ve Verimlilik",
        description: "Barındırma için 15-20 bin TL yatırım yapılır. Yapay zeka entegrasyonu dış kaynaklardan alınırsa 25-30 bin TL yatırım yapılır. Kullanım arttıkça maliyet düşer, verim artar ve yatırım geri dönüş süresi kısalır. Ayrıca yapay zeka entegrasyonu ile hataları önlemek ve operasyonel maliyetleri azaltmak için kullanılır. Otomatik süreç yönetimi ve merkezi veri yapısı sayesinde operasyonel maliyetlerde önemli azalmalar sağlanır ve ROI değeri hızla artar.",
        icon: BarChart3,
        image: "/onboarding/slide7.png",
        features: ["%35 İş yükü azalımı", "%25 Çağrı süresi kısalması", "Hızlı geri dönüş", "Hataları önleme"],
    },
    {
        title: "Ekip ve Süreç Dağılımı",
        description: "Projede yer alan ekip arkadaşlarımız ile ilgili birimlerin işlerini kolaylaştıracak ve çalışanlarında onlara destek olacak bir yapı kurulmuştur. Multidisipliner ekip yaklaşımı ile farklı uzmanlık alanlarından deneyimler bir araya getirilerek kapsamlı çözümler geliştirilir. Admin paneli üzerinden temsilci performans takibi, operasyon içerik yönetimi ile kapsamlı yönetim imkanı sunar.",
        icon: Users,
        image: "/onboarding/slide8.jpg",
        features: ["120+ Temsilci Desteği", "Admin Yönetim Paneli", "Acil Vaka Bildirimleri", "Kullanıcı Yönetimi ve Raporlama"],
    },
    {
        title: "Başarıya Ulaşın",
        description: "Sürekli öğrenme ve anlık yardım sağlayan akıllı asistan ile performansınızı ve memnuniyetinizi artırın. Sistem, kullanım verilerinizi analiz ederek size özel öneriler sunar ve gelişim alanlarınızı belirler. 7/24 erişilebilir dijital destek ile ihtiyaç duyduğunuz her an yanınızda. Profil yönetimi, bildirim sistemi ve kişiselleştirilmiş dashboard ile kendi çalışma alanınızı oluşturabilir ve verimliliğinizi maksimize edebilirsiniz.",
        icon: ShieldCheck,
        image: "/onboarding/slide10.png",
        quote: "Başarı, hazırlık ve fırsatın buluştuğu noktadır. CodeCrafters MT ile her ikisi de yanınızda.",
        features: ["Birim Bazlı Eğitim İçerikleri", "Kurumsal Satış Performans Takibi", "Operasyon Raporları", "AI Kullanım İstatistikleri"],
    },
];

export default function page() {
    const [currentStep, setCurrentStep] = useState(0)
    const router = useRouter()

    const handleComplete = () => {
        router.push("/dashboard/default")
    }

    const handleSkip = () => {
        router.push("/dashboard/default")
    }

    return (
        <Onboarding
            steps={onboardingSteps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onComplete={handleComplete}
            onSkip={handleSkip}
        />
    )
}
