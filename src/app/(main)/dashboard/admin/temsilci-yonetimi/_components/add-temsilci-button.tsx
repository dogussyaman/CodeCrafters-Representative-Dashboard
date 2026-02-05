"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";

export function AddTemsilciButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Temsilci ekle
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Temsilci ekleme</DialogTitle>
          <DialogDescription>
            Yeni müşteri temsilcisi oluşturmak için Supabase Dashboard veya CodeCraftX ana uygulamasındaki admin panelini kullanın. Auth kullanıcısı oluşturulduktan sonra &quot;profiles&quot; tablosunda ilgili kullanıcının &quot;role&quot; alanını &quot;mt&quot; olarak güncelleyin.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
