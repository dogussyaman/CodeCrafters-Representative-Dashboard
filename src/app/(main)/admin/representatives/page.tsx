"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus, Mail, Phone, Edit, Trash2, UserPlus } from "lucide-react";

// Mock data
const mockRepresentatives = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@codecrafters.com",
    phone: "+90 532 123 45 67",
    role: "Temsilci",
    unit: "SATIŞ BİRİMİ",
    status: "active",
    totalTasks: 12,
    completedTasks: 10,
    avatar: "",
  },
  {
    id: "2",
    name: "Ayşe Demir",
    email: "ayse.demir@codecrafters.com",
    phone: "+90 533 234 56 78",
    role: "Temsilci",
    unit: "MÜŞTERİ HİZMETLERİ",
    status: "active",
    totalTasks: 8,
    completedTasks: 7,
    avatar: "",
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    email: "mehmet.kaya@codecrafters.com",
    phone: "+90 534 345 67 89",
    role: "Yönetici",
    unit: "İKAME HİZMETLERİ",
    status: "active",
    totalTasks: 15,
    completedTasks: 14,
    avatar: "",
  },
  {
    id: "4",
    name: "Fatma Şahin",
    email: "fatma.sahin@codecrafters.com",
    phone: "+90 535 456 78 90",
    role: "Temsilci",
    unit: "OPERASYON BİRİMİ",
    status: "inactive",
    totalTasks: 5,
    completedTasks: 4,
    avatar: "",
  },
];

export default function RepresentativesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [unitFilter, setUnitFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredRepresentatives = mockRepresentatives.filter((rep) => {
    const matchesSearch =
      rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnit = unitFilter === "all" || rep.unit === unitFilter;
    const matchesStatus = statusFilter === "all" || rep.status === statusFilter;
    return matchesSearch && matchesUnit && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getPerformancePercentage = (completed: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Temsilci Yönetimi</h1>
          <p className="text-muted-foreground mt-2">
            Temsilci listesi, düzenleme ve yönetim işlemleri
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Yeni Temsilci
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Temsilci Ekle</DialogTitle>
              <DialogDescription>
                Sisteme yeni temsilci eklemek için formu doldurun
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Ad Soyad</label>
                <Input placeholder="Ad Soyad" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">E-posta</label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Telefon</label>
                <Input placeholder="+90 5XX XXX XX XX" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rol</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Rol seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temsilci">Temsilci</SelectItem>
                    <SelectItem value="yonetici">Yönetici</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Birim</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Birim seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="birim-a">SATIŞ BİRİMİ</SelectItem>
                    <SelectItem value="birim-b">MÜŞTERİ HİZMETLERİ</SelectItem>
                    <SelectItem value="birim-c">OPERASYON BİRİMİ</SelectItem>
                    <SelectItem value="birim-d">İKAME HİZMETLERİ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  İptal
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Ekle</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Temsilci</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRepresentatives.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockRepresentatives.filter((r) => r.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pasif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockRepresentatives.filter((r) => r.status === "inactive").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Performans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockRepresentatives.reduce(
                  (acc, r) =>
                    acc + getPerformancePercentage(r.completedTasks, r.totalTasks),
                  0
                ) / mockRepresentatives.length
              )}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtreler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="İsim veya e-posta ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={unitFilter} onValueChange={setUnitFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Birim" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Birimler</SelectItem>
                <SelectItem value="SATIŞ BİRİMİ">SATIŞ BİRİMİ</SelectItem>
                <SelectItem value="MÜŞTERİ HİZMETLERİ">MÜŞTERİ HİZMETLERİ</SelectItem>
                <SelectItem value="İKAME HİZMETLERİ">İKAME HİZMETLERİ</SelectItem>
                <SelectItem value="OPERASYON BİRİMİ">OPERASYON BİRİMİ</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Representatives Table */}
      <Card>
        <CardHeader>
          <CardTitle>Temsilci Listesi</CardTitle>
          <CardDescription>
            {filteredRepresentatives.length} temsilci bulundu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Temsilci</TableHead>
                <TableHead>İletişim</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Birim</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Performans</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepresentatives.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Temsilci bulunamadı
                  </TableCell>
                </TableRow>
              ) : (
                filteredRepresentatives.map((rep) => (
                  <TableRow key={rep.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={rep.avatar} />
                          <AvatarFallback>{getInitials(rep.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{rep.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {rep.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {rep.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{rep.role}</Badge>
                    </TableCell>
                    <TableCell>{rep.unit}</TableCell>
                    <TableCell>
                      <Badge
                        variant={rep.status === "active" ? "default" : "secondary"}
                      >
                        {rep.status === "active" ? "Aktif" : "Pasif"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">
                          {getPerformancePercentage(rep.completedTasks, rep.totalTasks)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ({rep.completedTasks}/{rep.totalTasks})
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}