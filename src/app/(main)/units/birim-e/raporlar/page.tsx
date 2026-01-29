import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, PieChart, Plus } from "lucide-react";
import { ItemDialog, Item } from "@/components/ItemDialog";

const reports = [
  { id: 1, name: "Q4 2024 Satış Tahminleri", date: "28.11.2024", type: "PDF", status: "Taslak" },
  { id: 2, name: "Bölgesel Satış Performansı", date: "Ekim 2024", type: "Excel", status: "Hazır" },
  { id: 3, name: "Müşteri Kayıp Analizi (Churn)", date: "Q3 2024", type: "PDF", status: "Hazır" },
  { id: 4, name: "Ürün Bazlı Karlılık", date: "Ekim 2024", type: "Excel", status: "Hazır" },
  { id: 5, name: "Satış Ekibi Prim Hesaplamaları", date: "Kasım 2024", type: "Excel", status: "İşleniyor" },
];

const statusOptions = ["Taslak", "Hazır", "İşleniyor"];

export default function Page() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<Item | undefined>(undefined);

  const handleSave = (item: Item) => {
    console.log("Saved report", item);
    // TODO: integrate with state or backend
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Satış Raporları</h1>
        <Button variant="outline" onClick={() => { setSelectedItem(undefined); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Yeni Rapor Ekle
        </Button>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rapor Adı</TableHead>
              <TableHead>Dönem</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İndir</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow
                key={report.id}
                className="cursor-pointer hover:bg-muted"
                onClick={() => {
                  setSelectedItem({ ...report, title: report.name, category: report.status });
                  setDialogOpen(true);
                }}
              >
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.status}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" disabled={report.status === "İşleniyor"}>
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={selectedItem}
        categories={statusOptions}
        onSave={handleSave}
      />
    </div>
  );
}