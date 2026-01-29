export interface Campaign {
    id: string;
    title: string;
    imageUrl: string;
    url: string;
    source: string;
    description?: string;
}

// Placeholder for future generic implementation
export async function getCampaigns(unitSlug: string): Promise<Campaign[]> {
    return [];
}
