import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Briefcase, TrendingUp } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">Kurumsal Satış Paneli</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ciro (Yıllık)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺12.5M</div>
            <p className="text-xs text-muted-foreground">Hedefin %85'i</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Fırsatlar</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">Potansiyel: ₺4.2M</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yeni Müşteriler</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">Bu ay kazanılan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dönüşüm Oranı</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%24</div>
            <p className="text-xs text-muted-foreground">Geçen aya göre +%2</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Satış Hunisi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Potansiyel (Lead)</span>
                <span className="text-sm text-muted-foreground">150</span>
              </div>
              <div className="h-4 w-full rounded-r-full bg-blue-100">
                <div className="h-full w-full rounded-r-full bg-blue-500" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Görüşülen</span>
                <span className="text-sm text-muted-foreground">85</span>
              </div>
              <div className="h-4 w-[80%] rounded-r-full bg-blue-100">
                <div className="h-full w-full rounded-r-full bg-blue-400" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Teklif Aşamasında</span>
                <span className="text-sm text-muted-foreground">45</span>
              </div>
              <div className="h-4 w-[60%] rounded-r-full bg-blue-100">
                <div className="h-full w-full rounded-r-full bg-blue-300" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sözleşme/Kapanış</span>
                <span className="text-sm text-muted-foreground">12</span>
              </div>
              <div className="h-4 w-[30%] rounded-r-full bg-blue-100">
                <div className="h-full w-full rounded-r-full bg-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Son İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">ABC Lojistik A.Ş.</p>
                    <p className="text-xs text-muted-foreground">Filo Kiralama - 15 Araç</p>
                  </div>
                  <div className="font-medium text-green-600">+₺450K</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}