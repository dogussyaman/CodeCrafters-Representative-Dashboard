"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, CheckCircle } from "lucide-react";
import { trainingStats, trainingTips, OVERALL_PROGRESS } from "../_data/training-stats";

export function TrainingHero() {
  return (
    <div className="space-y-4">
      {/* Hero Card */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Eğitim Merkezi</h2>
              </div>
              <p className="text-muted-foreground">
                Profesyonel gelişiminiz için hazırlanmış kapsamlı eğitim modülleri
              </p>
            </div>
            <Badge variant="secondary" className="w-fit">
              <CheckCircle className="mr-1 h-3 w-3" />
              Aktif
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Genel İlerlemeniz</span>
              <span className="font-medium">{OVERALL_PROGRESS}%</span>
            </div>
            <Progress value={OVERALL_PROGRESS} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {trainingStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Etkili Öğrenme İçin İpuçları</CardTitle>
          <CardDescription>Eğitimlerinizden en iyi şekilde faydalanmanız için öneriler</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {trainingTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}