import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignCardProps {
    title: string;
    category: string;
    imageUrl: string;
    url: string;
    source?: string; // Made optional - no longer needed for generic campaigns
}

export function CampaignCard({ title, category, imageUrl, url, source }: CampaignCardProps) {
    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
        >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="flex flex-1 flex-col justify-between p-5">
                <div className="mb-2">
                    <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-gray-500/10">
                        {category}
                    </span>
                </div>
                <h3 className="line-clamp-2 text-lg font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {title}
                </h3>

                <div className="mt-4 flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary">
                    <span>Detayları İncele</span>
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}
