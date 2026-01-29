"use client";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

type RangeKey = "1-3" | "4-7" | "7-28";

type SegmentRow = {
    grup: string; // Araç Grubu
    segment: string; // Araç Segmenti (A..J)
    sanziman: string;
    yakit: string;
    modeller: string;
    base: number; // 1-3 gün için baz fiyat
};

const rows: SegmentRow[] = [
    {
        grup: "Ekonomik",
        segment: "A",
        sanziman: "Düz Vites",
        yakit: "Dizel/Benzin",
        modeller: "RENAULT CLIO - FIAT EGEA HB - FIAT EGEA CROSS - HYUNDAI BAYON",
        base: 1244,
    },
    {
        grup: "Ekonomik",
        segment: "B",
        sanziman: "Düz Vites",
        yakit: "Dizel/Benzin",
        modeller: "FIAT EGEA - CITROEN C-ELYSEE",
        base: 1160,
    },
    {
        grup: "Ekonomik",
        segment: "C",
        sanziman: "Otomatik",
        yakit: "Dizel/Benzin",
        modeller:
            "RENAULT CLIO - HYUNDAI I20 - HYUNDAI BAYON - FIAT EGEA HB - OPEL CORSA - DACIA SANDERO - SKODA SCALA - CITROEN C3",
        base: 1416,
    },
    {
        grup: "Ekonomik",
        segment: "D",
        sanziman: "Otomatik",
        yakit: "Dizel/Benzin/Hybrid",
        modeller: "FIAT EGEA - FIAT EGEA HYBRID - RENAULT TALIA NT",
        base: 1516,
    },
    {
        grup: "Konfor",
        segment: "E",
        sanziman: "Otomatik",
        yakit: "Benzin",
        modeller: "RENAULT MEGANE - PEUGEOT 308 - VW GOLF",
        base: 1650,
    },
    {
        grup: "Konfor",
        segment: "F",
        sanziman: "Otomatik",
        yakit: "Dizel",
        modeller: "PEUGEOT 3008 - HYUNDAI TUCSON - KIA SPORTAGE",
        base: 1800,
    },
    {
        grup: "Konfor",
        segment: "G",
        sanziman: "Otomatik",
        yakit: "Benzin",
        modeller: "TOYOTA COROLLA - HONDA CIVIC - MAZDA 3",
        base: 1750,
    },
    {
        grup: "SUV",
        segment: "H",
        sanziman: "Otomatik",
        yakit: "Dizel/Benzin",
        modeller: "RENAULT CAPTUR - SKODA KAMIQ - DACIA DUSTER",
        base: 1900,
    },
    {
        grup: "SUV",
        segment: "I",
        sanziman: "Otomatik",
        yakit: "Benzin/Hybrid",
        modeller: "TOYOTA C-HR - HONDA HR-V - NISSAN QASHQAI",
        base: 2050,
    },
    {
        grup: "Prestij",
        segment: "J",
        sanziman: "Otomatik",
        yakit: "Benzin/Hybrid",
        modeller: "BMW 3 SERIES - MERCEDES C - AUDI A4",
        base: 2500,
    },
];

function priceForRange(base: number, range: RangeKey) {
    switch (range) {
        case "1-3":
            return base;
        case "4-7":
            return Math.max(900, Math.round(base * 0.95)); // küçük indirim
        case "7-28":
            return Math.max(900, Math.round(base * 0.9)); // daha fazla indirim
    }
}

function toTL(n: number) {
    return `${n.toLocaleString("tr-TR")} TL`;
}

type QuoteProposalFormProps = {
    unitName: string;
    themeColor: "red" | "blue";
};

export function QuoteProposalForm({ unitName, themeColor }: QuoteProposalFormProps) {
    const [range, setRange] = useState<RangeKey>("1-3");

    const computed = useMemo(
        () => rows.map((r) => ({ ...r, fiyat: priceForRange(r.base, range) })),
        [range]
    );

    // Theme-based color configurations
    const colors = {
        red: {
            primary: "#dc2626",
            border: "border-red-600/60",
            bg: "bg-red-600",
            bgHover: "hover:bg-red-700",
            bgVariant1: "bg-red-600/90",
            bgVariant2: "bg-red-600/80",
            text: "text-red-700",
            borderOutline: "border-red-600",
            bgOutlineHover: "hover:bg-red-50",
            tableHeaderBg: "bg-red-600 hover:bg-red-600",
        },
        blue: {
            primary: "#2563eb",
            border: "border-blue-600/60",
            bg: "bg-blue-600",
            bgHover: "hover:bg-blue-700",
            bgVariant1: "bg-blue-600/90",
            bgVariant2: "bg-blue-600/80",
            text: "text-blue-700",
            borderOutline: "border-blue-600",
            bgOutlineHover: "hover:bg-blue-50",
            tableHeaderBg: "bg-blue-600 hover:bg-blue-600",
        },
    };

    const theme = colors[themeColor];

    const copyTable = async () => {
        const header = [
            "Araç Grubu",
            "Araç Segmenti",
            "Şanzıman",
            "Yakıt Tipi",
            "Marka / Model",
            "Fiyat / Günlük",
        ];
        const tsv = [
            header.join("\t"),
            ...computed.map((r) =>
                [r.grup, r.segment, r.sanziman, r.yakit, r.modeller, toTL(r.fiyat)].join("\t")
            ),
        ].join("\n");

        const headerColor = theme.primary;
        const widths = ["10%", "10%", "16%", "14%", "40%", "10%"]; // kolon genişlikleri
        const thBaseStyle = `background:${headerColor};color:#ffffff;border:1px solid #e5e7eb;padding:6px;text-align:center;`;
        const tdBaseStyle = `border:1px solid #e5e7eb;padding:6px;vertical-align:top;text-align:center;white-space:normal;word-break:break-word;`;
        const tableStyle = `border-collapse:collapse;width:750px;table-layout:fixed;font-family:Arial,Helvetica,sans-serif;font-size:13px;`;

        const htmlRows = computed
            .map((r) => {
                const cols = [r.grup, r.segment, r.sanziman, r.yakit, r.modeller, toTL(r.fiyat)];
                return (
                    `<tr>` +
                    cols
                        .map((val, i) => `<td style="${tdBaseStyle}width:${widths[i]}">${val}</td>`)
                        .join("") +
                    `</tr>`
                );
            })
            .join("");

        const html =
            `<table style="${tableStyle}">` +
            `<thead><tr>` +
            header
                .map((h, i) => `<th style="${thBaseStyle}width:${widths[i]}">${h}</th>`)
                .join("") +
            `</tr></thead>` +
            `<tbody>${htmlRows}</tbody>` +
            `</table>`;

        try {
            if ("ClipboardItem" in window) {
                const data = new ClipboardItem({
                    "text/html": new Blob([html], { type: "text/html" }),
                    "text/plain": new Blob([tsv], { type: "text/plain" }),
                });
                await navigator.clipboard.write([data]);
            } else {
                await navigator.clipboard.writeText(tsv);
            }
            toast.success("Stilli HTML tablo panoya kopyalandı.");
        } catch (err) {
            toast.error("Kopyalama başarısız oldu: " + err);
        }
    };

    return (
        <div className="space-y-6 p-6">
            <Card className={theme.border}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <span className={`inline-block h-3 w-3 rounded-full ${theme.bg}`} />
                        {unitName} – Fiyat Teklifi Hazırla
                    </CardTitle>
                    <CardDescription>
                        Gün aralığı seçin ve tabloyu kopyalayın. Seçili aralık: {range} gün.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-3">
                    <Button
                        className={`${theme.bg} ${theme.bgHover} text-white`}
                        onClick={() => setRange("1-3")}
                    >
                        1–3 Gün
                    </Button>
                    <Button
                        className={`${theme.bgVariant1} ${theme.bgHover} text-white`}
                        onClick={() => setRange("4-7")}
                    >
                        4–7 Gün
                    </Button>
                    <Button
                        className={`${theme.bgVariant2} ${theme.bgHover} text-white`}
                        onClick={() => setRange("7-28")}
                    >
                        7–28 Gün
                    </Button>

                    <div className="ms-auto">
                        <Button
                            className={`border ${theme.borderOutline} ${theme.text} bg-white ${theme.bgOutlineHover}`}
                            variant="outline"
                            onClick={copyTable}
                        >
                            Kopyala
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className={`${theme.border} flex justify-center items-center`}>
                <CardContent className="">
                    <Table className="border rounded-lg w-[700px] divide-y divide-gray-600">
                        <TableHeader>
                            <TableRow className={`${theme.tableHeaderBg} text-white divide-x divide-gray-200`}>
                                <TableHead className="text-white text-center">Araç Grubu</TableHead>
                                <TableHead className="text-white text-center">Araç Segmenti</TableHead>
                                <TableHead className="text-white text-center">Şanzıman</TableHead>
                                <TableHead className="text-white text-center">Yakıt Tipi</TableHead>
                                <TableHead className="text-white text-center">Marka / Model</TableHead>
                                <TableHead className="text-white text-center">Fiyat / Günlük</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {computed.map((r) => (
                                <TableRow key={r.segment} className="text-center divide-x divide-gray-200">
                                    <TableCell className="text-center">{r.grup}</TableCell>
                                    <TableCell className="text-center">{r.segment}</TableCell>
                                    <TableCell className="text-center">{r.sanziman}</TableCell>
                                    <TableCell className="text-center">{r.yakit}</TableCell>
                                    <TableCell className="max-w-[400px] whitespace-normal text-center">{r.modeller}</TableCell>
                                    <TableCell className="text-center font-medium">{toTL(r.fiyat)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
