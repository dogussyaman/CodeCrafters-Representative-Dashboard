import { UnitPageCard } from "@/components/units/unit-page-card";
import {
  MapPin,
  FileText,
  Users,
  Briefcase,
  Plane,
  DollarSign,
} from "lucide-react";

export default function Page() {
  const ikamePages = [
    {
      title: "Hazır Cümleler",
      description:
        "İkame araç kiralama görüşmelerinde kullanabileceğiniz hazır cevaplar ve şablonlar. Sigorta işlemleri için favori cümlelerinizi kaydedin.",
      href: "/units/birim-d/hazir-cumleler",
      icon: FileText,
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Bölgeler ve Müdürler",
      description:
        "Türkiye genelindeki bölge bilgileri ve bölge müdürleri iletişim detayları. Hızlı erişim için bölge bazlı organizasyon yapısı.",
      href: "/units/birim-d/bolgeler-ve-mudurler",
      icon: MapPin,
      gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "Portföy Danışmanları",
      description:
        "Portföy danışmanları listesi, iletişim bilgileri ve sorumluluk alanları.",
      href: "/units/birim-d/portfoy-danismanlari",
      icon: Users,
      gradient: "from-indigo-500/10 to-blue-500/10",
    },
    {
      title: "Ofis Müdürleri",
      description:
        "Ofis müdürleri listesi, bölgesel sorumluluklar ve iletişim detayları.",
      href: "/units/birim-d/ofis-mudurleri",
      icon: Briefcase,
      gradient: "from-teal-500/10 to-cyan-500/10",
    },
  ];

  return (
    <div className="container mx-auto space-y-8 p-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-3">
            <svg
              className="h-8 w-8 text-blue-600 dark:text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">İkame Hizmetleri Genel Bakış</h1>
            <p className="text-muted-foreground">
              Sigorta ikame araç yönetim sistemi
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">İkame Hizmetleri Birimi Hakkında</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              İkame Hizmetleri birimi, sigorta şirketleri ile çalışarak hasarlı araç sahiplerine ikame araç
              kiralama hizmeti sunan özel bir yönetim sistemidir. Bu birimde:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Türkiye genelindeki bölge ve müdür organizasyon yapısı</li>
              <li>Standart görüşme şablonları ve hazır cümleler</li>
              <li>Portföy danışmanları ve ofis müdürleri iletişim bilgileri</li>
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
          {ikamePages.map((page) => (
            <UnitPageCard key={page.href} {...page} />
          ))}
        </div>
      </div>
    </div>
  );
}