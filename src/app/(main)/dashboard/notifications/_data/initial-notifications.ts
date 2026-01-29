/**
 * Bildirim için tip tanımı - Notifications sayfası ile uyumlu
 */
export interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: "bilgi" | "uyari" | "gorev";
    unread: boolean;
    archived: boolean;
    favorite: boolean;
    pinned: boolean;
}

/**
 * İlk açılışta gösterilen örnek bildirimler
 */
export const initialNotifications: Notification[] = [
    {
        id: "1",
        title: "Yeni Müşteri Talebi",
        message: "Satış Birimi için yeni talep oluşturuldu.",
        time: "5 dk önce",
        type: "gorev",
        unread: true,
        archived: false,
        favorite: false,
        pinned: true,
    },
    {
        id: "2",
        title: "Kampanya Güncellemesi",
        message: "Müşteri Hizmetleri kampanyasında yeni indirim oranı tanımlandı.",
        time: "1 saat önce",
        type: "bilgi",
        unread: true,
        archived: false,
        favorite: true,
        pinned: false,
    },
    {
        id: "3",
        title: "İkame Aracı Teslimi",
        message: "İkame araç teslimi bugün 16:30'da planlandı.",
        time: "Dün",
        type: "uyari",
        unread: false,
        archived: false,
        favorite: false,
        pinned: false,
    },
    {
        id: "4",
        title: "Rapor Hazır",
        message: "Kurumsal Satış BO haftalık rapor hazır.",
        time: "2 gün önce",
        type: "bilgi",
        unread: false,
        archived: true,
        favorite: false,
        pinned: false,
    },
    {
        id: "5",
        title: "Önemli Toplantı Hatırlatması",
        message: "Yarın saat 14:00'te kurumsal satış ekibi ile toplantı planlandı.",
        time: "3 gün önce",
        type: "uyari",
        unread: false,
        archived: false,
        favorite: true,
        pinned: true,
    },
    {
        id: "6",
        title: "Fiyat Güncellemesi",
        message: "Tüm araç kategorilerinde fiyat güncellemesi yapıldı.",
        time: "4 gün önce",
        type: "bilgi",
        unread: false,
        archived: false,
        favorite: false,
        pinned: false,
    },
] as const;
