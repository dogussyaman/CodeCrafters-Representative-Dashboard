"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, CheckCircle2, XCircle, Info, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface WarrantyPackage {
  id: string;
  code: string;
  name: string;
  description: string;
  coverage: string[];
  exclusions: string[];
  benefits: string[];
  category: 'eco' | 'comfort' | 'prestige' | 'premium';
  isRecommended?: boolean;
}

const warrantyPackages: WarrantyPackage[] = [
  {
    id: '1',
    code: 'SM',
    name: 'Mini Güvence Paketi',
    description: 'Temel koruma paketi, günlük kullanım için ideal',
    coverage: ['Kasko teminatı', 'Trafik sigortası', 'Hırsızlık koruması'],
    exclusions: ['Cam kırılması', 'Lastik hasarı', 'İç döşeme hasarı'],
    benefits: ['Ekonomik fiyat', 'Hızlı onay', 'Geniş kapsam'],
    category: 'eco',
  },
  {
    id: '2',
    code: 'LCFA',
    name: 'Lastik Cam Far Ayna Güvencesi',
    description: 'Lastik, cam, far ve ayna hasarlarına özel koruma',
    coverage: ['Lastik değişimi', 'Cam tamiri/değişimi', 'Far ve ayna hasarları'],
    exclusions: ['Mekanik arızalar', 'Yakıt sistemi'],
    benefits: ['Özel koruma', 'Hızlı çözüm', 'Uygun maliyet'],
    category: 'eco',
  },
  {
    id: '3',
    code: 'MH',
    name: 'Mini Hasar Güvencesi',
    description: 'Küçük hasarlar için kapsamlı koruma',
    coverage: ['Çizik ve boya hasarları', 'Hafif çarpışmalar', 'Park hasarları'],
    exclusions: ['Büyük hasarlar', 'Motor arızaları'],
    benefits: ['Düşük muafiyet', 'Hızlı işlem', 'Geniş kapsam'],
    category: 'comfort',
  },
  {
    id: '4',
    code: 'FK',
    name: 'Ferdi Kaza Güvencesi',
    description: 'Sürücü ve yolcular için kaza güvencesi',
    coverage: ['Sürücü kaza güvencesi', 'Yolcu kaza güvencesi', 'Tıbbi masraflar'],
    exclusions: ['Doğal afetler', 'Spor aktiviteleri'],
    benefits: ['Kişisel koruma', 'Aile kapsamı', 'Yüksek teminat'],
    category: 'comfort',
  },
  {
    id: '5',
    code: 'IM',
    name: 'İhtiyari Mali Mesuliyet',
    description: 'Üçüncü şahıslara karşı ek koruma',
    coverage: ['Üçüncü şahıs hasarları', 'Maddi zararlar', 'Manevi tazminat'],
    exclusions: ['Sürücü hasarları', 'Araç hasarları'],
    benefits: ['Yüksek teminat', 'Yasal koruma', 'Kapsamlı güvence'],
    category: 'prestige',
    isRecommended: true,
  },
  {
    id: '6',
    code: 'PH',
    name: 'Premium Hasar Güvencesi',
    description: 'Tüm hasarlara karşı tam koruma paketi',
    coverage: ['Tüm hasar türleri', 'Cam ve lastik', 'İç döşeme', 'Mekanik arızalar'],
    exclusions: ['Yakıt masrafları', 'Trafik cezaları'],
    benefits: ['Sıfır muafiyet', 'Tam koruma', 'Öncelikli hizmet'],
    category: 'premium',
    isRecommended: true,
  },
];

const categoryColors = {
  eco: 'bg-green-500/10 text-green-700 border-green-500/20',
  comfort: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  prestige: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  premium: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
};

const categoryLabels = {
  eco: 'Eco',
  comfort: 'Konfor',
  prestige: 'Prestij',
  premium: 'Premium',
};

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const filteredPackages = selectedCategory === 'all' 
    ? warrantyPackages 
    : warrantyPackages.filter(pkg => pkg.category === selectedCategory);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} kopyalandı!`);
  };

  return (
    <div className="container mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-500/10 p-3">
            <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Güvence Paketleri</h1>
            <p className="text-muted-foreground mt-1">
              Müşterilerinize sunabileceğiniz güvence paketleri ve kapsam bilgileri
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="eco">Eco</TabsTrigger>
          <TabsTrigger value="comfort">Konfor</TabsTrigger>
          <TabsTrigger value="prestige">Prestij</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative overflow-hidden transition-all hover:shadow-xl cursor-pointer border-2 ${
              selectedPackage === pkg.id ? 'border-red-500 ring-2 ring-red-500/20' : 'border-border'
            } ${pkg.isRecommended ? 'ring-2 ring-amber-500/30' : ''}`}
            onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
          >
            {pkg.isRecommended && (
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-amber-500 text-white flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Önerilen
                </Badge>
              </div>
            )}
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={categoryColors[pkg.category]}>
                      {categoryLabels[pkg.category]}
                    </Badge>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {pkg.code}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-2">{pkg.name}</CardTitle>
                </div>
              </div>
              <CardDescription className="mt-2">{pkg.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Coverage */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold">Kapsam</span>
                </div>
                <ul className="space-y-1 ml-6">
                  {pkg.coverage.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold">Avantajlar</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pkg.benefits.map((benefit, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(`${pkg.name} - ${pkg.description}`, 'Paket bilgisi');
                  }}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Kopyala
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Detay
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Package Details */}
      {selectedPackage && (
        <Card className="border-2 border-red-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Detaylı Bilgi</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPackage(null)}
              >
                Kapat
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const pkg = warrantyPackages.find(p => p.id === selectedPackage);
              if (!pkg) return null;
              return (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      Kapsam Dışı
                    </h4>
                    <ul className="space-y-1 ml-6">
                      {pkg.exclusions.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-red-600 mt-1">×</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Not:</strong> Bu paket hakkında detaylı bilgi için müşteri hizmetlerimizle iletişime geçebilirsiniz.
                      Tüm paketler kurumsal ve lisanslı ofislerde geçerlidir.
                    </p>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
