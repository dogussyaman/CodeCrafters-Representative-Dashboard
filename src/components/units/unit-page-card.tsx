

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { JSX } from "react";

interface UnitPageCardProps {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
    comingSoon?: boolean;
    gradient?: string;
}

export function UnitPageCard({
    title,
    description,
    href,
    icon: Icon,
    comingSoon = false,
    gradient = "from-blue-500/10 to-purple-500/10",
}: UnitPageCardProps): JSX.Element {
    const iconBgClass = comingSoon ? "bg-muted" : "bg-primary/10 group-hover:bg-primary/20";
    const iconColorClass = comingSoon ? "text-muted-foreground" : "text-primary";
    const cardClass = cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        !comingSoon && "cursor-pointer hover:scale-[1.02] hover:border-primary/50",
        comingSoon && "opacity-60 cursor-not-allowed"
    );
    const gradientClass = cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
        gradient,
        !comingSoon && "group-hover:opacity-100"
    );

    const cardContent: JSX.Element = (
        <Card className={cardClass}>
            <div className={gradientClass} />

            <CardHeader className="relative">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className={cn("rounded-lg p-2.5 transition-colors duration-300", iconBgClass)}>
                            <Icon className={cn("h-5 w-5", iconColorClass)} />
                        </div>
                        <CardTitle className="text-lg">{title}</CardTitle>
                    </div>
                    {!comingSoon && (
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    )}
                </div>
                <CardDescription className="mt-2">{description}</CardDescription>
            </CardHeader>

            {comingSoon && (
                <CardContent>
                    <div className="rounded-md bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                        Yakında Eklenecek
                    </div>
                </CardContent>
            )}
        </Card>
    );

    if (comingSoon) {
        return <div>{cardContent}</div>;
    }

    return <Link href={href}>{cardContent}</Link>;
}