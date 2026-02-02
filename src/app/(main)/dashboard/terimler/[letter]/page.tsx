import { notFound } from "next/navigation";
import {
  TURKISH_ALPHABET,
  TERMS_BASE_PATH,
  EMPTY_TERMS_MESSAGE,
  isValidLetter,
  normalizeLetter,
} from "@/config/terms-config";
import { getTerms, getTermsByLetter } from "../_data/terms-data";
import { buildGlossarySchema } from "@/lib/terms-schema";
import { buildPageMetadata, getSiteTitle } from "@/lib/seo";
import { AlphabetFilterBar } from "@/components/ui/alphabet-filter-bar";
import { TermsList } from "@/components/feature/terms";
import { PageHeader } from "@/components/layout/page-header";

const TERMS_PAGE_TITLE = "Terimler Sözlüğü";

interface PageProps {
  params: Promise<{ letter: string }>;
}

export async function generateStaticParams() {
  return TURKISH_ALPHABET.map((letter) => ({
    letter: letter.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { letter } = await params;
  if (!isValidLetter(letter)) {
    return { title: getSiteTitle() };
  }
  const normalized = normalizeLetter(letter)!;
  const title = getSiteTitle(`${TERMS_PAGE_TITLE} - ${normalized}`);
  const description = `${normalized} harfi ile başlayan terimler. CodeCrafters MT paneli terimler sözlüğü.`;
  const path = `${TERMS_BASE_PATH}/${normalized.toLowerCase()}`;

  return buildPageMetadata({
    title,
    description,
    path,
  });
}

export default async function TerimlerLetterPage({ params }: PageProps) {
  const { letter } = await params;

  if (!isValidLetter(letter)) {
    notFound();
  }

  const activeLetter = normalizeLetter(letter)!;
  const allTerms = getTerms();
  const filteredTerms = getTermsByLetter(allTerms, activeLetter);
  const schema = buildGlossarySchema(filteredTerms, activeLetter);

  return (
    <div className="space-y-6">
      <PageHeader
        title={TERMS_PAGE_TITLE}
        description={`${activeLetter} harfi ile başlayan terimler`}
      />

      <AlphabetFilterBar
        letters={TURKISH_ALPHABET}
        activeLetter={activeLetter}
        className="mt-4"
      />

      <TermsList
        terms={filteredTerms}
        emptyMessage={EMPTY_TERMS_MESSAGE}
        className="mt-6"
      />

      {/* JSON-LD: schema built from server-only terms data; safe to serialize */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
