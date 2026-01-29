import { UnitPageCard } from "@/components/units/unit-page-card";
import {
  FileText,
  Shield,
  Tag,
  Calculator,
} from "lucide-react";

export default function Page() {
  const salesPages = [
    {
      title: "Hazır Cümleler",
      description:
        "Müşteri görüşmelerinde kullanabileceğiniz hazır cevaplar ve şablonlar. Hızlı yanıt vermek için favori cümlelerinizi kaydedin.",
      href: "/units/birim-a/hazir-cumleler",
      icon: FileText,
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Güvence Paketleri",
      description:
        "Güvence paketleri hakkında detaylı bilgiler, fiyatlandırma ve kapsam bilgileri. Müşterilere en uygun paketi önerin.",
      href: "/units/birim-a/guvence-paketleri",
      icon: Shield,
      gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "Kampanyalar",
      description:
        "Güncel kampanyalar, indirimler ve özel teklifler. Müşterilerinize en avantajlı fırsatları sunun.",
      href: "/units/birim-a/kampanyalar",
      icon: Tag,
      gradient: "from-orange-500/10 to-red-500/10",
    },
    {
      title: "Fiyat Teklifi Hazırla",
      description:
        "Müşterileriniz için özelleştirilmiş fiyat teklifleri oluşturun. Araç, tarih ve ek hizmetleri seçerek detaylı teklif hazırlayın.",
      href: "/units/birim-a/fiyat-teklifi-hazirla",
      icon: Calculator,
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "Rezervasyon Yönetimi",
      description:
        "Tüm rezervasyonları görüntüleyin, yönetin ve takip edin. Yeni rezervasyon oluşturun ve mevcut rezervasyonları düzenleyin.",
      href: "/units/birim-a/rezervasyon-yonetimi",
      icon: Calculator,
      gradient: "from-indigo-500/10 to-blue-500/10",
    },
  ];

  return (
    <div className="container mx-auto space-y-8 p-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-red-500/10 p-3">
            <svg
              className="h-8 w-8 text-red-600 dark:text-red-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Satış Birimi Genel Bakış</h1>
            <p className="text-muted-foreground">
              Araç kiralama hizmetleri ve müşteri yönetimi
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Satış Birimi Hakkında</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              Satış Birimi, araç kiralama hizmetlerinde müşterilere en iyi deneyimi sunmak için
              tasarlanmış kapsamlı bir yönetim sistemidir. Bu birimde:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Müşteri taleplerine hızlı yanıt vermek için hazır cümleler ve şablonlar</li>
              <li>Güvence paketleri ve sigorta seçenekleri hakkında detaylı bilgiler</li>
              <li>Güncel kampanya ve fırsatlar</li>
              <li>Profesyonel fiyat teklifi hazırlama araçları</li>
              <li>Rezervasyon yönetimi ve takip sistemi</li>
            </ul>
            <p className="mt-4">
              Aşağıdaki kartlardan ilgili sayfaya giderek detaylı bilgilere ulaşabilir ve
              işlemlerinizi gerçekleştirebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* Pages Grid */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Sayfalar</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {salesPages.map((page) => (
            <UnitPageCard key={page.href} {...page} />
          ))}
        </div>
      </div>
    </div>
  );
}