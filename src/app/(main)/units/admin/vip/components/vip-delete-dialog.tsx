"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { VipRequest } from "./types";

interface VipDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vipRequest: VipRequest;
  onDelete: (id: string) => void;
}

export function VipDeleteDialog({
  open,
  onOpenChange,
  vipRequest,
  onDelete,
}: VipDeleteDialogProps) {
  const handleDelete = () => {
    onDelete(vipRequest.id);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>VIP Talebini Sil</AlertDialogTitle>
          <AlertDialogDescription>
            Bu işlem geri alınamaz. VIP talebi kalıcı olarak silinecektir.
            <br />
            <br />
            <strong>Rezervasyon No:</strong> {vipRequest.reservationNumber}
            <br />
            <strong>Müşteri E-postası:</strong> {vipRequest.customerEmail}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}





