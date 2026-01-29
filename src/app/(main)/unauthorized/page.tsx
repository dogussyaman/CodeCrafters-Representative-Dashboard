import Link from "next/link";
import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="bg-background flex min-h-dvh flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <Lock className="text-primary mx-auto size-12" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Erişim Yetkiniz Yok</h1>
        <p className="text-muted-foreground mt-4">
          Bu panele erişim yetkiniz bulunmuyor. Sadece yönetici veya müşteri temsilcisi giriş yapabilir. Sorun olduğunu
          düşünüyorsanız site yöneticisi ile iletişime geçin.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link
            href="/auth/v2/login"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors"
            prefetch={false}
          >
            Giriş sayfasına dön
          </Link>
        </div>
      </div>
    </div>
  );
}
