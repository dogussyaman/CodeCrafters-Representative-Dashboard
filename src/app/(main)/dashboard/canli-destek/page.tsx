import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { ChatPanelMT } from "@/components/chat/chat-panel-mt";

export default async function CanliDestekPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/v2/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const allowedRoles = ["mt", "admin", "platform_admin"];
  if (!profile?.role || !allowedRoles.includes(profile.role)) {
    redirect("/unauthorized");
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] min-h-[480px]">
      <div className="flex shrink-0 items-center gap-2">
        <MessageCircle className="size-6 text-primary" />
        <h1 className="text-2xl font-bold">Canlı Destek</h1>
      </div>
      <p className="mb-2 shrink-0 text-sm text-muted-foreground">
        CodeCrafters kullanıcılarıyla anlık sohbet. Sohbet seçin, &quot;Üstlen&quot; ile konuşmayı alın.
      </p>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ChatPanelMT mtUserId={user.id} />
      </div>
    </div>
  );
}
