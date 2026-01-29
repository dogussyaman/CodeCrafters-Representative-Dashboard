"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Calendar, TrendingUp, Users, DollarSign, FileText } from "lucide-react";

// Mock data
const mockSalesData = [
  { month: "Ocak", sales: 125000, reservations: 45 },
  { month: "Şubat", sales: 142000, reservations: 52 },
  { month: "Mart", sales: 158000, reservations: 58 },
  { month: "Nisan", sales: 165000, reservations: 61 },
  { month: "Mayıs", sales: 178000, reservations: 65 },
  { month: "Haziran", sales: 195000, reservations: 72 },
];

const mockUnitPerformance = [
  { unit: "SATIŞ BİRİMİ", revenue: 450000, growth: 12.5, tasks: 120 },
  { unit: "MÜŞTERİ HİZMETLERİ", revenue: 380000, growth: 8.3, tasks: 95 },
  { unit: "İKAME HİZMETLERİ", revenue: 320000, growth: 15.2, tasks: 78 },
  { unit: "OPERASYON BİRİMİ", revenue: 280000, growth: 5.7, tasks: 65 },
];

export default function AdminReportsPage() {
  const [period, setPeriod] = useState("month");
  const [reportType, setReportType] = useState("sales");

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Raporlar</h1>
          <p className="text-muted-foreground mt-2">
            Detaylı analiz ve performans raporları
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Bu Hafta</SelectItem>
              <SelectItem value="month">Bu Ay</SelectItem>
              <SelectItem value="quarter">Bu Çeyrek</SelectItem>
              <SelectItem value="year">Bu Yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Raporu İndir
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺1,430,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> önceki döneme göre
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Rezervasyon</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">523</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.3%</span> önceki döneme göre
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Temsilci</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Aktif kullanıcı sayısı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Büyüme</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10.4%</div>
            <p className="text-xs text-muted-foreground">Aylık büyüme oranı</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsList>
          <TabsTrigger value="sales">Satış Raporları</TabsTrigger>
          <TabsTrigger value="performance">Performans Raporları</TabsTrigger>
          <TabsTrigger value="units">Birim Raporları</TabsTrigger>
        </TabsList>

        {/* Sales Reports */}
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aylık Satış Trendi</CardTitle>
              <CardDescription>Son 6 ayın satış ve rezervasyon verileri</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ay</TableHead>
                    <TableHead className="text-right">Satış (₺)</TableHead>
                    <TableHead className="text-right">Rezervasyon</TableHead>
                    <TableHead className="text-right">Ortalama Değer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSalesData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{data.month}</TableCell>
                      <TableCell className="text-right">
                        {data.sales.toLocaleString("tr-TR")} ₺
                      </TableCell>
                      <TableCell className="text-right">{data.reservations}</TableCell>
                      <TableCell className="text-right">
                        {Math.round(data.sales / data.reservations).toLocaleString("tr-TR")} ₺
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Reports */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Temsilci Performans Raporu</CardTitle>
              <CardDescription>Birim bazlı performans metrikleri</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Birim</TableHead>
                    <TableHead className="text-right">Gelir (₺)</TableHead>
                    <TableHead className="text-right">Büyüme (%)</TableHead>
                    <TableHead className="text-right">Tamamlanan Görev</TableHead>
                    <TableHead className="text-right">Performans</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUnitPerformance.map((unit, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{unit.unit}</TableCell>
                      <TableCell className="text-right">
                        {unit.revenue.toLocaleString("tr-TR")} ₺
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={unit.growth > 10 ? "default" : "secondary"}>
                          +{unit.growth}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{unit.tasks}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">
                          {unit.growth > 10 ? "Yüksek" : unit.growth > 5 ? "Orta" : "Düşük"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Unit Reports */}
        <TabsContent value="units" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockUnitPerformance.map((unit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{unit.unit}</CardTitle>
                  <CardDescription>Detaylı birim raporu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Toplam Gelir</span>
                    <span className="text-lg font-semibold">
                      {unit.revenue.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Büyüme Oranı</span>
                    <Badge variant={unit.growth > 10 ? "default" : "secondary"}>
                      +{unit.growth}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tamamlanan Görev</span>
                    <span className="text-lg font-semibold">{unit.tasks}</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Detaylı Rapor
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}