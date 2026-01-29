import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const operations = [
  { id: 1, type: "Teslimat", plate: "34 KL 458", driver: "Mehmet Yılmaz", location: "İstanbul Havalimanı", time: "10:30", status: "Yolda" },
  { id: 2, type: "İade", plate: "06 AB 123", driver: "Ali Veli", location: "Ankara Merkez", time: "11:00", status: "Tamamlandı" },
  { id: 3, type: "Bakım Transferi", plate: "35 CD 789", driver: "Ayşe Demir", location: "İzmir Sanayi", time: "14:15", status: "Bekliyor" },
  { id: 4, type: "Lastik Değişimi", plate: "16 EF 456", driver: "Fatma Şahin", location: "Bursa Nilüfer", time: "09:00", status: "İşlemde" },
  { id: 5, type: "Teslimat", plate: "07 GH 012", driver: "Mustafa Kaya", location: "Antalya Otogar", time: "16:45", status: "Planlandı" },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Operasyon Yönetimi</h1>
        <Button>Yeni Görev Ata</Button>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Operasyon Tipi</TableHead>
              <TableHead>Plaka</TableHead>
              <TableHead>Sürücü</TableHead>
              <TableHead>Lokasyon</TableHead>
              <TableHead>Saat</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operations.map((op) => (
              <TableRow key={op.id}>
                <TableCell className="font-medium">{op.type}</TableCell>
                <TableCell className="font-mono">{op.plate}</TableCell>
                <TableCell>{op.driver}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  {op.location}
                </TableCell>
                <TableCell>{op.time}</TableCell>
                <TableCell>
                  <Badge variant={op.status === "Tamamlandı" ? "default" : op.status === "Yolda" ? "secondary" : "outline"}>
                    {op.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Detay</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}