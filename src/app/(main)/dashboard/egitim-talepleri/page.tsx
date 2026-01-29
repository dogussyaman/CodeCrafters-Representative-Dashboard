import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { BookOpen } from "lucide-react";
import { UpdateTrainingStatusForm } from "./_components/update-training-status-form";

const statusLabels: Record<string, string> = {
  pending: "Beklemede",
  approved: "Onaylandı",
  rejected: "Reddedildi",
  completed: "Tamamlandı",
};

export default async function EgitimTalepleriPage() {
  const supabase = await createClient();
  const { data: requests, error } = await supabase
    .from("training_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Eğitim Talepleri</h1>
        <p className="text-destructive">Veriler yüklenemedi: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Eğitim Talepleri
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Kullanıcıların eğitim talepleri
        </p>
      </div>
      <div className="space-y-4">
        {!requests?.length ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Henüz eğitim talebi yok.
            </CardContent>
          </Card>
        ) : (
          requests.map((r: {
            id: string;
            topic: string;
            description: string;
            preferred_format: string | null;
            status: string;
            created_at: string;
            user_id: string;
          }) => (
            <Card key={r.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{r.topic}</CardTitle>
                  <CardDescription>
                    Talep sahibi ID: {r.user_id}
                    {r.preferred_format && ` · ${r.preferred_format}`}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={r.status === "pending" ? "default" : "secondary"}>
                    {statusLabels[r.status] ?? r.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(r.created_at), { addSuffix: true, locale: tr })}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm whitespace-pre-wrap">{r.description}</p>
                <UpdateTrainingStatusForm requestId={r.id} currentStatus={r.status} />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
