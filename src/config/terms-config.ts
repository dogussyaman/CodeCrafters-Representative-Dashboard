/**
 * Terimler sayfası sabitleri ve URL/parametre validasyonu.
 * Magic string kullanımı burada toplanır.
 */

export const TURKISH_ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "İ",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Ö",
  "P",
  "R",
  "S",
  "Ş",
  "T",
  "U",
  "Ü",
  "V",
  "Y",
  "Z",
] as const;

export type TurkishLetter = (typeof TURKISH_ALPHABET)[number];

export const TERMS_BASE_PATH = "/dashboard/terimler";
export const EMPTY_TERMS_MESSAGE = "Bu harfle başlayan terim bulunamadı";

const ALLOWED_LETTERS_SET = new Set<string>(TURKISH_ALPHABET);

/**
 * URL'den gelen harf parametresini validate eder.
 * Sadece izin verilen Türkçe alfabe harflerini kabul eder (güvenlik).
 */
export function isValidLetter(value: unknown): value is TurkishLetter {
  if (typeof value !== "string") return false;
  const normalized = value.trim().toUpperCase();
  if (normalized.length !== 1) return false;
  return ALLOWED_LETTERS_SET.has(normalized);
}

/**
 * Harfi normalize eder (büyük harf, tek karakter).
 * Geçersiz ise null döner.
 */
export function normalizeLetter(value: unknown): TurkishLetter | null {
  if (!isValidLetter(value)) return null;
  return value.trim().toUpperCase() as TurkishLetter;
}
