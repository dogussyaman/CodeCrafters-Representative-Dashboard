"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { ChevronDown } from "lucide-react";
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

const suggestions = [
  "Merhaba, size nasıl yardımcı olabilirim?",
  "Sorunuzu inceliyorum.",
  "En kısa sürede dönüş yapacağım.",
  "Başka bir sorunuz var mı?",
];

export function ChatPanelMT({ mtUserId }: ChatPanelMTProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const prevLastIdRef = useRef<string | null>(null);

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

  // Yeni mesaj geldiğinde en alta kaydır (tek scroll container)
  useEffect(() => {
    const lastId = messages.length > 0 ? messages[messages.length - 1].id : null;
    if (lastId != null && lastId !== prevLastIdRef.current) {
      const el = scrollContainerRef.current;
      if (el) {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      }
      prevLastIdRef.current = lastId;
    }
    if (lastId == null) prevLastIdRef.current = null;
  }, [messages]);

  const checkScrollPosition = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const threshold = 80;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    setShowScrollButton(!nearBottom);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollPosition();
    el.addEventListener("scroll", checkScrollPosition);
    const ro = new ResizeObserver(checkScrollPosition);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScrollPosition);
      ro.disconnect();
    };
  }, [checkScrollPosition, messages.length]);

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex h-full w-full min-h-0 overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex w-64 shrink-0 flex-col overflow-hidden border-r border-border md:w-72">
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

      <div className="flex min-h-0 flex-1 flex-col min-w-0 overflow-hidden">
        {selectedConversationId ? (
          <>
            {/* Header - shrink-0 */}
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

            {/* Conversation alanı: tek scroll container */}
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden border-b border-border">
              <div
                ref={scrollContainerRef}
                className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
                role="region"
                aria-label="Sohbet mesajları"
              >
                <ChatMessageListMT
                  messages={messages}
                  currentUserId={mtUserId}
                  loading={loadingMessages}
                  otherPartyLabel={otherPartyLabel}
                  participantUserId={selectedConversation?.participant_user_id ?? undefined}
                  contentOnly
                />
              </div>
              {showScrollButton && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="rounded-full shadow-md"
                    onClick={scrollToBottom}
                  >
                    <ChevronDown className="size-4" />
                    <span className="sr-only">En alta git</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Suggestions + Input - shrink-0 */}
            <div className="shrink-0 space-y-4 pt-4">
              <div className="flex flex-wrap gap-2 px-4">
                {suggestions.map((s) => (
                  <Button
                    key={s}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs"
                    onClick={() => void sendMessage(s)}
                    disabled={sending || !selectedConversationId}
                  >
                    {s}
                  </Button>
                ))}
              </div>
              <div className="w-full px-4 pb-4">
                <ChatMessageInputMT
                  onSend={(content, urls) => sendMessage(content, urls)}
                  disabled={sending}
                  placeholder="Yanıt yazın..."
                  conversationId={selectedConversationId}
                  userId={mtUserId}
                />
              </div>
            </div>
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
