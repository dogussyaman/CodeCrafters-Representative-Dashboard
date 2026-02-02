import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { BookOpen } from "lucide-react";
import { TermItem } from "./term-item";
import type { Term } from "@/types/terms";

interface TermsListProps {
  terms: Term[];
  emptyMessage: string;
  className?: string;
}

/**
 * Terim listesi. Boşsa shared Empty bileşeni ile mesaj gösterir.
 * H2 altında liste; her öğe TermItem (DefinedTerm) olarak işaretlenir.
 */
export function TermsList({ terms, emptyMessage, className }: TermsListProps) {
  if (terms.length === 0) {
    return (
      <Empty className={className}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BookOpen className="size-6" />
          </EmptyMedia>
          <EmptyTitle>Terim bulunamadı</EmptyTitle>
          <EmptyDescription>{emptyMessage}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <section aria-labelledby="terms-heading" className={className}>
      <h2 id="terms-heading" className="sr-only">
        Seçilen harfe göre terimler
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {terms.map((term) => (
          <li key={term.id}>
            <TermItem term={term} />
          </li>
        ))}
      </ul>
    </section>
  );
}
