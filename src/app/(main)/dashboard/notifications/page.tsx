"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { initialNotifications, type Notification } from "./_data/initial-notifications";
import { NotificationCard } from "./_components/notification-card";
import { NotificationFilters } from "./_components/notification-filters";

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(initialNotifications as any);
  const [tab, setTab] = useState("tum");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = items;

    // Tab filtering
    if (tab === "okunmamis") {
      result = result.filter((i) => i.unread && !i.archived);
    } else if (tab === "arsiv") {
      result = result.filter((i) => i.archived);
    } else if (tab === "favoriler") {
      result = result.filter((i) => i.favorite && !i.archived);
    } else if (tab === "sabitlenen") {
      result = result.filter((i) => i.pinned && !i.archived);
    } else {
      result = result.filter((i) => !i.archived);
    }

    // Search filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(query) ||
          i.message.toLowerCase().includes(query)
      );
    }

    // Sort: pinned first, then unread, then by time
    return result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      if (a.unread && !b.unread) return -1;
      if (!a.unread && b.unread) return 1;
      return 0;
    });
  }, [items, tab, searchQuery]);

  const toggleRead = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, unread: !i.unread } : i))
    );
    toast.success("Bildirim durumu güncellendi");
  };

  const toggleFavorite = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i))
    );
    const notification = items.find((i) => i.id === id);
    toast.success(
      notification?.favorite
        ? "Favorilerden kaldırıldı"
        : "Favorilere eklendi"
    );
  };

  const togglePin = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, pinned: !i.pinned } : i))
    );
    const notification = items.find((i) => i.id === id);
    toast.success(
      notification?.pinned ? "Sabitleme kaldırıldı" : "Bildirim sabitlendi"
    );
  };

  const archiveItem = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, archived: !i.archived } : i))
    );
    const notification = items.find((i) => i.id === id);
    toast.success(
      notification?.archived ? "Arşivden çıkarıldı" : "Arşivlendi"
    );
  };

  const addToReadySentences = (id: string) => {
    const notification = items.find((i) => i.id === id);
    if (notification) {
      // Burada hazır cümlelere ekleme işlemi yapılabilir
      toast.success("Hazır cümlelere eklendi");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <NotificationFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={tab}
        onTabChange={setTab}
        notifications={items}
      />

      <ScrollArea className="h-[calc(100vh-280px)] rounded-xl border p-4">
        {filtered.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>
                {searchQuery
                  ? "Arama sonucu bulunamadı"
                  : tab === "okunmamis"
                  ? "Okunmamış bildirim yok"
                  : tab === "favoriler"
                  ? "Favori bildirim yok"
                  : tab === "sabitlenen"
                  ? "Sabitlenmiş bildirim yok"
                  : tab === "arsiv"
                  ? "Arşivde bildirim yok"
                  : "Bildirim bulunmuyor"}
              </EmptyTitle>
              <EmptyDescription>
                {searchQuery
                  ? "Farklı bir arama terimi deneyin"
                  : "Yeni bildirimler geldiğinde burada görünecek"}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onToggleRead={toggleRead}
                onToggleFavorite={toggleFavorite}
                onTogglePin={togglePin}
                onArchive={archiveItem}
                onAddToReadySentences={addToReadySentences}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
