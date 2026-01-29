"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UpdateTicketForm({
  ticketId,
  currentStatus,
}: {
  ticketId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    startTransition(async () => {
      const supabase = createClient();
      const updates: { status: string; resolved_at?: string } = { status: value };
      if (value === "resolved" || value === "closed") {
        updates.resolved_at = new Date().toISOString();
      }
      await supabase.from("support_tickets").update(updates).eq("id", ticketId);
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Durum:</span>
      <Select value={currentStatus} onValueChange={handleChange} disabled={isPending}>
        <SelectTrigger className="w-[140px]">
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
  );
}
