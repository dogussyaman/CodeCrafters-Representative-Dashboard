"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";

type TrainingProgressProps = {
    completed?: number;
    total: number;
    unitName: string;
};

export function TrainingProgress({ completed = 0, total, unitName }: TrainingProgressProps) {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <Card className="mb-4">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Eğitim İlerlemesi</CardTitle>
                    <Badge variant={percentage === 100 ? "default" : "secondary"}>
                        {completed}/{total} Ders
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{unitName}</span>
                        <span className="font-semibold">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                </div>

                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-green-600 dark:text-green-500">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{completed} Tamamlandı</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Circle className="h-4 w-4" />
                        <span>{total - completed} Kalan</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
