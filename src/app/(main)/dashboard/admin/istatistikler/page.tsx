import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default async function IstatistiklerPage() {
  const supabase = await createClient();
  const [
    { count: contactTotal },
    { count: contactUnread },
    { count: ticketsOpen },
    { count: ticketsResolved },
    { count: trainingPending },
    { count: rolePending },
    { count: companyPending },
    { count: mtCount },
    { count: adminCount },
  ] = await Promise.all([
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "unread"),
    supabase.from("support_tickets").select("*", { count: "exact", head: true }).in("status", ["open", "in_progress"]),
    supabase.from("support_tickets").select("*", { count: "exact", head: true }).in("status", ["resolved", "closed"]),
    supabase.from("training_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("role_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("company_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "mt"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).in("role", ["admin", "platform_admin"]),
  ]);

  const stats = [
    { title: "Toplam iletişim mesajı", value: contactTotal ?? 0 },
    { title: "Okunmamış mesaj", value: contactUnread ?? 0 },
    { title: "Açık destek bileti", value: ticketsOpen ?? 0 },
    { title: "Çözülen / kapatılan bilet", value: ticketsResolved ?? 0 },
    { title: "Bekleyen eğitim talebi", value: trainingPending ?? 0 },
    { title: "Bekleyen rol talebi", value: rolePending ?? 0 },
    { title: "Bekleyen şirket talebi", value: companyPending ?? 0 },
    { title: "Müşteri temsilcisi sayısı", value: mtCount ?? 0 },
    { title: "Yönetici sayısı", value: adminCount ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          İstatistikler
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          CodeCraftX MT Dashboard özet istatistikleri
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
