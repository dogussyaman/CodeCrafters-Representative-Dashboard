"use client";

import { notFound } from "next/navigation";
import { COMPANY_CONFIG } from "@/config/company-config";
import { ReadySentencesPage } from "@/components/ready-sentences";
import { WarrantyPackagesPage } from "@/components/warranty-packages";
import { QuoteProposalForm } from "@/components/units/quote-proposal-form";
import { CampaignsView } from "@/components/units/campaigns-view";
import { GENERIC_SENTENCES, GENERIC_PACKAGES } from "@/data/unit-data";

export default function UnitFeaturePage({
    params,
}: {
    params: { unitSlug: string; featureSlug: string };
}) {
    const { unitSlug, featureSlug } = params;
    const unit = COMPANY_CONFIG.units.find((u) => u.slug === unitSlug);

    if (!unit) {
        notFound();
    }

    // Find the feature in the unit's config to ensure it's valid
    const feature = unit.features.find((f) => f.urlSuffix === featureSlug);

    // Special case for "genel" if it's treated as a sub-page, but usually we redirect.
    // If "genel" is accessed, we might want to redirect to /units/[unitSlug] in next.config or middleware,
    // OR just render a redirect here. But for now, if it matches, we can handle it.

    if (!feature) {
        notFound();
    }

    const unitName = unit.name;
    const unitTheme = unit.theme; // used for QuoteProposalForm if needed

    switch (featureSlug) {
        case "hazir-cumleler":
            const sentences = GENERIC_SENTENCES[unitSlug] || GENERIC_SENTENCES["default"];
            return <ReadySentencesPage unitName={unitName} initialSentences={sentences} />;

        case "guvence-paketleri":
            const packageData = GENERIC_PACKAGES[unitSlug] || GENERIC_PACKAGES["birim-a"]; // Fallback to A
            return (
                <WarrantyPackagesPage
                    unitName={unitName}
                    packages={packageData.packages}
                    categories={packageData.categories}
                />
            );

        case "kampanyalar":
            return <CampaignsView unitName={unitName} unitSlug={unitSlug} />;

        case "fiyat-teklifi-hazirla":
            // QuoteProposalForm expects unitName in Title Case for display usually, config has it in Uppercase usually.
            // We'll pass as is.
            return <QuoteProposalForm unitName={unitName} themeColor={unitTheme === 'gray' ? 'slate' : unitTheme as any} />;
        // themeColor type might need casting if mismatch

        case "genel":
            // Usually redirect to dashboard home
            return (
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Yönlendiriliyor...</h1>
                    <meta httpEquiv="refresh" content={`0; url=/units/${unitSlug}`} />
                </div>
            );

        default:
            return (
                <div className="container mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-4">{feature.title}</h1>
                    <p className="text-muted-foreground">
                        {feature.title} modülü yapım aşamasındadır ({unitName}).
                    </p>
                </div>
            );
    }
}
