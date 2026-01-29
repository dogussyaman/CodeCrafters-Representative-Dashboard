"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReminderData {
    id: string;
    title: string;
    date: string;
    type: "office" | "insurance" | "system";
    priority: "low" | "medium" | "high";
    shortDescription: string;
    fullDescription: string;
    isRead?: boolean;
}

interface ReminderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: ReminderData | null;
}

export function ReminderDialog({ open, onOpenChange, data }: ReminderDialogProps) {
    if (!data) return null;

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

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case "high":
                return <AlertCircle className="w-4 h-4 mr-1" />;
            case "medium":
                return <Info className="w-4 h-4 mr-1" />;
            case "low":
                return <CheckCircle2 className="w-4 h-4 mr-1" />;
            default:
                return <Info className="w-4 h-4 mr-1" />;
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case "high": return "Yüksek Öncelik";
            case "medium": return "Orta Öncelik";
            case "low": return "Düşük Öncelik";
            default: return "Normal";
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <DialogTitle className="text-xl font-semibold leading-none tracking-tight">
                                {data.title}
                            </DialogTitle>
                            <div className="flex items-center text-sm text-muted-foreground pt-1">
                                <Calendar className="w-4 h-4 mr-1" />
                                {data.date}
                            </div>
                        </div>
                        <Badge
                            variant="outline"
                            className={cn("whitespace-nowrap flex items-center", getPriorityColor(data.priority))}
                        >
                            {getPriorityIcon(data.priority)}
                            {getPriorityLabel(data.priority)}
                        </Badge>
                    </div>
                </DialogHeader>

                <ScrollArea className="max-h-[60vh] mt-4 pr-4">
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-muted/40 border text-sm leading-relaxed">
                            <h4 className="font-semibold mb-2 text-foreground">Özet</h4>
                            {data.shortDescription}
                        </div>

                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            <h4 className="font-semibold mb-2 text-lg text-foreground/80 border-b pb-2">Detaylar</h4>
                            {data.fullDescription}
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
