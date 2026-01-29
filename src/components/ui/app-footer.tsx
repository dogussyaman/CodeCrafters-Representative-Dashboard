import Link from "next/link";
import { APP_CONFIG } from "@/config/app-config";

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto shrink-0 border-t bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium">{APP_CONFIG.name}</p>
            <p className="text-xs text-muted-foreground">
              CodeCrafters MT paneli · Destek biletleri ve talepler
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm">
            <Link
              href="/dashboard"
              className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
            >
              Panel
            </Link>
            <Link
              href="/dashboard/destek-biletleri"
              className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
            >
              Destek Biletleri
            </Link>
            <Link
              href="/dashboard/chatbot"
              className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
            >
              Asistan
            </Link>
            <Link
              href="/dashboard/help"
              className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
            >
              Yardım
            </Link>
          </nav>
        </div>
        <div className="mt-4 border-t pt-4 text-center text-xs text-muted-foreground">
          © {currentYear} {APP_CONFIG.name}
        </div>
      </div>
    </footer>
  );
}
