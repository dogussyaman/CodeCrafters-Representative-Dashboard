import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart } from "lucide-react";

const reports = [
  { id: 1, name: "Aylık Yakıt Tüketim Analizi", date: "01.11.2024 - 30.11.2024", type: "Excel", status: "Hazır" },
  { id: 2, name: "Araç Kilometre Raporu", date: "01.11.2024 - 30.11.2024", type: "PDF", status: "Hazır" },
  { id: 3, name: "Bakım Maliyetleri Özeti", date: "Q3 2024", type: "PDF", status: "Hazır" },
  { id: 4, name: "Sürücü Performans Karnesi", date: "Ekim 2024", type: "Excel", status: "Arşiv" },
  { id: 5, name: "HGS/OGS Geçiş Detayları", date: "Kasım 2024", type: "Excel", status: "İşleniyor" },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Filo Raporları</h1>
        <Button variant="outline">
          <FileBarChart className="mr-2 h-4 w-4" /> Özel Rapor Oluştur
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
              <TableRow key={report.id}>
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
    </div>
  );
}