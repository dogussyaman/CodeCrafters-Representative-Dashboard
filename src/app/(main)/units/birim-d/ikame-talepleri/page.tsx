"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, Car, MapPin, Calendar } from "lucide-react";

export default function Page() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">İkame Talepleri</h1>
          <p className="text-muted-foreground mt-2">
            Sigorta şirketlerinden gelen ikame araç taleplerini yönetin
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Talep
        </Button>
      </div>

      {/* Arama ve Filtre */}
      <Card>
        <CardHeader>
          <CardTitle>Ara ve Filtrele</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Sigorta Şirketi</Label>
              <Input placeholder="Ara..." />
            </div>
            <div className="space-y-2">
              <Label>Bölge</Label>
              <Input placeholder="Ara..." />
            </div>
            <div className="space-y-2">
              <Label>Durum</Label>
              <Input placeholder="Tümü" />
            </div>
          </div>
          <div className="mt-4">
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Ara
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Talep Listesi */}
      <Card>
        <CardHeader>
          <CardTitle>Aktif İkame Talepleri</CardTitle>
          <CardDescription>Toplam 18 aktif talep</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">TAL-{String(item).padStart(6, "0")}</span>
                    <Badge variant="outline">Aktif</Badge>
                    <Badge variant="secondary">Acil</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Car className="h-4 w-4" />
                      <span>Ekonomik Sınıf</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>İstanbul</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>15.01.2025</span>
                    </div>
                  </div>
                  <p className="text-sm">Sigorta Şirketi: Anadolu Sigorta • Müşteri: Ahmet Yılmaz</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Detay
                  </Button>
                  <Button size="sm">Atama Yap</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

