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
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="size-6 text-primary" />
        <h1 className="text-2xl font-bold">Canlı Destek</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        CodeCrafters kullanıcılarıyla anlık sohbet. Sohbet seçin, &quot;Üstlen&quot; ile konuşmayı alın.
      </p>
      <ChatPanelMT mtUserId={user.id} />
    </div>
  );
}
