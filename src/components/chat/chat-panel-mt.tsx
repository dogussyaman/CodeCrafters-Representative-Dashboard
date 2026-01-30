"use client";

import { useChatMT } from "@/hooks/use-chat-mt";
import { ChatConversationListMT } from "./chat-conversation-list-mt";
import { ChatMessageListMT } from "./chat-message-list-mt";
import { ChatMessageInputMT } from "./chat-message-input-mt";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

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

  const selectedConversation = selectedConversationId
    ? conversations.find((c) => c.id === selectedConversationId)
    : null;
  const canClose =
    selectedConversation &&
    selectedConversation.mt_user_id === mtUserId &&
    selectedConversation.status !== "closed";

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-[400px] overflow-hidden rounded-lg border border-border bg-card">
      <div className="w-64 shrink-0 md:w-72">
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
      <div className="flex flex-1 flex-col min-w-0">
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
            <ChatMessageListMT
              messages={messages}
              currentUserId={mtUserId}
              loading={loadingMessages}
            />
            <ChatMessageInputMT
              onSend={sendMessage}
              disabled={sending}
              placeholder="Yanıt yazın..."
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
