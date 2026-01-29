"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Calendar, Car, FileText, Download, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface VehicleOption {
  id: string;
  group: string;
  segment: string;
  models: string[];
  basePrice: number;
  transmission: string;
  fuel: string;
}

const vehicleOptions: VehicleOption[] = [
  {
    id: '1',
    group: 'Ekonomik',
    segment: 'A',
    models: ['Renault Clio', 'Fiat Egea HB', 'Hyundai Bayon'],
    basePrice: 750,
    transmission: 'Manuel',
    fuel: 'Dizel/Benzin',
  },
  {
    id: '2',
    group: 'Ekonomik',
    segment: 'B',
    models: ['Fiat Egea', 'Citroen C-Elysee'],
    basePrice: 850,
    transmission: 'Manuel',
    fuel: 'Dizel/Benzin',
  },
  {
    id: '3',
    group: 'Konfor',
    segment: 'C',
    models: ['Renault Megane', 'Peugeot 308', 'VW Golf'],
    basePrice: 1100,
    transmission: 'Otomatik',
    fuel: 'Benzin',
  },
  {
    id: '4',
    group: 'Konfor',
    segment: 'D',
    models: ['Peugeot 3008', 'Hyundai Tucson', 'Kia Sportage'],
    basePrice: 1300,
    transmission: 'Otomatik',
    fuel: 'Dizel',
  },
  {
    id: '5',
    group: 'SUV',
    segment: 'E',
    models: ['Renault Captur', 'Skoda Kamiq', 'Dacia Duster'],
    basePrice: 1500,
    transmission: 'Otomatik',
    fuel: 'Dizel/Benzin',
  },
  {
    id: '6',
    group: 'Prestij',
    segment: 'F',
    models: ['BMW 3 Series', 'Mercedes C', 'Audi A4'],
    basePrice: 2000,
    transmission: 'Otomatik',
    fuel: 'Benzin/Hybrid',
  },
];

interface QuoteForm {
  vehicleId: string;
  startDate: string;
  endDate: string;
  days: number;
  customerName: string;
  customerEmail: string;
  notes: string;
}

export default function Page() {
  const [form, setForm] = useState<QuoteForm>({
    vehicleId: '',
    startDate: '',
    endDate: '',
    days: 0,
    customerName: '',
    customerEmail: '',
    notes: '',
  });

  const selectedVehicle = useMemo(
    () => vehicleOptions.find(v => v.id === form.vehicleId),
    [form.vehicleId]
  );

  const calculatePrice = () => {
    if (!selectedVehicle || form.days === 0) return 0;
    
    let price = selectedVehicle.basePrice * form.days;
    
    // İndirim hesaplamaları
    if (form.days >= 7) {
      price = price * 0.9; // %10 indirim
    } else if (form.days >= 4) {
      price = price * 0.95; // %5 indirim
    }
    
    return Math.round(price);
  };

  const totalPrice = calculatePrice();
  const dailyPrice = selectedVehicle ? selectedVehicle.basePrice : 0;

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    setForm(prev => {
      const newForm = { ...prev, [field]: value };
      
      if (newForm.startDate && newForm.endDate) {
        const start = new Date(newForm.startDate);
        const end = new Date(newForm.endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        newForm.days = diffDays > 0 ? diffDays : 0;
      }
      
      return newForm;
    });
  };

  const handleCopyQuote = () => {
    if (!selectedVehicle) {
      toast.error("Lütfen araç seçin");
      return;
    }

    const quoteText = `
FİYAT TEKLİFİ

Müşteri: ${form.customerName || 'Belirtilmemiş'}
E-posta: ${form.customerEmail || 'Belirtilmemiş'}

Araç Bilgileri:
- Grup: ${selectedVehicle.group}
- Segment: ${selectedVehicle.segment}
- Modeller: ${selectedVehicle.models.join(', ')}
- Şanzıman: ${selectedVehicle.transmission}
- Yakıt: ${selectedVehicle.fuel}

Kiralama Detayları:
- Başlangıç: ${form.startDate || 'Belirtilmemiş'}
- Bitiş: ${form.endDate || 'Belirtilmemiş'}
- Süre: ${form.days} gün

Fiyatlandırma:
- Günlük Fiyat: ${dailyPrice.toLocaleString('tr-TR')} TL
- Toplam: ${totalPrice.toLocaleString('tr-TR')} TL

${form.notes ? `Notlar: ${form.notes}` : ''}
    `.trim();

    navigator.clipboard.writeText(quoteText);
    toast.success("Teklif kopyalandı!");
  };

  const handleDownloadPDF = () => {
    toast.info("PDF indirme özelliği yakında eklenecek");
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-500/10 p-3">
            <Calculator className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fiyat Teklifi Hazırla</h1>
            <p className="text-muted-foreground mt-1">
              Müşterileriniz için özelleştirilmiş fiyat teklifleri oluşturun
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Araç Seçimi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Araç Grubu ve Segment</Label>
                <Select value={form.vehicleId} onValueChange={(value) => setForm(prev => ({ ...prev, vehicleId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Araç seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleOptions.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.group} - Segment {vehicle.segment} ({vehicle.transmission})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedVehicle && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Mevcut Modeller:</span>
                    <Badge variant="outline">{selectedVehicle.segment}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedVehicle.models.join(', ')}
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Şanzıman: {selectedVehicle.transmission}</span>
                    <span>Yakıt: {selectedVehicle.fuel}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rental Period */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Kiralama Süresi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Başlangıç Tarihi</Label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => handleDateChange('startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bitiş Tarihi</Label>
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => handleDateChange('endDate', e.target.value)}
                    min={form.startDate}
                  />
                </div>
              </div>
              {form.days > 0 && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm font-medium">
                    Toplam Kiralama Süresi: <span className="text-blue-600 dark:text-blue-400">{form.days} gün</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Müşteri Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Müşteri Adı</Label>
                <Input
                  placeholder="Müşteri adı soyadı"
                  value={form.customerName}
                  onChange={(e) => setForm(prev => ({ ...prev, customerName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>E-posta</Label>
                <Input
                  type="email"
                  placeholder="ornek@email.com"
                  value={form.customerEmail}
                  onChange={(e) => setForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Notlar (Opsiyonel)</Label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 text-sm border rounded-md resize-none"
                  placeholder="Ek notlar veya özel talepler..."
                  value={form.notes}
                  onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6 border-2 border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-red-600" />
                Fiyat Özeti
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedVehicle ? (
                <>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Günlük Fiyat</span>
                      <span className="font-semibold">{dailyPrice.toLocaleString('tr-TR')} TL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Süre</span>
                      <span className="font-semibold">{form.days} gün</span>
                    </div>
                    {form.days >= 7 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Uzun Süre İndirimi (%10)</span>
                        <span>-{Math.round(dailyPrice * form.days * 0.1).toLocaleString('tr-TR')} TL</span>
                      </div>
                    )}
                    {form.days >= 4 && form.days < 7 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Orta Süre İndirimi (%5)</span>
                        <span>-{Math.round(dailyPrice * form.days * 0.05).toLocaleString('tr-TR')} TL</span>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Toplam</span>
                    <span className="text-2xl font-bold text-red-600">
                      {totalPrice.toLocaleString('tr-TR')} TL
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      onClick={handleCopyQuote}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Kopyala
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleDownloadPDF}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Araç seçerek fiyat hesaplaması yapabilirsiniz
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Hızlı Bilgi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <p>• 4-6 gün arası %5 indirim</p>
              <p>• 7 gün ve üzeri %10 indirim</p>
              <p>• Fiyatlar KDV dahildir</p>
              <p>• Güvence paketleri ayrıca ücretlendirilir</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
