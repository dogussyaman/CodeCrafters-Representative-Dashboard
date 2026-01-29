"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  Ticket,
  BookOpen,
  UserCog,
  Building2,
  Bell,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const mtMenuItems = [
  { title: "Panel", href: "/dashboard", icon: Home },
  { title: "İletişim Mesajları", href: "/dashboard/iletisim-mesajlari", icon: MessageSquare },
  { title: "Destek Biletleri", href: "/dashboard/destek-biletleri", icon: Ticket },
  { title: "Eğitim Talepleri", href: "/dashboard/egitim-talepleri", icon: BookOpen },
  { title: "Rol Talepleri", href: "/dashboard/rol-talepleri", icon: UserCog },
  { title: "Şirket Talepleri", href: "/dashboard/sirket-talepleri", icon: Building2 },
  { title: "Bildirimler", href: "/dashboard/bildirimler", icon: Bell },
];

interface MTSidebarProps {
  profile?: { full_name?: string; email?: string; avatar_url?: string } | null;
}

export function MTSidebar({ profile }: MTSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-base">CodeCrafters MT</span>
                  <span className="truncate text-xs text-muted-foreground">Temsilci</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        <SidebarMenu>
          {mtMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="size-5 shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {profile && (
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex flex-col gap-0.5 rounded-lg px-3 py-2 text-sm">
                <span className="truncate font-medium">{profile.full_name ?? "Temsilci"}</span>
                <span className="truncate text-xs text-muted-foreground">{profile.email}</span>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
