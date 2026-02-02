import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Term } from "@/types/terms";
import { cn } from "@/lib/utils";

interface TermItemProps {
  term: Term;
  className?: string;
}

/**
 * Tek terim kartı. Schema.org DefinedTerm ile uyumlu semantik yapı.
 * XSS: title ve description plain text olarak render edilir.
 */
export function TermItem({ term, className }: TermItemProps) {
  return (
    <article
      className={cn(className)}
      itemScope
      itemType="https://schema.org/DefinedTerm"
      itemProp="hasDefinedTerm"
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base" itemProp="name">
            {term.title}
          </CardTitle>
          {term.description && (
            <CardDescription itemProp="description">
              {term.description}
            </CardDescription>
          )}
        </CardHeader>
        {term.slug && (
          <CardContent className="pt-0">
            <span className="sr-only" itemProp="termCode">
              {term.slug}
            </span>
          </CardContent>
        )}
      </Card>
    </article>
  );
}
