"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { ChatConversation } from "@/types/chat";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { UserPlus } from "lucide-react";

const statusLabels: Record<string, string> = {
  open: "Açık",
  in_progress: "İşlemde",
  closed: "Kapatıldı",
};

interface ChatConversationListMTProps {
  conversations: ChatConversation[];
  selectedId: string | null;
  currentMtUserId: string;
  onSelect: (id: string) => void;
  onAssignToSelf: (id: string) => Promise<boolean>;
  loading: boolean;
  assigning: boolean;
}

export function ChatConversationListMT({
  conversations,
  selectedId,
  currentMtUserId,
  onSelect,
  onAssignToSelf,
  loading,
  assigning,
}: ChatConversationListMTProps) {
  return (
    <div className="flex h-full flex-col border-r border-border bg-muted/30">
      <div className="shrink-0 border-b border-border p-3">
        <span className="text-sm font-medium">Canlı destek kuyruğu</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-0.5 p-2">
          {loading && conversations.length === 0 ? (
            <div className="space-y-2 p-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              Henüz sohbet yok.
            </p>
          ) : (
            conversations.map((c) => {
              const isAssignedToMe = c.mt_user_id === currentMtUserId;
              const isUnassigned = !c.mt_user_id && c.status !== "closed";
              return (
                <div
                  key={c.id}
                  className={cn(
                    "flex flex-col gap-1.5 rounded-lg border border-transparent px-3 py-2.5 transition-colors hover:bg-muted",
                    selectedId === c.id && "border-primary/50 bg-muted"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(c.id)}
                    className="flex w-full flex-col gap-0.5 text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium">
                        {isAssignedToMe ? "Siz" : isUnassigned ? "Atanmadı" : "Başka MT"}
                      </span>
                      <Badge
                        variant={c.status === "closed" ? "secondary" : "default"}
                        className="shrink-0 text-xs"
                      >
                        {statusLabels[c.status] ?? c.status}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(c.updated_at), {
                        addSuffix: true,
                        locale: tr,
                      })}
                    </span>
                  </button>
                  {isUnassigned && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        void onAssignToSelf(c.id);
                      }}
                      disabled={assigning}
                    >
                      <UserPlus className="size-3" />
                      Üstlen
                    </Button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
