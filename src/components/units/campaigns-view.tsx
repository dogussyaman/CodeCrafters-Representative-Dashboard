"use client";

import { useEffect, useState } from "react";
import { Campaign } from "@/lib/campaigns";
import { ExternalLink, Tag } from "lucide-react";

async function getGenericCampaigns(unitSlug: string): Promise<Campaign[]> {
    // This is a placeholder. In a real app, you'd fetch from an API or filter scraped data.
    // For now, we return dummy data or reuse the scraper if adaptable.
    // Generic kampanya verileri döndürülüyor 
    // to satisfy the "generic" requirement without breaking the page.
    return [
        {
            id: `${unitSlug}-1`,
            title: "Yaz Sezonu Erken Rezervasyon",
            imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
            url: "#",
            source: "generic"
        },
        {
            id: `${unitSlug}-2`,
            title: "Hafta Sonu Özel İndirimi",
            imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop",
            url: "#",
            source: "generic"
        }
    ];
}

export function CampaignsView({ unitName, unitSlug }: { unitName: string, unitSlug: string }) {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCampaigns() {
            try {
                const data = await getGenericCampaigns(unitSlug);
                setCampaigns(data);
            } catch (error) {
                console.error("Failed to fetch campaigns", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCampaigns();
    }, [unitSlug]);

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{unitName} Kampanyaları</h1>
                <p className="text-muted-foreground">
                    Güncel {unitName} araç kiralama fırsatlarını ve indirimlerini keşfedin.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {campaigns.map((campaign) => (
                    <div
                        key={campaign.id}
                        className="group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg"
                    >
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={campaign.imageUrl}
                                alt={campaign.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                    <Tag className="h-3.5 w-3.5" />
                                    Kampanya
                                </span>
                            </div>

                            <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight tracking-tight group-hover:text-primary transition-colors">
                                {campaign.title}
                            </h3>

                            <div className="mt-auto pt-4">
                                <a
                                    href={campaign.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    Detaylı Bilgi
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
