"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export interface Item {
    id?: number | string;
    title?: string;
    category?: string;
    // Optional fields for region objects
    name?: string;
    manager?: string;
    phone?: string;
    email?: string;
    status?: string;
    [key: string]: any;
}

interface ItemDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item?: Item;
    categories: string[];
    onSave: (data: Item) => void;
}

export function ItemDialog({ open, onOpenChange, item, categories, onSave }: ItemDialogProps) {
    const [title, setTitle] = React.useState(item?.title ?? "");
    const [category, setCategory] = React.useState(item?.category ?? (categories[0] ?? ""));

    React.useEffect(() => {
        setTitle(item?.title ?? "");
        setCategory(item?.category ?? (categories[0] ?? ""));
    }, [item, categories]);

    const handleSave = () => {
        const newItem: Item = { ...(item ?? {}), title, category };
        onSave(newItem);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{item ? "Detay / Düzenle" : "Yeni Öğeyi Ekle"}</DialogTitle>
                    <DialogDescription>{item ? "Öğeyi düzenleyebilir ve kategorisini değiştirebilirsiniz." : "Yeni bir öğe oluşturun."}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input placeholder="Başlık" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {c}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        İptal
                    </Button>
                    <Button onClick={handleSave}>Kaydet</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
