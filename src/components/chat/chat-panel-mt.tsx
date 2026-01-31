"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useChatMT } from "@/hooks/use-chat-mt";
import { ChatConversationListMT } from "./chat-conversation-list-mt";
import { ChatMessageListMT } from "./chat-message-list-mt";
import { ChatMessageInputMT } from "./chat-message-input-mt";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

type ProfileRow = { full_name: string | null; role: string | null } | null;

function roleToLabel(role: string | null | undefined): string {
  if (!role) return "Kullanıcı";
  switch (role) {
    case "developer":
      return "Geliştirici";
    case "hr":
      return "İK";
    case "company_admin":
      return "Şirket";
    case "admin":
    case "platform_admin":
      return "Yönetici";
    default:
      return "Kullanıcı";
  }
}

interface ChatPanelMTProps {
  mtUserId: string;
}

export function ChatPanelMT({ mtUserId }: ChatPanelMTProps) {
  const {
    conversations,
    messages,
    selectedConversationId,
    setSelectedConversationId,
    loadingConversations,
    loadingMessages,
    sending,
    assignToSelf,
    closeConversation,
    sendMessage,
  } = useChatMT(mtUserId);

  const [otherPartyLabel, setOtherPartyLabel] = useState<string>("Kullanıcı");

  const selectedConversation = selectedConversationId
    ? conversations.find((c) => c.id === selectedConversationId)
    : null;

  useEffect(() => {
    if (!selectedConversation?.participant_user_id) {
      setOtherPartyLabel("Kullanıcı");
      return;
    }
    const participantId = selectedConversation.participant_user_id;
    const supabase = createClient();
    supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", participantId)
      .single()
      .then(({ data }: { data: ProfileRow }) => {
        const name = (data?.full_name ?? "").trim();
        setOtherPartyLabel(name || roleToLabel(data?.role));
      })
      .catch(() => setOtherPartyLabel("Kullanıcı"));
  }, [selectedConversation?.participant_user_id]);

  const canClose =
    selectedConversation &&
    selectedConversation.mt_user_id === mtUserId &&
    selectedConversation.status !== "closed";

  return (
    <div className="flex h-full min-h-[400px] overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex min-h-0 w-64 shrink-0 flex-col overflow-hidden md:w-72">
        <ChatConversationListMT
          conversations={conversations}
          selectedId={selectedConversationId}
          currentMtUserId={mtUserId}
          onSelect={setSelectedConversationId}
          onAssignToSelf={assignToSelf}
          loading={loadingConversations}
          assigning={sending}
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col min-w-0">
        {selectedConversationId ? (
          <>
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-2">
              <p className="text-sm text-muted-foreground">
                Canlı destek sohbeti — mesajlar anlık iletilir.
              </p>
              {canClose && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => void closeConversation(selectedConversationId)}
                  disabled={sending}
                  className="gap-1.5"
                >
                  <CheckCircle className="size-4" />
                  Kapat
                </Button>
              )}
            </div>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <ChatMessageListMT
                messages={messages}
                currentUserId={mtUserId}
                loading={loadingMessages}
                otherPartyLabel={otherPartyLabel}
                participantUserId={selectedConversation?.participant_user_id ?? undefined}
              />
            </div>
            <ChatMessageInputMT
              onSend={(content, urls) => sendMessage(content, urls)}
              disabled={sending}
              placeholder="Yanıt yazın..."
              conversationId={selectedConversationId}
              userId={mtUserId}
            />
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground">
            <p className="text-sm">Sohbet seçin veya &quot;Üstlen&quot; ile konuşmayı alın.</p>
          </div>
        )}
      </div>
    </div>
  );
}
