import { UnitPageCard } from "@/components/units/unit-page-card";
import { FileText } from "lucide-react";

export default function Page() {
  const ofisPages = [
    {
      title: "Hazır Cümleler",
      description:
        "Müşteri görüşmelerinde kullanabileceğiniz hazır cevaplar ve şablonlar. Hızlı yanıt vermek için favori cümlelerinizi kaydedin.",
      href: "/units/ofis/hazir-cumleler",
      icon: FileText,
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
  ];

  return (
    <div className="container mx-auto space-y-8 p-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-500/10 p-3">
            <svg
              className="h-8 w-8 text-slate-600 dark:text-slate-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">OFİS Genel Bakış</h1>
            <p className="text-muted-foreground">
              Ofis araç kiralama hizmetleri
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">OFİS Birimi Hakkında</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              OFİS birimi, kurumsal ve bireysel müşterilere ofis lokasyonlarından araç kiralama
              hizmeti sunan bir yönetim sistemidir. Bu birimde:
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Müşteri taleplerine hızlı yanıt vermek için hazır cümleler ve şablonlar</li>
              <li>Ofis lokasyonlarına özel hizmetler</li>
              <li>Kurumsal müşteri yönetimi</li>
            </ul>
            <p className="mt-4 rounded-md bg-yellow-500/10 p-3 text-sm">
              <strong>Not:</strong> OFİS birimi için yeni özellikler yakında eklenecektir.
              Şu an için temel hazır cümleler modülü aktiftir.
            </p>
          </div>
        </div>
      </div>

      {/* Pages Grid */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Sayfalar</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ofisPages.map((page) => (
            <UnitPageCard key={page.href} {...page} />
          ))}
        </div>
      </div>
    </div>
  );
}