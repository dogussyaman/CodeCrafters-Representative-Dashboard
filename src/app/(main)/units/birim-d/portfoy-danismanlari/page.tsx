import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const consultants = [
  { id: 1, name: "Ali Vural", portfolioSize: 120, activeClients: 45, rating: 4.8 },
  { id: 2, name: "Derya Güneş", portfolioSize: 95, activeClients: 38, rating: 4.6 },
  { id: 3, name: "Hakan Tekin", portfolioSize: 150, activeClients: 60, rating: 4.9 },
  { id: 4, name: "Esra Aydın", portfolioSize: 80, activeClients: 30, rating: 4.5 },
  { id: 5, name: "Murat Can", portfolioSize: 110, activeClients: 42, rating: 4.7 },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Portföy Danışmanları</h1>
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Danışman</TableHead>
              <TableHead className="text-right">Portföy Büyüklüğü</TableHead>
              <TableHead className="text-right">Aktif Müşteri</TableHead>
              <TableHead className="text-right">Puan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultants.map((consultant) => (
              <TableRow key={consultant.id}>
                <TableCell className="flex items-center gap-2 font-medium">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${consultant.name}`} />
                    <AvatarFallback>{consultant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {consultant.name}
                </TableCell>
                <TableCell className="text-right">{consultant.portfolioSize}</TableCell>
                <TableCell className="text-right">{consultant.activeClients}</TableCell>
                <TableCell className="text-right font-bold text-yellow-600">★ {consultant.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
