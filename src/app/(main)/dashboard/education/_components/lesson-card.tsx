"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type LessonCardProps = {
  lessonId: string;
  unit: string;
  title: string;
  description: string;
  duration: string;
};

export function LessonCard({ lessonId, unit, title, description, duration }: LessonCardProps) {
  const router = useRouter();

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{duration}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => router.push(`/dashboard/education/lesson/${lessonId}`)}
          >
            Başla
          </Button>
          <Button size="sm" variant="outline">Özet</Button>
        </div>
      </CardContent>
    </Card>
  );
}