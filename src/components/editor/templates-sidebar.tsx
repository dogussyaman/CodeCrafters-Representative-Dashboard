"use client";

import { useState } from 'react';
import { Trash2, Search, Folder, ChevronLeft, ChevronRight, LayoutTemplate, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  preview: string;
  content: string;
  unit: string;
}

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
  onDeleteTemplate
}: TemplatesSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(
    new Set(templates.map(t => t.unit))
  );

  const units = Array.from(new Set(templates.map(t => t.unit)));

  const toggleUnit = (unit: string) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unit)) {
      newExpanded.delete(unit);
    } else {
      newExpanded.add(unit);
    }
    setExpandedUnits(newExpanded);
  };

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTemplatesByUnit = (unit: string) =>
    filteredTemplates.filter(t => t.unit === unit);

  return (
    <aside
      className={cn(
        "border-r border-border bg-card/40 backdrop-blur-sm dark:bg-card/60 flex flex-col transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-14" : "w-80"
      )}
    >
      {/* Collapse/Expand Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 z-10 h-6 w-6 rounded-full border border-border bg-background shadow-md hover:bg-accent"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      {/* Header */}
      <div className={cn("p-4 border-b border-border bg-card/50 backdrop-blur-sm", isCollapsed && "p-2")}>
        {!isCollapsed ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <LayoutTemplate className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold dark:font-bold">Şablonlarım</h2>
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                {templates.length}
              </Badge>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Şablon ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <LayoutTemplate className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Templates List */}
      <ScrollArea className="flex-1">
        {isCollapsed ? (
          // Collapsed View - Icons Only
          <div className="flex flex-col items-center gap-2 py-2">
            {units.map(unit => {
              const count = getTemplatesByUnit(unit).length;
              return (
                <div
                  key={unit}
                  className="relative w-10 h-10 rounded-md bg-accent/50 flex items-center justify-center cursor-pointer hover:bg-accent transition-colors"
                  title={`${unit} (${count})`}
                >
                  <Folder className="h-4 w-4 text-muted-foreground" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          // Expanded View
          <div className="p-2">
            {units.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/20 mb-3" />
                <p className="text-sm font-medium text-muted-foreground">Henüz şablon yok</p>
                <p className="text-xs text-muted-foreground mt-1">
                  İlk şablonunuzu oluşturun
                </p>
              </div>
            ) : (
              units.map((unit) => {
                const unitTemplates = getTemplatesByUnit(unit);
                const isExpanded = expandedUnits.has(unit);

                if (unitTemplates.length === 0 && searchQuery) return null;

                return (
                  <div key={unit} className="mb-2">
                    <button
                      onClick={() => toggleUnit(unit)}
                      className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-accent/50 rounded-md transition-colors group border border-transparent hover:border-border/50 dark:bg-muted/20 dark:hover:bg-muted/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <Folder className={cn(
                          "w-4 h-4 transition-colors flex-shrink-0",
                          isExpanded ? "text-primary dark:text-primary" : "text-muted-foreground dark:text-muted-foreground"
                        )} />
                        <span className="font-semibold text-sm dark:text-foreground dark:font-bold tracking-wide uppercase text-xs">
                          {unit}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs font-medium">
                        {unitTemplates.length}
                      </Badge>
                    </button>

                    {isExpanded && (
                      <div className="mt-1 space-y-1 ml-2">
                        {unitTemplates.map((template) => (
                          <div
                            key={template.id}
                            className={cn(
                              "px-3 py-2.5 rounded-md cursor-pointer transition-all group relative",
                              selectedTemplate === template.id
                                ? "bg-primary/10 border-l-2 border-primary"
                                : "hover:bg-accent/50 border-l-2 border-transparent"
                            )}
                            onClick={() => onLoadTemplate(template.id)}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                  <p className="font-medium text-sm truncate">{template.name}</p>
                                </div>
                                <p className="text-xs text-muted-foreground truncate mt-1 pl-5">
                                  {template.preview || "Önizleme yok"}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteTemplate(template.id);
                                }}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </ScrollArea>

      {/* Footer Stats */}
      {!isCollapsed && (
        <div className="border-t border-border p-3 bg-muted/30 dark:bg-muted/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-muted-foreground">
            <span className="font-medium">{units.length} Birim</span>
            <span className="font-medium">{templates.length} Şablon</span>
          </div>
        </div>
      )}
    </aside>
  );
}
