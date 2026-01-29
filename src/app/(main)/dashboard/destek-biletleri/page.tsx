import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { Ticket, ImageIcon, MessageSquareReply } from "lucide-react";
import Link from "next/link";
import { UpdateTicketForm } from "./_components/update-ticket-form";
import { DestekBiletleriFilters } from "./_components/destek-biletleri-filters";

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

type SearchParams = Promise<{ status?: string; priority?: string; type?: string; q?: string }>;

export default async function DestekBiletleriPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const { status, priority, type, q } = params;

  const supabase = await createClient();
  let query = supabase
    .from("support_tickets")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    const statuses = status.split(",").filter(Boolean);
    if (statuses.length) query = query.in("status", statuses);
  }
  if (priority) query = query.eq("priority", priority);
  if (type) query = query.eq("type", type);
  if (q && q.trim()) {
    const safe = q.trim().replace(/,/g, " ");
    const term = `%${safe}%`;
    query = query.or(
      `subject.ilike.${term},description.ilike.${term},email.ilike.${term}`,
    );
  }

  const { data: tickets, error } = await query;

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
      <DestekBiletleriFilters
        currentStatus={status}
        currentPriority={priority}
        currentType={type}
        currentSearch={q}
      />
      <div className="space-y-4">
        {!tickets?.length ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              {status || priority || type || q
                ? "Filtreye uygun bilet bulunamadı."
                : "Henüz destek bileti yok."}
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
            resolution_no: string | null;
            resolved_at: string | null;
            attachment_urls?: string[] | null;
          }) => (
            <Card key={t.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">
                    <Link
                      href={`/dashboard/destek-biletleri/${t.id}`}
                      className="hover:underline"
                    >
                      {t.subject}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {t.email} · {typeLabels[t.type] ?? t.type}
                    {t.assigned_to && ` · Atanan ID: ${t.assigned_to}`}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <Badge variant={t.status === "open" || t.status === "in_progress" ? "default" : "secondary"}>
                    {statusLabels[t.status] ?? t.status}
                  </Badge>
                  {t.priority && (
                    <Badge variant="outline">{priorityLabels[t.priority] ?? t.priority}</Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(t.created_at), { addSuffix: true, locale: tr })}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/destek-biletleri/${t.id}`}>
                      <MessageSquareReply className="h-4 w-4 mr-1" />
                      Geri dönüş yap
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm whitespace-pre-wrap line-clamp-2">{t.description}</p>
                {(t.status === "resolved" || t.status === "closed") && t.resolution_no && (
                  <div className="rounded-md border bg-muted/50 p-3 text-sm">
                    <p className="font-medium text-muted-foreground mb-1">Çözüm notu:</p>
                    <p className="whitespace-pre-wrap">{t.resolution_no}</p>
                  </div>
                )}
                {t.attachment_urls && t.attachment_urls.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ImageIcon className="h-4 w-4" />
                    <span>{t.attachment_urls.length} ek</span>
                    <div className="flex gap-1">
                      {t.attachment_urls.slice(0, 2).map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block w-8 h-8 rounded border overflow-hidden shrink-0">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                        </a>
                      ))}
                      {t.attachment_urls.length > 2 && <span>+{t.attachment_urls.length - 2}</span>}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3">
                  <UpdateTicketForm ticketId={t.id} currentStatus={t.status} />
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/destek-biletleri/${t.id}`}>
                      Çözüm notu yaz / Detay
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
