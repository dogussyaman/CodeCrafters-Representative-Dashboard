"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle2, Clock, Truck } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">Operasyon Genel Bakış</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Görevler</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 son saatte</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Talepler</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Ortalama bekleme: 14dk</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">Bugün</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sahadaki Araçlar</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">%85 doluluk</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Araç Teslimatı - 34 ABC {100 + i}</p>
                    <p className="text-sm text-muted-foreground">
                      İstanbul - Kadıköy Şubesi
                    </p>
                  </div>
                  <div className="ml-auto font-medium">Just now</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Operasyonel Durum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Araç Hazırlama</span>
                <span className="text-sm text-muted-foreground">%92</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-full w-[92%] rounded-full bg-primary" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Müşteri Memnuniyeti</span>
                <span className="text-sm text-muted-foreground">%88</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-full w-[88%] rounded-full bg-primary" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Zamanında Teslimat</span>
                <span className="text-sm text-muted-foreground">%95</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-full w-[95%] rounded-full bg-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}