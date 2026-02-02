import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  label?: string;
  className?: string;
}

/**
 * Yükleme göstergesi. Sayfa veya bölüm yüklenirken kullanılır.
 */
export function LoadingState({
  label = "Yükleniyor...",
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <Spinner className="size-8" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
