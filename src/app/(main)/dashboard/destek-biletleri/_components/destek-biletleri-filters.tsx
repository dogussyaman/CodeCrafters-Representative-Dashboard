"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";

interface DestekBiletleriFiltersProps {
  currentStatus?: string;
  currentPriority?: string;
  currentType?: string;
  currentSearch?: string;
}

export function DestekBiletleriFilters({
  currentStatus,
  currentPriority,
  currentType,
  currentSearch,
}: DestekBiletleriFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch ?? "");
  const [status, setStatus] = useState(currentStatus ?? "");
  const [priority, setPriority] = useState(currentPriority ?? "");
  const [type, setType] = useState(currentType ?? "");

  const apply = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) params.set("q", search.trim());
    else params.delete("q");
    if (status) params.set("status", status);
    else params.delete("status");
    if (priority) params.set("priority", priority);
    else params.delete("priority");
    if (type) params.set("type", type);
    else params.delete("type");
    router.push(`/dashboard/destek-biletleri?${params.toString()}`);
  }, [search, status, priority, type, router, searchParams]);

  const clear = useCallback(() => {
    setSearch("");
    setStatus("");
    setPriority("");
    setType("");
    router.push("/dashboard/destek-biletleri");
  }, [router]);

  const hasFilters = currentStatus || currentPriority || currentType || (currentSearch && currentSearch.trim());

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border p-4 bg-muted/30">
      <div className="flex-1 min-w-[180px] space-y-1">
        <Label htmlFor="q">Arama (konu, açıklama, e-posta)</Label>
        <div className="flex gap-2">
          <Input
            id="q"
            placeholder="Ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            className="max-w-xs"
          />
          <Button type="button" size="icon" variant="secondary" onClick={apply}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-1">
        <Label>Durum</Label>
        <Select value={status || "all"} onValueChange={(v) => setStatus(v === "all" ? "" : v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Tümü" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="open">Açık</SelectItem>
            <SelectItem value="in_progress">İşlemde</SelectItem>
            <SelectItem value="resolved">Çözüldü</SelectItem>
            <SelectItem value="closed">Kapatıldı</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Öncelik</Label>
        <Select value={priority || "all"} onValueChange={(v) => setPriority(v === "all" ? "" : v)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Tümü" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="low">Düşük</SelectItem>
            <SelectItem value="medium">Orta</SelectItem>
            <SelectItem value="high">Yüksek</SelectItem>
            <SelectItem value="urgent">Acil</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Tür</Label>
        <Select value={type || "all"} onValueChange={(v) => setType(v === "all" ? "" : v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Tümü" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="login_error">Giriş hatası</SelectItem>
            <SelectItem value="feedback">Geri bildirim</SelectItem>
            <SelectItem value="technical">Teknik</SelectItem>
            <SelectItem value="other">Diğer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="secondary" onClick={apply}>
        Uygula
      </Button>
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clear}>
          <X className="h-4 w-4 mr-1" />
          Temizle
        </Button>
      )}
    </div>
  );
}
