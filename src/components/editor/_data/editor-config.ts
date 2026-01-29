/**
 * Editor için kullanılabilir font'lar
 */
export const FONTS = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
    "Comic Sans MS",
    "Trebuchet MS",
] as const;

/**
 * Editor için kullanılabilir font boyutları
 */
export const FONT_SIZES = [10, 12, 14, 16, 18, 24, 32] as const;

/**
 * Editor için birim listesi
 */
export const EDITOR_UNITS = [
    "SATIŞ BİRİMİ",
    "MÜŞTERİ HİZMETLERİ",
    "OPERASYON BİRİMİ",
    "İKAME HİZMETLERİ",
    "KURUMSAL SATIŞ",
    "FİLO YÖNETİMİ",
    "GENEL",
] as const;

export type EditorFont = (typeof FONTS)[number];
export type EditorFontSize = (typeof FONT_SIZES)[number];
export type EditorUnit = (typeof EDITOR_UNITS)[number];
