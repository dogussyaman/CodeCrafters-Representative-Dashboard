"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, AlertCircle, CheckCircle, Info, Copy, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface WarrantyPackage {
  id: string;
  code: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  features: {
    included: string[];
    excluded: string[];
  };
  suitableFor: string[];
  category: 'eco' | 'comfort' | 'prestige' | 'premium';
  popularity: number;
}

const warrantyPackages: WarrantyPackage[] = [
  {
    id: '1',
    code: 'CSM',
    name: 'Temel Güvence Paketi',
    shortDescription: 'Günlük kullanım için ekonomik koruma',
    fullDescription: 'Temel güvence paketi, günlük araç kullanımında karşılaşabileceğiniz standart risklere karşı koruma sağlar. Ekonomik fiyatı ile bütçe dostu bir seçenektir.',
    features: {
      included: ['Kasko teminatı', 'Trafik sigortası', 'Hırsızlık koruması', 'Yangın ve doğal afet'],
      excluded: ['Cam kırılması', 'Lastik hasarı', 'İç döşeme hasarı', 'Mekanik arızalar'],
    },
    suitableFor: ['Günlük kullanım', 'Kısa süreli kiralamalar', 'Bütçe odaklı müşteriler'],
    category: 'eco',
    popularity: 85,
  },
  {
    id: '2',
    code: 'CSLCF',
    name: 'Kapsamlı Koruma Paketi',
    shortDescription: 'Lastik, cam ve dış hasarlara özel koruma',
    fullDescription: 'Lastik, cam, far ve ayna gibi dış elemanlara özel koruma sağlayan paket. Yolculuk sırasında oluşabilecek dış hasarlara karşı güvence altına alır.',
    features: {
      included: ['Lastik değişimi', 'Cam tamiri/değişimi', 'Far ve ayna hasarları', 'Dış boya hasarları'],
      excluded: ['Mekanik arızalar', 'Yakıt sistemi', 'İç döşeme'],
    },
    suitableFor: ['Şehir dışı yolculuklar', 'Uzun mesafe kullanım', 'Dış hasar riski yüksek durumlar'],
    category: 'eco',
    popularity: 72,
  },
  {
    id: '3',
    code: 'CSMH',
    name: 'Geniş Kapsamlı Güvence',
    shortDescription: 'Çoğu hasar türüne karşı koruma',
    fullDescription: 'Küçük ve orta ölçekli hasarlara karşı geniş kapsamlı koruma sağlar. Park hasarları, çizikler ve hafif çarpışmalar dahildir.',
    features: {
      included: ['Çizik ve boya hasarları', 'Park hasarları', 'Hafif çarpışmalar', 'Cam hasarları'],
      excluded: ['Büyük hasarlar', 'Motor arızaları', 'Şanzıman problemleri'],
    },
    suitableFor: ['Şehir içi kullanım', 'Park alanı riski yüksek bölgeler', 'Orta seviye koruma isteyenler'],
    category: 'comfort',
    popularity: 90,
  },
  {
    id: '4',
    code: 'CSFK',
    name: 'Kişisel Kaza Güvencesi',
    shortDescription: 'Sürücü ve yolcular için kaza koruması',
    fullDescription: 'Sürücü ve yolcuların kaza durumunda karşılaşabileceği risklere karşı koruma sağlar. Tıbbi masraflar ve kaza sonrası destek hizmetleri dahildir.',
    features: {
      included: ['Sürücü kaza güvencesi', 'Yolcu kaza güvencesi', 'Tıbbi masraflar', 'Acil yardım hizmeti'],
      excluded: ['Doğal afetler', 'Spor aktiviteleri', 'Alkol/drug kullanımı'],
    },
    suitableFor: ['Aile yolculukları', 'Uzun mesafe seyahatler', 'Kişisel güvenlik odaklı müşteriler'],
    category: 'comfort',
    popularity: 78,
  },
  {
    id: '5',
    code: 'CSIM',
    name: 'Üst Düzey Koruma Paketi',
    shortDescription: 'Üçüncü şahıslara karşı yüksek teminat',
    fullDescription: 'Üçüncü şahıslara karşı yüksek teminatlı koruma paketi. Maddi ve manevi zararlara karşı kapsamlı güvence sağlar.',
    features: {
      included: ['Üçüncü şahıs hasarları', 'Maddi zararlar', 'Manevi tazminat', 'Yasal destek'],
      excluded: ['Sürücü hasarları', 'Araç hasarları', 'Kişisel eşya kayıpları'],
    },
    suitableFor: ['Kurumsal müşteriler', 'Yüksek riskli bölgeler', 'Yasal koruma isteyenler'],
    category: 'prestige',
    popularity: 65,
  },
  {
    id: '6',
    code: 'CSPH',
    name: 'Tam Koruma Paketi',
    shortDescription: 'Tüm risklere karşı sıfır muafiyetli koruma',
    fullDescription: 'En kapsamlı koruma paketi. Tüm hasar türlerine karşı sıfır muafiyet ile tam koruma sağlar. Premium hizmet ve öncelikli destek dahildir.',
    features: {
      included: ['Tüm hasar türleri', 'Sıfır muafiyet', 'Öncelikli hizmet', '7/24 destek', 'Yedek araç hizmeti'],
      excluded: ['Yakıt masrafları', 'Trafik cezaları', 'Kullanıcı hatası'],
    },
    suitableFor: ['VIP müşteriler', 'Tam güvence isteyenler', 'Stres-free yolculuk'],
    category: 'premium',
    popularity: 55,
  },
];

const categoryInfo = {
  eco: { label: 'Eco', color: 'bg-green-500/10 text-green-700 border-green-500/20', icon: '🌱' },
  comfort: { label: 'Konfor', color: 'bg-blue-500/10 text-blue-700 border-blue-500/20', icon: '🛡️' },
  prestige: { label: 'Prestij', color: 'bg-purple-500/10 text-purple-700 border-purple-500/20', icon: '⭐' },
  premium: { label: 'Premium', color: 'bg-amber-500/10 text-amber-700 border-amber-500/20', icon: '💎' },
};

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const filteredPackages = selectedCategory === 'all' 
    ? warrantyPackages.sort((a, b) => b.popularity - a.popularity)
    : warrantyPackages.filter(pkg => pkg.category === selectedCategory).sort((a, b) => b.popularity - a.popularity);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} kopyalandı!`);
  };

  return (
    <div className="container mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-500/10 p-3">
            <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Güvence Paketleri</h1>
            <p className="text-muted-foreground mt-1">
              Müşterilerinize önerebileceğiniz güvence seçenekleri ve detaylı bilgiler
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

      {/* Packages List */}
      <div className="space-y-4">
        {filteredPackages.map((pkg) => {
          const category = categoryInfo[pkg.category];
          return (
            <Card
              key={pkg.id}
              className={`transition-all hover:shadow-lg ${
                expandedPackage === pkg.id ? 'border-2 border-orange-500' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={category.color}>
                        {category.icon} {category.label}
                      </Badge>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {pkg.code}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        <span>%{pkg.popularity} tercih ediliyor</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.shortDescription}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedPackage(expandedPackage === pkg.id ? null : pkg.id)}
                  >
                    {expandedPackage === pkg.id ? 'Gizle' : 'Detay'}
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Quick Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold">Kapsam</span>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {pkg.features.included.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                        ))}
                        {pkg.features.included.length > 3 && (
                          <li className="text-sm text-muted-foreground">+ {pkg.features.included.length - 3} daha...</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold">Uygun Olduğu Durumlar</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pkg.suitableFor.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedPackage === pkg.id && (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="description">
                        <AccordionTrigger>Açıklama</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-muted-foreground">{pkg.fullDescription}</p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="included">
                        <AccordionTrigger>Kapsam Dahil</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {pkg.features.included.map((item, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="excluded">
                        <AccordionTrigger>Kapsam Dışı</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {pkg.features.excluded.map((item, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleCopy(`${pkg.name} - ${pkg.shortDescription}`, 'Paket bilgisi')}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Bilgiyi Kopyala
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                      onClick={() => handleCopy(pkg.fullDescription, 'Detaylı açıklama')}
                    >
                      Detaylı Bilgi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

