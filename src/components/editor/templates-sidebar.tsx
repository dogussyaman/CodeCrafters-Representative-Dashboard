"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Template } from "@/hooks/use-templates";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TemplatesSidebarProps {
  templates: Template[];
  selectedTemplate: string | null;
  onLoadTemplate: (templateId: string) => void;
  onDeleteTemplate: (templateId: string) => void;
}

export function TemplatesSidebar({
  templates,
  selectedTemplate,
  onLoadTemplate,
  onDeleteTemplate,
}: TemplatesSidebarProps) {
  return (
    <div className="flex w-64 shrink-0 flex-col border-r border-border bg-muted/30">
      <div className="shrink-0 border-b border-border p-3">
        <span className="text-sm font-medium">Şablonlar</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-0.5 p-2">
          {templates.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              Henüz şablon yok. Kaydet ile ekleyin.
            </p>
          ) : (
            templates.map((t) => (
              <div
                key={t.id}
                className={cn(
                  "group flex items-center justify-between gap-2 rounded-lg border border-transparent px-3 py-2 transition-colors hover:bg-muted",
                  selectedTemplate === t.id && "border-primary/50 bg-muted"
                )}
              >
                <button
                  type="button"
                  onClick={() => onLoadTemplate(t.id)}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate text-sm font-medium">{t.name}</span>
                </button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7 shrink-0 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTemplate(t.id);
                  }}
                  title="Sil"
                >
                  <Trash2 className="size-3.5 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
