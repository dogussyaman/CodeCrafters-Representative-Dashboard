import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { Ticket } from "lucide-react";
import { UpdateTicketForm } from "./_components/update-ticket-form";

const typeLabels: Record<string, string> = {
  login_error: "Giriş hatası",
  feedback: "Geri bildirim",
  technical: "Teknik",
  other: "Diğer",
};
const statusLabels: Record<string, string> = {
  open: "Açık",
  in_progress: "İşlemde",
  resolved: "Çözüldü",
  closed: "Kapatıldı",
};
const priorityLabels: Record<string, string> = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
  urgent: "Acil",
};

export default async function DestekBiletleriPage() {
  const supabase = await createClient();
  const { data: tickets, error } = await supabase
    .from("support_tickets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Destek Biletleri</h1>
        <p className="text-destructive">Veriler yüklenemedi: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Ticket className="h-6 w-6" />
          Destek Biletleri
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Giriş hatası, geri bildirim ve teknik talepler
        </p>
      </div>
      <div className="space-y-4">
        {!tickets?.length ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Henüz destek bileti yok.
            </CardContent>
          </Card>
        ) : (
          tickets.map((t: {
            id: string;
            email: string;
            type: string;
            subject: string;
            description: string;
            status: string;
            priority: string | null;
            created_at: string;
            assigned_to: string | null;
          }) => (
            <Card key={t.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{t.subject}</CardTitle>
                  <CardDescription>
                    {t.email} · {typeLabels[t.type] ?? t.type}
                    {t.assigned_to && ` · Atanan ID: ${t.assigned_to}`}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <Badge variant={t.status === "open" ? "default" : "secondary"}>
                    {statusLabels[t.status] ?? t.status}
                  </Badge>
                  {t.priority && (
                    <Badge variant="outline">{priorityLabels[t.priority] ?? t.priority}</Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(t.created_at), { addSuffix: true, locale: tr })}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm whitespace-pre-wrap">{t.description}</p>
                <UpdateTicketForm ticketId={t.id} currentStatus={t.status} />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
