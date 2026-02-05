import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { AddTemsilciButton } from "./_components/add-temsilci-button";

export default async function TemsilciYonetimiPage() {
  const supabase = await createClient();
  const { data: reps, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, created_at")
    .eq("role", "mt")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Temsilci Yönetimi</h1>
        <p className="text-destructive">Veriler yüklenemedi: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UserPlus className="h-6 w-6" />
            Temsilci Yönetimi
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Müşteri temsilcisi (MT) kullanıcıları. Yeni temsilci Supabase Dashboard veya CodeCraftX ana uygulaması üzerinden oluşturulabilir; profilde role &quot;mt&quot; atanır.
          </p>
        </div>
        <AddTemsilciButton />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Müşteri temsilcileri</CardTitle>
          <CardDescription>
            Toplam {reps?.length ?? 0} temsilci
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!reps?.length ? (
            <p className="text-muted-foreground text-center py-8">Henüz müşteri temsilcisi yok.</p>
          ) : (
            <ul className="divide-y divide-border">
              {reps.map((p: { id: string; email: string; full_name: string; created_at: string }) => (
                <li key={p.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{p.full_name || "İsimsiz"}</p>
                    <p className="text-sm text-muted-foreground">{p.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(p.created_at), { addSuffix: true, locale: tr })}
                    </p>
                  </div>
                  <Badge variant="secondary">MT</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
