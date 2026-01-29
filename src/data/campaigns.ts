export interface Campaign {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    url: string;
}

// Generic campaign data - can be customized per unit
const GENERIC_CAMPAIGNS: Campaign[] = [
    {
        id: "campaign-1",
        category: "Seyahat",
        imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
        title: "Erken Rezervasyon İndirimi - %25 İndirim",
        url: "#"
    },
    {
        id: "campaign-2",
        category: "Seyahat",
        imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
        title: "Hafta Sonu Özel Fırsatları",
        url: "#"
    },
    {
        id: "campaign-3",
        category: "Seyahat",
        imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop",
        title: "Yeni Üyelere Özel %35 İndirim",
        url: "#"
    },
    {
        id: "campaign-4",
        category: "Seyahat",
        imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
        title: "Uzun Süreli Kiralama Avantajları",
        url: "#"
    },
    {
        id: "campaign-5",
        category: "Seyahat",
        imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
        title: "Online Ödeme İndirimi - %30",
        url: "#"
    }
];

/**
 * Get campaigns for a specific unit
 * @param unitSlug - The slug of the unit (e.g., "birim-a", "birim-b")
 * @returns Array of campaigns
 */
export async function getCampaignsByUnit(unitSlug: string): Promise<Campaign[]> {
    // In a real application, this would fetch from a database or API
    // For now, return the same generic campaigns for all units
    return GENERIC_CAMPAIGNS;
}

/**
 * Get all campaigns
 * @returns Array of all campaigns
 */
export async function getAllCampaigns(): Promise<Campaign[]> {
    return GENERIC_CAMPAIGNS;
}
