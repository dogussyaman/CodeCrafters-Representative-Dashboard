import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { LessonVideoPlayer } from "./_components/lesson-video-player";
import { LessonContentSection } from "./_components/lesson-content-section";
import { LessonNavigation } from "./_components/lesson-navigation";
import { getLessonById, getAdjacentLessons } from "./lesson-data";

type PageProps = {
    params: Promise<{
        lessonId: string;
    }>;
};

export default async function LessonDetailPage({ params }: PageProps) {
    const { lessonId } = await params;
    const lesson = getLessonById(lessonId);

    if (!lesson) {
        notFound();
    }

    const { previousLessonId, nextLessonId, currentIndex, totalLessons } = getAdjacentLessons(
        lessonId,
        lesson.unit
    );

    return (
        <div className="container max-w-5xl mx-auto p-6 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/dashboard/education" className="hover:text-foreground transition-colors">
                    Eğitimler
                </Link>
                <span>/</span>
                <span>{lesson.unit}</span>
                <span>/</span>
                <span className="text-foreground">{lesson.title}</span>
            </div>

            {/* Lesson Header */}
            <Card>
                <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="default">{lesson.unit}</Badge>
                                <Badge variant="outline" className="gap-1">
                                    <Clock className="h-3 w-3" />
                                    {lesson.duration}
                                </Badge>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl">{lesson.title}</CardTitle>
                            <CardDescription className="text-base">{lesson.description}</CardDescription>
                        </div>
                        <Link href="/dashboard/education">
                            <Button variant="outline" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Geri Dön
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
            </Card>

            {/* Video Player */}
            <LessonVideoPlayer videoUrl={lesson.videoUrl} title={lesson.title} />

            {/* Lesson Content */}
            <LessonContentSection
                objectives={lesson.content.objectives}
                sections={lesson.content.sections}
                keyTakeaways={lesson.content.keyTakeaways}
            />

            {/* Completion Button */}
            <Card className="border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                                <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="font-semibold">Dersi tamamladınız mı?</p>
                                <p className="text-sm text-muted-foreground">
                                    İlerlemek için dersi tamamlandı olarak işaretleyin
                                </p>
                            </div>
                        </div>
                        <Button className="gap-2 bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4" />
                            Tamamlandı Olarak İşaretle
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Navigation */}
            <LessonNavigation
                currentIndex={currentIndex}
                totalLessons={totalLessons}
                previousLessonId={previousLessonId}
                nextLessonId={nextLessonId}
                unit={lesson.unit}
            />
        </div>
    );
}
