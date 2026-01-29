import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-3xl">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Filo Ayarları</h1>
        <p className="text-sm text-muted-foreground">
          Araç takip ve operasyon parametrelerini yönetin.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Alarm Limitleri</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="speed-limit">Hız Limiti (km/s)</Label>
              <Input id="speed-limit" type="number" defaultValue="120" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="daily-limit">Günlük Km Limiti</Label>
              <Input id="daily-limit" type="number" defaultValue="500" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Bildirim Tercihleri</h3>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Bakım Hatırlatıcıları</Label>
              <p className="text-sm text-muted-foreground">
                Bakım zamanı yaklaşan araçlar için bildirim gönder.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Mesai Dışı Kullanım</Label>
              <p className="text-sm text-muted-foreground">
                Mesai saatleri dışında araç kullanımı tespit edilirse bildir.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Varsayılanlara Dön</Button>
          <Button>Kaydet</Button>
        </div>
      </div>
    </div>
  );
}