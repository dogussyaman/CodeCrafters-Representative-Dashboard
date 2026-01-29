"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, CheckCircle2, Trash2, Search, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type Incident = {
  id: string;
  appName: string;
  duration: string;
  emails: string[];
  ticketId: string;
  details: string;
  image?: string;
  status: "Yeni" | "Çözüldü";
  createdAt: string;
};

export default function Page() {
  const [incidents, setIncidents] = React.useState<Incident[]>([]);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState<string>("tum");
  const [appFilter, setAppFilter] = React.useState<string>("tum");
  const [selected, setSelected] = React.useState<Incident | null>(null);

  React.useEffect(() => {
    const key = "vaka_bildirimleri";
    const existing = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    const list = existing ? (JSON.parse(existing) as Incident[]) : [];
    if (list.length === 0) {
      const initial: Incident[] = [
        {
          id: crypto.randomUUID(),
          appName: "Cep Sistemi",
          duration: "2 saat",
          emails: ["musteri1@example.com", "musteri2@example.com"],
          ticketId: "TIC-1001",
          details: "Girişte doğrulama hatası",
          status: "Yeni",
          createdAt: new Date().toISOString(),
        },
        {
          id: crypto.randomUUID(),
          appName: "Obisrac",
          duration: "1 gün",
          emails: ["destek@example.com"],
          ticketId: "TIC-1002",
          details: "Rapor indirme işlemi zaman aşımına uğruyor",
          status: "Yeni",
          createdAt: new Date().toISOString(),
        },
        {
          id: crypto.randomUUID(),
          appName: "WizRAC",
          duration: "45 dk",
          emails: ["kullanici@example.com"],
          ticketId: "TIC-1003",
          details: "Bildirimler görüntülenmiyor",
          status: "Çözüldü",
          createdAt: new Date().toISOString(),
        },
        {
          id: crypto.randomUUID(),
          appName: "Webphone",
          duration: "3 saat",
          emails: ["callcenter@example.com"],
          ticketId: "TIC-1004",
          details: "Çağrı sonlandırma sonrası kayıt oluşmuyor",
          status: "Yeni",
          createdAt: new Date().toISOString(),
        },
        {
          id: crypto.randomUUID(),
          appName: "Global Mail",
          duration: "12 saat",
          emails: ["mail@example.com"],
          ticketId: "TIC-1005",
          details: "Bazı domainlere mail çıkışı başarısız",
          status: "Yeni",
          createdAt: new Date().toISOString(),
        },
      ];
      if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(initial));
      setIncidents(initial);
    } else {
      setIncidents(list);
    }
  }, []);

  const persist = (list: Incident[]) => {
    const key = "vaka_bildirimleri";
    if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(list));
    setIncidents(list);
  };

  const markResolved = (id: string) => {
    const updated = incidents.map((i) => (i.id === id ? { ...i, status: "Çözüldü" } : i));
    persist(updated as Incident[]);
    toast.success("Vaka çözüldü olarak işaretlendi");
  };

  const removeIncident = (id: string) => {
    const updated = incidents.filter((i) => i.id !== id);
    persist(updated);
    toast.success("Vaka silindi");
  };

  const normalizedSearch = search.trim().toLowerCase();
  const apps = Array.from(new Set(incidents.map((i) => i.appName)));
  const filtered = incidents.filter((i) => {
    const matchesSearch =
      !normalizedSearch ||
      i.ticketId.toLowerCase().includes(normalizedSearch) ||
      i.details.toLowerCase().includes(normalizedSearch) ||
      i.emails.join(", ").toLowerCase().includes(normalizedSearch);
    const matchesStatus = status === "tum" || i.status === status;
    const matchesApp = appFilter === "tum" || i.appName === appFilter;
    return matchesSearch && matchesStatus && matchesApp;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Vaka Bildirimleri</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Toplam {incidents.length}</Badge>
          <Badge className="bg-blue-500/10 text-blue-600">Yeni {incidents.filter((i) => i.status === "Yeni").length}</Badge>
          <Badge className="bg-emerald-500/10 text-emerald-600">Çözülen {incidents.filter((i) => i.status === "Çözüldü").length}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtreler</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            <Input placeholder="TIC ID, detay veya e-posta" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Durum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tum">Tümü</SelectItem>
              <SelectItem value="Yeni">Yeni</SelectItem>
              <SelectItem value="Çözüldü">Çözüldü</SelectItem>
            </SelectContent>
          </Select>
          <Select value={appFilter} onValueChange={setAppFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Uygulama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tum">Tümü</SelectItem>
              {apps.map((a) => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <ScrollArea className="h-[70vh] rounded-xl border p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Uygulama</TableHead>
              <TableHead>TIC ID</TableHead>
              <TableHead>Süre</TableHead>
              <TableHead>E-postalar</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((i) => (
              <TableRow key={i.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{i.appName}</TableCell>
                <TableCell>{i.ticketId || "-"}</TableCell>
                <TableCell>{i.duration || "-"}</TableCell>
                <TableCell className="max-w-[280px] truncate">{i.emails.join(", ") || "-"}</TableCell>
                <TableCell>
                  {i.status === "Yeni" && <Badge className="bg-blue-500/10 text-blue-600">Yeni</Badge>}
                  {i.status === "Çözüldü" && <Badge className="bg-emerald-500/10 text-emerald-600">Çözüldü</Badge>}
                </TableCell>
                <TableCell>{new Date(i.createdAt).toLocaleString("tr-TR")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelected(i)}>
                      <Eye className="size-4" />
                    </Button>
                    {i.image ? (
                      <Button variant="outline" size="sm" onClick={() => setSelected(i)}>
                        <ImageIcon className="size-4" />
                      </Button>
                    ) : null}
                    {i.status !== "Çözüldü" && (
                      <Button variant="outline" size="sm" onClick={() => markResolved(i.id)}>
                        <CheckCircle2 className="size-4" />
                      </Button>
                    )}
                    <Button variant="destructive" size="sm" onClick={() => removeIncident(i.id)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Vaka Detayı</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="space-y-2 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Uygulama</span>
                      <span className="text-sm font-medium">{selected.appName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">TIC ID</span>
                      <span className="text-sm font-medium">{selected.ticketId || "-"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Süre</span>
                      <span className="text-sm font-medium">{selected.duration || "-"}</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-sm text-muted-foreground">E-postalar</span>
                      <span className="text-sm font-medium max-w-[260px] truncate">{selected.emails.join(", ") || "-"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Durum</span>
                      <span className="text-sm font-medium">{selected.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tarih</span>
                      <span className="text-sm font-medium">{new Date(selected.createdAt).toLocaleString("tr-TR")}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="space-y-2 p-4">
                    <div className="text-sm text-muted-foreground">Detay</div>
                    <div className="text-sm">{selected.details || "-"}</div>
                  </CardContent>
                </Card>
              </div>
              {selected.image && (
                <div className="rounded-lg border">
                  <Image src={selected.image} alt="Vaka görseli" width={1200} height={800} className="h-auto w-full" />
                </div>
              )}
              <div className="flex items-center justify-end gap-2">
                {selected.status !== "Çözüldü" && (
                  <Button onClick={() => selected && markResolved(selected.id)} variant="outline">
                    Çözüldü olarak işaretle
                  </Button>
                )}
                <Button onClick={() => selected && removeIncident(selected.id)} variant="destructive">
                  Sil
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
