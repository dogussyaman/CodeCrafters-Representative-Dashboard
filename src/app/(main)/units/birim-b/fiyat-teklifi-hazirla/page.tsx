"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Calendar, Car, FileText, Download, Copy, Sparkles, TrendingDown } from "lucide-react";
import { toast } from "sonner";

interface VehicleOption {
  id: string;
  name: string;
  group: string;
  capacity: string;
  features: string[];
  basePrice: number;
}

const vehicleOptions: VehicleOption[] = [
  {
    id: '1',
    name: 'Ekonomik Araçlar',
    group: 'A-B Segment',
    capacity: '4-5 Kişi',
    features: ['Manuel Şanzıman', 'Dizel/Benzin', 'Temel Donanım'],
    basePrice: 600,
  },
  {
    id: '2',
    name: 'Orta Segment Araçlar',
    group: 'C-D Segment',
    capacity: '5 Kişi',
    features: ['Otomatik Şanzıman', 'Dizel/Benzin', 'Orta Donanım'],
    basePrice: 900,
  },
  {
    id: '3',
    name: 'SUV Araçlar',
    group: 'E Segment',
    capacity: '5-7 Kişi',
    features: ['Otomatik Şanzıman', 'Dizel/Benzin', 'Yüksek Donanım'],
    basePrice: 1200,
  },
  {
    id: '4',
    name: 'Premium Araçlar',
    group: 'F Segment',
    capacity: '5 Kişi',
    features: ['Otomatik Şanzıman', 'Hybrid/Benzin', 'Lüks Donanım'],
    basePrice: 1800,
  },
];

interface QuoteForm {
  vehicleId: string;
  rentalType: 'daily' | 'weekly' | 'monthly';
  duration: number;
  customerName: string;
  customerPhone: string;
  specialRequests: string;
}

export default function Page() {
  const [form, setForm] = useState<QuoteForm>({
    vehicleId: '',
    rentalType: 'daily',
    duration: 1,
    customerName: '',
    customerPhone: '',
    specialRequests: '',
  });

  const selectedVehicle = useMemo(
    () => vehicleOptions.find(v => v.id === form.vehicleId),
    [form.vehicleId]
  );

  const calculatePrice = () => {
    if (!selectedVehicle) return 0;
    
    let basePrice = selectedVehicle.basePrice;
    let totalPrice = 0;
    
    switch (form.rentalType) {
      case 'daily':
        totalPrice = basePrice * form.duration;
        if (form.duration >= 7) totalPrice *= 0.88; // %12 indirim
        else if (form.duration >= 4) totalPrice *= 0.92; // %8 indirim
        break;
      case 'weekly':
        totalPrice = basePrice * 7 * form.duration * 0.85; // %15 indirim
        break;
      case 'monthly':
        totalPrice = basePrice * 30 * form.duration * 0.75; // %25 indirim
        break;
    }
    
    return Math.round(totalPrice);
  };

  const totalPrice = calculatePrice();
  const dailyPrice = selectedVehicle ? selectedVehicle.basePrice : 0;
  const discount = selectedVehicle && form.duration > 0 
    ? form.rentalType === 'monthly' ? 25 
    : form.rentalType === 'weekly' ? 15 
    : form.duration >= 7 ? 12 
    : form.duration >= 4 ? 8 
    : 0 
    : 0;

  const handleCopyQuote = () => {
    if (!selectedVehicle) {
      toast.error("Lütfen araç seçin");
      return;
    }

    const rentalTypeText = {
      daily: 'Günlük',
      weekly: 'Haftalık',
      monthly: 'Aylık',
    };

    const quoteText = `
FİYAT TEKLİFİ - MÜŞTERİ HİZMETLERİ

Müşteri Bilgileri:
- Ad Soyad: ${form.customerName || 'Belirtilmemiş'}
- Telefon: ${form.customerPhone || 'Belirtilmemiş'}

Araç Bilgileri:
- Araç: ${selectedVehicle.name}
- Grup: ${selectedVehicle.group}
- Kapasite: ${selectedVehicle.capacity}
- Özellikler: ${selectedVehicle.features.join(', ')}

Kiralama Detayları:
- Kiralama Tipi: ${rentalTypeText[form.rentalType]}
- Süre: ${form.duration} ${form.rentalType === 'daily' ? 'gün' : form.rentalType === 'weekly' ? 'hafta' : 'ay'}

Fiyatlandırma:
- Günlük Baz Fiyat: ${dailyPrice.toLocaleString('tr-TR')} TL
${discount > 0 ? `- İndirim Oranı: %${discount}` : ''}
- Toplam Tutar: ${totalPrice.toLocaleString('tr-TR')} TL

${form.specialRequests ? `Özel İstekler: ${form.specialRequests}` : ''}

Not: Fiyatlar KDV dahildir. Güvence paketleri ayrıca ücretlendirilir.
    `.trim();

    navigator.clipboard.writeText(quoteText);
    toast.success("Teklif kopyalandı!");
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-500/10 p-3">
            <Calculator className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Fiyat Teklifi Oluştur</h1>
            <p className="text-muted-foreground mt-1">
              Müşterileriniz için hızlı ve kolay fiyat teklifi hazırlayın
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
            <CardContent>
              <RadioGroup value={form.vehicleId} onValueChange={(value) => setForm(prev => ({ ...prev, vehicleId: value }))}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicleOptions.map((vehicle) => (
                    <label
                      key={vehicle.id}
                      className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        form.vehicleId === vehicle.id
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                          : 'border-border hover:border-orange-300'
                      }`}
                    >
                      <RadioGroupItem value={vehicle.id} className="mt-1" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{vehicle.name}</span>
                          <Badge variant="outline">{vehicle.group}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{vehicle.capacity}</p>
                        <div className="flex flex-wrap gap-1">
                          {vehicle.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm font-medium text-orange-600">
                          {vehicle.basePrice.toLocaleString('tr-TR')} TL/gün
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Rental Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Kiralama Detayları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Kiralama Tipi</Label>
                <RadioGroup value={form.rentalType} onValueChange={(value: any) => setForm(prev => ({ ...prev, rentalType: value }))}>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily" className="cursor-pointer">Günlük</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly" className="cursor-pointer">Haftalık</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly" className="cursor-pointer">Aylık</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Süre</Label>
                <Input
                  type="number"
                  min="1"
                  value={form.duration}
                  onChange={(e) => setForm(prev => ({ ...prev, duration: parseInt(e.target.value) || 1 }))}
                  placeholder="Kiralama süresi"
                />
                {form.duration > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Toplam: {form.duration} {form.rentalType === 'daily' ? 'gün' : form.rentalType === 'weekly' ? 'hafta' : 'ay'}
                  </p>
                )}
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ad Soyad</Label>
                  <Input
                    placeholder="Müşteri adı soyadı"
                    value={form.customerName}
                    onChange={(e) => setForm(prev => ({ ...prev, customerName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefon</Label>
                  <Input
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    value={form.customerPhone}
                    onChange={(e) => setForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Özel İstekler (Opsiyonel)</Label>
                <textarea
                  className="w-full min-h-[80px] px-3 py-2 text-sm border rounded-md resize-none"
                  placeholder="Ek hizmetler, özel talepler..."
                  value={form.specialRequests}
                  onChange={(e) => setForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6 border-2 border-orange-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-600" />
                Fiyat Hesaplama
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedVehicle ? (
                <>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Araç</span>
                      <span className="font-semibold">{selectedVehicle.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Günlük Fiyat</span>
                      <span className="font-semibold">{dailyPrice.toLocaleString('tr-TR')} TL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Kiralama Tipi</span>
                      <span className="font-semibold">
                        {form.rentalType === 'daily' ? 'Günlük' : form.rentalType === 'weekly' ? 'Haftalık' : 'Aylık'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Süre</span>
                      <span className="font-semibold">
                        {form.duration} {form.rentalType === 'daily' ? 'gün' : form.rentalType === 'weekly' ? 'hafta' : 'ay'}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600 items-center">
                        <span className="flex items-center gap-1">
                          <TrendingDown className="h-4 w-4" />
                          İndirim
                        </span>
                        <span className="font-semibold">%{discount}</span>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Toplam</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {totalPrice.toLocaleString('tr-TR')} TL
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                      onClick={handleCopyQuote}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Teklifi Kopyala
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toast.info("PDF indirme özelliği yakında eklenecek")}
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
              <CardTitle className="text-sm">İndirim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <TrendingDown className="h-3 w-3 text-green-600" />
                4-6 gün arası %8 indirim
              </p>
              <p className="flex items-center gap-2">
                <TrendingDown className="h-3 w-3 text-green-600" />
                7 gün ve üzeri %12 indirim
              </p>
              <p className="flex items-center gap-2">
                <TrendingDown className="h-3 w-3 text-green-600" />
                Haftalık kiralama %15 indirim
              </p>
              <p className="flex items-center gap-2">
                <TrendingDown className="h-3 w-3 text-green-600" />
                Aylık kiralama %25 indirim
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

