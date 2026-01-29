import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { MessageSquare } from "lucide-react";
import { UpdateStatusForm } from "./_components/update-status-form";

export default async function IletisimMesajlariPage() {
  const supabase = await createClient();
  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">İletişim Mesajları</h1>
        <p className="text-destructive">Veriler yüklenemedi: {error.message}</p>
      </div>
    );
  }

  const statusLabel: Record<string, string> = {
    unread: "Okunmadı",
    read: "Okundu",
    responded: "Yanıtlandı",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          İletişim Mesajları
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Platform iletişim formundan gelen mesajlar
        </p>
      </div>
      <div className="space-y-4">
        {!messages?.length ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Henüz iletişim mesajı yok.
            </CardContent>
          </Card>
        ) : (
          messages.map((msg: { id: string; name: string; email: string; subject: string; message: string; status: string; created_at: string }) => (
            <Card key={msg.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{msg.subject}</CardTitle>
                  <CardDescription>
                    {msg.name} · {msg.email}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={msg.status === "unread" ? "default" : "secondary"}>
                    {statusLabel[msg.status] ?? msg.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: tr })}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                <UpdateStatusForm messageId={msg.id} currentStatus={msg.status} />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
