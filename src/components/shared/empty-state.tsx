import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { type LucideIcon, FileQuestion } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}

/**
 * İçerik bulunamadı durumu. Terimler, arama sonuçları vb. için ortak kullanım.
 */
export function EmptyState({
  title = "Sonuç bulunamadı",
  description,
  icon: Icon = FileQuestion,
  className,
}: EmptyStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon className="size-6" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
