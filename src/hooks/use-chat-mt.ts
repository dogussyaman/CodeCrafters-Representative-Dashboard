"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ChatConversation, ChatMessage } from "@/types/chat";

const supabase = createClient();

export function useChatMT(mtUserId: string | undefined) {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  const fetchConversations = useCallback(async () => {
    setLoadingConversations(true);
    try {
      const { data, error } = await supabase
        .from("chat_conversations")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setConversations((data as ChatConversation[]) ?? []);
    } catch (e) {
      console.error("Chat conversations fetch error:", e);
      setConversations([]);
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  const fetchMessages = useCallback(async (conversationId: string, silent = false) => {
    if (!silent) setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages((data as ChatMessage[]) ?? []);
    } catch (e) {
      if (!silent) console.error("Chat messages fetch error:", e);
      if (!silent) setMessages([]);
    } finally {
      if (!silent) setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (!selectedConversationId) {
      setMessages([]);
      return;
    }
    fetchMessages(selectedConversationId);
  }, [selectedConversationId, fetchMessages]);

  /** Realtime: karşı taraftan gelen yeni mesajlar */
  useEffect(() => {
    if (!selectedConversationId) return;

    const channel = supabase
      .channel(`chat_messages:${selectedConversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `conversation_id=eq.${selectedConversationId}`,
        },
        (payload: { new: ChatMessage }) => {
          const newRow = payload.new;
          setMessages((prev) =>
            prev.some((m) => m.id === newRow.id) ? prev : [...prev, newRow]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConversationId]);

  /** Fallback: Realtime kapalıysa mesajları periyodik çek */
  useEffect(() => {
    if (!selectedConversationId) return;
    const interval = setInterval(() => {
      void fetchMessages(selectedConversationId, true);
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedConversationId, fetchMessages]);

  /** Realtime: konuşma listesi güncellemeleri (yeni konuşma, atanma, kapatma) */
  useEffect(() => {
    const channel = supabase
      .channel("chat_conversations_mt")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chat_conversations" },
        () => {
          void fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchConversations]);

  const assignToSelf = useCallback(
    async (conversationId: string) => {
      if (!mtUserId) return false;
      setSending(true);
      try {
        const { error } = await supabase
          .from("chat_conversations")
          .update({ mt_user_id: mtUserId, status: "in_progress" })
          .eq("id", conversationId);

        if (error) throw error;
        await fetchConversations();
        setSelectedConversationId(conversationId);
        return true;
      } catch (e) {
        console.error("Assign to self error:", e);
        return false;
      } finally {
        setSending(false);
      }
    },
    [mtUserId, fetchConversations]
  );

  const closeConversation = useCallback(
    async (conversationId: string) => {
      setSending(true);
      try {
        const { error } = await supabase
          .from("chat_conversations")
          .update({ status: "closed" })
          .eq("id", conversationId);

        if (error) throw error;
        await fetchConversations();
        if (selectedConversationId === conversationId) {
          setSelectedConversationId(null);
          setMessages([]);
        }
        return true;
      } catch (e) {
        console.error("Close conversation error:", e);
        return false;
      } finally {
        setSending(false);
      }
    },
    [fetchConversations, selectedConversationId]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!selectedConversationId || !mtUserId || !content.trim()) return false;
      setSending(true);
      try {
        const { data: newMessage, error } = await supabase
          .from("chat_messages")
          .insert({
            conversation_id: selectedConversationId,
            sender_id: mtUserId,
            content: content.trim(),
          })
          .select("*")
          .single();
        if (error) throw error;
        if (newMessage) {
          setMessages((prev) =>
            prev.some((m) => m.id === newMessage.id) ? prev : [...prev, newMessage as ChatMessage]
          );
        }
        return true;
      } catch (e) {
        console.error("Send message error:", e);
        return false;
      } finally {
        setSending(false);
      }
    },
    [selectedConversationId, mtUserId]
  );

  return {
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
    refetchConversations: fetchConversations,
  };
}
