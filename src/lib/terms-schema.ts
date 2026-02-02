import type { Term } from "@/types/terms";

/**
 * Terimler sayfası için Schema.org DefinedTermSet / DefinedTerm JSON-LD üretir.
 * SEO ve arama motoru anlamsal işaretleme için kullanılır.
 */
export function buildGlossarySchema(terms: Term[], letter: string): object {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const termList = terms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.title,
    description: t.description,
    ...(t.slug && baseUrl ? { url: `${baseUrl}/dashboard/terimler/${letter}#${t.slug}` } : {}),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: `Terimler - ${letter}`,
    hasDefinedTerm: termList,
  };
}
