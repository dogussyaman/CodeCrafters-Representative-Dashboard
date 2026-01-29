/**
 * Birim isimleri - Tüm projede tutarlı kullanım için
 * Bu dosya artık kullanılmıyor - company-config.ts kullanılıyor
 * @deprecated Use COMPANY_CONFIG from @/config/company-config instead
 */
export const UNITS = ["SATIŞ BİRİMİ", "MÜŞTERİ HİZMETLERİ", "OPERASYON BİRİMİ", "İKAME HİZMETLERİ", "KURUMSAL SATIŞ", "FİLO YÖNETİMİ", "ADMIN"] as const;

/**
 * Birim tipi - UNITS array'inden türetilmiş
 */
export type Unit = (typeof UNITS)[number];

/**
 * Birim kontrolü için yardımcı fonksiyon
 */
export function isValidUnit(value: string): value is Unit {
    return UNITS.includes(value as Unit);
}
