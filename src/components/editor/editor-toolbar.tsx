"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Trash2 } from "lucide-react";
import { COMPANY_CONFIG } from "@/config/company-config";

const units = COMPANY_CONFIG.units.map((u) => u.name);

interface EditorToolbarProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  onSaveTemplate: (name: string, unit: string) => void;
  onClear: () => void;
  isEditMode: boolean;
  selectedTemplateName?: string;
  selectedTemplateUnit?: string;
}

export function EditorToolbar({
  editorRef,
  onSaveTemplate,
  onClear,
  isEditMode,
  selectedTemplateName = "",
  selectedTemplateUnit,
}: EditorToolbarProps) {
  const [saveOpen, setSaveOpen] = useState(false);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState(units[0] ?? "Genel");

  const openSave = () => {
    setName(selectedTemplateName);
    setUnit(selectedTemplateUnit ?? units[0] ?? "Genel");
    setSaveOpen(true);
  };

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSaveTemplate(trimmed, unit);
    setSaveOpen(false);
  };

  return (
    <>
      <div className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/30 px-4 py-2">
        <Button size="sm" onClick={openSave} className="gap-1.5">
          <Save className="size-4" />
          {isEditMode ? "Güncelle" : "Kaydet"}
        </Button>
        <Button size="sm" variant="outline" onClick={onClear} className="gap-1.5">
          <Trash2 className="size-4" />
          Temizle
        </Button>
      </div>

      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Şablonu güncelle" : "Şablon kaydet"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="template-name">Şablon adı</Label>
              <Input
                id="template-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn. Kampanya Bilgilendirme"
              />
            </div>
            <div className="grid gap-2">
              <Label>Birim</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Birim seçin" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSave} disabled={!name.trim()}>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
