import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const offices = [
  { id: 1, name: "İstanbul Merkez Ofis", manager: "Canan Öztürk", location: "İstanbul", performance: 95 },
  { id: 2, name: "Ankara Ofis", manager: "Burak Yıldız", location: "Ankara", performance: 88 },
  { id: 3, name: "İzmir Ofis", manager: "Selin Arslan", location: "İzmir", performance: 92 },
  { id: 4, name: "Bursa Ofis", manager: "Emre Polat", location: "Bursa", performance: 85 },
  { id: 5, name: "Antalya Ofis", manager: "Zeynep Koç", location: "Antalya", performance: 90 },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Ofis Müdürleri</h1>
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ofis Adı</TableHead>
              <TableHead>Müdür</TableHead>
              <TableHead>Lokasyon</TableHead>
              <TableHead className="text-right">Performans Skoru</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offices.map((office) => (
              <TableRow key={office.id}>
                <TableCell className="font-medium">{office.name}</TableCell>
                <TableCell>{office.manager}</TableCell>
                <TableCell>{office.location}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={office.performance >= 90 ? "default" : "outline"}>
                    %{office.performance}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
