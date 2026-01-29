import { ReadySentencesPage, type Sentence } from '@/components/ready-sentences'

// Müşteri Hizmetleri-specific initial data
const customerServiceInitialSentences: Sentence[] = [
  {
    id: '1',
    text: 'Müşteri Hizmetleri\'ne hoş geldiniz! Araç kiralama çözümlerimiz hakkında size yardımcı olabilirim.',
    category: 'Karşılama',
    isFavorite: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    text: 'Uygun fiyatlı araç seçeneklerimiz için teşekkür ederiz. En iyi teklifi size sunmak için buradayız.',
    category: 'Teşekkür',
    isFavorite: false,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '3',
    text: 'Bütçe dostu güvence paketlerimiz ile seyahatiniz güvence altında. Detayları öğrenmek ister misiniz?',
    category: 'Bilgilendirme',
    isFavorite: true,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  },
  {
    id: '4',
    text: 'Ekonomik fiyatlarımızla iyi yolculuklar! Başka bir ihtiyacınız olursa buradayız.',
    category: 'Veda',
    isFavorite: false,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '5',
    text: 'En uygun fiyatlarla kaliteli hizmet sunuyoruz. Tercihiniz için teşekkürler.',
    category: 'Teşekkür',
    isFavorite: true,
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19')
  }
]

export default function Page() {
  return <ReadySentencesPage unitName="MÜŞTERİ HİZMETLERİ" initialSentences={customerServiceInitialSentences} />
}
