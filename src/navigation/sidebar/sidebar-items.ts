import { Car, Database, Book, HelpCircle, Search, MessageSquare, type LucideIcon, FileText, Bell } from "lucide-react";
import { COMPANY_CONFIG, type UnitTheme } from "@/config/company-config";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
  buttonVariant?: "default" | "outline";
  buttonSize?: "default" | "sm" | "lg";
  className?: string;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

const getThemeClasses = (theme: UnitTheme): string => {
  const themes: Record<UnitTheme, string> = {
    red: "bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 border-red-100/50 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-900/40 dark:border-red-900/50 data-[active=true]:bg-red-100 data-[active=true]:text-red-800 dark:data-[active=true]:bg-red-900/40",
    orange: "bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800 border-orange-100/50 dark:bg-orange-950/20 dark:text-orange-400 dark:hover:bg-orange-900/40 dark:border-orange-900/50 data-[active=true]:bg-orange-100 data-[active=true]:text-orange-800 dark:data-[active=true]:bg-orange-900/40",
    slate: "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-800 border-slate-100/50 dark:bg-slate-800/40 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:border-slate-700/50 data-[active=true]:bg-slate-100 data-[active=true]:text-slate-800 dark:data-[active=true]:bg-slate-800/60",
    blue: "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border-blue-100/50 dark:bg-blue-950/20 dark:text-blue-400 dark:hover:bg-blue-900/40 dark:border-blue-900/50 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-800 dark:data-[active=true]:bg-blue-900/40",
    gray: "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-800 border-gray-100/50 dark:bg-gray-800/40 dark:text-gray-300 dark:hover:bg-gray-800/60 dark:border-gray-700/50 data-[active=true]:bg-gray-100 data-[active=true]:text-gray-800 dark:data-[active=true]:bg-gray-800/60",
    zinc: "bg-zinc-50 text-zinc-900 hover:bg-zinc-100 hover:text-black border-zinc-100/50 dark:bg-zinc-800/40 dark:text-zinc-100 dark:hover:bg-zinc-800/60 dark:border-zinc-700/50 data-[active=true]:bg-zinc-100 data-[active=true]:text-black dark:data-[active=true]:bg-zinc-800/60",
    green: "bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 border-green-100/50 dark:bg-green-950/20 dark:text-green-400 dark:hover:bg-green-900/40 dark:border-green-900/50 data-[active=true]:bg-green-100 data-[active=true]:text-green-800 dark:data-[active=true]:bg-green-900/40",
  };

  return `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 border shadow-sm cursor-pointer ${themes[theme]}`;
};

const unitItems: NavMainItem[] = COMPANY_CONFIG.units.map((unit) => ({
  title: unit.name,
  url: `/units/${unit.slug}/genel`,
  icon: unit.icon,
  buttonVariant: "outline",
  buttonSize: "default",
  className: getThemeClasses(unit.theme),
  subItems: unit.features.map((feature) => ({
    title: feature.title,
    url: feature.urlSuffix
      ? `/units/${unit.slug}/${feature.urlSuffix}`
      : `/units/${unit.slug}`,
  })),
}));

export const sidebarItems: NavGroup[] = [
  {
    id: 100,
    label: "Birimler",
    items: unitItems,
  },
  {
    id: 200,
    label: "Diğer",
    items: [
      { title: "Şablonlar", url: "/dashboard/templates", icon: Database },
      { title: "Eğitim", url: "/dashboard/education", icon: Book },
      { title: "Yardım ve Destek", url: "/dashboard/help", icon: HelpCircle },
      { title: "Genel Arama", url: "/dashboard/search", icon: Search },
      { title: "Geri Bildirim", url: "/dashboard/feedback", icon: MessageSquare },
      { title: "OD Talep", url: "/dashboard/od-talep", icon: FileText },
      { title: "Hatırlatma", url: "/dashboard/reminding", icon: Bell },
    ],
  },
];
