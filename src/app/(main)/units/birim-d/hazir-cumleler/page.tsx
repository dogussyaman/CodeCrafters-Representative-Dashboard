import { ReadySentencesPage, type Sentence } from '@/components/ready-sentences'

// İKAME-specific initial data
const ikameInitialSentences: Sentence[] = [
    {
        id: '1',
        text: 'İkame araç kiralama hizmetimize hoş geldiniz. Hasar durumunuz için size yardımcı olabilirim.',
        category: 'Karşılama',
        isFavorite: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    {
        id: '2',
        text: 'Sigorta şirketiniz ile görüştük. İkame aracınız hazır, teslim almak için ofisimize gelebilirsiniz.',
        category: 'Araç Teslim',
        isFavorite: true,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16')
    },
    {
        id: '3',
        text: 'Hasar dosyanız için gerekli evraklar tamamlandı. En kısa sürede ikame aracınızı teslim edeceğiz.',
        category: 'Sigorta İşlemleri',
        isFavorite: true,
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-17')
    },
    {
        id: '4',
        text: 'Aracınızın tamiri bitene kadar ikame aracınızı kullanabilirsiniz. İyi yolculuklar!',
        category: 'Bilgilendirme',
        isFavorite: false,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
    },
    {
        id: '5',
        text: 'İkame araç hizmetimiz için teşekkür ederiz. Başka bir ihtiyacınızda bize ulaşabilirsiniz.',
        category: 'Teşekkür',
        isFavorite: false,
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-19')
    },
    {
        id: '6',
        text: 'Dosyanız Read & Ozbek sisteminde güncellenmiştir. Takip numaranız ile işlemi kontrol edebilirsiniz.',
        category: 'Sigorta İşlemleri',
        isFavorite: true,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
    }
]

export default function Page() {
    return <ReadySentencesPage unitName="İKAME" initialSentences={ikameInitialSentences} />
}
