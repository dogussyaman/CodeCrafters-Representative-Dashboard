import { ReadySentencesPage, type Sentence } from '@/components/ready-sentences'

// Satış Birimi-specific initial data
const salesInitialSentences: Sentence[] = [
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
  {
    id: '5',
    text: 'Size en iyi hizmeti sunmak için çalışıyoruz. Anlayışınız için teşekkürler.',
    category: 'Teşekkür',
    isFavorite: false,
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: '6',
    text: 'Memnuniyetiniz bizim için önemlidir. Her türlü sorunuz için bizimle iletişime geçebilirsiniz.',
    category: 'Karşılama',
    isFavorite: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
]

export default function Page() {
  return <ReadySentencesPage unitName="SATIŞ BİRİMİ" initialSentences={salesInitialSentences} />
}
