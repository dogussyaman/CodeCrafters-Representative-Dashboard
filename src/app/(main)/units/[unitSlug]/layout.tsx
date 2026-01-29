import { notFound } from "next/navigation";
import { COMPANY_CONFIG } from "@/config/company-config";

export async function generateStaticParams() {
    return COMPANY_CONFIG.units.map((unit) => ({
        unitSlug: unit.slug,
    }));
}

export default function UnitLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { unitSlug: string };
}) {
    const unit = COMPANY_CONFIG.units.find((u) => u.slug === params.unitSlug);

    if (!unit) {
        notFound();
    }

    return (
        <div className="h-full w-full">
            {children}
        </div>
    );
}
