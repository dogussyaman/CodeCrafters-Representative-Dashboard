"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReminderData } from "./reminder-dialog";

interface ReminderCardProps {
    data: ReminderData;
    onViewDetails: (data: ReminderData) => void;
}

export function ReminderCard({ data, onViewDetails }: ReminderCardProps) {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
            case "medium":
                return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800";
            case "low":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
            default:
                return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700";
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case "high": return "Yüksek";
            case "medium": return "Orta";
            case "low": return "Düşük";
            default: return "Normal";
        }
    };

    return (
        <Card className="flex flex-col h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 group">
            <CardHeader className="p-5 pb-2 space-y-2">
                <div className="flex items-start justify-between">
                    <Badge
                        variant="outline"
                        className={cn("w-fit mb-2", getPriorityColor(data.priority))}
                    >
                        {getPriorityLabel(data.priority)}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center bg-muted px-2 py-1 rounded-full">
                        <Calendar className="w-3 h-3 mr-1" />
                        {data.date}
                    </span>
                </div>
                <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Bell className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {data.title}
                    </h3>
                </div>
            </CardHeader>
            <CardContent className="p-5 pt-2 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {data.shortDescription}
                </p>
            </CardContent>
            <CardFooter className="p-5 pt-0">
                <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-primary/5"
                    onClick={() => onViewDetails(data)}
                >
                    <span>Detayları Gör</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
            </CardFooter>
        </Card>
    );
}
