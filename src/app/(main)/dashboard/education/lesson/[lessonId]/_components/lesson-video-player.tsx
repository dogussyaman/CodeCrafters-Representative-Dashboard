"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

type LessonVideoPlayerProps = {
    videoUrl?: string;
    title: string;
};

export function LessonVideoPlayer({ videoUrl, title }: LessonVideoPlayerProps) {
    if (!videoUrl) {
        return (
            <Card className="mb-6">
                <CardContent className="p-8 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">Bu ders için video içeriği bulunmamaktadır.</p>
                </CardContent>
            </Card>
        );
    }

    // Convert YouTube URL to embed format
    const getEmbedUrl = (url: string) => {
        // Handle different YouTube URL formats
        const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
        if (videoIdMatch && videoIdMatch[1]) {
            return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
        }
        return url;
    };

    const embedUrl = getEmbedUrl(videoUrl);

    return (
        <Card className="mb-6 overflow-hidden">
            <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={embedUrl}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </CardContent>
        </Card>
    );
}
