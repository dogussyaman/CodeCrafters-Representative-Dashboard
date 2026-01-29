"use client";
import * as React from "react";

import { Search, Calendar, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { searchData } from "@/data/search-data";

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);


  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Kategorilere göre grupla
  const groupedData = React.useMemo(() => {
    const groups: Record<string, typeof searchData> = {};
    searchData.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, []);

  return (
    <>
      <Button
        variant="link"
        className="text-muted-foreground px-0! font-normal hover:no-underline"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        Search
        <kbd className="bg-muted inline-flex h-5 items-center gap-1 rounded border px-1.5 text-[10px] font-medium select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Kampanya, hazır cümle, güvence paketi veya şablon ara..." />
        <CommandList>
          <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
          {Object.entries(groupedData).map(([category, items], i) => (
            <React.Fragment key={category}>
              {i !== 0 && <CommandSeparator />}
              <CommandGroup heading={category}>
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      className="py-2!"
                      key={item.id}
                      onSelect={() => {
                        // Detay sayfasına yönlendirme yapılabilir
                        setOpen(false);
                      }}
                    >
                      <div className="flex w-full items-start gap-3">
                        <Icon className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">{item.title}</span>
                            <Badge variant="secondary" className="text-xs px-1.5 py-0 shrink-0">
                              {item.unit}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3" />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="size-3" />
                              {item.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
