"use client";

import { useState } from "react";
import {
  Archive,
  CheckCircle2,
  Clock,
  MessageSquarePlus,
  Star,
  Pin,
  MoreVertical,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { type Notification } from "../_data/initial-notifications";

interface NotificationCardProps {
  notification: Notification;
  onToggleRead: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onTogglePin: (id: string) => void;
  onArchive: (id: string) => void;
  onAddToReadySentences?: (id: string) => void;
}

const typeConfig = {
  gorev: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
  uyari: {
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  bilgi: {
    icon: MessageSquarePlus,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
};

export function NotificationCard({
  notification,
  onToggleRead,
  onToggleFavorite,
  onTogglePin,
  onArchive,
  onAddToReadySentences,
}: NotificationCardProps) {
  const [copied, setCopied] = useState(false);
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(notification.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Kopyalama hatası:", error);
    }
  };

  return (
    <Card
      className={cn(
        "group relative transition-all duration-300 hover:shadow-lg hover:shadow-primary/5",
        notification.pinned && "border-l-4 border-l-primary",
        notification.unread && "bg-primary/5 dark:bg-primary/10",
        notification.archived && "opacity-60"
      )}
    >
      {/* Pinned indicator */}
      {notification.pinned && (
        <div className="absolute top-2 right-2 z-10">
          <Pin className="size-4 text-primary fill-primary" />
        </div>
      )}

      {/* Favorite indicator */}
      {notification.favorite && (
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-yellow-500/20 border-l-[30px] border-l-transparent" />
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={cn(
                "flex items-center justify-center size-10 rounded-lg shrink-0",
                config.bgColor
              )}
            >
              <Icon className={cn("size-5", config.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className={cn(
                    "text-base font-semibold truncate",
                    notification.unread && "font-bold"
                  )}
                >
                  {notification.title}
                </h3>
                {notification.unread && (
                  <Badge variant="default" className="shrink-0">
                    Yeni
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {notification.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onToggleFavorite(notification.id)}
              className={cn(
                "transition-colors",
                notification.favorite &&
                  "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-950/30"
              )}
            >
              <Star
                className={cn(
                  "size-4",
                  notification.favorite && "fill-yellow-500"
                )}
              />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => onToggleRead(notification.id)}
                >
                  {notification.unread ? (
                    <>
                      <Check className="size-4" />
                      Okundu İşaretle
                    </>
                  ) : (
                    <>
                      <X className="size-4" />
                      Okunmadı Yap
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onTogglePin(notification.id)}
                >
                  <Pin
                    className={cn(
                      "size-4",
                      notification.pinned && "fill-current"
                    )}
                  />
                  {notification.pinned ? "Sabitlemeyi Kaldır" : "Sabitle"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="size-4" />
                      Kopyalandı
                    </>
                  ) : (
                    <>
                      <MessageSquarePlus className="size-4" />
                      Kopyala
                    </>
                  )}
                </DropdownMenuItem>
                {onAddToReadySentences && (
                  <DropdownMenuItem
                    onClick={() => onAddToReadySentences(notification.id)}
                  >
                    <MessageSquarePlus className="size-4" />
                    Hazır Cümlelere Ekle
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onArchive(notification.id)}
                  variant="destructive"
                >
                  <Archive className="size-4" />
                  {notification.archived ? "Arşivden Çıkar" : "Arşivle"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {notification.time}
          </Badge>
          <div className="flex items-center gap-2">
            {notification.favorite && (
              <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-600">
                <Star className="size-3 mr-1 fill-yellow-500" />
                Favori
              </Badge>
            )}
            {notification.pinned && (
              <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                <Pin className="size-3 mr-1" />
                Sabitli
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




