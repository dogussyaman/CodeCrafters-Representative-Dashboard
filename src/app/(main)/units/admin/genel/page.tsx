import { UnitPageCard } from "@/components/units/unit-page-card";
import {
  LayoutDashboard,
  Brain,
  Users,
  Package,
  Shield,
  MessageSquare,
  Ticket,
  UserCog,
} from "lucide-react";

export default function Page() {
  const adminPages = [
    {
      title: "AI Kullanım",
      description:
        "Yapay zeka kullanım istatistikleri, model performansı ve AI özellik yönetimi.",
      href: "/units/admin/ai-kullanim",
      icon: Brain,
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "Temsilci Yönetimi",
      description:
        "Temsilci hesapları, yetkilendirme, performans takibi ve kullanıcı yönetimi.",
      href: "/units/admin/temsilci-yonetimi",
      icon: Users,
      gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "Operasyon & İçerik",
      description:
        "İçerik yönetimi, operasyonel ayarlar ve sistem içerik güncellemeleri.",
      href: "/units/admin/operasyon-icerik",
      icon: Package,
      gradient: "from-orange-500/10 to-red-500/10",
    },
    {
      title: "Güvenlik ve Erişim",
      description:
        "Sistem güvenliği, erişim kontrolleri, log kayıtları ve güvenlik politikaları.",
      href: "/units/admin/guvenlik-erisim",
      icon: Shield,
      gradient: "from-red-500/10 to-rose-500/10",
    },
    {
      title: "Geri Bildirim",
      description:
        "Kullanıcı geri bildirimleri, öneriler ve sistem iyileştirme talepleri.",
      href: "/units/admin/geri-bildirim",
      icon: MessageSquare,
      gradient: "from-indigo-500/10 to-blue-500/10",
    },
    {
      title: "Ticket Sistemi",
      description:
        "Destek talepleri, ticket yönetimi ve sorun çözüm takibi.",
      href: "/units/admin/ticket-sistemi",
      icon: Ticket,
      gradient: "from-teal-500/10 to-cyan-500/10",
    },
    {
      title: "Kullanıcılar",
      description:
        "Tüm sistem kullanıcıları, rol yönetimi ve kullanıcı aktivite takibi.",
      href: "/units/admin/kullanicilar",
      icon: UserCog,
      gradient: "from-yellow-500/10 to-orange-500/10",
    },
  ];

  return (
    <div className="container mx-auto space-y-8 p-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-green-500/10 p-3">
            <svg
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ADMIN Genel Bakış</h1>
            <p className="text-muted-foreground">
              Sistem yönetimi ve kontrol paneli
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">ADMIN Birimi Hakkında</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              ADMIN birimi, tüm sistem yönetimi, kullanıcı kontrolü ve operasyonel süreçlerin
              merkezi yönetimi için tasarlanmış kapsamlı bir yönetim panelidir. Bu birimde:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Sistem geneli istatistikler ve performans metrikleri</li>
              <li>AI kullanım analizi ve model yönetimi</li>
              <li>Temsilci hesap yönetimi ve yetkilendirme</li>
              <li>İçerik ve operasyon yönetimi</li>
              <li>Güvenlik kontrolleri ve erişim yönetimi</li>
              <li>Kullanıcı geri bildirimleri ve destek sistemi</li>
              <li>Ticket yönetimi ve sorun çözüm takibi</li>
              <li>Kullanıcı aktivite ve rol yönetimi</li>
            </ul>
            <p className="mt-4 rounded-md bg-amber-500/10 p-3 text-sm">
              <strong>⚠️ Önemli:</strong> Bu bölüm sadece yetkili yöneticiler tarafından
              erişilebilir. Yapılan değişiklikler tüm sistemi etkileyebilir.
            </p>
          </div>
        </div>
      </div>

      {/* Pages Grid */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Sayfalar</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {adminPages.map((page) => (
            <UnitPageCard key={page.href} {...page} />
          ))}
        </div>
      </div>
    </div>
  );
}