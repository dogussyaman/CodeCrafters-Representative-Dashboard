import { ReadySentencesPage, type Sentence } from '@/components/ready-sentences'

// FİLO MAESTRO-specific initial data
const filoMaestroInitialSentences: Sentence[] = [
    {
        id: '1',
        text: 'Filo Maestro yönetim sistemine hoş geldiniz. Filo operasyonlarınız için size yardımcı olabilirim.',
        category: 'Karşılama',
        isFavorite: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    {
        id: '2',
        text: 'Filo araçlarınızın periyodik bakım zamanı gelmiştir. Lütfen servis randevusu alınız.',
        category: 'Bakım Takibi',
        isFavorite: true,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16')
    },
    {
        id: '3',
        text: 'Araç tahsis talebiniz onaylanmıştır. Detaylar için operasyon ekibi ile iletişime geçebilirsiniz.',
        category: 'Araç Tahsis',
        isFavorite: true,
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-17')
    },
    {
        id: '4',
        text: 'Filo raporunuz hazırlanmıştır. Sistem üzerinden inceleyebilirsiniz.',
        category: 'Operasyon',
        isFavorite: false,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
    },
    {
        id: '5',
        text: 'Araç kullanım optimizasyonu için önerilerimiz bulunmaktadır. Detaylı bilgi almak ister misiniz?',
        category: 'Filo Yönetimi',
        isFavorite: true,
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-19')
    },
    {
        id: '6',
        text: 'Filo yönetimi hizmetimiz için teşekkür ederiz. Verimli bir süreç diliyoruz.',
        category: 'Teşekkür',
        isFavorite: false,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
    }
]

export default function Page() {
    return <ReadySentencesPage unitName="FİLO MAESTRO" initialSentences={filoMaestroInitialSentences} />
}
