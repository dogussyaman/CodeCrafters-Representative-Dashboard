"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  BarChart3,
  UserPlus,
  Settings,
} from "lucide-react";

// Mock data
const recentTasks = [
  { id: "1", title: "Kampanya raporunu hazırla", assignee: "Ahmet Yılmaz", status: "completed" },
  { id: "2", title: "Yeni şablonları sisteme ekle", assignee: "Ayşe Demir", status: "in_progress" },
  { id: "3", title: "Müşteri geri bildirimlerini değerlendir", assignee: "Mehmet Kaya", status: "pending" },
];

const topPerformers = [
  { name: "Ahmet Yılmaz", unit: "SATIŞ BİRİMİ", performance: 95, tasks: 12 },
  { name: "Ayşe Demir", unit: "MÜŞTERİ HİZMETLERİ", performance: 92, tasks: 10 },
  { name: "Mehmet Kaya", unit: "İKAME HİZMETLERİ", performance: 88, tasks: 8 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Yönetici Paneli</h1>
          <p className="text-muted-foreground mt-2">
            Sistem genel bakış ve yönetim araçları
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺1,430,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> önceki aya göre
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
            <p className="text-xs text-muted-foreground">Toplam 48 temsilci</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Görevler</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">12 tamamlandı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Performans</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.7%</div>
            <p className="text-xs text-muted-foreground">Tüm birimler</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
          <Link href="/admin/tasks">
            <UserPlus className="mb-2 h-5 w-5" />
            <span className="font-semibold">Görev Ata</span>
            <span className="text-xs text-muted-foreground">Yeni görev oluştur</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
          <Link href="/admin/representatives">
            <Users className="mb-2 h-5 w-5" />
            <span className="font-semibold">Temsilci Yönet</span>
            <span className="text-xs text-muted-foreground">Temsilci ekle/düzenle</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
          <Link href="/admin/reports">
            <BarChart3 className="mb-2 h-5 w-5" />
            <span className="font-semibold">Raporları Görüntüle</span>
            <span className="text-xs text-muted-foreground">Detaylı analiz</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
          <Link href="/units/admin">
            <Settings className="mb-2 h-5 w-5" />
            <span className="font-semibold">Sistem Ayarları</span>
            <span className="text-xs text-muted-foreground">Yapılandırma</span>
          </Link>
        </Button>
      </div>

      {/* Recent Tasks & Top Performers */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Son Görevler</CardTitle>
                <CardDescription>En son atanan görevler</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/tasks">
                  Tümünü Gör
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {task.status === "completed" && (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      )}
                      {task.status === "in_progress" && (
                        <Clock className="h-4 w-4 text-blue-600" />
                      )}
                      {task.status === "pending" && (
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      )}
                      <span className="font-medium text-sm">{task.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{task.assignee}</p>
                  </div>
                  <Badge
                    variant={
                      task.status === "completed"
                        ? "default"
                        : task.status === "in_progress"
                        ? "default"
                        : "outline"
                    }
                  >
                    {task.status === "completed"
                      ? "Tamamlandı"
                      : task.status === "in_progress"
                      ? "Devam Ediyor"
                      : "Bekliyor"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>En İyi Performans Gösterenler</CardTitle>
            <CardDescription>Bu ay en yüksek performans gösteren temsilciler</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Temsilci</TableHead>
                  <TableHead>Birim</TableHead>
                  <TableHead className="text-right">Performans</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPerformers.map((performer, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{performer.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {performer.unit}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-semibold">%{performer.performance}</span>
                        <Badge variant="outline" className="text-xs">
                          {performer.tasks} görev
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}