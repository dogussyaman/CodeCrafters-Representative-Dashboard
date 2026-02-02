import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageSectionProps {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Sayfa bölümü. H2 + içerik; erişilebilirlik ve SEO için tutarlı bölüm yapısı.
 */
export function PageSection({
  id,
  title,
  children,
  className,
}: PageSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={cn("space-y-4", className)}
    >
      <h2
        id={id ? `${id}-heading` : undefined}
        className="text-xl font-semibold tracking-tight"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
