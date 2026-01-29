"use client";

import { usePathname } from "next/navigation";
import { AppFooter } from "@/components/ui/app-footer";

export function FooterWrapper() {
    const pathname = usePathname();
    const isChatbot = pathname === "/dashboard/chatbot";

    if (isChatbot) {
        return null;
    }

    return <AppFooter />;
}
