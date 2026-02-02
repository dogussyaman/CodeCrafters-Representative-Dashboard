/**
 * Terimler sayfası veri tipi.
 * Schema.org DefinedTerm / Glossary ile uyumlu alanlar.
 */

export interface Term {
  id: string;
  title: string;
  description: string;
  slug?: string;
}
