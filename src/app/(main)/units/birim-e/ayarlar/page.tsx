import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-3xl">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Satış Ayarları</h1>
        <p className="text-sm text-muted-foreground">
          Satış hedefleri ve CRM yapılandırması.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Hedefler</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="monthly-target">Aylık Ciro Hedefi (TL)</Label>
              <Input id="monthly-target" type="number" defaultValue="1500000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conversion-target">Dönüşüm Oranı Hedefi (%)</Label>
              <Input id="conversion-target" type="number" defaultValue="25" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Otomasyon</h3>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Otomatik Teklif Hatırlatma</Label>
              <p className="text-sm text-muted-foreground">
                Teklif gönderildikten 3 gün sonra hatırlatma maili gönder.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Lead Skorlama</Label>
              <p className="text-sm text-muted-foreground">
                Müşteri etkileşimlerine göre otomatik puanlama yap.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">İptal</Button>
          <Button>Kaydet</Button>
        </div>
      </div>
    </div>
  );
}