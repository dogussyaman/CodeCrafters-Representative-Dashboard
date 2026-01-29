import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Wrench, Fuel, AlertTriangle } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">Filo Maestro Genel Bakış</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Araç</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12 bu ay</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bakımdaki Araçlar</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">3 kritik arıza</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aylık Yakıt Gideri</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺845.2K</div>
            <p className="text-xs text-muted-foreground">Geçen aya göre +%5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yaklaşan Muayene</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Bu hafta içinde</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Filo Durumu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Aktif Sahada</span>
                <span className="text-sm text-muted-foreground">1,150</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-full w-[92%] rounded-full bg-green-500" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bakım/Onarım</span>
                <span className="text-sm text-muted-foreground">42</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-full w-[3%] rounded-full bg-orange-500" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Park/Boşta</span>
                <span className="text-sm text-muted-foreground">56</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-full w-[5%] rounded-full bg-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Son Alarmlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-4 rounded-md border p-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-red-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Hız Limiti İhlali</p>
                    <p className="text-xs text-muted-foreground">34 ABC {200 + i} - E-5 Karayolu</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}