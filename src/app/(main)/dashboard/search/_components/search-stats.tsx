"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, Star, FileText } from "lucide-react";

export function SearchStats() {
    const stats = [
        {
            label: "Toplam İçerik",
            value: "2,847",
            icon: FileText,
            trend: "+12%",
            description: "Son güncelleme",
        },
        {
            label: "Popüler Aramalar",
            value: "156",
            icon: TrendingUp,
            trend: "+8%",
            description: "Bu hafta",
        },
        {
            label: "En Çok Aranan",
            value: "Kampanya",
            icon: Star,
            trend: "643 arama",
            description: "Bu ay",
        },
        {
            label: "Ortalama Süre",
            value: "2.3s",
            icon: Clock,
            trend: "-0.5s",
            description: "Arama süresi",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.label}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                            <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="flex items-center gap-2 pt-1">
                                <Badge variant="secondary" className="text-xs">
                                    {stat.trend}
                                </Badge>
                                <p className="text-xs text-muted-foreground">{stat.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
