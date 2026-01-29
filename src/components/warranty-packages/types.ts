export interface WarrantyPackage {
    id: string
    code: string
    name: string
    dailyPrice: number
    monthlyPrice: number
    hasCorporateOffice: boolean
    hasLicenseOffice: boolean
    category: 'eco' | 'comfort' | 'prestige' | 'premium'
    isPopular?: boolean
}

export interface CategoryPricing {
    category: string
    label: string
    dailyPrice: number
    monthlyPrice: number
    badge?: string
    badgeColor?: string
}
