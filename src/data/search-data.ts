import type { LucideIcon } from "lucide-react";
import { FileText, Tag, Shield, Folder } from "lucide-react";

/**
 * Arama öğesi için tip tanımı
 */
export interface SearchItem {
    id: number;
    title: string;
    description: string;
    unit: string;
    category: string;
    categoryKey: string;
    date: string;
    views: number;
    icon: LucideIcon;
}

/**
 * Arama kategorisi için tip tanımı
 */
export interface SearchCategory {
    key: string;
    label: string;
    icon: LucideIcon;
}

/**
 * Arama kategorileri
 */
export const searchCategories: SearchCategory[] = [
    { key: "hazir-cumle", label: "Hazır Cümleler", icon: FileText },
    { key: "kampanya", label: "Kampanyalar", icon: Tag },
    { key: "guvence-paket", label: "Güvence Paketleri", icon: Shield },
    { key: "sablon", label: "Şablonlar", icon: Folder },
];

/**
 * Arama örnekleri - Header search dialog ve search results sayfasında kullanılır
 */
/**
 * Arama örnekleri - Header search dialog ve search results sayfasında kullanılır
 */
export const searchData: SearchItem[] = [
    {
        id: 1,
        title: "Yaz Kampanyası 2024 - %30 İndirim",
        description: "Tüm araç gruplarında geçerli özel yaz indirimi kampanyası detayları.",
        unit: "SATIŞ BİRİMİ",
        category: "Kampanya",
        categoryKey: "kampanya",
        date: "15 Kasım 2024",
        views: 1243,
        icon: Tag,
    },
    {
        id: 2,
        title: "Müşteri İletişim Şablonu - Teslim",
        description: "Araç teslim sürecinde kullanılacak hazır cümle şablonları.",
        unit: "SATIŞ BİRİMİ",
        category: "Hazır Cümle",
        categoryKey: "hazir-cumle",
        date: "10 Kasım 2024",
        views: 856,
        icon: FileText,
    },
    {
        id: 3,
        title: "Tam Güvence Paketi Detayları",
        description: "Tam güvence paketinin kapsamı ve fiyatlandırma bilgileri.",
        unit: "SATIŞ BİRİMİ",
        category: "Güvence Paketi",
        categoryKey: "guvence-paket",
        date: "8 Kasım 2024",
        views: 2105,
        icon: Shield,
    },
    {
        id: 4,
        title: "Email Şablonu - Fiyat Teklifi",
        description: "Müşteri fiyat taleplerine yanıt için profesyonel email şablonu.",
        unit: "MÜŞTERİ HİZMETLERİ",
        category: "Şablon",
        categoryKey: "sablon",
        date: "5 Kasım 2024",
        views: 634,
        icon: Folder,
    },
    {
        id: 5,
        title: "Kış Kampanyası - Erken Rezervasyon",
        description: "30 gün önceden yapılan rezervasyonlarda özel indirim fırsatı.",
        unit: "MÜŞTERİ HİZMETLERİ",
        category: "Kampanya",
        categoryKey: "kampanya",
        date: "1 Kasım 2024",
        views: 945,
        icon: Tag,
    },
    {
        id: 6,
        title: "Müşteri Şikayet Yanıt Şablonu",
        description: "Müşteri şikayetlerine profesyonel yanıt için hazır metin.",
        unit: "OPERASYON BİRİMİ",
        category: "Hazır Cümle",
        categoryKey: "hazir-cumle",
        date: "28 Ekim 2024",
        views: 723,
        icon: FileText,
    },
    {
        id: 7,
        title: "Mini Güvence Paketi",
        description: "Ekonomik koruma paketi detayları ve kapsam bilgileri.",
        unit: "MÜŞTERİ HİZMETLERİ",
        category: "Güvence Paketi",
        categoryKey: "guvence-paket",
        date: "25 Ekim 2024",
        views: 1456,
        icon: Shield,
    },
    {
        id: 8,
        title: "İkame Araç Talep Formu",
        description: "İkame araç talepleri için standart form şablonu.",
        unit: "İKAME HİZMETLERİ",
        category: "Şablon",
        categoryKey: "sablon",
        date: "20 Ekim 2024",
        views: 412,
        icon: Folder,
    },
    {
        id: 9,
        title: "Hafta Sonu Özel Fırsatı",
        description: "Cuma-Pazar arası kiralama yapan müşterilere özel kampanya.",
        unit: "SATIŞ BİRİMİ",
        category: "Kampanya",
        categoryKey: "kampanya",
        date: "18 Ekim 2024",
        views: 1879,
        icon: Tag,
    },
] as const;
