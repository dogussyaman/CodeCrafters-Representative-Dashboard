import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

const roleLabels: Record<string, string> = {
  admin: "Yönetici",
  platform_admin: "Platform Yöneticisi",
  mt: "Müşteri Temsilcisi",
  developer: "Geliştirici",
  hr: "İK",
  company: "Şirket",
  company_admin: "Şirket Yöneticisi",
};

export default async function KullanicilarPage() {
  const supabase = await createClient();
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .in("role", ["admin", "platform_admin", "mt"])
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Kullanıcılar</h1>
        <p className="text-destructive">Veriler yüklenemedi: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6" />
          Kullanıcılar
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Panel erişimi olan kullanıcılar (yönetici ve müşteri temsilcisi)
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı listesi</CardTitle>
          <CardDescription>
            Toplam {profiles?.length ?? 0} kullanıcı
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!profiles?.length ? (
            <p className="text-muted-foreground text-center py-8">Henüz kullanıcı yok.</p>
          ) : (
            <ul className="divide-y divide-border">
              {profiles.map((p: { id: string; email: string; full_name: string; role: string; created_at: string }) => (
                <li key={p.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{p.full_name || "İsimsiz"}</p>
                    <p className="text-sm text-muted-foreground">{p.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(p.created_at), { addSuffix: true, locale: tr })}
                    </p>
                  </div>
                  <Badge variant={p.role === "admin" || p.role === "platform_admin" ? "default" : "secondary"}>
                    {roleLabels[p.role] ?? p.role}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
