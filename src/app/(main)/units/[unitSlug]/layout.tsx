import { notFound } from "next/navigation";
import { COMPANY_CONFIG } from "@/config/company-config";

export async function generateStaticParams() {
    return COMPANY_CONFIG.units.map((unit) => ({
        unitSlug: unit.slug,
    }));
}

export default async function UnitLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ unitSlug: string }>;
}) {
    const { unitSlug } = await params;
    const unit = COMPANY_CONFIG.units.find((u) => u.slug === unitSlug);

    if (!unit) {
        notFound();
    }

    return (
        <div className="h-full w-full">
            {children}
        </div>
    );
}
