"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { useRouter } from "next/navigation";

type LessonNavigationProps = {
    currentIndex: number;
    totalLessons: number;
    previousLessonId?: string;
    nextLessonId?: string;
    unit: string;
};

export function LessonNavigation({
    currentIndex,
    totalLessons,
    previousLessonId,
    nextLessonId,
    unit,
}: LessonNavigationProps) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between gap-4 py-6 border-t">
            <Button
                variant="outline"
                onClick={() => router.push("/dashboard/education")}
                className="gap-2"
            >
                <List className="h-4 w-4" />
                Eğitim Listesi
            </Button>

            <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                    {currentIndex + 1} / {totalLessons}
                </Badge>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                    {unit} Eğitimi
                </span>
            </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => previousLessonId && router.push(`/dashboard/education/lesson/${previousLessonId}`)}
                    disabled={!previousLessonId}
                    className="gap-1"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Önceki</span>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => nextLessonId && router.push(`/dashboard/education/lesson/${nextLessonId}`)}
                    disabled={!nextLessonId}
                    className="gap-1"
                >
                    <span className="hidden sm:inline">Sonraki</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
