"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Filter, Plus } from "lucide-react";

export default function Page() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rezervasyon Yönetimi</h1>
          <p className="text-muted-foreground mt-2">
            Tüm rezervasyonları görüntüleyin, yönetin ve takip edin
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Rezervasyon
        </Button>
      </div>

      {/* Filtreler */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Rezervasyon No</Label>
              <Input placeholder="Ara..." />
            </div>
            <div className="space-y-2">
              <Label>Müşteri Adı</Label>
              <Input placeholder="Ara..." />
            </div>
            <div className="space-y-2">
              <Label>Tarih Aralığı</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Durum</Label>
              <Input placeholder="Tümü" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Ara
            </Button>
            <Button variant="ghost">Temizle</Button>
          </div>
        </CardContent>
      </Card>

      {/* Rezervasyon Listesi */}
      <Card>
        <CardHeader>
          <CardTitle>Rezervasyonlar</CardTitle>
          <CardDescription>Toplam 24 aktif rezervasyon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">REZ-{String(item).padStart(6, "0")}</span>
                    <Badge variant="outline">Onaylandı</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Ahmet Yılmaz • 15.01.2025 - 20.01.2025</p>
                  <p className="text-sm">Toyota Corolla • İstanbul</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Detay
                  </Button>
                  <Button variant="outline" size="sm">
                    Düzenle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

