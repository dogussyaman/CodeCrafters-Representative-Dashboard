import { Car, Database, Book, HelpCircle, Search, MessageSquare, FileText, Bell, type LucideIcon } from "lucide-react";

export type UnitTheme = "red" | "orange" | "slate" | "blue" | "gray" | "zinc" | "green";

export interface UnitFeature {
    title: string;
    urlSuffix: string; // e.g., "genel", "hazir-cumleler"
    isNew?: boolean;
}

export interface UnitConfig {
    id: string;
    slug: string; // Used in URL: /units/[slug]
    name: string; // Display name
    theme: UnitTheme;
    icon: LucideIcon;
    features: UnitFeature[];
}

export const COMPANY_CONFIG = {
    name: "Araç Kiralama A.Ş.",
    units: [
        {
            id: "unit-a",
            slug: "birim-a",
            name: "SATIŞ BİRİMİ",
            theme: "red",
            icon: Car,
            features: [
                { title: "Genel", urlSuffix: "genel" },
                { title: "Hazır Cümleler", urlSuffix: "hazir-cumleler" },
                { title: "Güvence Paketleri", urlSuffix: "guvence-paketleri" },
                { title: "Kampanyalar", urlSuffix: "kampanyalar" },
                { title: "Fiyat Teklifi Hazırla", urlSuffix: "fiyat-teklifi-hazirla" },
                { title: "Rezervasyon Yönetimi", urlSuffix: "rezervasyon-yonetimi" },
            ],
        },
        {
            id: "unit-b",
            slug: "birim-b",
            name: "MÜŞTERİ HİZMETLERİ",
            theme: "orange",
            icon: Car,
            features: [
                { title: "Genel", urlSuffix: "genel" },
                { title: "Hazır Cümleler", urlSuffix: "hazir-cumleler" },
                { title: "Güvence Paketleri", urlSuffix: "guvence-paketleri" },
                { title: "Kampanyalar", urlSuffix: "kampanyalar" },
                { title: "Fiyat Teklifi Hazırla", urlSuffix: "fiyat-teklifi-hazirla" },
                { title: "Müşteri Talepleri", urlSuffix: "musteri-talepleri" },
                { title: "Şikayet Yönetimi", urlSuffix: "sikayet-yonetimi" },
            ],
        },
        {
            id: "unit-c",
            slug: "birim-c",
            name: "OPERASYON BİRİMİ",
            theme: "slate",
            icon: Car,
            features: [
                { title: "Genel", urlSuffix: "genel" },
                { title: "Hazır Cümleler", urlSuffix: "hazir-cumleler" },
            ],
        },
        {
            id: "unit-d",
            slug: "birim-d",
            name: "İKAME HİZMETLERİ",
            theme: "blue",
            icon: Car,
            features: [
                { title: "Genel", urlSuffix: "genel" },
                { title: "Hazır Cümleler", urlSuffix: "hazir-cumleler" },
                { title: "İkame Talepleri", urlSuffix: "ikame-talepleri" },
                { title: "Bölgeler ve Müdürler", urlSuffix: "bolgeler-ve-mudurler" },
                { title: "Portföy Danışmanları", urlSuffix: "portfoy-danismanlari" },
                { title: "Ofis Müdürleri", urlSuffix: "ofis-mudurleri" },
            ],
        },
        {
            id: "unit-e",
            slug: "birim-e",
            name: "KURUMSAL SATIŞ",
            theme: "gray",
            icon: Car,
            features: [
                { title: "Genel", urlSuffix: "genel" },
                { title: "Hazır Cümleler", urlSuffix: "hazir-cumleler" },
                { title: "Talep Yönetimi", urlSuffix: "" }, // root of sub-feature
                { title: "Operasyon", urlSuffix: "operasyon" },
                { title: "Raporlar", urlSuffix: "raporlar" },
                { title: "Ayarlar", urlSuffix: "ayarlar" },
            ],
        },
        {
            id: "unit-f",
            slug: "birim-f",
            name: "FİLO YÖNETİMİ",
            theme: "zinc",
            icon: Car,
            features: [
                { title: "Genel", urlSuffix: "genel" },
                { title: "Hazır Cümleler", urlSuffix: "hazir-cumleler" },
                { title: "Operasyon", urlSuffix: "operasyon" },
                { title: "Raporlar", urlSuffix: "raporlar" },
                { title: "Ayarlar", urlSuffix: "ayarlar" },
            ],
        },
        {
            id: "admin",
            slug: "admin",
            name: "ADMIN",
            theme: "green",
            icon: Car,
            features: [
                { title: "Genel", urlSuffix: "genel" },
                { title: "Vip Data", urlSuffix: "vip" },
                { title: "AI Kullanım", urlSuffix: "ai-kullanim" },
                { title: "Temsilci Yönetimi", urlSuffix: "temsilci-yonetimi" },
                { title: "Operasyon & İçerik", urlSuffix: "operasyon-icerik" },
                { title: "Güvenlik ve Erişim", urlSuffix: "guvenlik-erisim" },
                { title: "Geri Bildirim", urlSuffix: "geri-bildirim" },
                { title: "Ticket Sistemi", urlSuffix: "ticket-sistemi" },
                { title: "Kullanıcılar", urlSuffix: "kullanicilar" },
                { title: "Acil Vaka", urlSuffix: "vaka-bildirimleri" },
            ],
        },
    ] as UnitConfig[],
};
