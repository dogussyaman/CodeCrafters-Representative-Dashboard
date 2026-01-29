import { Sentence } from "@/components/ready-sentences";
import { WarrantyPackage, CategoryPricing } from "@/components/warranty-packages";

// Generic Sentences
export const GENERIC_SENTENCES: Record<string, Sentence[]> = {
    "birim-a": [
        {
            id: '1',
            text: 'Merhaba, Satış Birimi\'ne hoş geldiniz. Size nasıl yardımcı olabilirim?',
            category: 'Karşılama',
            isFavorite: true,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15')
        },
        {
            id: '2',
            text: 'Rezervasyonunuz için teşekkür ederiz. En kısa sürede size geri dönüş yapacağız.',
            category: 'Teşekkür',
            isFavorite: false,
            createdAt: new Date('2024-01-16'),
            updatedAt: new Date('2024-01-16')
        },
        {
            id: '3',
            text: 'Güvence paketlerimiz hakkında detaylı bilgi vermek isterim. Hangi paketi tercih edersiniz?',
            category: 'Bilgilendirme',
            isFavorite: true,
            createdAt: new Date('2024-01-17'),
            updatedAt: new Date('2024-01-17')
        },
        {
            id: '4',
            text: 'Güvenli yolculuklar dileriz. Başka bir konuda yardımcı olmamızı ister misiniz?',
            category: 'Veda',
            isFavorite: false,
            createdAt: new Date('2024-01-18'),
            updatedAt: new Date('2024-01-18')
        },
    ],
    "default": [
        {
            id: 'def-1',
            text: 'Merhaba, size nasıl yardımcı olabilirim?',
            category: 'Karşılama',
            isFavorite: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
};

// Generic Warranty Packages
export const GENERIC_PACKAGES: Record<string, { packages: WarrantyPackage[], categories: CategoryPricing[] }> = {
    "birim-a": {
        packages: [
            {
                id: '1',
                code: 'SM',
                name: 'Mini Güvence Paketi',
                dailyPrice: 120,
                monthlyPrice: 2500,
                hasCorporateOffice: true,
                hasLicenseOffice: true,
                category: 'eco'
            },
            {
                id: '2',
                code: 'LCFA',
                name: 'Lastik Cam Far Ayna Güvencesi',
                dailyPrice: 60,
                monthlyPrice: 1200,
                hasCorporateOffice: true,
                hasLicenseOffice: true,
                category: 'eco'
            },
            {
                id: '3',
                code: 'MH',
                name: 'Mini Hasar Güvencesi',
                dailyPrice: 85,
                monthlyPrice: 1800,
                hasCorporateOffice: true,
                hasLicenseOffice: true,
                category: 'comfort'
            },
            {
                id: '4',
                code: 'FK',
                name: 'Ferdi Kaza Güvencesi',
                dailyPrice: 45,
                monthlyPrice: 900,
                hasCorporateOffice: true,
                hasLicenseOffice: true,
                category: 'comfort'
            },
            {
                id: '5',
                code: 'IM',
                name: 'İhtiyari Mali Mesuliyet',
                dailyPrice: 200,
                monthlyPrice: 4200,
                hasCorporateOffice: true,
                hasLicenseOffice: true,
                category: 'prestige'
            },
            {
                id: '6',
                code: 'PH',
                name: 'Premium Hasar Güvencesi',
                dailyPrice: 250,
                monthlyPrice: 5500,
                hasCorporateOffice: true,
                hasLicenseOffice: false,
                category: 'premium'
            }
        ],
        categories: [
            {
                category: 'eco',
                label: 'Eco',
                dailyPrice: 120,
                monthlyPrice: 380,
                badge: 'ECO',
                badgeColor: 'bg-green-500/10 text-green-600'
            },
            {
                category: 'comfort',
                label: 'Konfor',
                dailyPrice: 130,
                monthlyPrice: 400,
                badge: 'KONFOR'
            },
            {
                category: 'prestige',
                label: 'Prestij',
                dailyPrice: 200,
                monthlyPrice: 420,
                badge: 'PRESTİJ',
                badgeColor: 'bg-purple-500/10 text-purple-600'
            },
            {
                category: 'premium',
                label: 'Premium',
                dailyPrice: 250,
                monthlyPrice: 550,
                badge: 'PREMIUM',
                badgeColor: 'bg-amber-500/10 text-amber-600'
            }
        ]
    }
};
