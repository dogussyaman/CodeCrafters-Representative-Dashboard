"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UpdateStatusForm({
  messageId,
  currentStatus,
}: {
  messageId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    startTransition(async () => {
      const supabase = createClient();
      await supabase
        .from("contact_messages")
        .update({ status: value })
        .eq("id", messageId);
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
          <SelectItem value="unread">Okunmadı</SelectItem>
          <SelectItem value="read">Okundu</SelectItem>
          <SelectItem value="responded">Yanıtlandı</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
