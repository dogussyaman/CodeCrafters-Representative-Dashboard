/** Canlı destek sohbeti – CodeCrafters ↔ MT */

export type ChatConversationStatus = "open" | "in_progress" | "closed";

export interface ChatConversation {
  id: string;
  support_ticket_id: string | null;
  participant_user_id: string;
  mt_user_id: string | null;
  status: ChatConversationStatus;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  attachment_urls?: string[];
  read_at: string | null;
  created_at: string;
}
