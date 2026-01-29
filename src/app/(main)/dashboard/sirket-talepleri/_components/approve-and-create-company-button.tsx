"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { toast } from "sonner";

export function ApproveAndCreateCompanyButton({
  requestId,
  status,
  createdCompanyId,
}: {
  requestId: string;
  status: string;
  createdCompanyId: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const canCreate = !createdCompanyId;
  const isApproved = status === "approved";
  const createHref = `/dashboard/sirket-olustur?from_request=${requestId}`;

  const handleApproveThenNavigate = () => {
    if (isApproved) {
      router.push(createHref);
      return;
    }
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase
        .from("company_requests")
        .update({ status: "approved" })
        .eq("id", requestId);
      if (error) {
        toast.error("Talep onaylanamadı: " + error.message);
        return;
      }
      toast.success("Talep onaylandı. Şirket oluşturma sayfasına yönlendiriliyorsunuz.");
      router.refresh();
      router.push(createHref);
    });
  };

  if (!canCreate) return null;

  const label = isApproved ? "Şirket olarak ekle" : "Onayla ve şirket olarak ekle";

  return (
    <Button
      variant={isApproved ? "outline" : "default"}
      size="sm"
      onClick={!isApproved ? handleApproveThenNavigate : undefined}
      disabled={isPending}
      asChild={isApproved}
    >
      {isApproved ? (
        <Link href={createHref}>
          <Building2 className="h-4 w-4 mr-1" />
          {label}
        </Link>
      ) : (
        <>
          <Building2 className="h-4 w-4 mr-1" />
          {isPending ? "İşleniyor..." : label}
        </>
      )}
    </Button>
  );
}
