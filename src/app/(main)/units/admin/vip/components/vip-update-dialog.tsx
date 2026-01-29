"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { VipRequest } from "./types";
import { toast } from "sonner";

interface VipUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vipRequest: VipRequest;
  onUpdate: (updated: VipRequest) => void;
}

export function VipUpdateDialog({
  open,
  onOpenChange,
  vipRequest,
  onUpdate,
}: VipUpdateDialogProps) {
  const [channel, setChannel] = useState<string>(vipRequest.channel);
  const [customerEmail, setCustomerEmail] = useState<string>(vipRequest.customerEmail);
  const [reservationNumber, setReservationNumber] = useState<string>(
    vipRequest.reservationNumber
  );
  const [discountRate, setDiscountRate] = useState<string>(vipRequest.discountRate);
  const [reference, setReference] = useState<string>(vipRequest.reference);
  const [details, setDetails] = useState<string>(vipRequest.details || "");
  const [isRecorded, setIsRecorded] = useState<boolean>(vipRequest.isRecorded);

  useEffect(() => {
    if (open) {
      setChannel(vipRequest.channel);
      setCustomerEmail(vipRequest.customerEmail);
      setReservationNumber(vipRequest.reservationNumber);
      setDiscountRate(vipRequest.discountRate);
      setReference(vipRequest.reference);
      setDetails(vipRequest.details || "");
      setIsRecorded(vipRequest.isRecorded);
    }
  }, [open, vipRequest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasyon
    if (!channel) {
      toast.error("Lütfen bir kanal seçin");
      return;
    }
    if (!customerEmail || !customerEmail.includes("@")) {
      toast.error("Geçerli bir e-posta adresi girin");
      return;
    }
    if (!reservationNumber) {
      toast.error("Rezervasyon numarası gereklidir");
      return;
    }
    if (!discountRate) {
      toast.error("İndirim oranı gereklidir");
      return;
    }
    if (!reference) {
      toast.error("Referans gereklidir");
      return;
    }

    const updated: VipRequest = {
      ...vipRequest,
      channel: channel as "mail" | "telefon" | "whatsapp",
      customerEmail,
      reservationNumber,
      discountRate,
      reference,
      details,
      isRecorded,
      updatedAt: new Date().toISOString(),
    };

    onUpdate(updated);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>VIP Talebi Güncelle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Talebin Geldiği Kanal</Label>
            <RadioGroup value={channel} onValueChange={setChannel} className="flex flex-row gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mail" id="update-channel-mail" />
                <Label htmlFor="update-channel-mail" className="cursor-pointer font-normal">
                  Mail
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="telefon" id="update-channel-telefon" />
                <Label htmlFor="update-channel-telefon" className="cursor-pointer font-normal">
                  Telefon
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whatsapp" id="update-channel-whatsapp" />
                <Label htmlFor="update-channel-whatsapp" className="cursor-pointer font-normal">
                  WhatsApp
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-customer-email">Müşteri Maili</Label>
            <Input
              id="update-customer-email"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="ornek@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-reservation-number">Rezervasyon Numarası</Label>
            <Input
              id="update-reservation-number"
              value={reservationNumber}
              onChange={(e) => setReservationNumber(e.target.value)}
              placeholder="Rezervasyon numarasını girin"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-discount-rate">İndirim Oranı (%)</Label>
            <Input
              id="update-discount-rate"
              type="text"
              inputMode="decimal"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              placeholder="Örn: 10 veya 15.5"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-reference">Referans</Label>
            <Input
              id="update-reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Referans bilgisini girin"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-details">Detay Bilgisi (Opsiyonel)</Label>
            <Textarea
              id="update-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Ek detay bilgilerini buraya yazabilirsiniz..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-recorded">Kayıt Girildi</Label>
            <RadioGroup
              value={isRecorded ? "evet" : "hayir"}
              onValueChange={(value) => setIsRecorded(value === "evet")}
              className="flex flex-row gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="evet" id="update-recorded-yes" />
                <Label htmlFor="update-recorded-yes" className="cursor-pointer font-normal">
                  Evet
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hayir" id="update-recorded-no" />
                <Label htmlFor="update-recorded-no" className="cursor-pointer font-normal">
                  Hayır
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit">Güncelle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}





