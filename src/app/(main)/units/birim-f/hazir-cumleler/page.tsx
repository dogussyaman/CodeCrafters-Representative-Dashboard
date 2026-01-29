import { ReadySentencesPage, type Sentence } from '@/components/ready-sentences'

// OFİS-specific initial data
const ofisInitialSentences: Sentence[] = [
  {
    id: '1',
    text: 'OFİS\'e hoş geldiniz! Ofis lokasyonlarımızdan araç kiralama konusunda size yardımcı olabilirim.',
    category: 'Karşılama',
    isFavorite: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    text: 'Kurumsal müşterilerimiz için özel hizmetlerimiz bulunmaktadır. Detaylı bilgi almak ister misiniz?',
    category: 'Bilgilendirme',
    isFavorite: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '3',
    text: 'İhtiyacınız için teşekkür ederiz. Ofis lokasyonumuzdan en yakın zamanda size dönüş yapacağız.',
    category: 'Teşekkür',
    isFavorite: false,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  },
  {
    id: '4',
    text: 'Güvenli yolculuklar dileriz. Başka bir ihtiyacınızda OFİS her zaman yanınızda!',
    category: 'Veda',
    isFavorite: false,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  }
]

export default function Page() {
  return <ReadySentencesPage unitName="OFİS" initialSentences={ofisInitialSentences} />
}
