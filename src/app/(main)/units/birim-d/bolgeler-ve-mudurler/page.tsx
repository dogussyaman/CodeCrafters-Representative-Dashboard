"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ItemDialog, Item } from "@/components/ItemDialog";

const regions = [
  { id: 1, name: "Marmara Bölge", manager: "Ahmet Yılmaz", phone: "+90 555 123 45 67", email: "ahmet.yilmaz@example.com", status: "Aktif" },
  { id: 2, name: "Ege Bölge", manager: "Ayşe Demir", phone: "+90 555 234 56 78", email: "ayse.demir@example.com", status: "Aktif" },
  { id: 3, name: "İç Anadolu Bölge", manager: "Mehmet Kaya", phone: "+90 555 345 67 89", email: "mehmet.kaya@example.com", status: "İzinde" },
  { id: 4, name: "Akdeniz Bölge", manager: "Fatma Çelik", phone: "+90 555 456 78 90", email: "fatma.celik@example.com", status: "Aktif" },
  { id: 5, name: "Karadeniz Bölge", manager: "Mustafa Şahin", phone: "+90 555 567 89 01", email: "mustafa.sahin@example.com", status: "Aktif" },
];

const statusOptions = ["Aktif", "İzinde"];

export default function Page() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  const handleSave = (item: Item) => {
    console.log("Saved item", item);
    // TODO: integrate with state or backend
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Bölgeler ve Müdürler</h1>
        <Button onClick={() => { setSelectedItem(undefined); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Yeni Bölge Ekle
        </Button>
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bölge Adı</TableHead>
              <TableHead>Bölge Müdürü</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead>Durum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regions.map((region) => (
              <TableRow
                key={region.id}
                className="cursor-pointer hover:bg-muted"
                onClick={() => { setSelectedItem(region); setDialogOpen(true); }}
              >
                <TableCell className="font-medium">{region.name}</TableCell>
                <TableCell>{region.manager}</TableCell>
                <TableCell>{region.phone}</TableCell>
                <TableCell>{region.email}</TableCell>
                <TableCell>
                  <Badge variant={region.status === "Aktif" ? "default" : "secondary"}>
                    {region.status}
                  </Badge>
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
