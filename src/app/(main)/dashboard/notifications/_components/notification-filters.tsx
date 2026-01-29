"use client";

import { Search, Filter, Archive, Star, Pin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Notification } from "../_data/initial-notifications";

interface NotificationFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications: Notification[];
  onBulkArchive?: () => void;
  onBulkMarkRead?: () => void;
  selectedCount?: number;
}

export function NotificationFilters({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  notifications,
  onBulkArchive,
  onBulkMarkRead,
  selectedCount = 0,
}: NotificationFiltersProps) {
  const unreadCount = notifications.filter((n) => n.unread && !n.archived).length;
  const archivedCount = notifications.filter((n) => n.archived).length;
  const favoriteCount = notifications.filter((n) => n.favorite && !n.archived).length;
  const pinnedCount = notifications.filter((n) => n.pinned && !n.archived).length;
  const totalCount = notifications.filter((n) => !n.archived).length;

  return (
    <div className="space-y-4">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Bildirimler</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Toplam {totalCount} bildirim
            {unreadCount > 0 && ` • ${unreadCount} okunmamış`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <Badge variant="default" className="mr-2">
              {selectedCount} seçili
            </Badge>
          )}
          {(onBulkArchive || onBulkMarkRead) && selectedCount > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="size-4 mr-2" />
                  Toplu İşlem
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toplu İşlemler</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {onBulkMarkRead && (
                  <DropdownMenuItem onClick={onBulkMarkRead}>
                    Okundu İşaretle
                  </DropdownMenuItem>
                )}
                {onBulkArchive && (
                  <DropdownMenuItem onClick={onBulkArchive}>
                    <Archive className="size-4 mr-2" />
                    Arşivle
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Bildirimlerde ara..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="tum" className="relative">
            Tümü
            {totalCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 min-w-5 px-1.5 text-xs"
              >
                {totalCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="okunmamis" className="relative">
            Okunmamış
            {unreadCount > 0 && (
              <Badge
                variant="default"
                className="ml-2 h-5 min-w-5 px-1.5 text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="favoriler" className="relative">
            <Star className="size-3.5 mr-1.5" />
            Favoriler
            {favoriteCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 min-w-5 px-1.5 text-xs"
              >
                {favoriteCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sabitlenen" className="relative">
            <Pin className="size-3.5 mr-1.5" />
            Sabitlenen
            {pinnedCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 min-w-5 px-1.5 text-xs"
              >
                {pinnedCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="arsiv" className="relative">
            <Archive className="size-3.5 mr-1.5" />
            Arşiv
            {archivedCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 min-w-5 px-1.5 text-xs"
              >
                {archivedCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}




