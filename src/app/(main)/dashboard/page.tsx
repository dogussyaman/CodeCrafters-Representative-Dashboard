import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Ticket, BookOpen, UserCog, Building2, Bell, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [
    { count: contactCount },
    { count: ticketCount },
    { count: trainingCount },
    { count: roleReqCount },
    { count: companyReqCount },
    { count: unreadNotifCount },
  ] = await Promise.all([
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "unread"),
    supabase.from("support_tickets").select("*", { count: "exact", head: true }).in("status", ["open", "in_progress"]),
    supabase.from("training_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("role_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("company_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("notifications").select("*", { count: "exact", head: true }).eq("recipient_id", user.id).is("read_at", null),
  ]);

  const cards = [
    { title: "Okunmamış İletişim", value: contactCount ?? 0, href: "/dashboard/iletisim-mesajlari", icon: MessageSquare },
    { title: "Açık Destek Biletleri", value: ticketCount ?? 0, href: "/dashboard/destek-biletleri", icon: Ticket },
    { title: "Bekleyen Eğitim Talepleri", value: trainingCount ?? 0, href: "/dashboard/egitim-talepleri", icon: BookOpen },
    { title: "Bekleyen Rol Talepleri", value: roleReqCount ?? 0, href: "/dashboard/rol-talepleri", icon: UserCog },
    { title: "Bekleyen Şirket Talepleri", value: companyReqCount ?? 0, href: "/dashboard/sirket-talepleri", icon: Building2 },
    { title: "Okunmamış Bildirimler", value: unreadNotifCount ?? 0, href: "/dashboard/bildirimler", icon: Bell },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CodeCrafters MT Dashboard</h1>
        <p className="text-muted-foreground">İletişim, destek biletleri ve taleplere genel bakış</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
