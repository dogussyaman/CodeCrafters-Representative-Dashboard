"use client";

import { useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Superscript,
  Subscript,
  Link,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Save,
  Type,
  Copy,
  ZoomIn,
  ZoomOut,
  Indent,
  Outdent,
  List,
  ListOrdered,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface EditorToolbarProps {
  editorRef: React.RefObject<HTMLDivElement>;
  onSaveTemplate: (name: string, unit: string) => void;
  onClear?: () => void;
  isEditMode?: boolean;
  selectedTemplateName?: string;
  selectedTemplateUnit?: string;
}

const FONTS = [
  { name: "Segoe UI", family: '"Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif' },
  { name: "Arial", family: "Arial, sans-serif" },
  { name: "Georgia", family: "Georgia, serif" },
  { name: "Courier New", family: '"Courier New", monospace' },
  { name: "Times New Roman", family: '"Times New Roman", serif' },
  { name: "Trebuchet MS", family: '"Trebuchet MS", sans-serif' },
];

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36];

const UNITS = [
  "SATIŞ BİRİMİ",
  "MÜŞTERİ HİZMETLERİ",
  "OPERASYON BİRİMİ",
  "İKAME HİZMETLERİ",
  "KURUMSAL SATIŞ",
  "FİLO YÖNETİMİ",
  "GENEL",
];

export function EditorToolbar({ editorRef, onSaveTemplate, onClear, isEditMode, selectedTemplateName, selectedTemplateUnit }: EditorToolbarProps) {
  const [selectedFont, setSelectedFont] = useState("Segoe UI");
  const [selectedSize, setSelectedSize] = useState("10");
  const [templateName, setTemplateName] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Düzenleme modunda mevcut değerleri yükle
  useEffect(() => {
    if (isEditMode && selectedTemplateName && selectedTemplateUnit) {
      setTemplateName(selectedTemplateName);
      setSelectedUnit(selectedTemplateUnit);
    }
  }, [isEditMode, selectedTemplateName, selectedTemplateUnit]);

  useEffect(() => {
    if (typeof document !== "undefined" &&
      typeof (document as any).queryCommandSupported === "function" &&
      (document as any).queryCommandSupported("styleWithCSS")) {
      document.execCommand("styleWithCSS", false, "true");
    }

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        setIsDialogOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const applyFont = (font: string) => {
    setSelectedFont(font);
    const fontFamily = FONTS.find((f) => f.name === font)?.family ?? FONTS[0].family;
    executeCommand("fontName", fontFamily);
  };

  const applySize = (size: number) => {
    setSelectedSize(String(size));
    // Convert point size to html size (1-7)
    const sizeMap: Record<number, number> = { 8: 1, 10: 2, 12: 3, 14: 4, 18: 5, 24: 6, 36: 7 };
    const htmlSize = sizeMap[size] || 2;
    executeCommand("fontSize", String(htmlSize));
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast.error("Lütfen şablon adı girin");
      return;
    }
    if (!selectedUnit) {
      toast.error("Lütfen birim seçin");
      return;
    }
    onSaveTemplate(templateName, selectedUnit);
    setTemplateName("");
    setSelectedUnit("");
    setIsDialogOpen(false);
  };

  const handleCopy = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      navigator.clipboard.writeText(html);
      toast.success("İçerik kopyalandı");
    }
  };

  return (
    <div className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-10 shadow-sm dark:bg-card/90">
      <div className="flex flex-wrap items-center gap-1 p-2.5">
        {/* History */}
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Geri Al (Ctrl+Z)" onClick={() => executeCommand("undo")}>
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="İleri Al (Ctrl+Y)" onClick={() => executeCommand("redo")}>
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Font Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 min-w-[140px] justify-between">
              <div className="flex items-center gap-2">
                <Type className="h-3 w-3" />
                <span className="text-xs">{selectedFont}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Yazı Tipi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {FONTS.map((font) => (
              <DropdownMenuItem
                key={font.name}
                onClick={() => applyFont(font.name)}
                className={selectedFont === font.name ? "bg-accent" : ""}
              >
                <span style={{ fontFamily: font.family }}>{font.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Font Size */}
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Küçült"
            onClick={() => {
              const currentSize = parseInt(selectedSize);
              const smaller = FONT_SIZES.filter((s) => s < currentSize).pop() ?? currentSize;
              applySize(smaller);
            }}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-16 text-xs">
                {selectedSize}pt
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Yazı Boyutu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {FONT_SIZES.map((size) => (
                <DropdownMenuItem
                  key={size}
                  onClick={() => applySize(size)}
                  className={selectedSize === String(size) ? "bg-accent" : ""}
                >
                  {size}pt
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Büyüt"
            onClick={() => {
              const currentSize = parseInt(selectedSize);
              const larger = FONT_SIZES.find((s) => s > currentSize) ?? currentSize;
              applySize(larger);
            }}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Text Formatting */}
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Kalın (Ctrl+B)" onClick={() => executeCommand("bold")}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="İtalik (Ctrl+I)" onClick={() => executeCommand("italic")}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Alt Çizgi (Ctrl+U)" onClick={() => executeCommand("underline")}>
            <Underline className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Üstü Çizili" onClick={() => executeCommand("strikethrough")}>
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Alignment */}
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Sola Hizala" onClick={() => executeCommand("justifyLeft")}>
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Ortala" onClick={() => executeCommand("justifyCenter")}>
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Sağa Hizala" onClick={() => executeCommand("justifyRight")}>
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="İki Yana Yasla" onClick={() => executeCommand("justifyFull")}>
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Lists */}
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Madde İşareti" onClick={() => executeCommand("insertUnorderedList")}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Numaralı Liste" onClick={() => executeCommand("insertOrderedList")}>
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Girintiyi Azalt" onClick={() => executeCommand("outdent")}>
            <Outdent className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Girintiyi Artır" onClick={() => executeCommand("indent")}>
            <Indent className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Special */}
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Link Ekle"
            onClick={() => {
              const url = prompt("Link URL:");
              if (url) executeCommand("createLink", url);
            }}
          >
            <Link className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Vurgula"
            onClick={() => executeCommand("hiliteColor", "#FFFF00")}
          >
            <Highlighter className="h-4 w-4" />
          </Button>
        </div>

        {/* Actions - Right Side */}
        <div className="ml-auto flex items-center gap-2">
          {onClear && (
            <Button variant="outline" size="sm" className="h-8 gap-2" onClick={onClear}>
              <Trash2 className="h-3 w-3" />
              <span className="text-xs">Temizle</span>
            </Button>
          )}

          <Button variant="outline" size="sm" className="h-8 gap-2" onClick={handleCopy}>
            <Copy className="h-3 w-3" />
            <span className="text-xs">Kopyala</span>
          </Button>

          {/* Save Template Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="h-3 w-3" />
                <span className="text-xs font-medium">{isEditMode ? "Şablonu Güncelle" : "Şablon Kaydet"}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl">{isEditMode ? "Şablonu Güncelle" : "Şablonu Kaydet"}</DialogTitle>
                <DialogDescription>
                  Şablonunuz için bir isim ve birim seçin. Şablon kaydedildikten sonra sol panelden erişebilirsiniz.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 py-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name" className="text-sm font-medium">
                    Şablon Adı <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="template-name"
                    placeholder="Örn: Hoşgeldin E-postası"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Açıklayıcı ve kolay hatırlanabilir bir isim seçin
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template-unit" className="text-sm font-medium">
                    Birim <span className="text-destructive">*</span>
                  </Label>
                  <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                    <SelectTrigger id="template-unit" className="h-10">
                      <SelectValue placeholder="Birim seçin..." />
                    </SelectTrigger>
                    <SelectContent>
                      {UNITS.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Şablon bu birim altında kaydedilecek
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  İptal
                </Button>
                <Button
                  onClick={handleSaveTemplate}
                  disabled={!templateName.trim() || !selectedUnit}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isEditMode ? "Güncelle" : "Kaydet"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

