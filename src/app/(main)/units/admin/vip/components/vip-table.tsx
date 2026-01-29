"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Search, Mail, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { VipRequest } from "./types";
import { VipUpdateDialog } from "./vip-update-dialog";
import { VipDeleteDialog } from "./vip-delete-dialog";

const STORAGE_KEY = "vip_requests";

interface VipTableProps {
  onDataChange?: () => void;
}

export function VipTable({ onDataChange }: VipTableProps) {
  const [vipRequests, setVipRequests] = useState<VipRequest[]>([]);
  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState<string>("tum");
  const [recordedFilter, setRecordedFilter] = useState<string>("tum");
  const [selectedForUpdate, setSelectedForUpdate] = useState<VipRequest | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<VipRequest | null>(null);

  // localStorage'dan verileri yükle
  useEffect(() => {
    loadVipRequests();
    
    // localStorage değişikliklerini dinle (diğer sekmelerden gelen veriler için)
    const handleStorageChange = () => {
      loadVipRequests();
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // Polling ile anlık güncelleme (aynı sekmede)
    const interval = setInterval(() => {
      loadVipRequests();
    }, 1000);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getDummyData = (): VipRequest[] => {
    const now = new Date();
    
    return [
      {
        id: crypto.randomUUID(),
        channel: "mail",
        customerEmail: "ahmet.yilmaz@example.com",
        reservationNumber: "RES-2024-001",
        discountRate: "15",
        reference: "REF-001",
        details: "VIP müşteri için özel indirim talebi",
        files: [],
        isRecorded: true,
        createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        channel: "telefon",
        customerEmail: "mehmet.demir@example.com",
        reservationNumber: "RES-2024-002",
        discountRate: "20",
        reference: "REF-002",
        details: "Telefon ile gelen VIP talebi",
        files: [],
        isRecorded: false,
        createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        channel: "whatsapp",
        customerEmail: "ayse.kaya@example.com",
        reservationNumber: "RES-2024-003",
        discountRate: "10",
        reference: "REF-003",
        details: "WhatsApp üzerinden iletişim kuruldu",
        files: [],
        isRecorded: true,
        createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        channel: "mail",
        customerEmail: "fatma.oz@example.com",
        reservationNumber: "RES-2024-004",
        discountRate: "25",
        reference: "REF-004",
        details: "Kurumsal müşteri indirimi",
        files: [],
        isRecorded: false,
        createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        channel: "telefon",
        customerEmail: "ali.celik@example.com",
        reservationNumber: "RES-2024-005",
        discountRate: "18",
        reference: "REF-005",
        details: "Uzun süreli müşteri için özel fiyat",
        files: [],
        isRecorded: true,
        createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        channel: "whatsapp",
        customerEmail: "zeynep.arslan@example.com",
        reservationNumber: "RES-2024-006",
        discountRate: "12",
        reference: "REF-006",
        details: "Hızlı onay gerekiyor",
        files: [],
        isRecorded: false,
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        channel: "mail",
        customerEmail: "mustafa.sahin@example.com",
        reservationNumber: "RES-2024-007",
        discountRate: "22",
        reference: "REF-007",
        details: "Toplu rezervasyon için indirim",
        files: [],
        isRecorded: true,
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        channel: "telefon",
        customerEmail: "elif.yildiz@example.com",
        reservationNumber: "RES-2024-008",
        discountRate: "16",
        reference: "REF-008",
        details: "VIP üyelik avantajı",
        files: [],
        isRecorded: false,
        createdAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        channel: "whatsapp",
        customerEmail: "burak.ak@example.com",
        reservationNumber: "RES-2024-009",
        discountRate: "14",
        reference: "REF-009",
        details: "Özel etkinlik için rezervasyon",
        files: [],
        isRecorded: true,
        createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        channel: "mail",
        customerEmail: "seda.tek@example.com",
        reservationNumber: "RES-2024-010",
        discountRate: "19",
        reference: "REF-010",
        details: "Yeniden rezervasyon müşterisi",
        files: [],
        isRecorded: false,
        createdAt: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
      },
    ];
  };

  const loadVipRequests = () => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      let data = stored ? (JSON.parse(stored) as VipRequest[]) : [];
      
      // Eğer veri yoksa dummy verileri yükle
      if (data.length === 0) {
        data = getDummyData();
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
      }
      
      setVipRequests(data);
    } catch (error) {
      console.error("VIP verileri yüklenirken hata:", error);
      setVipRequests([]);
    }
  };

  const saveVipRequests = (data: VipRequest[]) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setVipRequests(data);
        onDataChange?.();
      }
    } catch (error) {
      console.error("VIP verileri kaydedilirken hata:", error);
      toast.error("Veriler kaydedilemedi");
    }
  };

  const handleToggleRecorded = (id: string, currentValue: boolean) => {
    const updated = vipRequests.map((req) =>
      req.id === id
        ? { ...req, isRecorded: !currentValue, updatedAt: new Date().toISOString() }
        : req
    );
    saveVipRequests(updated);
    toast.success(`Kayıt durumu ${!currentValue ? "Evet" : "Hayır"} olarak güncellendi`);
  };

  const handleUpdate = (updated: VipRequest) => {
    const updatedList = vipRequests.map((req) =>
      req.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : req
    );
    saveVipRequests(updatedList);
    setSelectedForUpdate(null);
    toast.success("VIP talebi güncellendi");
  };

  const handleDelete = (id: string) => {
    const updated = vipRequests.filter((req) => req.id !== id);
    saveVipRequests(updated);
    setSelectedForDelete(null);
    toast.success("VIP talebi silindi");
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "mail":
        return <Mail className="w-4 h-4" />;
      case "telefon":
        return <Phone className="w-4 h-4" />;
      case "whatsapp":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case "mail":
        return "Mail";
      case "telefon":
        return "Telefon";
      case "whatsapp":
        return "WhatsApp";
      default:
        return channel;
    }
  };

  const normalizedSearch = search.trim().toLowerCase();
  const filtered = vipRequests.filter((req) => {
    const matchesSearch =
      !normalizedSearch ||
      req.customerEmail.toLowerCase().includes(normalizedSearch) ||
      req.reservationNumber.toLowerCase().includes(normalizedSearch) ||
      req.reference.toLowerCase().includes(normalizedSearch) ||
      req.details?.toLowerCase().includes(normalizedSearch);
    
    const matchesChannel = channelFilter === "tum" || req.channel === channelFilter;
    const matchesRecorded =
      recordedFilter === "tum" ||
      (recordedFilter === "evet" && req.isRecorded) ||
      (recordedFilter === "hayir" && !req.isRecorded);
    
    return matchesSearch && matchesChannel && matchesRecorded;
  });

  return (
    <>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>Rezervasyon Yapılan VIP Verileri</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            <Input
              placeholder="E-posta, rezervasyon no, referans ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Kanal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tum">Tüm Kanallar</SelectItem>
              <SelectItem value="mail">Mail</SelectItem>
              <SelectItem value="telefon">Telefon</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
          <Select value={recordedFilter} onValueChange={setRecordedFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Kayıt Durumu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tum">Tümü</SelectItem>
              <SelectItem value="evet">Kayıt Girildi</SelectItem>
              <SelectItem value="hayir">Kayıt Girilmedi</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kanal</TableHead>
                  <TableHead>Müşteri E-postası</TableHead>
                  <TableHead>Rezervasyon No</TableHead>
                  <TableHead>İndirim Oranı</TableHead>
                  <TableHead>Referans</TableHead>
                  <TableHead>Kayıt Girildi</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      {vipRequests.length === 0
                        ? "Henüz VIP talebi bulunmamaktadır."
                        : "Arama kriterlerinize uygun kayıt bulunamadı."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((req) => (
                    <TableRow key={req.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getChannelIcon(req.channel)}
                          <span className="text-sm">{getChannelLabel(req.channel)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{req.customerEmail}</TableCell>
                      <TableCell>{req.reservationNumber}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{req.discountRate}%</Badge>
                      </TableCell>
                      <TableCell>{req.reference}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={req.isRecorded}
                            onCheckedChange={() => handleToggleRecorded(req.id, req.isRecorded)}
                            color='green'
                          />
                          <span className="text-sm text-muted-foreground">
                            {req.isRecorded ? "Evet" : "Hayır"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(req.createdAt).toLocaleString("tr-TR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedForUpdate(req)}
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setSelectedForDelete(req)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-10">
        <Button>
            Rapor Hazırla
        </Button>
      </div>

      {selectedForUpdate && (
        <VipUpdateDialog
          open={!!selectedForUpdate}
          onOpenChange={(open) => !open && setSelectedForUpdate(null)}
          vipRequest={selectedForUpdate}
          onUpdate={handleUpdate}
        />
      )}

      {selectedForDelete && (
        <VipDeleteDialog
          open={!!selectedForDelete}
          onOpenChange={(open) => !open && setSelectedForDelete(null)}
          vipRequest={selectedForDelete}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

