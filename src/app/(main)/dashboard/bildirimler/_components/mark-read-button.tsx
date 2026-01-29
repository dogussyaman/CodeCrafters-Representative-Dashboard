"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function MarkReadButton({
  notificationId,
  isRead,
}: {
  notificationId: string;
  isRead: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (isRead) return;
    startTransition(async () => {
      const supabase = createClient();
      await supabase
        .from("notifications")
        .update({ read_at: new Date().toISOString() })
        .eq("id", notificationId);
      router.refresh();
    });
  };

  if (isRead) return null;
  return (
    <Button variant="ghost" size="sm" onClick={handleClick} disabled={isPending}>
      Okundu işaretle
    </Button>
  );
}
