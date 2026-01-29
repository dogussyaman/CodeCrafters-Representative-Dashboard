import React from "react";
import { BellRing, ClipboardList, Flag, Folder, StickyNote, Trophy } from "lucide-react";

/**
 * OD Talep action item için tip tanımı
 */
export interface ActionItem {
    icon: React.ReactNode;
    name: string;
}

/**
 * OD Talep sayfasındaki action itemlar
 */
export const actionItems: ActionItem[] = [
    { icon: <Folder />, name: "Cep Sistemi" },
    { icon: <ClipboardList />, name: "Obisrac" },
    { icon: <StickyNote />, name: "WizRAC" },
    { icon: <Trophy />, name: "Webphone" },
    { icon: <Flag />, name: "Global Mail" },
    { icon: <BellRing />, name: "Otokoç Mail" },
] as const;
