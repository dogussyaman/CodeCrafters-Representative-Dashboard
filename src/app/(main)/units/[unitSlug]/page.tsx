"use client";

import { usePathname } from "next/navigation";
import { COMPANY_CONFIG } from "@/config/company-config";
import { UnitPageCard } from "@/components/units/unit-page-card";
import {
    FileText,
    Shield,
    Tag,
    Calculator,
    Globe,
    UserCheck,
    Send,
    Building2,
    Users,
    Settings,
    BarChart,
    Phone,
    Truck,
    FileSpreadsheet,
    AlertCircle
} from "lucide-react";

// Map titles to icons and gradients since we can't easily put components in the config string arrays
// or we can assume standard mapping
const FEATURE_METADATA: Record<string, { icon: any; gradient: string; description: string }> = {
    "Hazır Cümleler": {
        icon: FileText,
        gradient: "from-blue-500/10 to-cyan-500/10",
        description: "Müşteri görüşmelerinde kullanabileceğiniz hazır cevaplar ve şablonlar.",
    },
    "Güvence Paketleri": {
        icon: Shield,
        gradient: "from-green-500/10 to-emerald-500/10",
        description: "Güvence paketleri hakkında detaylı bilgiler, fiyatlandırma ve kapsam bilgileri.",
    },
    "Kampanyalar": {
        icon: Tag,
        gradient: "from-orange-500/10 to-red-500/10",
        description: "Güncel kampanyalar, indirimler ve özel teklifler.",
    },
    "Fiyat Teklifi Hazırla": {
        icon: Calculator,
        gradient: "from-purple-500/10 to-pink-500/10",
        description: "Müşterileriniz için özelleştirilmiş fiyat teklifleri oluşturun.",
    },
    "Yurtdışı": {
        icon: Globe,
        gradient: "from-indigo-500/10 to-blue-500/10",
        description: "Yurtdışı araç kiralama işlemleri ve uluslararası rezervasyonlar.",
    },
    "Karşılama Portalı": {
        icon: UserCheck,
        gradient: "from-teal-500/10 to-cyan-500/10",
        description: "Havalimanı karşılama hizmetleri ve VIP müşteri karşılama.",
    },
    "Vip Talep Detayı Gönder": {
        icon: Send,
        gradient: "from-yellow-500/10 to-orange-500/10",
        description: "VIP müşteriler için özel talep ve detay gönderimi.",
    },
    "Kurumsal Yonlendirme": {
        icon: Building2,
        gradient: "from-gray-500/10 to-slate-500/10",
        description: "Kurumsal müşteri taleplerini ilgili departmana yönlendirin.",
    },
    "Genel": {
        icon: BarChart,
        gradient: "from-slate-500/10 to-zinc-500/10",
        description: "Genel bakış ve özet bilgiler.",
    },
    "Bölgeler ve Müdürler": {
        icon: Users,
        gradient: "from-blue-500/10 to-indigo-500/10",
        description: "Bölge müdürleri ve iletişim bilgileri."
    },
    "Read & ozbek": {
        icon: FileSpreadsheet,
        gradient: "from-green-500/10 to-teal-500/10",
        description: "Read & ozbek raporları ve dökümanları."
    },
    "İkame Script": {
        icon: FileText,
        gradient: "from-orange-500/10 to-red-500/10",
        description: "İkame araç süreçleri için konuşma metinleri."
    },
    "Portföy Danışmanları": {
        icon: Users,
        gradient: "from-purple-500/10 to-pink-500/10",
        description: "Portföy danışmanları listesi ve atamalar."
    },
    "Ofis Müdürleri": {
        icon: Users,
        gradient: "from-cyan-500/10 to-blue-500/10",
        description: "Ofis müdürleri iletişim ve yetki bilgileri."
    },
    "Zeplin Filosu": {
        icon: Truck,
        gradient: "from-yellow-500/10 to-amber-500/10",
        description: "Zeplin filo araçları ve durumları."
    },
    "Rep Fiyatları": {
        icon: Tag,
        gradient: "from-red-500/10 to-rose-500/10",
        description: "Rep fiyatlandırma tabloları."
    },
    "Talep Yönetimi": {
        icon: AlertCircle,
        gradient: "from-blue-500/10 to-cyan-500/10",
        description: "Müşteri talep ve şikayet yönetim paneli."
    },
    "Operasyon": {
        icon: Settings,
        gradient: "from-slate-500/10 to-gray-500/10",
        description: "Operasyonel süreçler ve iş akışları."
    },
    "Raporlar": {
        icon: FileSpreadsheet,
        gradient: "from-green-500/10 to-emerald-500/10",
        description: "Detaylı raporlar ve analizler."
    },
    "Ayarlar": {
        icon: Settings,
        gradient: "from-zinc-500/10 to-neutral-500/10",
        description: "Sistem ve birim ayarları."
    },
    "Vip Data": {
        icon: Users,
        gradient: "from-purple-500/10 to-violet-500/10",
        description: "VIP müşteri verileri ve yönetimi."
    },
    "AI Kullanım": {
        icon: BarChart, // Using BarChart as placeholder for Bot if not imported
        gradient: "from-emerald-500/10 to-green-500/10",
        description: "Yapay zeka asistanı kullanım istatistikleri."
    },
    "Temsilci Yönetimi": {
        icon: Users,
        gradient: "from-orange-500/10 to-amber-500/10",
        description: "Müşteri temsilcisi hesapları ve performans takibi."
    },
    "Operasyon & İçerik": {
        icon: FileText,
        gradient: "from-cyan-500/10 to-sky-500/10",
        description: "Operasyonel içerik ve doküman yönetimi."
    },
    "Güvenlik ve Erişim": {
        icon: Shield,
        gradient: "from-red-500/10 to-rose-500/10",
        description: "Güvenlik logları ve erişim yetkileri."
    },
    "Geri Bildirim": {
        icon: FileText,
        gradient: "from-yellow-500/10 to-orange-500/10",
        description: "Kullanıcı geri bildirimleri ve değerlendirmeler."
    },
    "Ticket Sistemi": {
        icon: AlertCircle,
        gradient: "from-blue-500/10 to-indigo-500/10",
        description: "Destek talepleri ve ticket yönetimi."
    },
    "Kullanıcılar": {
        icon: Users,
        gradient: "from-slate-500/10 to-zinc-500/10",
        description: "Tüm sistem kullanıcıları."
    },
    "Acil Vaka": {
        icon: Phone,
        gradient: "from-red-500/10 to-rose-500/10",
        description: "Acil durum bildirimleri ve vaka yönetimi."
    }
};


export default function UnitPage({ params }: { params: { unitSlug: string } }) {
    const unit = COMPANY_CONFIG.units.find((u) => u.slug === params.unitSlug);

    if (!unit) return null;

    // Filter out the "Genel" page itself from the cards list to avoid circular link?
    // Or keep it? Usually the dashboard shows *sub-pages*. 
    // The "Genel" page acts as the dashboard for that unit.
    // So we show OTHER features.

    const unitPages = unit.features
        .filter(f => f.title !== "Genel")
        .map(feature => {
            const metadata = FEATURE_METADATA[feature.title] || {
                icon: FileText,
                gradient: "from-gray-500/10 to-slate-500/10",
                description: feature.title
            };

            return {
                title: feature.title,
                description: metadata.description,
                href: feature.urlSuffix
                    ? `/units/${unit.slug}/${feature.urlSuffix}`
                    : `/units/${unit.slug}`,
                icon: metadata.icon,
                gradient: metadata.gradient
            };
        });

    return (
        <div className="container mx-auto space-y-8 p-6">
            {/* Header Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-3 bg-${unit.theme}-500/10`}>
                        <unit.icon className={`h-8 w-8 text-${unit.theme}-600 dark:text-${unit.theme}-400`} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{unit.name} Genel Bakış</h1>
                        <p className="text-muted-foreground">
                            {unit.name} operasyon ve yönetim paneli
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h2 className="mb-3 text-xl font-semibold">{unit.name} Hakkında</h2>
                    <div className="space-y-2 text-muted-foreground">
                        <p>
                            {unit.name}, müşterilere en iyi hizmeti sunmak için tasarlanmış kapsamlı bir birimdir.
                            Buradan ilgili operasyonel süreçleri yönetebilirsiniz.
                        </p>
                    </div>
                </div>
            </div>

            {/* Pages Grid */}
            <div>
                <h2 className="mb-4 text-xl font-semibold">Modüller</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {unitPages.map((page) => (
                        <UnitPageCard key={page.href} {...page} />
                    ))}
                </div>
            </div>
        </div>
    );
}
