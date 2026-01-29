export interface VipRequest {
  id: string;
  channel: "mail" | "telefon" | "whatsapp";
  customerEmail: string;
  reservationNumber: string;
  discountRate: string;
  reference: string;
  details?: string;
  files?: string[];
  isRecorded: boolean; // Kayıt girildi mi?
  createdAt: string;
  updatedAt?: string;
}

export type VipRequestFormData = Omit<VipRequest, "id" | "createdAt" | "updatedAt">;





