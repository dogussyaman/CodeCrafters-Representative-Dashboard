import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { UserCog } from "lucide-react";
import { UpdateRoleRequestForm } from "./_components/update-role-request-form";

const statusLabels: Record<string, string> = {
  pending: "Beklemede",
  approved: "Onaylandı",
  rejected: "Reddedildi",
};

export default async function RolTalepleriPage() {
  const supabase = await createClient();
  const { data: requests, error } = await supabase
    .from("role_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Rol Talepleri</h1>
        <p className="text-destructive">Veriler yüklenemedi: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UserCog className="h-6 w-6" />
          Rol Talepleri
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Kullanıcıların rol talepleri (hr, admin)
        </p>
      </div>
      <div className="space-y-4">
        {!requests?.length ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Henüz rol talebi yok.
            </CardContent>
          </Card>
        ) : (
          requests.map((r: { id: string; user_id: string; requested_role: string; reason: string; status: string; created_at: string }) => (
            <Card key={r.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Rol: {r.requested_role}</CardTitle>
                  <CardDescription>
                    Kullanıcı ID: {r.user_id} · {formatDistanceToNow(new Date(r.created_at), { addSuffix: true, locale: tr })}
                  </CardDescription>
                </div>
                <Badge variant={r.status === "pending" ? "default" : "secondary"}>
                  {statusLabels[r.status] ?? r.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm whitespace-pre-wrap">{r.reason}</p>
                <UpdateRoleRequestForm requestId={r.id} currentStatus={r.status} />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
