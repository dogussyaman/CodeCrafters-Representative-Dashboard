import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Ticket,
  BookOpen,
  UserCog,
  Building2,
  Bell,
  Users,
  UserPlus,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [
    { count: contactCount },
    { count: ticketCount },
    { count: trainingCount },
    { count: roleReqCount },
    { count: companyReqCount },
    { count: mtCount },
    { count: userCount },
  ] = await Promise.all([
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("support_tickets").select("*", { count: "exact", head: true }),
    supabase.from("training_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("role_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("company_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "mt"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).in("role", ["admin", "platform_admin", "mt"]),
  ]);

  const cards = [
    { title: "İletişim Mesajları", value: contactCount ?? 0, href: "/dashboard/iletisim-mesajlari", icon: MessageSquare },
    { title: "Destek Biletleri", value: ticketCount ?? 0, href: "/dashboard/destek-biletleri", icon: Ticket },
    { title: "Eğitim Talepleri (bekleyen)", value: trainingCount ?? 0, href: "/dashboard/egitim-talepleri", icon: BookOpen },
    { title: "Rol Talepleri (bekleyen)", value: roleReqCount ?? 0, href: "/dashboard/rol-talepleri", icon: UserCog },
    { title: "Şirket Talepleri (bekleyen)", value: companyReqCount ?? 0, href: "/dashboard/sirket-talepleri", icon: Building2 },
    { title: "Bildirimler", value: "-", href: "/dashboard/bildirimler", icon: Bell },
    { title: "Temsilci sayısı", value: mtCount ?? 0, href: "/dashboard/admin/temsilci-yonetimi", icon: UserPlus },
    { title: "Panel kullanıcıları", value: userCount ?? 0, href: "/dashboard/admin/kullanicilar", icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Yönetici Paneli</h1>
        <p className="text-muted-foreground">CodeCraftX MT Dashboard yönetimi ve istatistikler</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.href} className="transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <Button variant="link" className="h-auto p-0 mt-2" asChild>
                  <Link href={item.href} className="flex items-center gap-1">
                    Görüntüle <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
