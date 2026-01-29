"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, Copy, ExternalLink, Calendar } from "lucide-react";
import { searchData } from "@/data/search-data";

type SearchResultsProps = {
    query: string;
    activeCats: string[];
    selectedUnit: string;
    sortBy: string;
};

// Preview metinleri için  yardımcı data (searchData'ya preview field'ı olmadığı için)
const previewTexts: Record<number, string> = {
    1: "30 Haziran - 15 Eylül tarihleri arası tüm rezervasyonlarda %30 indirim...",
    2: "Sayın müşterimiz, aracınız hazır durumda. Teslim için lütfen...",
    3: "Hasar, çalınma, cam hasarı dahil kapsamlı koruma paketi...",
    4: "Merhaba [Müşteri Adı], talebiniz için hazırladığımız fiyat teklifi...",
    5: "Kış sezonuna özel, 30 gün önceden yapacağınız rezervasyonlarda...",
    6: "Değerli müşterimiz, yaşadığınız sorun için üzgünüz. Durumunuzu...",
    7: "Temel hasarlar için ekonomik koruma sağlayan mini paket...",
    8: "İkame araç talebiniz alınmıştır. Gerekli bilgiler...",
    9: "Hafta sonlarınızı özel kılın! Cuma akşam alıp Pazar akşam...",
};

export function SearchResults({ query, activeCats, selectedUnit, sortBy }: SearchResultsProps) {
    // Basit filtreleme mantığı
    let filteredData = [...searchData];

    if (activeCats.length > 0) {
        filteredData = filteredData.filter((item) => activeCats.includes(item.categoryKey));
    }

    if (selectedUnit !== "Tümü") {
        filteredData = filteredData.filter((item) => item.unit === selectedUnit);
    }

    // Sorting
    const sorted = [...filteredData].sort((a, b) => {
        if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === "popular") return b.views - a.views;
        if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
        return 0; // relevance (default order)
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">{sorted.length}</span> sonuç bulundu
                </p>
                <p className="text-xs text-muted-foreground">
                    Sıralama:{" "}
                    {sortBy === "relevance"
                        ? "En Alakalı"
                        : sortBy === "date"
                            ? "En Yeni"
                            : sortBy === "popular"
                                ? "En Popüler"
                                : "A-Z"}
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sorted.map((item) => (
                    <Card key={item.id} className="group transition-all hover:shadow-md">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-1 flex-1">
                                    <CardTitle className="text-base line-clamp-2">{item.title}</CardTitle>
                                    <CardDescription className="text-xs">{item.description}</CardDescription>
                                </div>
                            </div>
                            <div className="flex gap-1 pt-2">
                                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                    {item.unit}
                                </Badge>
                                <Badge variant="outline" className="text-xs px-2 py-0.5">
                                    {item.category}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground line-clamp-2">{previewTexts[item.id]}</p>

                            <Separator />

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{item.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{item.views}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 gap-1">
                                    <Eye className="h-3 w-3" />
                                    Görüntüle
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {sorted.length === 0 && (
                <Card className="p-10 text-center">
                    <p className="text-muted-foreground">
                        Arama kriterlerinize uygun sonuç bulunamadı. Lütfen filtreleri değiştirin veya farklı bir arama yapın.
                    </p>
                </Card>
            )}
        </div>
    );
}
