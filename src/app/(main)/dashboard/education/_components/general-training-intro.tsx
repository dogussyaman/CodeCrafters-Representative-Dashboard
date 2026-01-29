"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, BookOpen, Target } from "lucide-react";

export function GeneralTrainingIntro() {
    return (
        <Card className="mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <CardTitle className="text-2xl">Müşteri Temsilcisi Genel Eğitimi</CardTitle>
                </div>
                <CardDescription className="text-base">
                    Profesyonel müşteri temsilcisi olmak için gereken temel bilgi ve becerileri kazanın
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                        <div className="p-2 rounded-full bg-primary/10">
                            <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Toplam Ders</p>
                            <p className="text-2xl font-bold">11</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                        <div className="p-2 rounded-full bg-primary/10">
                            <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Toplam Süre</p>
                            <p className="text-2xl font-bold">43 dk</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                        <div className="p-2 rounded-full bg-primary/10">
                            <Target className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Seviye</p>
                            <p className="text-2xl font-bold">Temel</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-background/50 border border-primary/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Badge variant="secondary">Eğitim İçeriği</Badge>
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Çağrı merkezi temel kavramları ve terminoloji</li>
                        <li>• Müşteri profilleri ve iletişim teknikleri</li>
                        <li>• Profesyonel gelişim ve kariyer planlama</li>
                        <li>• Pratik örnekler ve motivasyon videoları</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
