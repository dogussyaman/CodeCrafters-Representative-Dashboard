import type { LucideIcon } from "lucide-react";
import { BookOpen, Users, CheckCircle, TrendingUp } from "lucide-react";

/**
 * Eğitim istatistiği için tip tanımı
 */
export interface TrainingStat {
    label: string;
    value: string;
    icon: LucideIcon;
    description: string;
}

/**
 * Training hero componentinde gösterilen istatistikler
 */
export const trainingStats: TrainingStat[] = [
    {
        label: "Toplam Kurs",
        value: "47",
        icon: BookOpen,
        description: "Mevcut eğitim modülü",
    },
    {
        label: "Aktif Öğrenci",
        value: "234",
        icon: Users,
        description: "Eğitim alan temsilci",
    },
    {
        label: "Tamamlanan",
        value: "1,289",
        icon: CheckCircle,
        description: "Bitirilen ders",
    },
    {
        label: "Ortalama İlerleme",
        value: "68%",
        icon: TrendingUp,
        description: "Genel tamamlanma oranı",
    },
] as const;

/**
 * Eğitim ipuçları
 */
export const trainingTips = [
    "Her gün düzenli olarak en az 1 ders tamamlayın",
    "Not alın ve önemli noktaları işaretleyin",
    "Ders sonrası pratik yaparak öğrendiklerinizi pekiştirin",
    "Sertifika almak için tüm modülleri tamamlayın",
] as const;

/**
 * Genel ilerleme yüzdesi  
 */
export const OVERALL_PROGRESS = 68;
