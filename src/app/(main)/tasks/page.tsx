"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, CheckCircle2, Clock, AlertCircle, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const mockTasks = [
  {
    id: "1",
    title: "Müşteri geri bildirimlerini değerlendir",
    description: "Son 7 günde gelen müşteri geri bildirimlerini gözden geçir",
    priority: "high",
    status: "pending",
    dueDate: "2024-12-20",
    assignedTo: "Doğuş Yaman",
  },
  {
    id: "2",
    title: "Kampanya raporunu hazırla",
    description: "Aralık ayı kampanya performans raporunu hazırla",
    priority: "medium",
    status: "in_progress",
    dueDate: "2024-12-18",
    assignedTo: "Doğuş Yaman",
  },
  {
    id: "3",
    title: "Yeni şablonları sisteme ekle",
    description: "Yılbaşı kampanyası için hazırlanan şablonları ekle",
    priority: "low",
    status: "completed",
    dueDate: "2024-12-15",
    assignedTo: "Doğuş Yaman",
  },
  {
    id: "4",
    title: "Müşteri görüşmesi yap",
    description: "VIP müşteri ile yeni yıl teklifi görüşmesi",
    priority: "high",
    status: "pending",
    dueDate: "2024-12-19",
    assignedTo: "Doğuş Yaman",
  },
  {
    id: "5",
    title: "Rezervasyon onayları",
    description: "Bekleyen rezervasyon onaylarını tamamla",
    priority: "medium",
    status: "in_progress",
    dueDate: "2024-12-17",
    assignedTo: "Doğuş Yaman",
  },
];

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      high: "destructive",
      medium: "default",
      low: "secondary",
    };
    return (
      <Badge variant={variants[priority] || "secondary"}>
        {priority === "high" ? "Yüksek" : priority === "medium" ? "Orta" : "Düşük"}
      </Badge>
    );
  };

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && task.status === "pending") ||
      (activeTab === "in_progress" && task.status === "in_progress") ||
      (activeTab === "completed" && task.status === "completed");
    return matchesSearch && matchesPriority && matchesTab;
  });

  const stats = {
    all: mockTasks.length,
    pending: mockTasks.filter((t) => t.status === "pending").length,
    in_progress: mockTasks.filter((t) => t.status === "in_progress").length,
    completed: mockTasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Görevler</h1>
          <p className="text-muted-foreground mt-2">
            Görevlerinizi yönetin ve takip edin
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Görev
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Görev</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.all}</div>
            <p className="text-xs text-muted-foreground">Tüm görevler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Henüz başlanmadı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devam Eden</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.in_progress}</div>
            <p className="text-xs text-muted-foreground">İşlemde</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Bu ay</p>
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
                placeholder="Görev ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Öncelik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
                <SelectItem value="medium">Orta</SelectItem>
                <SelectItem value="low">Düşük</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Görev Listesi</CardTitle>
          <CardDescription>
            {filteredTasks.length} görev bulundu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Tümü ({stats.all})</TabsTrigger>
              <TabsTrigger value="pending">Bekleyen ({stats.pending})</TabsTrigger>
              <TabsTrigger value="in_progress">Devam Eden ({stats.in_progress})</TabsTrigger>
              <TabsTrigger value="completed">Tamamlanan ({stats.completed})</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Durum</TableHead>
                    <TableHead>Görev</TableHead>
                    <TableHead>Öncelik</TableHead>
                    <TableHead>Atanan</TableHead>
                    <TableHead>Bitiş Tarihi</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Görev bulunamadı
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{getStatusIcon(task.status)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {task.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                        <TableCell>{task.assignedTo}</TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Detay
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}