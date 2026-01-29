import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ticket, ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { TicketDetailActions } from "./_components/ticket-detail-actions";

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

export default async function DestekBiletiDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: ticket, error } = await supabase
    .from("support_tickets")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !ticket) notFound();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, email, role")
    .in("role", ["mt", "admin", "platform_admin"])
    .order("full_name");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/destek-biletleri">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Ticket className="h-6 w-6" />
            Bilet detayı
          </h1>
          <p className="text-muted-foreground text-sm">#{ticket.id.slice(0, 8)}</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-lg">{ticket.subject}</CardTitle>
            <CardDescription>
              {ticket.email}
              {ticket.user_id && ` · Kullanıcı ID: ${ticket.user_id.slice(0, 8)}...`}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={ticket.status === "open" ? "default" : "secondary"}>
              {statusLabels[ticket.status] ?? ticket.status}
            </Badge>
            {ticket.priority && (
              <Badge variant="outline">{priorityLabels[ticket.priority] ?? ticket.priority}</Badge>
            )}
            <Badge variant="outline">{typeLabels[ticket.type] ?? ticket.type}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Açıklama</h3>
            <p className="text-sm whitespace-pre-wrap">{ticket.description ?? "—"}</p>
          </div>
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div>
              <span className="text-muted-foreground">Oluşturulma:</span>{" "}
              {ticket.created_at
                ? format(new Date(ticket.created_at), "d MMM yyyy HH:mm", { locale: tr })
                : "—"}
            </div>
            <div>
              <span className="text-muted-foreground">Güncellenme:</span>{" "}
              {ticket.updated_at
                ? format(new Date(ticket.updated_at), "d MMM yyyy HH:mm", { locale: tr })
                : "—"}
            </div>
            {ticket.resolved_at && (
              <div>
                <span className="text-muted-foreground">Çözülme:</span>{" "}
                {format(new Date(ticket.resolved_at), "d MMM yyyy HH:mm", { locale: tr })}
              </div>
            )}
            {ticket.resolution_no && (
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Çözüm notu:</span>{" "}
                <p className="mt-1 whitespace-pre-wrap">{ticket.resolution_no}</p>
              </div>
            )}
            {ticket.attachment_urls && Array.isArray(ticket.attachment_urls) && ticket.attachment_urls.length > 0 && (
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" />
                  Ekler ({ticket.attachment_urls.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ticket.attachment_urls.map((url: string, i: number) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-20 h-20 rounded-lg border overflow-hidden hover:opacity-90"
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <TicketDetailActions
            ticketId={ticket.id}
            currentStatus={ticket.status}
            currentResolutionNo={ticket.resolution_no ?? ""}
            currentAssignedTo={ticket.assigned_to ?? ""}
            representatives={profiles ?? []}
          />
        </CardContent>
      </Card>
    </div>
  );
}
