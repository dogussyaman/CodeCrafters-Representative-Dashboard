"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageSquareReply, Send } from "lucide-react";
import { toast } from "sonner";

interface Rep {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
}

interface TicketDetailActionsProps {
  ticketId: string;
  currentStatus: string;
  currentResolutionNo: string;
  currentAssignedTo: string;
  representatives: Rep[];
}

export function TicketDetailActions({
  ticketId,
  currentStatus,
  currentResolutionNo,
  currentAssignedTo,
  representatives,
}: TicketDetailActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [resolutionNo, setResolutionNo] = useState(currentResolutionNo);
  const [status, setStatus] = useState(currentStatus);
  const [assignedTo, setAssignedTo] = useState(currentAssignedTo);

  const handleStatusChange = (value: string) => {
    startTransition(async () => {
      const supabase = createClient();
      const updates: { status: string; resolved_at?: string; resolution_no?: string } = {
        status: value,
      };
      if (value === "resolved" || value === "closed") {
        updates.resolved_at = new Date().toISOString();
        if (resolutionNo.trim()) updates.resolution_no = resolutionNo.trim();
      }
      await supabase.from("support_tickets").update(updates).eq("id", ticketId);
      setStatus(value);
      router.refresh();
    });
  };

  const handleSaveResolution = () => {
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase
        .from("support_tickets")
        .update({ resolution_no: resolutionNo.trim() || null })
        .eq("id", ticketId);
      if (error) {
        toast.error("Kaydedilemedi: " + error.message);
        return;
      }
      toast.success("Çözüm notu kaydedildi.");
      router.refresh();
    });
  };

  const handleSendAndNotify = () => {
    if (!resolutionNo.trim()) {
      toast.error("Önce çözüm notu veya geri dönüş metnini yazın.");
      return;
    }
    startTransition(async () => {
      const supabase = createClient();
      const updates = {
        resolution_no: resolutionNo.trim(),
        status: "resolved" as const,
        resolved_at: new Date().toISOString(),
      };
      const { error } = await supabase
        .from("support_tickets")
        .update(updates)
        .eq("id", ticketId);
      if (error) {
        toast.error("Gönderilemedi: " + error.message);
        return;
      }
      setStatus("resolved");
      toast.success("Kullanıcıya bildirim ve e-posta gönderildi.");
      router.refresh();
    });
  };

  const handleAssignChange = (value: string) => {
    const newVal = value === "none" ? "" : value;
    startTransition(async () => {
      const supabase = createClient();
      await supabase
        .from("support_tickets")
        .update({ assigned_to: newVal || null })
        .eq("id", ticketId);
      setAssignedTo(newVal);
      router.refresh();
    });
  };

  return (
    <div className="space-y-6 pt-4 border-t">
      <div className="space-y-2">
        <Label>Durum</Label>
        <Select value={status} onValueChange={handleStatusChange} disabled={isPending}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Açık</SelectItem>
            <SelectItem value="in_progress">İşlemde</SelectItem>
            <SelectItem value="resolved">Çözüldü</SelectItem>
            <SelectItem value="closed">Kapatıldı</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
        <Label htmlFor="resolution_no" className="flex items-center gap-2 text-base font-medium">
          <MessageSquareReply className="h-4 w-4" />
          Çözüm notu / Geri dönüş
        </Label>
        <p className="text-xs text-muted-foreground">
          Metni yazıp &quot;Gönder ve kullanıcıyı bilgilendir&quot; ile kullanıcıya bildirim ve e-posta gider.
        </p>
        <Textarea
          id="resolution_no"
          placeholder="Çözüm özeti, yapılan işlemler veya kullanıcıya iletmek istediğiniz geri dönüş..."
          value={resolutionNo}
          onChange={(e) => setResolutionNo(e.target.value)}
          rows={4}
          className="max-w-xl"
        />
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={handleSaveResolution} disabled={isPending}>
            Sadece kaydet
          </Button>
          <Button
            size="sm"
            onClick={handleSendAndNotify}
            disabled={isPending || !resolutionNo.trim()}
            className="gap-1"
          >
            <Send className="h-4 w-4" />
            Gönder ve kullanıcıyı bilgilendir
          </Button>
        </div>
      </div>

      <Separator />
      <div className="space-y-2">
        <Label>Atanan temsilci</Label>
        <Select
          value={assignedTo || "none"}
          onValueChange={handleAssignChange}
          disabled={isPending}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Atanmamış</SelectItem>
            {representatives.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.full_name ?? r.email ?? r.id.slice(0, 8)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
