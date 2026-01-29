export interface Campaign {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    url: string;
    source: "generic";
}

// Generic kampanya verileri
const GENERIC_CAMPAIGNS: Campaign[] = [
    {
        id: "campaign-1",
        category: "Seyahat",
        imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
        title: "Erken Rezervasyon İndirimi - %25 İndirim",
        url: "#",
        source: "generic"
    },
    {
        id: "campaign-2",
        category: "Seyahat",
        imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
        title: "Hafta Sonu Özel Fırsatları",
        url: "#",
        source: "generic"
    },
    {
        id: "campaign-3",
        category: "Seyahat",
        imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop",
        title: "Yeni Üyelere Özel %35 İndirim",
        url: "#",
        source: "generic"
    }
];

export async function getGenericCampaigns(): Promise<Campaign[]> {
    return GENERIC_CAMPAIGNS;
}
