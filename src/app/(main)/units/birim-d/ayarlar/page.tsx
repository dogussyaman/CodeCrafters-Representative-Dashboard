import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-3xl">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Ayarlar</h1>
        <p className="text-sm text-muted-foreground">
          İkame birimi için genel yapılandırma ve tercihler.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Bildirim Ayarları</h3>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">E-posta Bildirimleri</Label>
              <p className="text-sm text-muted-foreground">
                Yeni talep geldiğinde e-posta al.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">SMS Bildirimleri</Label>
              <p className="text-sm text-muted-foreground">
                Acil durumlarda SMS ile bilgilendir.
              </p>
            </div>
            <Switch />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sistem Parametreleri</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="max-days">Maksimum Kiralama Süresi (Gün)</Label>
              <Input id="max-days" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buffer">Araç Hazırlık Süresi (Saat)</Label>
              <Input id="buffer" type="number" defaultValue="2" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">İptal</Button>
          <Button>Değişiklikleri Kaydet</Button>
        </div>
      </div>
    </div>
  );
}