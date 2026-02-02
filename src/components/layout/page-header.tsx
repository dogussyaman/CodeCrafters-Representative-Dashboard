import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

/**
 * Sayfa başlığı. H1 + opsiyonel açıklama; heading hiyerarşisi için tek H1.
 */
export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("space-y-1", className)}>
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </header>
  );
}
