"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Target, Lightbulb } from "lucide-react";

type LessonContentSectionProps = {
    objectives?: string[];
    sections?: {
        title: string;
        content: string;
    }[];
    keyTakeaways?: string[];
};

export function LessonContentSection({ objectives, sections, keyTakeaways }: LessonContentSectionProps) {
    return (
        <div className="space-y-6">
            {/* Learning Objectives */}
            {objectives && objectives.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Target className="h-5 w-5 text-primary" />
                            Öğrenme Hedefleri
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {objectives.map((objective, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{objective}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

            {/* Content Sections */}
            {sections && sections.length > 0 && (
                <Card>
                    <CardContent className="pt-6 space-y-6">
                        {sections.map((section, idx) => (
                            <div key={idx}>
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                    <Badge variant="outline">{idx + 1}</Badge>
                                    {section.title}
                                </h3>
                                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </div>
                                {idx < sections.length - 1 && <div className="mt-6 border-b" />}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Key Takeaways */}
            {keyTakeaways && keyTakeaways.length > 0 && (
                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Lightbulb className="h-5 w-5 text-primary" />
                            Önemli Noktalar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {keyTakeaways.map((takeaway, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-primary font-bold mt-0.5">•</span>
                                    <span className="text-sm font-medium">{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
