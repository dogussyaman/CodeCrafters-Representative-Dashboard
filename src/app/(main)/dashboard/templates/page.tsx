"use client";

import Link from "next/link";
import { useState } from "react";
import { useTemplates } from "@/hooks/use-templates";
import { sanitizeHtml } from "@/lib/sanitize";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Trash2, Folder, Plus, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { DeleteTemplateDialog } from "@/components/templates/delete-template-dialog";

export default function TemplatesPage() {
  const { templates, deleteTemplate } = useTemplates();
  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<{ id: string; name: string } | null>(null);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Şablon içeriği kopyalandı");
  };

  const handleDeleteClick = (id: string, name: string) => {
    setTemplateToDelete({ id, name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (templateToDelete) {
      deleteTemplate(templateToDelete.id);
      toast.success("Şablon silindi");
      setTemplateToDelete(null);
    }
  };

  const filtered = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.unit.toLowerCase().includes(search.toLowerCase())
  );

  const templatesByUnit = filtered.reduce((acc, template) => {
    if (!acc[template.unit]) {
      acc[template.unit] = [];
    }
    acc[template.unit].push(template);
    return acc;
  }, {} as Record<string, typeof templates>);

  const units = (sidebarItems.find((g) => g.id === 100)?.items ?? []).map((i) => i.title);
  const defaultUnit = units[0] ?? "Genel";

  return (
    <div className="space-y-8 p-6 min-h-screen">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Şablonlar</h1>
          <p className="text-muted-foreground mt-2">Kaydedilen şablonları birimlere göre görüntüleyin.</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Şablon veya birim ara"
            className="w-64"
          />
          <Button asChild className="gap-2">
            <Link href="/dashboard/editor">
              <Plus className="h-4 w-4" />
              Yeni Şablon
            </Link>
          </Button>
        </div>
      </div>

      {units.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Birim tanımlı değil.</p>
        </div>
      ) : (
        <Tabs defaultValue={defaultUnit} className="space-y-6">
          <TabsList>
            {units.map((u) => (
              <TabsTrigger key={u} value={u}>{u}</TabsTrigger>
            ))}
          </TabsList>

          {units.map((u) => {
            const unitTemplates = templatesByUnit[u] ?? [];
            return (
              <TabsContent key={u} value={u}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Folder className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{u}</h2>
                  <Badge variant="secondary" className="ml-2">{unitTemplates.length}</Badge>
                </div>
                {unitTemplates.length === 0 ? (
                  <div className="rounded-lg border-2 border-dashed p-10 text-center text-muted-foreground">Bu birimde şablon yok.</div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {unitTemplates.map((template) => (
                      <Card key={template.id} className="group hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/50 hover:border-l-primary">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{template.name}</CardTitle>
                              <CardDescription className="line-clamp-1">
                                {new Date(template.createdAt).toLocaleDateString('tr-TR')}
                              </CardDescription>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                asChild
                                title="Düzenle"
                              >
                                <Link href={`/dashboard/editor?templateId=${template.id}`}>
                                  <Pencil className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleCopy(template.content)}
                                title="Kopyala"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteClick(template.id, template.name)}
                                title="Sil"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div
                            className="text-sm text-muted-foreground line-clamp-3 bg-muted/30 p-3 rounded-md"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(template.content ?? "") }}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      )}

      <DeleteTemplateDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        templateName={templateToDelete?.name ?? ""}
      />
    </div>
  );
}