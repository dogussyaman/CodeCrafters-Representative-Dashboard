import { ReadySentencesPage, type Sentence } from '@/components/ready-sentences'

// KURUMSAL SATIŞ-specific initial data
const kurumsalSatisInitialSentences: Sentence[] = [
    {
        id: '1',
        text: 'Kurumsal Satış birimine hoş geldiniz. Filo kiralama çözümlerimiz hakkında detaylı bilgi verebilirim.',
        category: 'Kurumsal Karşılama',
        isFavorite: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    {
        id: '2',
        text: 'Kurumsal filo teklifimizi incelemeniz için mail adresinize gönderdik. Görüşlerinizi bekliyoruz.',
        category: 'Teklif Sunumu',
        isFavorite: true,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16')
    },
    {
        id: '3',
        text: 'B2B sözleşme şartlarımız hakkında detaylı bilgi almak için randevu oluşturabiliriz.',
        category: 'Sözleşme',
        isFavorite: true,
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-17')
    },
    {
        id: '4',
        text: 'Kurumsal müşterilerimize özel avantajlı fiyatlandırma seçeneklerimiz bulunmaktadır.',
        category: 'Teklif Sunumu',
        isFavorite: false,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
    },
    {
        id: '5',
        text: 'Filo yönetimi ve operasyonel destek hizmetlerimiz ile işletmenize değer katıyoruz.',
        category: 'B2B İletişim',
        isFavorite: true,
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-19')
    },
    {
        id: '6',
        text: 'İş ortaklığınız için teşekkür ederiz. Başarılı bir işbirliği diliyoruz.',
        category: 'Teşe答kkür',
        isFavorite: false,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
    }
]

export default function Page() {
    return <ReadySentencesPage unitName="KURUMSAL SATIŞ" initialSentences={kurumsalSatisInitialSentences} />
}
