/**
 * Bildirim öğesi için tip tanımı
 */
export interface NotificationItem {
    label: string;
    severity?: "default" | "destructive" | "secondary" | "outline";
}

/**
 * Header bildirim dropdown'ında gösterilen bildirimler
 */
export const notificationItems: NotificationItem[] = [
    {
        label: "Güvence paketleri güncellendi",
        severity: "default",
    },
    {
        label: "Filo Güncellendi",
        severity: "destructive",
    },
    {
        label: "Fiyat bilgileri güncellendi",
        severity: "destructive",
    },
    {
        label: "Yurt dışı filo güncellendi",
        severity: "destructive",
    },
] as const;

/**
 * Bildirim severity renk sınıfları
 */
export const severityDotClass: Record<NonNullable<NotificationItem["severity"]>, string> = {
    default: "bg-muted-foreground/50",
    destructive: "bg-red-600",
    secondary: "bg-blue-600",
    outline: "bg-muted-foreground",
} as const;
