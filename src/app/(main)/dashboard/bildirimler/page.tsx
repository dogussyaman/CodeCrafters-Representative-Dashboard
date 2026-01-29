import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { Bell } from "lucide-react";
import { MarkReadButton } from "./_components/mark-read-button";

export default async function BildirimlerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("recipient_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Bildirimler</h1>
        <p className="text-destructive">Veriler yüklenemedi: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Bildirimler
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Platform bildirimleriniz
        </p>
      </div>
      <div className="space-y-4">
        {!notifications?.length ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Henüz bildirim yok.
            </CardContent>
          </Card>
        ) : (
          notifications.map((n: { id: string; type: string; title: string; body: string | null; href: string | null; read_at: string | null; created_at: string }) => (
            <Card key={n.id} className={!n.read_at ? "border-primary/50" : ""}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{n.title}</CardTitle>
                  <CardDescription>
                    {n.type} · {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: tr })}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!n.read_at && <Badge>Yeni</Badge>}
                  <MarkReadButton notificationId={n.id} isRead={!!n.read_at} />
                </div>
              </CardHeader>
              {n.body && (
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{n.body}</p>
                  {n.href && (
                    <a href={n.href} className="text-sm text-primary hover:underline mt-2 inline-block">
                      Detay →
                    </a>
                  )}
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
