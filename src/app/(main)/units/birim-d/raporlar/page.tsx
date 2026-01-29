import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const reports = [
  { id: 1, name: "Aylık Performans Raporu", date: "28.11.2024", type: "PDF", size: "2.4 MB", status: "Hazır" },
  { id: 2, name: "Araç Bakım Özeti", date: "27.11.2024", type: "Excel", size: "1.1 MB", status: "Hazır" },
  { id: 3, name: "Müşteri Şikayet Analizi", date: "25.11.2024", type: "PDF", size: "3.2 MB", status: "Hazır" },
  { id: 4, name: "Yakıt Tüketim Raporu", date: "20.11.2024", type: "Excel", size: "4.5 MB", status: "Arşiv" },
  { id: 5, name: "Personel Verimlilik", date: "15.11.2024", type: "PDF", size: "1.8 MB", status: "Arşiv" },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Raporlar</h1>
        <Button>
          <FileText className="mr-2 h-4 w-4" /> Yeni Rapor Oluştur
        </Button>
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rapor Adı</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Tür</TableHead>
              <TableHead>Boyut</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {report.name}
                </TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.size}</TableCell>
                <TableCell>
                  <Badge variant={report.status === "Hazır" ? "default" : "secondary"}>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
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