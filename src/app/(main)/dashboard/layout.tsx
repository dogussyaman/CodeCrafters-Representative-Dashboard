import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { MTSidebar } from "@/components/mt-sidebar";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import { ThemeSwitcher } from "@/app/(main)/dashboard/_components/sidebar/theme-switcher";
import { AppFooter } from "@/components/ui/app-footer";
import { FooterWrapper } from "./_components/footer-wrapper";

const ALLOWED_ROLES = ["admin", "platform_admin", "mt"] as const;

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/v2/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email, avatar_url, role")
    .eq("id", user.id)
    .single();

  const role = profile?.role;
  if (!role || !ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number])) {
    redirect("/unauthorized");
  }

  const isAdmin = role === "admin" || role === "platform_admin";
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {isAdmin ? (
        <AdminSidebar profile={profile} />
      ) : (
        <MTSidebar profile={profile} />
      )}
      <SidebarInset className="flex min-h-screen flex-col">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 h-4" />
          <div className="flex flex-1 items-center justify-end gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/bildirimler">
                <Bell className="size-4" />
                <span className="hidden sm:inline">Bildirimler</span>
              </Link>
            </Button>
            <form action="/api/auth/signout" method="post">
              <Button type="submit" variant="ghost" size="sm">
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Çıkış</span>
              </Button>
            </form>
            <ThemeSwitcher />
          </div>
        </header>
        <main className="min-h-screen flex-1 p-4 md:p-6">{children}</main>
        <FooterWrapper />
      </SidebarInset>
    </SidebarProvider>
  );
}
