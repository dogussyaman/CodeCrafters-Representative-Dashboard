"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ItemDialog, Item } from "@/components/ItemDialog";

const columns = [
  {
    id: "new",
    title: "Yeni Fırsat",
    color: "bg-slate-100 dark:bg-slate-800",
    items: [
      { id: 1, title: "XYZ Teknoloji", value: "₺120K", date: "2 gün önce" },
      { id: 2, title: "Global İnşaat", value: "₺500K", date: "Bugün" },
    ],
  },
  {
    id: "contact",
    title: "Görüşülüyor",
    color: "bg-blue-50 dark:bg-blue-900/20",
    items: [
      { id: 3, title: "Mega Marketler", value: "₺85K", date: "1 hafta önce" },
      { id: 4, title: "Anadolu Lojistik", value: "₺2.1M", date: "3 gün önce" },
      { id: 5, title: "Ege Turizm", value: "₺300K", date: "Dün" },
    ],
  },
  {
    id: "proposal",
    title: "Teklif Aşamasında",
    color: "bg-yellow-50 dark:bg-yellow-900/20",
    items: [{ id: 6, title: "Beta Yazılım", value: "₺45K", date: "2 hafta önce" }],
  },
  {
    id: "negotiation",
    title: "Pazarlık",
    color: "bg-orange-50 dark:bg-orange-900/20",
    items: [{ id: 7, title: "Delta Holding", value: "₺1.5M", date: "1 ay önce" }],
  },
  {
    id: "closed",
    title: "Kapanış",
    color: "bg-green-50 dark:bg-green-900/20",
    items: [{ id: 8, title: "Gamma Enerji", value: "₺750K", date: "Dün" }],
  },
];

const categories = columns.map((c) => c.title);

export default function Page() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  const handleSave = (item: Item) => {
    console.log("Saved item", item);
    // TODO: integrate with state or backend
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Satış Operasyonu (Deal Flow)</h1>
        <Button onClick={() => { setSelectedItem(undefined); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Yeni Fırsat Ekle
        </Button>
      </div>

      <div className="grid gap-4 auto-rows-min sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((col) => (
          <div key={col.id} className={`flex flex-col rounded-lg ${col.color} p-2`}>
            <div className="flex items-center justify-between p-2 mb-2">
              <h3 className="font-semibold text-sm">{col.title}</h3>
              <Badge variant="secondary" className="bg-background/50">{col.items.length}</Badge>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto pr-1">
              {col.items.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedItem({ ...item, category: col.title });
                    setDialogOpen(true);
                  }}
                >
                  <CardContent className="p-3 space-y-2">
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.value}</span>
                      <span>{item.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={selectedItem}
        categories={categories}
        onSave={handleSave}
      />
    </div>
  );
}