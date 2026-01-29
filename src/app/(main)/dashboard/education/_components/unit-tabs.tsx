"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LessonCard } from "./lesson-card";
import { GeneralTrainingIntro } from "./general-training-intro";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { curriculum, getTotalDuration, getTotalLessons } from "../_data/curriculum";

export function UnitTabs() {
  const sidebarUnits = (sidebarItems.find((g) => g.id === 100)?.items ?? []).map((i) => i.title);
  const units = ["GENEL", ...sidebarUnits];
  const defaultUnit = "GENEL";

  return (
    <Tabs defaultValue={defaultUnit} className="space-y-6">
      <TabsList>
        {units.map((u) => (
          <TabsTrigger key={u} value={u}>
            {u}
          </TabsTrigger>
        ))}
      </TabsList>

      {units.map((u) => {
        const lessons = (curriculum as any)[u];
        const lessonCount = getTotalLessons(u as any);
        const totalDuration = getTotalDuration(u as any);

        return (
          <TabsContent key={u} value={u} className="space-y-4">
            {u === "GENEL" ? (
              <GeneralTrainingIntro />
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{u}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {lessonCount} ders • {totalDuration} dakika
                    </span>
                  </div>
                  {lessonCount > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {Math.round((lessonCount / 50) * 100)}% Tamamlandı
                    </Badge>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {lessons?.map((l: any, idx: number) => (
                    <LessonCard
                      key={idx}
                      lessonId={l.id || `${u.toLowerCase()}-${idx + 1}`}
                      unit={u}
                      title={l.title}
                      description={l.description}
                      duration={l.duration}
                    />
                  )) ?? (
                      <div className="rounded-lg border-2 border-dashed p-10 text-center text-muted-foreground">
                        İçerik hazırlanıyor
                      </div>
                    )}
                </div>
              </>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}