import { getCampaignsByUnit } from "@/data/campaigns";
import { CampaignCard } from "@/components/campaigns/campaign-card";

export default async function Page() {
  const campaigns = await getCampaignsByUnit("birim-a");

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Satış Birimi Kampanyaları</h1>
          <p className="mt-2 text-muted-foreground">
            Güncel araç kiralama fırsatlarını ve indirimlerini keşfedin.
          </p>
        </div>
        <div className="rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {campaigns.length} Kampanya
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            title={campaign.title}
            category={campaign.category}
            imageUrl={campaign.imageUrl}
            url={campaign.url}
          />
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="flex h-60 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            Şu anda görüntülenecek kampanya bulunamadı.
          </p>
          <p className="text-sm text-muted-foreground/60">
            Lütfen daha sonra tekrar kontrol ediniz.
          </p>
        </div>
      )}
    </div>
  );
}
